import React, { useState } from 'react';
import Joke from './Joke.js';
import { useHistory } from 'react-router-dom';
import mathvid from '../media/mathvid.mp4';

function Main({ user, setUser, toggleHeader, setToggleHeader }) {
    const [toggleMain, setToggleMain] = useState(false);
    const history = useHistory();

    function handleTogglePage() {
       setToggleMain(true);
       setToggleHeader(true);
    }

    return !user.username && !toggleMain ? (
      <div>
        <video autoPlay muted loop id="myVideo">
          <source src={mathvid} type="video/mp4" />
        </video>
        <div className="center-header">
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
      <div
        className="container"
        style={{ position: "sticky", paddingTop: "20px" }}
      >
        <div className="row align-items-center">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col text-end">
            <button
              className="btn btn-secondary rounded-pill border border-2 border-dark fs-5"
              onClick={() => history.push("/login")}
            >
              Log In
            </button>
            &nbsp;&nbsp;
            <button
              className="btn btn-primary rounded-pill border border-2 border-dark fs-5"
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <Joke user={user} setUser={setUser} />
      </div>
    );
}


export default Main;