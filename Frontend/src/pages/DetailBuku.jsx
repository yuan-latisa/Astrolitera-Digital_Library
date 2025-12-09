import React, { useState } from "react";
import "./DetailBuku.css";
import { ArrowLeft, Star, Bookmark } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import examplecover from "../assets/examplecover.jpg";

function DetailBuku() {
  const navigate = useNavigate();
  const { id } = useParams();

  const book = {
    title: "Pergi",
    author: "Tere Liye",
    cover: examplecover,
    rating: 4.5,
    status: "Tersedia",
    genre: ["Novel", "Slice of Life", "Drama"],
    sinopsis:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
    info: {
      bahasa: "Indonesia",
      penerbit: "Gramedia",
      halaman: "350 Halaman",
      tanggal: "2020",
      penulis: "Tere Liye",
      format: "Hardcover",
    },
  };

  const [tab, setTab] = useState("sinopsis");

  return (
    <div className="detail-container">

      <div className="detail-header">
        <ArrowLeft className="back-btn" onClick={() => navigate(-1)} />
      </div>

      <div className="detail-top">

        <img src={book.cover} alt={book.title} className="detail-cover" />

        <div className="detail-info">
          <h2>{book.title}</h2>
          <p className="detail-author">{book.author}</p>

          <div className="detail-rating">
            <Star size={16} fill="#f5c518" color="#f5c518" />
            <span>{book.rating}/5</span>
          </div>

          <span className="status">{book.status}</span>

          <div className="genre-row">
            {book.genre.map((g, i) => (
              <span key={i} className="genre">{g}</span>
            ))}
          </div>

          <Bookmark size={28} className="bookmark-btn" />
        </div>

      </div>

      <div className="tabs">
        <button className={tab === "sinopsis" ? "active" : ""} onClick={() => setTab("sinopsis")}>Sinopsis</button>
        <button className={tab === "info" ? "active" : ""} onClick={() => setTab("info")}>Informasi Buku</button>
        <button className={tab === "ulasan" ? "active" : ""} onClick={() => setTab("ulasan")}>Ulasan</button>
      </div>

      <div className="content-box">

        {tab === "sinopsis" && (
          <p className="sinopsis">{book.sinopsis}</p>
        )}

        {tab === "info" && (
          <div className="info-grid">
            <div><strong>Bahasa</strong><br />{book.info.bahasa}</div>
            <div><strong>Tanggal Rilis</strong><br />{book.info.tanggal}</div>
            <div><strong>Penerbit</strong><br />{book.info.penerbit}</div>
            <div><strong>Penulis</strong><br />{book.info.penulis}</div>
            <div><strong>Halaman</strong><br />{book.info.halaman}</div>
            <div><strong>Format</strong><br />{book.info.format}</div>
          </div>
        )}

        {tab === "ulasan" && (
          <p className="sinopsis">Belum ada ulasan...</p>
        )}

        <button className="read-btn">Baca Sekarang</button>
      </div>

    </div>
  );
}

export default DetailBuku;
