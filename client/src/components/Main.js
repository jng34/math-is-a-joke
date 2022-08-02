import React from 'react';
import Joke from './Joke.js';


function Main({ user, setUser }) {

    return (
        <div className='mt-5'>
            <Joke user={user} setUser={setUser}/>
        </div>
    )
}


export default Main;