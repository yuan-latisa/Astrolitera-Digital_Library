import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import Hell_Screen from "../assets/Hell_Screen.pdf";
import "../components/BookReader.css";

GlobalWorkerOptions.workerSrc = pdfWorker;
function BookReader() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const loadPDF = async () => {
      const pdf = await getDocument({ url: Hell_Screen }).promise; // FIX
      const page = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
    };

    loadPDF();
  }, [pageNumber]);

  const openFullscreen = () => {
    const elem = containerRef.current;
    if (elem.requestFullscreen) elem.requestFullscreen();
  };

  return (
    <div className="book-reader-container">
      <button
        onClick={openFullscreen}
        class="book-reader-fullscreen"
      >
        ⛶ Fullscreen Halaman
      </button>

      <div ref={containerRef}>
        <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button onClick={() => setPageNumber((page) => page - 1)} disabled={pageNumber <= 1}>
          ◀ Prev
        </button>

        <span style={{ margin: "0 10px" }}>Halaman {pageNumber}</span>

        <button onClick={() => setPageNumber((page) => page + 1)}>
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default BookReader;
