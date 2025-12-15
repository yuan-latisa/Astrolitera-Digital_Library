import React, { useRef, useState, useEffect } from "react";
import BookCard from "./BookCard";
import "./BookRow.css";
import { useNavigate } from "react-router-dom";

function BookRow({ title, books }) {
    const rowRef = useRef(null);
    const navigate = useNavigate();

    const [showMore, setShowMore] = useState(false);
    const [rowHasScroll, setRowHasScroll] = useState(false);

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;
        setRowHasScroll(el.scrollWidth > el.clientWidth);
    }, [books]);

    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDown.current = true;
        startX.current = e.pageX - rowRef.current.offsetLeft;
        scrollLeft.current = rowRef.current.scrollLeft;
    };

    const handleMouseUp = () => {
        isDown.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - rowRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        rowRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleScroll = () => {
        const el = rowRef.current;
        const atRight =
            Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 2;

        setShowMore(atRight);
    };

    const goToCategory = () => {
        const formatted = title.toLowerCase().replace(/ /g, "-");
        navigate(`/kategori/${formatted}`);
    };

    return (
        <div className="book-row-container">

            <div className="row-header">
                <h2>{title}</h2>
            </div>

            <div
                className="book-row"
                ref={rowRef}
                onScroll={handleScroll}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {books.map((book, index) => (
                    <BookCard
                        key={index}
                        cover={book.cover}
                        title={book.title}
                        author={book.author}
                        rating={book.rating}
                    />
                ))}

                {rowHasScroll && (
                    <p
                        className={`lihat-semua-scroll ${showMore ? "visible" : ""}`}
                        onClick={goToCategory}
                    >
                        Lihat Semua →
                    </p>
                )}
            </div>

        </div>
    );
}

export default BookRow;
