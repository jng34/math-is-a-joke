import React, { useState, useEffect } from 'react';
import jokes from '../jokes.json';


function Joke() {

    const randomNum = Math.floor(Math.random() * jokes.jokes.length + 1);
    const randomJokeObj = jokes.jokes[randomNum];
    const jokeSetUp = randomJokeObj.setup;
    const jokePunchLine = randomJokeObj.punchline;


    return (
        <div className="text-center">
            <div>
                <h2>Random Joke</h2>
                <br/>
                <h3>{jokeSetUp}</h3> 
            </div>
            <div style={{width: '700px', height: '400px', border: 'dashed', margin: 'auto'}}>
                <p>Math problem here</p>
            </div>
            <div>
                //write logic to reveal answer if problem is answered correctly
                <h3>Answer: {jokePunchLine}</h3>  
            </div>
        </div>
        
    )
}


export default Joke;