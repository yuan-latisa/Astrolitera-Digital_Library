import React from "react";
import "./style.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tentang() {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {/* HEADER */}
      <header className="page-header">
        <ArrowLeft className="back-icon" onClick={() => navigate("/home")} />
        <h1>Tentang Kami</h1>
      </header>

      {/* CONTENT */}
      <div className="page-content">
        <p>
          AstroLitera Digital Library adalah platform perpustakaan digital yang
          dirancang untuk mempermudah siswa dan guru dalam mencari, membaca, dan
          meminjam buku secara online. Dengan tampilan yang modern dan fitur yang
          mudah digunakan, AstroLitera hadir untuk meningkatkan minat baca dan
          akses literasi di lingkungan sekolah.
        </p>
      </div>

    </div>
  );
}

export default Tentang;
