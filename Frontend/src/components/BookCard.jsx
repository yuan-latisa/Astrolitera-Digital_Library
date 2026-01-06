import React from "react";
import "./BookCard.css";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookCard({ id, cover, title, author, rating, view, genre, sinopsis }) {
    const navigate = useNavigate();

    return (
        <div
            className={`book-card ${view === "list" ? "list-mode" : "grid"}`}
            onClick={() => navigate(`/book/${title.toLowerCase().replace(/ /g, "-")}`)}
        >
            {/* COVER */}
            <img src={cover} alt={title} className="book-cover" />

            {/* CONTENT AREA */}
            <div className="book-info">

                {/* JUDUL + AUTHOR */}
                <h3 className="book-title">{title}</h3>
                <p className="book-author">By {author}</p>

                {/* GENRE TAGS (OPSIONAL) */}
                {view === "list" && genre && (
                    <div className="genre-tags">
                        {genre.map((g, i) => (
                            <span className="genre-tag" key={i}>
                                {g}
                            </span>
                        ))}
                    </div>
                )}

                {/* RATING */}
                <div className="rating-box list-rating">
                    <Star size={15} fill="#f5c518" color="#f5c518" />
                    <span>{rating}/5</span>
                </div>

                {/* SINOPSIS (KHUSUS LIST MODE) */}
                {view === "list" && sinopsis && (
                    <p className="sinopsis">{sinopsis.slice(0, 140)}...</p>
                )}

            </div>
        </div>
    );
}

export default BookCard;
