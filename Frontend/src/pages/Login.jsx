import React, { useState } from "react";
import "./Login.css";
import { Eye, EyeOff } from "lucide-react";
import bookImg from "../assets/book.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    nis: "",
    nama: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Berhasil Masuk!");
          navigate("./HomePage.jsx");
        } else {
          alert(data.message || "Login gagal");
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="reg-container">

      {/* BAGIAN KIRI */}
      <div className="reg-left">
        <div className="reg-back" onClick={() => navigate(-1)}>←</div>

        <h1 className="reg-title">Masuk</h1>

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

          <label>Kata Sandi :</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="toggle-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <p className="forgot-pass">Lupa Kata Sandi Anda?</p>

          <button className="reg-submit" type="submit">
            Masuk
          </button>
        </form>

        {/* LINK BAWAH */}
        <div className="reg-links">
          <p className="as-guest" onClick={() => navigate("/home")}>
            Lanjut Sebagai Tamu
          </p>

          <p className="login-text">
            Belum Punya Akun?{" "}
            <span onClick={() => navigate("/register")} className="login-link">
              Daftar Di Sini
            </span>
          </p>
        </div>
      </div>

      {/* GAMBAR BUKU */}
      <img src={bookImg} alt="Books" className="book-image" />

      {/* PANEL KANAN */}
      <div className="reg-right">
        <div className="vertical-text">WELCOME</div>
        <p className="brand-text">ASTROLITERA<br />DIGITAL LIBRARY</p>
      </div>

    </div>
  );
}

export default Login;
