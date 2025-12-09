import React, { useState } from "react";
import "./DetailBuku.css";
import { ArrowLeft, Star, Bookmark, BookOpen, Info, MessageSquare, } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import examplecover from "../assets/cover1.jpg";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    info: {
      bahasa: "Indonesia",
      penerbit: "Gramedia",
      halaman: "350 halaman",
      tanggal: "2020",
      penulis: "Tere Liye",
      format: "Hardcover",
    },
  };

  const [tab, setTab] = useState("sinopsis");

  return (
    <div className="detail-container">
      <ArrowLeft className="back-btn" onClick={() => navigate(-1)} />
      <div className="detail-top">
        <img src={book.cover} className="detail-cover" alt={book.title} />
        <div className="detail-info">
          <h2>{book.title}</h2>
          <p className="detail-author">{book.author}</p>

          <div className="detail-rating">
            <Star size={18} fill="#f5c518" color="#f5c518" />
            <span>{book.rating}/5</span>
          </div>

          <span className="status">{book.status}</span>

          <div className="genre-row">
            {book.genre.map((g, i) => (
              <span className="genre" key={i}>
                {g}
              </span>
            ))}
          </div>

          <Bookmark size={32} className="bookmark-btn" />
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${tab === "sinopsis" ? "active" : ""}`}
          onClick={() => setTab("sinopsis")}
        >
          <BookOpen size={18} />
          <span>Sinopsis</span>
        </button>

        <button
          className={`tab-btn ${tab === "info" ? "active" : ""}`}
          onClick={() => setTab("info")}
        >
          <Info size={18} />
          <span>Informasi Buku</span>
        </button>

        <button
          className={`tab-btn ${tab === "ulasan" ? "active" : ""}`}
          onClick={() => setTab("ulasan")}
        >
          <MessageSquare size={18} />
          <span>Ulasan</span>
        </button>
      </div>

      <div className="content-box">
        {tab === "sinopsis" && (
          <p className="sinopsis">{book.sinopsis}</p>
        )}

        {tab === "info" && (
          <div className="info-grid">
            <div>
              <strong>Bahasa</strong>
              <br />
              {book.info.bahasa}
            </div>
            <div>
              <strong>Tanggal Rilis</strong>
              <br />
              {book.info.tanggal}
            </div>
            <div>
              <strong>Penerbit</strong>
              <br />
              {book.info.penerbit}
            </div>
            <div>
              <strong>Penulis</strong>
              <br />
              {book.info.penulis}
            </div>
            <div>
              <strong>Jumlah Halaman</strong>
              <br />
              {book.info.halaman}
            </div>
            <div>
              <strong>Format</strong>
              <br />
              {book.info.format}
            </div>
          </div>
        )}

        {tab === "ulasan" && (
          <p className="sinopsis">Belum ada ulasan…</p>
        )}

        <button className="read-btn" onClick={() => navigate("/baca")}> Baca Sekarang </button>
      </div>
    </div>
  );
}

export default DetailBuku;
