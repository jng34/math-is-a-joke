import React from 'react';
import Joke from './Joke.js'


function Main({ user }) {
    //border border-3 border-dark
    return (
        <div className='mt-5'>
            <Joke user={user}/>
        </div>
    )
}


export default Main;