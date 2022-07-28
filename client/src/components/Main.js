import React from 'react';
import Joke from './Joke.js';
// import Timer from './Timer.js';



function Main({ user, setUser }) {

    return (
        <div className='mt-5'>
            {/* <Timer count={count} setCount={setCount} setAnsMsg={setAnsMsg} setTogglePL={setTogglePL}/> */}
            <Joke user={user} setUser={setUser}/>
        </div>
    )
}


export default Main;