import React from 'react';
import Joke from './Joke.js';
import mathvid from '../media/mathvid.mp4'


function Main({ user, setUser }) {

    return (
        <div id="chalkboard" >
            {/* <video autoPlay muted loop id="myVideo">
            <source src={mathvid} type="video/mp4" />
            </video> */}
            <div id="joke-board">
                <Joke user={user} setUser={setUser}/>
            </div>
        </div>
    )
}


export default Main;