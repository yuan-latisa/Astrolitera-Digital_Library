import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/HomePage";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import Kebijakan from "./pages/Kebijakan";
import Favorit from "./pages/Favorit";
import Pengaturan from "./pages/Pengaturan";
import DetailBuku from "./pages/DetailBuku";
import KategoriPage from "./pages/KategoriPage";
import HalamanBaca from "./pages/HalamanBaca";
import SearchResult from "./pages/searchResult";
import Toast from "./components/Toast";
import { useState } from "react";

function App() {
  const [toast, setToast] = useState(null);

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 8000);
  }

  return (
    <BrowserRouter>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <Routes>

        {/* halaman awal */}
        <Route path="/" element={<Home />} />

        {/* halaman auth */}
        <Route path="/register" element={<Register showToast={showToast} />} />
        <Route path="/login" element={<Login showToast={showToast} />} />

        {/* halaman utama */}
        <Route path="/home" element={<Home />} />

        {/* halaman dari footer */}
        <Route path="/about" element={<Tentang />} />
        <Route path="/contact" element={<Kontak />} />
        <Route path="/privacypolicy" element={<Kebijakan />} />

        {/* halaman dari sidebar */}
        <Route path="/favorite" element={<Favorit />} />
        <Route path="/settings" element={<Pengaturan />} />

        <Route path="/search" element={<SearchResult />} />

        <Route path="/book/:title" element={<DetailBuku />} />
        <Route path="/kategori/:name" element={<KategoriPage />} />
        <Route path="/baca" element={<HalamanBaca />} />

        {/* fallback */}
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
