import React, { useState } from 'react';
import Joke from './Joke.js';
import mathvid from '../media/mathvid.mp4';

function Main({ user, setUser, toggleHeader, setToggleHeader }) {
    const [toggleMain, setToggleMain] = useState(false);

    function handleTogglePage() {
       setToggleMain(true);
       setToggleHeader(true);
    }

    return (
      <div>
        {!toggleMain ? (
          <div>
            <video autoPlay muted loop id="myVideo">
              <source src={mathvid} type="video/mp4" />
            </video>
            <div id="center-header">
              <h2 style={{ fontSize: "90px", cursor: "pointer" }}>
                Math is a J😂ke!
              </h2>
            </div>
            <div id="button-header">
              <button
                type="button"
                className="btn btn-warning border border-2 fs-3 rounded"
                onClick={handleTogglePage}
              >
                Enter
              </button>
            </div>
          </div>
        ) : (
          <Joke user={user} setUser={setUser}/>
        )}
      </div>
    );
}


export default Main;