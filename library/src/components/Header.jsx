import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // ganti tab tanpa hapus input
    window.location.href = "/search";
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="profile-icon"></div>
        <h1 className="logo-text">AstroLitera</h1>
      </div>

      <div className="header-right">
        <form className="search-bar">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Cari Buku" />
        </form>

        <div className="menu-icon">
          <Menu size={28} />
        </div>
      </div>
    </header>
  );
};

export default Header;
