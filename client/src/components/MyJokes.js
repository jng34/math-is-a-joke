import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

function MyJokes({ user }) {
    const [toggleButtons, setToggleButtons] = useState(false);
    const [favJokesArr, setFavJokesArr] = useState([]);
    const [createdJokes, setCreatedJokes] = useState([]);
    
    // solution?
    useEffect(() => {
        fetch("/api/me").then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                setFavJokesArr(data.favorites)
                setCreatedJokes(data.jokes)
            })
        }});
    }, [])
    
    console.log(favJokesArr)
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
        <div key={uuid()} className="card border border-dark mt-3 mb-3 ms-5 me-5">
            <div className="card-header fs-5 fw-bold" style={{backgroundColor: 'lightblue'}}>
                # {index+1}
            </div>
            <div className="card-body">
                <h4 className="card-title fs-4"><b>Setup:</b> {joke.setup}</h4>
                <h5 className="card-text fs-4"><b>Punchline:</b> {joke.punchline}</h5>
                
            </div>
            <div className="card-footer text-end">
                <span className="badge rounded-pill text-bg-info fs-5">😂 {joke.likes}</span>
                &nbsp;&nbsp;
                <button type='button' className='btn border border-2 rounded btn-warning'>Edit</button>
                &nbsp;&nbsp;
                <button type='button' className='btn border border-2 rounded btn-danger' onClick={(id) => handleDeleteMyJoke(joke.id)}>Delete</button>
            </div>
        </div>
    )) : <></>
    
    //Maps user favorited jokes
    const userFavorites = user && user.username ? favJokesArr.map((fav, index) => (
        <div key={uuid()} className="card border border-dark mt-3 mb-3 ms-5 me-5">
            <div className="card-header fs-5 fw-bold" style={{backgroundColor: 'lightgreen'}}>
                # {index+1}
            </div>
            <div className="card-body">
                <h4 className="card-title fs-4"><b>Setup:</b> {fav.joke.setup}</h4>
                <h5 className="card-text fs-4"><b>Punchline:</b> {fav.joke.punchline}</h5>
                
            </div>
            <div className="card-footer text-end">
                <span className="badge rounded-pill text-bg-info fs-6">😂 {fav.joke.likes}</span>
                &nbsp;&nbsp;
                <button type='button' className='btn border border-2 rounded btn-secondary'
                onClick={(id) => handleRemoveFavJoke(fav.id)}>Remove</button>
            </div>
        </div>
    )) : <></>
    

    return (
        <div className='mt-4'>
            <p className='text-center fs-1'>My Jokes</p>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col text-start ms-5'>
                        {!toggleButtons ? 
                        <button type='button' className='btn btn-large btn-info fs-5 fw-light border border-2 disabled' aria-disabled="true">Show Created Jokes</button> 
                        : <button type='button' className='btn btn-large btn-info fs-5 fw-light border border-2' onClick={() => setToggleButtons(!toggleButtons)}>Show Created Jokes</button>}
                        &nbsp;&nbsp;
                        {!toggleButtons ? 
                        <button type='button' className='btn btn-large btn-success fs-5 fw-light border border-2 text-light' onClick={() => setToggleButtons(!toggleButtons)}>Show Favorites</button>
                        : <button type='button' className='btn btn-large btn-success fs-5 fw-light  border border-2 text-light disabled' aria-disabled="true">Show Favorites</button>}
                    </div>
                </div>
                {!toggleButtons ? <div className='col'>{userJokes}</div> : <div className='col'>{userFavorites}</div> }
            </div>
        </div>
    )
}


export default MyJokes;