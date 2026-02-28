import React, { useState, useRef } from "react";
import "./Register.css";
import { Camera, X, Eye, EyeOff, ArrowLeft } from "lucide-react";
import bookImg from "../assets/book.png";
import { useNavigate } from "react-router-dom";
import PopupStatus from "../components/PopupStatus";
import { useToast } from "../components/Toast";

/**
 * NOTE (refactor): fungsi ini sekarang tidak dipakai karena kita pakai FileReader langsung di handleSubmit
 * Kamu boleh simpan dulu kalau masih mau dipakai di file lain nanti.
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function Register() {
  const navigate = useNavigate();
  const showToast = useToast();

  const [form, setForm] = useState({
    nis: "",
    nama: "",
    kelas: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [kartu, setKartu] = useState(null);
  const [kartuPreview, setKartuPreview] = useState(null); // ✅ buat nampilin gambar kartu di PopupStatus
  const fileInputRef = useRef(null);
  const [popupType, setPopupType] = useState(null);

  const passwordRules = {
    minLen: form.password.length >= 8,
    hasLetter: /[A-Za-z]/.test(form.password),
    hasNumber: /\d/.test(form.password),
    hasSpecial: /[^A-Za-z0-9]/.test(form.password),
  };

  const getPasswordError = () => {
    if (!passwordRules.minLen) return "Password minimal 8 karakter.";
    if (!passwordRules.hasLetter || !passwordRules.hasNumber)
      return "Password harus mengandung huruf dan angka.";
    if (!passwordRules.hasSpecial)
      return "Password harus mengandung karakter khusus (misal: !@#$%).";
    return "";
  };

  function handleChange(e) {
    let { name, value } = e.target;

    // Jika field yang diubah adalah "nis"
    if (name === "nis") {
      // Hapus semua karakter yang bukan angka
      value = value.replace(/[^0-9]/g, "");
    }

    setForm({ ...form, [name]: value });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      setKartu(null);
      setKartuPreview(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      showToast?.("error", "File harus berupa gambar (JPG atau PNG).");
      e.target.value = "";
      setKartu(null);
      setKartuPreview(null);
      return;
    }

    setKartu(file);
  }

  function handleClearFile(e) {
    e.stopPropagation();
    e.preventDefault();
    setKartu(null);
    setKartuPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function closePopup() {
    setPopupType(null);
    setKartuPreview(null);
    navigate("/home"); // ✅ balik ke home (pengunjung)
  }

  function handleUploadClick(e) {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.click();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validasi semua field terisi
    if (
      !form.nis.trim() ||
      !form.nama.trim() ||
      !form.kelas.trim() ||
      !form.password.trim() ||
      !kartu
    ) {
      showToast("error", "Data belum lengkap, silakan periksa lagi.");
      return;
    }

    const pwErr = getPasswordError();
    if (pwErr) {
      showToast?.("error", pwErr);
      return;
    }

    // Ambil data lama dari localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah NIS sudah terdaftar
    const exists = users.some((u) => u.nis === form.nis);

    if (exists) {
      showToast?.("error", "NIS sudah terdaftar!");
      return;
    }

    // Convert file ke Base64 agar bisa disimpan (logic temenmu: pakai FileReader langsung)
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result || null;

      const userData = {
        ...form,
        kartu: base64, // Base64 gambar
      };

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      // ✅ simpan preview untuk ditampilkan di popup
      setKartuPreview(base64);

      // Tampilkan popup pending (admin akan verifikasi)
      setPopupType("pending");
    };

    reader.onerror = () => {
      showToast("error", "Gagal membaca file kartu. Coba upload ulang.");
    };

    reader.readAsDataURL(kartu);
  }

  return (
    <div className="reg-container">
      {popupType && (
        <PopupStatus
          type={popupType}
          onClose={closePopup}
          kartuPreview={kartuPreview} // ✅ kirim base64 ke popup biar bisa nampilin kartu
        />
      )}

      <div className="reg-left">
        <button
          type="button"
          className="reg-back"
          onClick={() => navigate(-1)}
          aria-label="Kembali"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="reg-title">Daftar</h1>

        <form onSubmit={handleSubmit} className="reg-form">
          <label>NIS :</label>
          <input
            type="text"
            name="nis"
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]*"
            value={form.nis}
            onChange={handleChange}
            placeholder="1000000000"
          />

          <label>Nama :</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan Nama"
          />

          <label>Kelas :</label>
          <input
            type="text"
            name="kelas"
            value={form.kelas}
            onChange={handleChange}
            placeholder="Masukkan Kelas"
          />

          <label>Kartu Perpustakaan:</label>
          <div
            className={`upload-box ${kartu ? "disabled" : ""}`}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              className="hidden-file-input"
              onClick={(e) => e.stopPropagation()}
              onChange={handleFileChange}
            />

            {!kartu && (
              <div className="upload-placeholder">
                <Camera size={24} color="#e0b300" />
              </div>
            )}

            {kartu && (
              <>
                <div className="file-info">
                  <span className="file-name">{kartu.name}</span>
                </div>
                <button
                  type="button"
                  className="clear-file-btn"
                  onClick={handleClearFile}
                >
                  <X size={20} color="#c62828" />
                </button>
              </>
            )}
          </div>

          <label>Kata Sandi :</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan kata sandi"
            />

            <span
              className="toggle-pass"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
              aria-label={
                showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button className="reg-submit" type="submit">
            Daftar
          </button>
        </form>

        <div className="reg-links">
          <p className="as-guest" onClick={() => navigate("/home")}>
            Lanjut Sebagai Tamu
          </p>
          <p className="login-text">
            Sudah Punya Akun?{" "}
            <span onClick={() => navigate("/login")} className="login-link">
              Masuk Di Sini
            </span>
          </p>
        </div>
      </div>

      <img src={bookImg} alt="Books" className="book-image" />

      <div className="reg-right">
        <div className="vertical-text">WELCOME</div>
        <p className="brand-text">
          ASTROLITERA
          <br />
          DIGITAL LIBRARY
        </p>
      </div>
    </div>
  );
}

export default Register;