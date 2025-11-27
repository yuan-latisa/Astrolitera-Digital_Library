import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* halaman awal */}
        <Route path="/" element={<Register />} />

        {/* halaman lain */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Fallback untuk semua URL yang tidak ada */}
        <Route path="*" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
