import React, { useMemo } from "react";
import "./SideMenu.css";
import {
  ArrowLeft,
  Home,
  Bookmark,
  Clock,
  Settings,
  UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * SideMenu
 * - Menampilkan drawer dari kiri.
 * - Mode:
 *   1) Logged-in (ada sessionUser di localStorage) -> tampilan "Anonim" + NIS + tombol Keluar
 *   2) Guest (tidak ada sessionUser) -> "Pengunjung" + akses terbatas + tombol Daftar
 *
 * NOTE: NIS, nama, foto profil nantinya bisa diambil dari halaman Pengaturan.
 */
function SideMenu({ open, onClose }) {
  const navigate = useNavigate();

  const sessionUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("sessionUser") || "null");
    } catch {
      return null;
    }
  }, [open]);

  const isLoggedIn = !!sessionUser;

  const profileName = isLoggedIn ? sessionUser?.nama || "Anonim" : "Pengunjung";
  const profileSub = isLoggedIn ? sessionUser?.nis || "" : "Akses terbatas";
  const profileImg = isLoggedIn ? sessionUser?.fotoProfil || sessionUser?.kartu || null : null;

  const go = (path) => {
    onClose?.();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionUser");
    onClose?.();
    navigate("/home");
  };

  return (
    <>
      {open && <div className="side-overlay" onClick={onClose} />}

      <aside className={`side-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        {/* Header: back */}
        <div className="side-top">
          <button type="button" className="side-back" onClick={onClose} aria-label="Kembali">
            <ArrowLeft size={22} />
            <span>Kembali</span>
          </button>
        </div>

        {/* Profile block */}
        <div className="side-profile">
          <div className="side-avatar">
            {profileImg ? (
              <img src={profileImg} alt="Profile" />
            ) : (
              <UserCircle2 size={54} />
            )}
          </div>

          <div className="side-user">
            <div className="side-name">{profileName}</div>
            <div className="side-sub">{profileSub}</div>
          </div>
        </div>

        <div className="side-divider" />

        {/* Menu */}
        <nav className="side-nav">
          <button type="button" className="side-item" onClick={() => go("/home")}>
            <Home size={18} />
            <span>Home</span>
          </button>

          <button type="button" className="side-item" onClick={() => go("/favorite")}>
            <Bookmark size={18} />
            <span>Favorit</span>
          </button>

          <button type="button" className="side-item" onClick={() => go("/aktivitas")}>
            <Clock size={18} />
            <span>Aktivitas</span>
          </button>

          <button type="button" className="side-item" onClick={() => go("/settings")}>
            <Settings size={18} />
            <span>Pengaturan</span>
          </button>
        </nav>

        {/* Bottom action */}
        <div className="side-bottom">
          {isLoggedIn ? (
            <button type="button" className="side-primary" onClick={handleLogout}>
              Keluar
            </button>
          ) : (
            <button type="button" className="side-primary" onClick={() => go("/register")}>
              Daftar
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
