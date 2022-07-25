import React, { useState } from 'react';
import uuid from 'react-uuid';


function MyJokes({ user }) {
    const [toggleButtons, setToggleButtons] = useState(false);

    //Maps user created jokes
    const userJokes = user && user.username ? user.jokes.map((joke) => (
        <div key={uuid()} className="row mx-auto mb-3 border border-2 border-dark">
            <p className='fs-5 fw-bold mt-2 mb-2'>{joke.setup}</p>
            <p className='fs-5'>&nbsp;&nbsp;&nbsp;→ {joke.punchline}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )) : null
    
    //Maps user favorited jokes
    const userFavorites = user && user.username ? user.favorites.map((fav) => (
        <div key={uuid()} className="row mx-auto mb-3 border border-2 border-dark">
            <p className='fs-5 fw-bold mt-2 mb-2'>{fav.joke.setup}</p>
            <p className='fs-5'>&nbsp;&nbsp;&nbsp;→ {fav.joke.punchline}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )) : null
    

    return (
        <div className='mt-4'>
            <p className='text-center fs-1'>My Jokes</p>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col'>
                        {!toggleButtons ? 
                        <button type='button' className='btn btn-large btn-success fs-5 border border-2 disabled' aria-disabled="true">Show Created Jokes</button> 
                        : <button type='button' className='btn btn-large btn-success fs-5 border border-2' onClick={() => setToggleButtons(!toggleButtons)}>Show Created Jokes</button>}
                        &nbsp;&nbsp;
                        {!toggleButtons ? 
                        <button type='button' className='btn btn-large btn-info fs-5 border border-2' onClick={() => setToggleButtons(!toggleButtons)}>Show Favorites</button>
                        : <button type='button' className='btn btn-large btn-info fs-5 border border-2 disabled' aria-disabled="true">Show Favorites</button>}
                    </div>
                    <div className='col'></div>
                </div>
                {!toggleButtons ? <div className='col'>{userJokes}</div> : <div className='col'>{userFavorites}</div> }
            </div>
        </div>
    )
}


export default MyJokes;