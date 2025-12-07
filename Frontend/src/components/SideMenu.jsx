import React from "react";
import "./SideMenu.css";
import { ArrowLeft, Home, Heart, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function SideMenu({ open, onClose }) {

    const navigate = useNavigate();

    return (
        <>
            {open && <div className="overlay" onClick={onClose}></div>}

            <div className={`side-menu ${open ? "open" : ""}`}>

                <div className="side-header">
                    <ArrowLeft className="back-btn" onClick={onClose} />

                    <p className="guest-text">Anda belum login</p>
                </div>

                <ul className="menu-items">
                    <li onClick={onClose}>
                        <Home size={20} />
                        <Link to="/home">Home</Link>
                    </li>

                    <li onClick={onClose}>
                        <Heart size={20} />
                        <Link to="/favorit">Favorit</Link>
                    </li>

                    <li onClick={onClose}>
                        <Settings size={20} />
                        <Link to="/pengaturan">Pengaturan</Link>
                    </li>
                </ul>

                <div className="bottom-area">
                    <button 
                        className="login-btn"
                        onClick={() => {
                            onClose();
                            navigate("/login");
                        }}>
                        Masuk
                    </button>
                </div>

            </div>
        </>
    );
}

export default SideMenu;
