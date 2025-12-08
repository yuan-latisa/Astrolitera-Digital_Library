import React, { useState } from "react";
import "./HomePage.css";
import { Search, Menu } from "lucide-react";
import bannerImg from "../assets/book.png";
import logoImg from "../assets/book.png";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import BookRow from "../components/BookRow";
import examplecover from "../assets/examplecover.jpg";
import cover1 from "../assets/cover1.jpg";

// DUMMY BUKU
const dummyBooks = [
  { cover: cover1, title: "MEOW", author: "Sam Austen", rating: 4.0 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },
  { cover: examplecover, title: "Pergi", author: "Tere Liye", rating: 4.5 },

];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page-wrapper">

      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <img src={logoImg} alt="Logo" />
          </div>
          <span className="brand-name">AstroLitera</span>
        </div>

        <div className="header-right">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Cari Buku..." />
          </div>

          <Menu
            size={30}
            className="menu-icon"
            onClick={() => setMenuOpen(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </header>

      {/* SIDE MENU */}
      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        profileImg={logoImg}
        isLoggedIn={false}
      />

      <div className="home-container">

        {/* BANNER */}
        <div className="banner">
          <img src={bannerImg} alt="Banner Perpustakaan" />
        </div>

        <BookRow title="Rekomendasi" books={dummyBooks} />
        <BookRow title="Buku Populer" books={dummyBooks} />
        <BookRow title="Buku Terlaris" books={dummyBooks} />
        <BookRow title="Buku Novel" books={dummyBooks} />

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-logo">
              <img src={logoImg} alt="Footer Logo" />
            </div>

            <ul className="footer-menu">
              <li><Link to="/tentang">Tentang Kami</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
              <li><Link to="/kebijakan">Kebijakan</Link></li>
            </ul>
          </div>

          <p className="footer-copy">© AstroLitera 2025</p>
        </footer>

      </div>
    </div>
  );
}

export default HomePage;
