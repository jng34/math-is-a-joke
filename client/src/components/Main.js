import React, { useState } from 'react';
import Joke from './Joke.js';
// import Timer from './Timer.js';



function Main({ user, setUser }) {
    // const [count, setCount] = useState(10);
    // const [ansMsg, setAnsMsg] = useState(null);
    // const [togglePL, setTogglePL] = useState(false);
    
    // function randomDif() {
    //     const difficulty=  [15,30,45]
    //     let i = Math.floor(Math.random()*3)
    //     setCount(difficulty[i])
    // }

    // pass in joke  randomDif={randomDif} ansMsg={ansMsg} setAnsMsg={setAnsMsg} togglePL={togglePL} setTogglePL={setTogglePL}

    return (
        <div className='mt-5'>
            {/* <Timer count={count} setCount={setCount} setAnsMsg={setAnsMsg} setTogglePL={setTogglePL}/> */}
            <Joke user={user} setUser={setUser}/>
        </div>
    )
}


export default Main;