import React from "react";
import "./BookCard.css";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookCard({
  id,
  cover,
  title,
  author,
  rating,
  view,
  genre,
  synopsis,
  disableClick = false,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disableClick) return;
    navigate(`/book/${id}`);
  };

  return (
    <div
      className={`book-card ${view === "list" ? "list-mode" : "grid"}`}
      onClick={handleClick}
      style={{ cursor: disableClick ? "default" : "pointer" }}
    >
      <img src={cover} alt={title} className="book-cover" />

      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">By {author}</p>

        {view === "list" && genre && (
          <div className="genre-tags">
            {genre.map((g, i) => (
              <span className="genre-tag" key={i}>
                {g}
              </span>
            ))}
          </div>
        )}

        <div className="rating-box list-rating">
          <Star size={15} fill="#f5c518" color="#f5c518" />
          <span>{rating}/5</span>
        </div>
        </div>

        {view === "list" && synopsis && (
          <p className="sinopsis">{synopsis}</p>
        )}
    </div>
  );
}

export default BookCard;