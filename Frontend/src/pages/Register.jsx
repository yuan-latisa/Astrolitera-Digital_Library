import React, { useState, useRef } from "react";
import "./Register.css";
import { Camera, X, Eye, EyeOff, ArrowLeft } from "lucide-react";
import bookImg from "../assets/book.png";
import { useNavigate } from "react-router-dom";
import PopupStatus from "../components/PopupStatus";

function Register({ showToast }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nis: "",
    nama: "",
    kelas: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [kartu, setKartu] = useState(null);
  const fileInputRef = useRef(null);
  const [popupType, setPopupType] = useState(null);

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
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      showToast?.("error", "File harus berupa gambar (JPG atau PNG).");
      e.target.value = "";
      setKartu(null);
      return;
    }

    setKartu(file);
  }

  function handleClearFile(e) {
    e.stopPropagation();
    e.preventDefault();
    setKartu(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleUploadClick(e) {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.click();
  }

  function handleSubmit(e) {
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

    // Ambil data lama dari localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah NIS sudah terdaftar
    const exists = users.some((u) => u.nis === form.nis);

    if (exists) {
      showToast?.("error", "NIS sudah terdaftar!");
      return;
    }

    // Convert file ke Base64 agar bisa disimpan
    const reader = new FileReader();
    reader.onload = () => {
      const userData = {
        ...form,
        kartu: reader.result || null, // Base64 gambar
      };

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      // Tampilkan popup pending (admin akan verifikasi)
      setPopupType("error");
    };

    reader.readAsDataURL(kartu);
  }

  return (
    <div className="reg-container">
      {popupType && <PopupStatus type={popupType} />}

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
          pattern="[0-9]*" value={form.nis} 
          onChange={handleChange} 
          placeholder="1000000000" />

          <label>Nama :</label>
          <input 
          type="text" 
          name="nama" 
          value={form.nama} 
          onChange={handleChange} 
          placeholder="Masukkan Nama" />

          <label>Kelas :</label>
          <input 
          type="text" 
          name="kelas" 
          value={form.kelas} 
          onChange={handleChange} 
          placeholder="Masukkan Kelas"/>

          <label>Kartu Perpustakaan:</label>
          <div className={`upload-box ${kartu ? "disabled" : ""}`} onClick={handleUploadClick}>
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
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button className="reg-submit" type="submit">Daftar</button>
        </form>

        <div className="reg-links">
          <p className="as-guest" onClick={() => navigate("./HomePage.jsx")}>Lanjut Sebagai Tamu</p>
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
        <p className="brand-text">ASTROLITERA<br />DIGITAL LIBRARY</p>
      </div>

    </div>
  );
}
export default Register;
