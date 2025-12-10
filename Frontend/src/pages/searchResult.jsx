import React, { useState, useEffect } from "react";
import { Search, Bookmark, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./searchResult.css";
import cover2 from "../assets/cover2.png";
import examplecover from "../assets/examplecover.jpg";

/* ============================
   DATA DUMMY
   ============================ */
const books = [
  {
    id: 1,
    cover: cover2,
    title: "Hell Screen",
    author: "Ryūnosuke Akutagawa",
    rating: 4.2,
    genre: ["Fiksi Horror", "Klasik Jepang"],
  },
  {
    id: 2,
    cover: examplecover,
    title: "Pergi",
    author: "Tere Liye",
    rating: 4.5,
    genre: ["Novel", "Drama"],
  },
  ...Array(12).fill({
    id: Math.random(),
    cover: examplecover,
    title: "Pergi",
    author: "Tere Liye",
    rating: 4.5,
    genre: ["Novel"],
  }),
];

function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query") || "";

  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = books.filter((b) => {
      const q = query.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.some((g) => g.toLowerCase().includes(q))
      );
    });
    setResults(filtered);
  }, [query]);

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="search-page">

      {/* HEADER */}
      <header className="search-header">
        <span className="back-btn" onClick={() => navigate(-1)}>
          ← Kembali
        </span>

        <div className="search-input-box">
          <Search size={18} />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchEnter}
            placeholder="Ketik judul atau penulis..."
          />
        </div>
      </header>

      {/* RESULT GRID */}
      <div className="results-container">
        {results.map((b) => (
          <div key={b.id} className="book-card-result">
            <img src={b.cover} alt={b.title} />

            <h3>{b.title}</h3>
            <p className="author">By {b.author}</p>

            <div className="rating-row">
              <Star size={14} fill="#ffc727" color="#ffc727" />
              <span>{b.rating}</span>
              <Bookmark size={20} className="bookmark-icon" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SearchResult;
