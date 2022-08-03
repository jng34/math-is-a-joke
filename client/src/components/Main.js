import React from 'react';
import Joke from './Joke.js';
import mathvid from '../media/mathvid.mp4'


function Main({ user, setUser }) {

    return (
      <div
        id="chalkboard"
        className="container mt-2 border border-2 borders-danger"
      >
        {/* <video autoPlay muted loop id="myVideo">
            <source src={mathvid} type="video/mp4" />
            </video> */}
        <div id="joke-board" className="col border border-2 border-primary">
          <Joke user={user} setUser={setUser} />
        </div>
        <p id="emoji-bottom">😂</p>
      </div>
    );
}


export default Main;