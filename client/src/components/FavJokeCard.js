import React from "react";

function FavJokeCard({ index, fav, onRemoveFavJoke }) {
    const { id, joke } = fav
    return (
      <div className="card border border-dark ms-5 me-5 mt-3 mb-3 text-start">
        <div
          className="card-header fw-bold"
          style={{ backgroundColor: "lightgreen" }}
        >
          # {index + 1}
        </div>
        <div className="card-body">
          <h6 className="card-title">{joke.setup}</h6>
          <h6 className="card-text fw-bold">{joke.punchline}</h6>
        </div>
        <div className="card-footer text-end">
          <span
            className="badge rounded-pill fs-6 text-dark"
            style={{ backgroundColor: "lightgreen" }}
          >
            😂 {joke.likes}
          </span>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-sm border border-2 rounded btn-secondary"
            onClick={(favId) => onRemoveFavJoke(id)}
          >
            Remove
          </button>
        </div>
      </div>
    );
}

export default FavJokeCard;