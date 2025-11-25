import React, { useState, useRef } from "react";
import "./Register.css";
import { Camera, X } from "lucide-react";
import bookImg from "../assets/book.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nis: "",
    nama: "",
    kelas: "",
    password: "",
  });

  const [kartu, setKartu] = useState(null);
  const fileInputRef = useRef(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setKartu(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("File harus berupa gambar (JPG atau PNG)");
      e.target.value = "";
      setKartu(null);
      return;
    }

    setKartu(file);
  }

  function handleClearFile(e) {
    e.stopPropagation();
    setKartu(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleUploadClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nis", form.nis);
    formData.append("nama", form.nama);
    formData.append("kelas", form.kelas);
    formData.append("password", form.password);
    if (kartu) {
      formData.append("kartu", kartu);
    }

    // handle POST /register
    fetch("http://localhost:5000/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        alert("Pendaftaran berhasil!");
        navigate("/login");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="reg-container">
      <div className="reg-left">
        <div className="reg-back" onClick={() => navigate(-1)}>
          ←
        </div>

        <h1 className="reg-title">Daftar</h1>

        <form onSubmit={handleSubmit} className="reg-form">
          <label>NIS :</label>
          <input
            type="text"
            name="nis"
            value={form.nis}
            onChange={handleChange}
          />

          <label>Nama :</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
          />

          <label>Kelas :</label>
          <input
            type="text"
            name="kelas"
            value={form.kelas}
            onChange={handleChange}
          />

          <label>Kartu Perpustakaan:</label>
          <div className="upload-box" onClick={handleUploadClick}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              className="hidden-file-input"
              onChange={handleFileChange}
            />

            {!kartu && (
              <div className="upload-placeholder">
                <Camera size={22} color="#e0b300" />
              </div>
            )}

            {kartu && (
              <div className="file-info">
                <span className="file-name">{kartu.name}</span>
                <button
                  type="button"
                  className="clear-file-btn"
                  onClick={handleClearFile}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <label>Kata Sandi :</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

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

      <div className="reg-right">
        <div className="vertical-text">WELCOME</div>
        <img src={bookImg} alt="Books" className="book-image" />
        <p className="brand-text">ASTROLITERA DIGITAL LIBRARY</p>
      </div>
    </div>
  );
}

export default Register;
