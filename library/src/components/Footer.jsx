import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">AstroLitera</div>
        <div className="footer-right">
          <a href="#">Tentang Kami</a>
          <a href="#">Kontak</a>
          <a href="#">Kebijakan</a>
        </div>
      </div>
      <p className="footer-copy">© AstroLitera 2025</p>
    </footer>
  );
}

export default Footer;
