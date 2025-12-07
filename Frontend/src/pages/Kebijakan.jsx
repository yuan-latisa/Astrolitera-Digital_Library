import React from "react";
import "./style.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Kebijakan() {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {/* HEADER */}
      <header className="page-header">
        <ArrowLeft className="back-icon" onClick={() => navigate("/home")} />
        <h1>Kebijakan</h1>
      </header>

      {/* CONTENT */}
      <div className="page-content">
        <p>
          Pengguna platform AstroLitera diharapkan dapat mematuhi aturan yang
          berlaku, menjaga etika penggunaan, serta memanfaatkan layanan ini
          dengan bijak. Buku-buku digital yang tersedia hanya boleh digunakan
          untuk keperluan belajar dan tidak boleh disebarkan tanpa izin.
        </p>
      </div>

    </div>
  );
}

export default Kebijakan;
