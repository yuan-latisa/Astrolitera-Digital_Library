import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/HomePage";
import Tentang from "./pages/Tentang";
import Kontak from "./pages/Kontak";
import Kebijakan from "./pages/Kebijakan";
import Favorit from "./pages/Favorit";
import Pengaturan from "./pages/Pengaturan";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* halaman awal */}
        <Route path="/" element={<Home />} />

        {/* halaman auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* halaman utama */}
        <Route path="/home" element={<Home />} />

        {/* halaman dari footer */}
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/kebijakan" element={<Kebijakan />} />

        {/* halaman dari sidebar */}
        <Route path="/favorit" element={<Favorit />} />
        <Route path="/pengaturan" element={<Pengaturan />} />

        {/* fallback */}
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
