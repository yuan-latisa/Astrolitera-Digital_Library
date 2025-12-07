import React from "react";
import "./style.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Kontak() {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {/* HEADER */}
      <header className="page-header">
        <ArrowLeft className="back-icon" onClick={() => navigate("/home")} />
        <h1>Kontak</h1>
      </header>

      {/* CONTENT */}
      <div className="page-content">
        <p>Email: astrolitera.support@gmail.com</p>
        <p>WhatsApp: 08xx-xxxx-xxxx</p>
        <p>Alamat: SMKN 1 Cibinong, Bogor</p>
      </div>

    </div>
  );
}

export default Kontak;
