import { useState } from "react";

const HazardForm = ({ onSubmit }) => {
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [pelapor, setPelapor] = useState("");
  const [validasi, setValidasi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [lokasiLainnya, setLokasiLainnya] = useState("");
  const [temuan, setTemuan] = useState("");
  const [potensi, setPotensi] = useState("");
  const [perbaikan, setPerbaikan] = useState("");
  const [koordinasi, setKoordinasi] = useState("");
  const [risiko, setRisiko] = useState("");
  const [status, setStatus] = useState("OPEN");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      tanggal,
      waktu,
      pelapor,
      validasi,
      lokasi: lokasi === "Lainnya" ? lokasiLainnya : lokasi,
      temuan,
      potensi,
      perbaikan,
      koordinasi,
      risiko,
      status,
    });
    resetForm();
  };

  const resetForm = () => {
    setTanggal("");
    setWaktu("");
    setPelapor("");
    setValidasi("");
    setLokasi("");
    setLokasiLainnya("");
    setTemuan("");
    setPotensi("");
    setPerbaikan("");
    setKoordinasi("");
    setRisiko("");
    setStatus("OPEN");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Tanggal & Waktu */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Tanggal</label>
          <input
            type="date"
            className="form-control"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Waktu</label>
          <input
            type="time"
            className="form-control"
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
          />
        </div>
      </div>

      {/* Pelapor & Validasi */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Pelapor</label>
          <input
            type="text"
            className="form-control"
            value={pelapor}
            onChange={(e) => setPelapor(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Validasi</label>
          <input
            type="text"
            className="form-control"
            value={validasi}
            onChange={(e) => setValidasi(e.target.value)}
          />
        </div>
      </div>

      {/* Lokasi */}
      <div className="mb-3">
        <label className="form-label">Lokasi</label>
        {["Tambang", "Kantor", "Workshop", "Jalan Hauling", "Lainnya"].map(
          (item) => (
            <div className="form-check" key={item}>
              <input
                className="form-check-input"
                type="radio"
                name="lokasi"
                id={item}
                value={item}
                checked={lokasi === item}
                onChange={(e) => setLokasi(e.target.value)}
              />
              <label className="form-check-label" htmlFor={item}>
                {item}
              </label>
            </div>
          )
        )}
        {lokasi === "Lainnya" && (
          <div className="mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan lokasi lainnya"
              value={lokasiLainnya}
              onChange={(e) => setLokasiLainnya(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Temuan */}
      <div className="mb-3">
        <label className="form-label">Temuan KTA - TTA</label>
        <textarea
          className="form-control"
          rows="2"
          value={temuan}
          onChange={(e) => setTemuan(e.target.value)}
        />
      </div>

      {/* Potensi */}
      <div className="mb-3">
        <label className="form-label">Potensi</label>
        <textarea
          className="form-control"
          rows="2"
          value={potensi}
          onChange={(e) => setPotensi(e.target.value)}
        />
      </div>

      {/* Perbaikan */}
      <div className="mb-3">
        <label className="form-label">Langkah Perbaikan</label>
        <textarea
          className="form-control"
          rows="2"
          value={perbaikan}
          onChange={(e) => setPerbaikan(e.target.value)}
        />
      </div>

      {/* Koordinasi */}
      <div className="mb-3">
        <label className="form-label">Dikoordinasikan dengan</label>
        <select
          className="form-select"
          value={koordinasi}
          onChange={(e) => setKoordinasi(e.target.value)}
        >
          <option value="">-- Pilih --</option>
          <option value="Manager">Manager</option>
          <option value="KTT">KTT</option>
          <option value="HSE">HSE</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Fasility">Fasility</option>
          <option value="Elektrik">Elektrik</option>
          <option value="Mekanik">Mekanik</option>
          <option value="Warehouse/Logistic">Warehouse/Logistic</option>
        </select>
      </div>

      {/* Risiko */}
      <div className="mb-3">
        <label className="form-label">Kategori Risiko</label>
        <div className="d-flex gap-2">
          {["AA", "A", "B", "C"].map((r) => (
            <div
              key={r}
              className={`badge p-2 ${
                r === "AA"
                  ? "bg-danger"
                  : r === "C"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setRisiko(r)}
            >
              {r}
            </div>
          ))}
        </div>
        {risiko && <div className="mt-2">Dipilih: {risiko}</div>}
      </div>

      {/* Status */}
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>OPEN</option>
          <option>CLOSE</option>
        </select>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default HazardForm;
