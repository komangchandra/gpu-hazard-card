import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/Firebase";
import DashboardLayout from "../components/DashboardLayout";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "Reports"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReports(items);
    });
    return () => unsub();
  }, []);

  // Hapus data
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      text: "Data ini akan hilang permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "Reports", id));
        Swal.fire("Terhapus!", "Data berhasil dihapus ✅", "success");
      } catch (error) {
        console.error("Gagal hapus data: ", error);
        Swal.fire("Error", "Gagal menghapus data ❌", "error");
      }
    }
  };

  // Detail laporan (SweetAlert2)
  const handleDetail = (row) => {
    Swal.fire({
      title: "Detail Laporan",
      html: `
        <div class="text-start">
          <p><b>Tanggal:</b> ${row.tanggal} ${row.waktu ?? ""}</p>
          <p><b>Pelapor:</b> ${row.pelapor}</p>
          <p><b>Lokasi:</b> ${row.lokasi}</p>
          <p><b>Temuan:</b> ${row.temuan}</p>
          <p><b>Potensi:</b> ${row.potensi}</p>
          <p><b>Perbaikan:</b> ${row.perbaikan}</p>
          <p><b>Koordinasi:</b> ${row.koordinasi}</p>
          <p><b>Risiko:</b> ${row.risiko}</p>
          <p><b>Status:</b> ${row.status}</p>
          <p><b>Validasi:</b> ${row.validasi}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Tutup",
    });
  };

  // Edit laporan (SweetAlert2 + input)
  const handleEdit = async (row) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Laporan",
      html: `
        <input id="swal-pelapor" class="swal2-input" placeholder="Pelapor" value="${row.pelapor}">
        <input id="swal-lokasi" class="swal2-input" placeholder="Lokasi" value="${row.lokasi}">
        <input id="swal-temuan" class="swal2-input" placeholder="Temuan" value="${row.temuan}">
        <input id="swal-potensi" class="swal2-input" placeholder="Potensi" value="${row.potensi}">
        <input id="swal-perbaikan" class="swal2-input" placeholder="Perbaikan" value="${row.perbaikan}">
        <input id="swal-koordinasi" class="swal2-input" placeholder="Koordinasi" value="${row.koordinasi}">
        <input id="swal-risiko" class="swal2-input" placeholder="Risiko" value="${row.risiko}">
        <input id="swal-status" class="swal2-input" placeholder="Status" value="${row.status}">
        <input id="swal-validasi" class="swal2-input" placeholder="Validasi" value="${row.validasi}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      preConfirm: () => {
        return {
          pelapor: document.getElementById("swal-pelapor").value,
          lokasi: document.getElementById("swal-lokasi").value,
          temuan: document.getElementById("swal-temuan").value,
          potensi: document.getElementById("swal-potensi").value,
          perbaikan: document.getElementById("swal-perbaikan").value,
          koordinasi: document.getElementById("swal-koordinasi").value,
          risiko: document.getElementById("swal-risiko").value,
          status: document.getElementById("swal-status").value,
          validasi: document.getElementById("swal-validasi").value,
        };
      },
    });

    if (formValues) {
      try {
        await updateDoc(doc(db, "Reports", row.id), formValues);
        Swal.fire("Tersimpan!", "Laporan berhasil diperbarui ✅", "success");
      } catch (error) {
        console.error("Gagal update data: ", error);
        Swal.fire("Error", "Gagal memperbarui data ❌", "error");
      }
    }
  };

  const columns = [
    { name: "No", selector: (_, index) => index + 1, width: "70px" },
    { name: "Tanggal", selector: (row) => row.tanggal ?? "-", sortable: true },
    { name: "Waktu", selector: (row) => row.waktu ?? "-" },
    { name: "Pelapor", selector: (row) => row.pelapor ?? "-", sortable: true },
    { name: "Lokasi", selector: (row) => row.lokasi ?? "-" },
    { name: "Temuan", selector: (row) => row.temuan ?? "-" },
    { name: "Status", selector: (row) => row.status ?? "-", sortable: true },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="btn-group">
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleDetail(row)}
          >
            <i className="bi bi-eye"></i> Lihat
          </button>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => handleEdit(row)}
          >
            <i className="bi bi-pencil"></i> Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash"></i> Hapus
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "300px",
    },
  ];

  const filteredReports = reports.filter((item) => {
    const search = filterText.toLowerCase();
    return (
      item.pelapor?.toLowerCase().includes(search) ||
      item.validasi?.toLowerCase().includes(search) ||
      item.lokasi?.toLowerCase().includes(search) ||
      item.temuan?.toLowerCase().includes(search) ||
      item.potensi?.toLowerCase().includes(search) ||
      item.perbaikan?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search) ||
      item.risiko?.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <h1 className="mb-4">Hazard Reports</h1>

      <div className="row mb-3">
        <div className="col-md-12">
          {/* Search Bar */}
          <div className="mb-3 col-md-4">
            <input
              type="text"
              placeholder="Cari laporan..."
              className="form-control bi bi-search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <DataTable
              columns={columns}
              data={filteredReports}
              pagination
              highlightOnHover
              striped
              responsive
              fixedHeader
              fixedHeaderScrollHeight="500px"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
