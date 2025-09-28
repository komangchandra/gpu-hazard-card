import { addDoc, collection } from "firebase/firestore";
import { db } from "../database/Firebase";
import HazardForm from "../components/HazardForm";
import Swal from "sweetalert2";

const Hazard = () => {
  const handleSave = async (data) => {
    try {
      await addDoc(collection(db, "Reports"), {
        ...data,
        createdAt: new Date(),
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Data hazard berhasil dilaporkan ✅",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error simpan data:", error);

      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data ❌",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="container mt-4">
      {/* Header SVG */}
      <div className="text-center mb-4">
        <img
          src="/header.svg"
          alt="Header SVG"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      {/* Hazard Card Image (optional, bisa dihapus jika tidak perlu) */}
      {/* <img
        src="/hazard-card.png"
        alt="Hazard Card"
        className="img-fluid mb-3"
      /> */}
      <div className="card shadow">
        <div className="card-header text-center fw-bold">HAZARD CARD</div>
        <div className="card-body">
          <HazardForm onSubmit={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default Hazard;
