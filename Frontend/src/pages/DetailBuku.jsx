import React, { useState, useEffect } from "react";
import "./DetailBuku.css";
import {
  ArrowLeft,
  Star,
  Bookmark,
  BookOpen,
  Info,
  MessageSquare,
  ThumbsUp,
  Trash2,
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
    status: "Tidak Tersedia",
    genre: ["Fiksi Horror", "Cerita Pendek", "Klasik Jepang"],
    sinopsis:
      "Akutagawa's deceptively simple tale of Yoshihide, 'The Greatest Painter in Japan.'' Hired by the Grand Lord to put the underworld on canvas, the single-minded painter fulfills his commission with startling, yet understated results.",
    info: {
      bahasa: "Inggris",
      penerbit: "Disruptive Publishing, Inc",
      halaman: "52 halaman",
      tanggal: "2010",
      penulis: "Ryūnosuke Akutagawa",
      format: "Pdf",
    },
  };

  const [tab, setTab] = useState("sinopsis");

  // ================================
  // 🟦 LOCAL STORAGE MANAGEMENT
  // ================================
  const storageKey = "ulasan-" + book.title.replace(/\s+/g, "-").toLowerCase();

  const loadUlasan = () => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  };

  const saveUlasan = (data) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const defaultUlasan = [
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
  ];

  // ⬅ PENTING! LOAD DATA SEKALI DI useState (BIAR TIDAK KE-RESET)
  const [ulasanList, setUlasanList] = useState(() => {
    const saved = loadUlasan();
    return saved || defaultUlasan;
  });

  // SAVE KE LOCAL STORAGE SETIAP ADA PERUBAHAN
  useEffect(() => {
    saveUlasan(ulasanList);
  }, [ulasanList]);

  // ================================
  // 🟦 INPUT ULASAN PENGGUNA
  // ================================
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const kirimUlasanBaru = () => {
    if (newRating === 0 || newComment.trim() === "") return;

    const newUlasan = {
      nama: "Pengguna",
      rating: newRating,
      komentar: newComment,
      like: 0,
      liked: false,
      balasan: [],
    };

    setUlasanList([newUlasan, ...ulasanList]);
    setNewRating(0);
    setNewComment("");
  };

  // ================================
  // 🟦 BALASAN
  // ================================
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");

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

  // ================================
  // 🟦 LIKE TOGGLE
  // ================================
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

  // ================================
  // 🟦 HAPUS ULASAN PENGGUNA
  // ================================
  const deleteUlasan = (index) => {
    const updated = ulasanList.filter((_, i) => i !== index);
    setUlasanList(updated);
  };

  // ================================
  // 🟦 RENDER
  // ================================
  return (
    <div className="detail-container">
      <ArrowLeft className="back-btn" onClick={() => navigate(-1)} />

      {/* BAGIAN ATAS */}
      <div className="detail-top">
        <img src={book.cover} className="detail-cover" />

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
              <span key={i} className="genre">{g}</span>
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
          <BookOpen size={18} /> Sinopsis
        </button>

        <button
          className={`tab-btn ${tab === "info" ? "active" : ""}`}
          onClick={() => setTab("info")}
        >
          <Info size={18} /> Informasi
        </button>

        <button
          className={`tab-btn ${tab === "ulasan" ? "active" : ""}`}
          onClick={() => setTab("ulasan")}
        >
          <MessageSquare size={18} /> Ulasan
        </button>
      </div>

      {/* CONTENT BOX */}
      <div className="content-box">

        {/* ======================= */}
        {/* SINOPSIS */}
        {/* ======================= */}
        {tab === "sinopsis" && (
          <p className="sinopsis">{book.sinopsis}</p>
        )}

        {/* ======================= */}
        {/* INFO */}
        {/* ======================= */}
        {tab === "info" && (
          <div className="info-grid">
            <div><strong>Bahasa:</strong><br />{book.info.bahasa}</div>
            <div><strong>Tanggal Rilis:</strong><br />{book.info.tanggal}</div>
            <div><strong>Penerbit:</strong><br />{book.info.penerbit}</div>
            <div><strong>Penulis:</strong><br />{book.info.penulis}</div>
            <div><strong>Jumlah Halaman:</strong><br />{book.info.halaman}</div>
            <div><strong>Format:</strong><br />{book.info.format}</div>
          </div>
        )}

        {/* ======================= */}
        {/* ULASAN */}
        {/* ======================= */}
        {tab === "ulasan" && (
          <div className="ulasan-wrapper">

            {/* FORM INPUT ULASAN */}
            <div className="ulasan-input-box">
              <p className="label-ulasan">Berikan Ulasan Anda</p>

              <div className="rating-selector">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={26}
                    fill={newRating > i ? "#f5c518" : "none"}
                    color="#f5c518"
                    className="rating-star"
                    onClick={() => setNewRating(i + 1)}
                  />
                ))}
              </div>

              <textarea
                className="input-ulasan"
                value={newComment}
                placeholder="Tulis pendapatmu…"
                onChange={(e) => setNewComment(e.target.value)}
              />

              <button className="kirim-ulasan-btn" onClick={kirimUlasanBaru}>
                Kirim Ulasan
              </button>
            </div>

            {/* LIST ULASAN */}
            {ulasanList.map((u, index) => (
              <div key={index} className="ulasan-item">

                {/* HEADER */}
                <div className="ulasan-header">
                  <div className="profile-circle" />

                  <div>
                    <p className="nama">{u.nama}</p>

                    <div className="rating-small">
                      {Array.from({ length: u.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="#f5c518" color="#f5c518" />
                      ))}
                    </div>

                    <p className="komentar">{u.komentar}</p>

                    <div className="ulasan-actions">

                      {/* LIKE */}
                      <span className="like" onClick={() => handleLike(index)}>
                        <ThumbsUp
                          size={16}
                          fill={u.liked ? "#ffffff" : "none"}
                          color={u.liked ? "#ffffff" : "#cccccc"}
                        />
                        {u.like}
                      </span>

                      {/* BALAS */}
                      <span
                        className="balasan-toggle"
                        onClick={() =>
                          setReplyOpen(replyOpen === index ? null : index)
                        }
                      >
                        {u.balasan.length} Balasan
                      </span>

                      {/* DELETE */}
                      {u.nama === "Pengguna" && (
                        <span className="hapus-btn" onClick={() => deleteUlasan(index)}>
                          <Trash2 size={16} color="#ff4444" />
                        </span>
                      )}
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

                    <div className="balasan-input">
                      <input
                        type="text"
                        placeholder="Ketik balasan…"
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

        {/* BACA SEKARANG (hilang di tab ulasan) */}
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
