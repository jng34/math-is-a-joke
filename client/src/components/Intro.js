import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import mathvid from "../media/mathvid.mp4";

function Intro() {
    const [toggleMain, setToggleMain] = useState(false);
    const history = useHistory();

    return (
      <div>
        <video autoPlay muted loop id="myVideo">
          <source src={mathvid} type="video/mp4" />
        </video>
        <div className="text-center" style={{margin: 'auto', position: 'center'}}>
          <h2 style={{ fontSize: "55px", cursor: "pointer" }}>Math is a J😂ke!</h2>
          <button type="button" className='btt btn-warning border border-2 fs-3' onClick={() => setToggleMain(true)}>Enter</button>
        </div>
      </div>
    );
}

export default Intro;