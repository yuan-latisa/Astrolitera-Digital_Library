import React, { useState } from "react";
import "./DetailBuku.css";
import {
  ArrowLeft,
  Star,
  Bookmark,
  BookOpen,
  Info,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import cover2 from "../assets/cover2.png";

function DetailBuku() {
  const navigate = useNavigate();
  const { id } = useParams();

  const book = {
    title: "Hell Screen",
    author: "Ryūnosuke Akutagawa",
    cover: cover2,
    rating: 4.5,
    status: "Tersedia",
    genre: ["Novel", "Slice of Life", "Drama"],
    sinopsis:
      "Akutagawa's deceptively simple tale of Yoshihide, 'The Greatest Painter in Japan.' Hired by the Grand Lord to put the underworld on canvas, the single-minded painter fulfills his commission with startling results.",
    info: {
      bahasa: "Inggris",
      penerbit: "Gramedia",
      halaman: "350 halaman",
      tanggal: "2020",
      penulis: "Ryūnosuke Akutagawa",
      format: "Hardcover",
    },
  };

  const [tab, setTab] = useState("sinopsis");

  // === ULASAN UTAMA + BALASAN ===
  const [ulasanList, setUlasanList] = useState([
    {
      nama: "Anonim 1",
      rating: 4,
      komentar: "Cerita sangat menarik, penuh makna!",
      like: 16,
      liked: false,
      balasan: [
        { nama: "Anonim A", komentar: "Setuju banget!" },
        { nama: "Anonim B", komentar: "Keren asli bukunya." },
      ],
    },
    {
      nama: "Anonim 2",
      rating: 5,
      komentar: "Karya masterpiece. Wajib baca!",
      like: 28,
      liked: false,
      balasan: [],
    },
  ]);

  // === INPUT ULASAN BARU ===
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // === BALASAN ===
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");

  // ✔ Tambah ulasan utama baru
  const kirimUlasanBaru = () => {
    if (newComment.trim() === "" || newRating === 0) return;

    setUlasanList([
      {
        nama: "Pengguna",
        rating: newRating,
        komentar: newComment,
        like: 0,
        liked: false,
        balasan: [],
      },
      ...ulasanList,
    ]);

    setNewComment("");
    setNewRating(0);
  };

  // ✔ Tambah balasan pada komentar tertentu
  const kirimBalasan = (index) => {
    if (replyText.trim() === "") return;

    const updated = [...ulasanList];
    updated[index].balasan.push({
      nama: "Anonim",
      komentar: replyText,
    });

    setUlasanList(updated);
    setReplyText("");
  };

  // ✔ LIKE TOGGLE
  const handleLike = (index) => {
    const updated = [...ulasanList];
    const item = updated[index];

    if (item.liked) {
      item.like -= 1;
      item.liked = false;
    } else {
      item.like += 1;
      item.liked = true;
    }

    setUlasanList(updated);
  };

  return (
    <div className="detail-container">
      {/* BACK BUTTON */}
      <ArrowLeft className="back-btn" onClick={() => navigate(-1)} />

      {/* BAGIAN ATAS */}
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

      {/* TABS */}
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

      {/* BLUE CONTENT BOX */}
      <div className="content-box">
        {/* === SINOPSIS === */}
        {tab === "sinopsis" && <p className="sinopsis">{book.sinopsis}</p>}

        {/* === INFORMASI BUKU === */}
        {tab === "info" && (
          <div className="info-grid">
            <div><strong>Bahasa</strong><br />{book.info.bahasa}</div>
            <div><strong>Tanggal Rilis</strong><br />{book.info.tanggal}</div>
            <div><strong>Penerbit</strong><br />{book.info.penerbit}</div>
            <div><strong>Penulis</strong><br />{book.info.penulis}</div>
            <div><strong>Jumlah Halaman</strong><br />{book.info.halaman}</div>
            <div><strong>Format</strong><br />{book.info.format}</div>
          </div>
        )}

        {/* === ULASAN === */}
        {tab === "ulasan" && (
          <div className="ulasan-wrapper">

            {/* INPUT ULASAN BARU */}
            <div className="ulasan-input-box">
              <p className="label-ulasan">Berikan Ulasan Anda</p>

              <div className="rating-selector">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={26}
                    className="rating-star"
                    fill={newRating > i ? "#f5c518" : "none"}
                    color="#f5c518"
                    onClick={() => setNewRating(i + 1)}
                  />
                ))}
              </div>

              <textarea
                className="input-ulasan"
                placeholder="Tulis pendapatmu tentang buku ini…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />

              <button className="kirim-ulasan-btn" onClick={kirimUlasanBaru}>
                Kirim Ulasan
              </button>
            </div>

            {/* LIST ULASAN */}
            {ulasanList.map((u, index) => (
              <div key={index} className="ulasan-item">
                <div className="ulasan-header">
                  <div className="profile-circle" />

                  <div>
                    <p className="nama">{u.nama}</p>

                    <div className="rating-small">
                      {Array.from({ length: u.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#f5c518"
                          color="#f5c518"
                        />
                      ))}
                    </div>

                    <p className="komentar">{u.komentar}</p>

                    <div className="ulasan-actions">

                      {/* LIKE TOGGLE */}
                      <span className="like" onClick={() => handleLike(index)}>
                        <ThumbsUp
                          size={16}
                          color={u.liked ? "#ffffff" : "#cccccc"}
                          fill={u.liked ? "#ffffff" : "none"}
                        />
                        {u.like}
                      </span>

                      <span
                        className="balasan-toggle"
                        onClick={() =>
                          setReplyOpen(replyOpen === index ? null : index)
                        }
                      >
                        {u.balasan.length} Balasan
                      </span>
                    </div>
                  </div>
                </div>

                {/* BALASAN */}
                {replyOpen === index && (
                  <div className="balasan-list">
                    {u.balasan.map((b, i) => (
                      <div key={i} className="balasan-item">
                        <div className="profile-circle small" />
                        <div>
                          <p className="nama">{b.nama}</p>
                          <p className="komentar">{b.komentar}</p>
                        </div>
                      </div>
                    ))}

                    {/* INPUT BALAS */}
                    <div className="balasan-input">
                      <input
                        type="text"
                        placeholder="Ketikkan balasan di sini…"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button onClick={() => kirimBalasan(index)}>Kirim</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TOMBOL BACA HANYA UNTUK SINOPSIS + INFO */}
        {tab !== "ulasan" && (
          <button className="read-btn" onClick={() => navigate("/baca")}>
            Baca Sekarang
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailBuku;
