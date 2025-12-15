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
    let { name, value } = e.target;

  // Jika field yang diubah adalah "nis"
  if (name === "nis") {
    // Hapus semua karakter yang bukan angka
    value = value.replace(/[^0-9]/g, "");
  }
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Ambil data user dari localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah user cocok
    const found = users.find(
      (u) =>
        u.nis === form.nis &&
        u.nama.toLowerCase() === form.nama.toLowerCase() &&
        u.password === form.password
    );

    if (!found) {
      alert("NIS, Nama, atau Password salah!");
      return;
    }

    alert("Berhasil Masuk!");
    navigate("/home");
  }

  return (
    <div className="reg-container">

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
            maxLength={10} inputMode="numeric" 
            pattern="[0-9]*" placeholder="1000000000"
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

      <img src={bookImg} alt="Books" className="book-image" />

      <div className="reg-right">
        <div className="vertical-text">WELCOME</div>
        <p className="brand-text">ASTROLITERA<br />DIGITAL LIBRARY</p>
      </div>

    </div>
  );
}

export default Login;
