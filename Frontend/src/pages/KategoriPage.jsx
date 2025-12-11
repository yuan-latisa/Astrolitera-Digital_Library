import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import "./KategoriPage.css";
import { ArrowLeft, LayoutGrid, StretchHorizontal } from "lucide-react";
import cover1 from "../assets/cover1.jpg";
import cover2 from "../assets/examplecover.jpg";

export default function KategoriPage() {
  const { nama } = useParams();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid"); // grid / list

  const books = [
    {
      id: 1,
      cover: cover1,
      title: "Meow",
      author: "Sam Austen",
      rating: 5,
    },
    {
      id: 2,
      cover: cover2,
      title: "Pergi",
      author: "Tere Liye",
      rating: 4.5,
    },
    {
      id: 3,
      cover: cover2,
      title: "Pergi",
      author: "Tere Liye",
      rating: 4.5,
    },
    {
      id: 4,
      cover: cover2,
      title: "Pergi",
      author: "Tere Liye",
      rating: 4.5,
    },
  ];


  return (
    <div className="kategori-container">

      {/* HEADER */}
      <div className="kategori-header">

        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={28} strokeWidth={2.2} />
        </button>

        <h2 className="kategori-title">
          {nama.replace(/-/g, " ")}
        </h2>

        {/* VIEW TOGGLE */}
        <div className="view-buttons">
          <LayoutGrid
            size={26}
            className={`view-icon ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          />

          <StretchHorizontal
            size={26}
            className={`view-icon ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          />
        </div>

      </div>

      {/* KONTEN */}
      <div className={viewMode === "grid" ? "kategori-grid" : "kategori-list"}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            cover={book.cover}
            title={book.title}
            author={book.author}
            rating={book.rating}
            view={viewMode}
            genre={["Komik", "Fantasi"]}
            sinopsis="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore..."
          />

        ))}
      </div>

    </div>
  );
}
