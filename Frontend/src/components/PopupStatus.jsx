import { Link } from "react-router-dom";
import "./PopupStatus.css";
import img1 from "../assets/success.png";
import img2 from "../assets/pending.png";
import img3 from "../assets/error.png";

const PopupStatus = ({ type }) => {
  const data = {
    success: {
      title: "PENDAFTARAN BERHASIL!",
      desc: "Akun kamu sudah diverifikasi oleh Admin. Silahkan masuk menggunakan akun yang sudah kamu daftarkan.",
      color: "blue",
      img: img1,
      btn: "Login Sekarang",
      link: "/login",
    },
    pending: {
      title: "PENDAFTARAN TERKIRIM",
      desc: "Akun kamu akan diverifikasi oleh Admin terlebih dahulu sebelum dapat digunakan. Silakan cek kembali setelah dikonfirmasi.",
      color: "indigo",
      img: img2,
      btn: "Mengerti",
      link: "/home",
    },
    error: {
      title: "PENDAFTARAN GAGAL",
      desc: "Beberapa data belum sesuai. Periksa kembali isian kamu dan coba lagi.",
      color: "red",
      img: img3,
      btn: "Perbaiki Data",
      link: "/register",
    },
  };
  
  const c = data[type];
  if (!c) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <img src={c.img} alt={type} className="popup-img" />

        <h3 className={`popup-title ${c.color}`}>
          {c.title}
        </h3>

        <p className="popup-desc">
          {c.desc}
        </p>

        <Link to={c.link} className={`popup-btn ${c.color}`}>
          {c.btn}
        </Link>

        {type === "error" && (
          <Link to={{ pathname: "/home" }} state={{ guest: true }} className="popup-guest">
            lanjut sebagai tamu
          </Link>
        )}
      </div>
    </div>
  );
};

export default PopupStatus;
