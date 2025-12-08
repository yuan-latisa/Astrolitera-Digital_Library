import React from "react";
import "./BookCard.css";
import { Star, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookCard({ id, cover, title, author, rating }) {
    const navigate = useNavigate();

    return (
        <div className="book-card" onClick={() => navigate(`/book/${id}`)}>

            <img src={cover} alt={title} className="book-cover" />
            <div className="top-bar">
                <div className="rating-box">
                    <Star size={14} color="#f5c518" fill="#f5c518" />
                    <span>{rating}/5</span>
                </div>

                <Bookmark
                    size={20}
                    className="bookmark-icon"
                    onClick={(e) => { e.stopPropagation(); }}
                />
            </div>
            <h3 className="book-title">{title}</h3>
            <p className="book-author">By {author}</p>

        </div>
    );
}

export default BookCard;
