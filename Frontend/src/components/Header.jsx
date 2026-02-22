import { Search, Menu, ArrowLeft } from "lucide-react";
import logoImg from "../assets/logo.png";

function Header({
  showSearch = true,
  showMenu = true,
  showBack = false,
  onBack,
  onMenuClick
}) {
  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <ArrowLeft
            size={28}
            style={{ cursor: "pointer" }}
            onClick={onBack}
          />
        )}

        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>

        <span className="brand-name">AstroLitera</span>
      </div>

      <div className="header-right">
        {showSearch && (
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search books..." />
          </div>
        )}

        {showMenu && (
          <Menu
            size={30}
            className="menu-icon"
            onClick={onMenuClick}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    </header>
  );
}

export default Header;