import React from "react";

function FavJokeCard({ index, fav, onRemoveFavJoke }) {
    const { id, joke } = fav
    return (
        <div className="card border border-dark mt-3 mb-3 ms-5 me-5">
            <div className="card-header fs-5 fw-bold" style={{backgroundColor: 'lightgreen'}}>
                # {index+1}
            </div>
            <div className="card-body">
                <h4 className="card-title fs-4">{joke.setup}</h4>
                <h5 className="card-text fs-4 fw-bold">{joke.punchline}</h5>
                
            </div>
            <div className="card-footer text-end">
                <span className="badge rounded-pill text-bg-info fs-6">😂 {joke.likes}</span>
                &nbsp;&nbsp;
                <button type='button' className='btn border border-2 rounded btn-secondary'
                onClick={(favId) => onRemoveFavJoke(id)}>Remove</button>
            </div>
        </div>
    )
}

export default FavJokeCard;