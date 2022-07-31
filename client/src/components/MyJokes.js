import React, { useState, useEffect } from 'react';
import CreatedJokeCard from './CreatedJokeCard';
import FavJokeCard from './FavJokeCard';
import uuid from 'react-uuid';

function MyJokes({ user }) {
    const [toggleButtons, setToggleButtons] = useState(false);
    const [favJokesArr, setFavJokesArr] = useState([]);
    const [createdJokes, setCreatedJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // solution?
    useEffect(() => {
        fetch("/api/me").then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                setFavJokesArr(data.favorites)
                setCreatedJokes(data.jokes)
            })
        }});
    }, [isLoading])

    
    function handleDeleteMyJoke(id) {
        fetch(`/api/jokes/${id}`, { method: "DELETE" })
        .then(r => console.log(r))
        const updatedCreatedJokes = createdJokes.filter((joke) => joke.id !== id);
        setCreatedJokes(updatedCreatedJokes);
    }

    function handleRemoveFavJoke(id) {
        fetch(`/api/favorites/${id}`, { method: "DELETE" })
        const updatedFavJokes = favJokesArr.filter((fav) => fav.id !== id);
        setFavJokesArr(updatedFavJokes);
    }
    //Maps user created jokes
    const userJokes = user && user.username ? createdJokes.map((joke, index) => (
        <CreatedJokeCard key={uuid()} index={index} joke={joke} isLoading={isLoading} setIsLoading={setIsLoading} onDeleteMyJoke={handleDeleteMyJoke}/>
    )) : <></>
    
    //Maps user favorited jokes
    const userFavorites = user && user.username ? favJokesArr.map((fav, index) => (
        <FavJokeCard key={uuid()} index={index} fav={fav} onRemoveFavJoke={handleRemoveFavJoke}/>
    )) : <></>
    

    return (
        <div className='text-center mt-4'>
            <p className='fs-1'>My Jokes</p>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col text-start ms-5'>
                        {!toggleButtons ? 
                        <button type='button' className='btn btn-large btn-info fs-5 fw-light border border-2 disabled' aria-disabled="true">Show Created Jokes</button> 
                        : 
                        <button type='button' className='btn btn-large btn-info fs-5 fw-light border border-2' onClick={() => setToggleButtons(!toggleButtons)}>Show Created Jokes</button>}

                        &nbsp;&nbsp;

                        {!toggleButtons ? 
                        <button type='button' className='btn btn-large btn-success fs-5 fw-light border border-2 text-light' onClick={() => setToggleButtons(!toggleButtons)}>Show Favorites</button>
                        : 
                        <button type='button' className='btn btn-large btn-success fs-5 fw-light  border border-2 text-light disabled' aria-disabled="true">Show Favorites</button>}
                    </div>
                </div>
                {!toggleButtons ? <div className='col'>{userJokes}</div> : <div className='col'>{userFavorites}</div> }
            </div>
        </div>
    )
}


export default MyJokes;