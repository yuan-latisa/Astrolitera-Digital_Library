import React, { useState } from "react";
import "./ForgotPass1.css";
import lupaImg from "../assets/forgot.png";

export default function ForgotPass1({ onClose }) {

  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) =>
        u.nama.toLowerCase() === nama.toLowerCase() &&
        u.nis === nis
    );

    if (!found) {
      alert("Akun tidak ditemukan!");
      return;
    }

    alert(`Akun ditemukan!\nPassword kamu: ${found.password}`);
    onClose();
  }

  return (
    <div className="forgot-overlay">
      <div className="forgot-modal">

        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="forgot-img">
          <img src={lupaImg} alt="Forgot" />
        </div>

        <h2>Masukkan Nama dan NIS</h2>
        <p className="forgot-desc">
          Masukkan nama dan NIS yang terdaftar untuk menemukan akunmu.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Nama</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama kamu"
          />

          <label>NIS</label>
          <input
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            placeholder="NIS kamu"
          />

          <button type="submit" className="forgot-btn">
            Cari Akun
          </button>
        </form>

        <p className="forgot-back" onClick={onClose}>
          Kembali
        </p>

      </div>
    </div>
  );
}
