import React from 'react';
import Joke from './Joke.js'


function Main({ user, setUser }) {
    //border border-3 border-dark
    return (
        <div className='mt-5'>
            <Joke user={user} setUser={setUser}/>
        </div>
    )
}


export default Main;