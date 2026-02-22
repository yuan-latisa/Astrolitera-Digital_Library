import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SearchResult.css";
import "./KategoriPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutGrid, StretchHorizontal, Search } from "lucide-react";
import BookCard from "../components/BookCard";
import { books, toCardBook } from "../data/Books";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResult() {
  const navigate = useNavigate();
  const query = useQuery();

  // ===== URL params sebagai source-of-truth (biar refresh/back konsisten seperti web umum) =====
  const urlQ = query.get("q") || "";
  const urlView = query.get("view") || "grid";
  const urlSort = query.get("sort") || "relevance";
  const urlJenis = query.get("jenis") || ""; // dummy filter

  // ===== State UI =====
  // searchInput = isi input (boleh beda sebentar dari URL ketika user sedang mengetik)
  const [searchInput, setSearchInput] = useState(urlQ);
  const [viewMode, setViewMode] = useState(urlView === "list" ? "list" : "grid");
  const [sortMode, setSortMode] = useState(urlSort);

  // filter dummy (nanti kamu ganti)
  const [filterOpen, setFilterOpen] = useState(false);
  const [jenisBuku, setJenisBuku] = useState(urlJenis);

  // Keep input in sync kalau URL berubah (back/forward/refresh)
  useEffect(() => {
    setSearchInput(urlQ);
  }, [urlQ]);

  // Keep UI state in sync kalau URL berubah
  useEffect(() => {
    setViewMode(urlView === "list" ? "list" : "grid");
  }, [urlView]);
  useEffect(() => {
    setSortMode(urlSort);
  }, [urlSort]);
  useEffect(() => {
    setJenisBuku(urlJenis);
  }, [urlJenis]);

  const normalizedQuery = (searchInput || "").trim().toLowerCase();

  const results = useMemo(() => {
    const base = books
      .map(toCardBook)
      .filter((b) => {
        if (!normalizedQuery) return true;
        const t = (b.title || "").toLowerCase();
        const a = (b.author || "").toLowerCase();
        return t.includes(normalizedQuery) || a.includes(normalizedQuery);
      });

    // Dummy filter: Jenis Buku
    // Mapping sementara (nanti kamu ganti sesuai kebutuhan):
    // - Pelajaran -> category "Pendidikan"
    // - Novel -> category "novel"
    // - Kamus -> title mengandung "kamus" atau category "kamus"
    const afterFilter = base.filter((b) => {
      if (!jenisBuku) return true;
      const cat = String(b.category || "").toLowerCase();
      const title = String(b.title || "").toLowerCase();
      if (jenisBuku === "Pelajaran") return cat === "pendidikan";
      if (jenisBuku === "Novel") return cat === "novel";
      if (jenisBuku === "Kamus") return cat === "kamus" || title.includes("kamus");
      return true;
    });

    if (sortMode === "rating_desc") {
      return [...afterFilter].sort((x, y) => Number(y.rating || 0) - Number(x.rating || 0));
    }
    if (sortMode === "az") {
      return [...afterFilter].sort((x, y) => String(x.title || "").localeCompare(String(y.title || "")));
    }
    if (sortMode === "za") {
      return [...afterFilter].sort((x, y) => String(y.title || "").localeCompare(String(x.title || "")));
    }

    // relevance: keep original order (acts like "default")
    return afterFilter;
  }, [normalizedQuery, sortMode, jenisBuku]);

  // ===== URL sync (debounced) =====
  // Tujuan:
  // - Kalau user hapus input, lalu refresh, input tidak balik ke yang lama.
  // - Kalau user klik filter/urutkan, URL ikut update (bisa share).
  const debounceRef = useRef(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      const q = (searchInput || "").trim();
      if (q) params.set("q", q);
      if (viewMode && viewMode !== "grid") params.set("view", viewMode);
      if (sortMode && sortMode !== "relevance") params.set("sort", sortMode);
      if (jenisBuku) params.set("jenis", jenisBuku);

      const qs = params.toString();
      navigate(qs ? `/search?${qs}` : "/search", { replace: true });
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, viewMode, sortMode, jenisBuku, navigate]);


  // ===== Filter accordion state (dropdown) =====
  const [openFilterSection, setOpenFilterSection] = useState("jenis");
  const toggleFilterSection = (key) => {
    setOpenFilterSection((prev) => (prev === key ? null : key));
  };

  const handleBack = () => {
    // Back ke Home tanpa membawa state search biar input Home tidak nyangkut.
    navigate("/home");
  };

  return (
    <div className="search-page">
      <div className="search-topbar">
        <div className="search-topbar-row">
          <button className="search-back" onClick={handleBack} aria-label="Kembali">
            <ArrowLeft size={26} />
          </button>

          <div className="search-title">Hasil Pencarian</div>

          <div className="search-input-wrap">
            <Search size={18} />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ketik judul buku yang kamu cari"
            />
          </div>
        </div>
      </div>

      {/* Controls dipisah dari header (sesuai desain) */}
      <div className="search-controls">
        <div className="search-view-buttons">
          <button
            type="button"
            className={`search-view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            type="button"
            className={`search-view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="List"
          >
            <StretchHorizontal size={18} />
          </button>
        </div>

        <div className="search-sort">
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
            <option value="relevance">Urutkan</option>
            <option value="rating_desc">Rating tertinggi</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>

          <button className="search-filter-btn" onClick={() => setFilterOpen((v) => !v)}>
            Filter
          </button>
        </div>
      </div>

      <div className="search-body">
        {/* Filter panel (dummy, nanti kamu ganti) */}
        {filterOpen && (
          <aside className="search-filter-panel">
            {/* Jenis Buku */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-header"
                onClick={() => toggleFilterSection("jenis")}
              >
                <span>Jenis Buku</span>
                <span className={`filter-chevron ${openFilterSection === "jenis" ? "open" : ""}`}>▾</span>
              </button>

              {openFilterSection === "jenis" && (
                <div className="filter-body">
                  {[
                    { label: "Pelajaran" },
                    { label: "Novel" },
                    { label: "Kamus" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      className={`filter-chip ${jenisBuku === opt.label ? "active" : ""}`}
                      onClick={() => {
                        // Klik = langsung apply (seperti yang kamu minta)
                        setJenisBuku((prev) => (prev === opt.label ? "" : opt.label));
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dummy sections (nanti kamu ganti) */}
            <div className="filter-group">
              <button
                type="button"
                className="filter-header"
                onClick={() => toggleFilterSection("genre")}
              >
                <span>Genre</span>
                <span className={`filter-chevron ${openFilterSection === "genre" ? "open" : ""}`}>▾</span>
              </button>
              {openFilterSection === "genre" && (
                <div className="filter-body">
                  <div className="filter-placeholder">(dummy)</div>
                </div>
              )}
            </div>

            <div className="filter-group">
              <button
                type="button"
                className="filter-header"
                onClick={() => toggleFilterSection("penulis")}
              >
                <span>Penulis</span>
                <span className={`filter-chevron ${openFilterSection === "penulis" ? "open" : ""}`}>▾</span>
              </button>
              {openFilterSection === "penulis" && (
                <div className="filter-body">
                  <div className="filter-placeholder">(dummy)</div>
                </div>
              )}
            </div>

            <div className="filter-group">
              <button
                type="button"
                className="filter-header"
                onClick={() => toggleFilterSection("tahun")}
              >
                <span>Tahun Terbit</span>
                <span className={`filter-chevron ${openFilterSection === "tahun" ? "open" : ""}`}>▾</span>
              </button>
              {openFilterSection === "tahun" && (
                <div className="filter-body">
                  <div className="filter-placeholder">(dummy)</div>
                </div>
              )}
            </div>
          </aside>
        )}

        <div className="search-content">
          {results.length === 0 ? (
            <div className="search-empty">
              Tidak ada hasil untuk <b>{(searchInput || "").trim()}</b>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "kategori-grid" : "kategori-list"}>
              {results.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  cover={book.cover}
                  title={book.title}
                  author={book.author}
                  rating={book.rating}
                  genre={book.genre}
                  synopsis={book.synopsis}
                  view={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
