import React, { useState, useEffect } from 'react';
import jokes from '../jokes.json';


function Joke() {
    //might need to set joke state
    const [problem, setProblem] = useState("");
    const [answer, setAnswer] = useState(0);
    const [toggleAnswer, setToggleAnswer] = useState(false);

    //Generates random joke
    const randomNum = Math.floor(Math.random() * jokes.jokes.length + 1);
    const randomJokeObj = jokes.jokes[randomNum];
    const jokeSetUp = randomJokeObj.setup;
    const jokePunchLine = randomJokeObj.punchline;
    
    //Generate math problem - basic operations
    const num1 = Math.floor(Math.random()*100 + 1)
    const num2 = Math.floor(Math.random()*100 + 1)
    

    function createDivisors(n) {
        let divisors = [];
        for (let i=1; i<=num1; i++) {
            if (num1 % i === 0) {
                divisors.push(i);
            }
        }
        return divisors;
    }

    function generateMathProb() {
        const operations = ['+', '-', '*', '/'];  
        let index = Math.floor(Math.random()*3 + 1);
        let mathOper = operations[index];
        if (mathOper === '/') {
            const divisors = createDivisors(num1);
            let divIndex = Math.floor(Math.random() * divisors.length);
            let divProb = `${num1} ÷ ${divisors[divIndex]}`;
            setProblem(divProb);
            setAnswer(num1 / divisors[divIndex]);
        } else if (mathOper === '*') { 
            let multiplier = Math.floor(Math.random()*num1 + 1);
            let multProb = `${num1} × ${multiplier}`;
            setProblem(multProb);
            setAnswer(num1 * multiplier);
        } else {
            let randomProb = num1 + mathOper + num2;
            setProblem(randomProb);
            setAnswer(eval(randomProb));
        }
    }

    useEffect(() => generateMathProb(), [])

    //create logic to adjust timer for problem difficulty
    //Easy - 1min, Medium = 30s, Hard = 15s
    
    return (
        <div className="container text-center">
            <div className='row'>
                <br/><br/>
                <h3>{jokeSetUp}</h3> 
            </div>
            <div className='row align-items-center' style={{width: '700px', height: '400px', border: 'dashed', margin: 'auto'}}>
                <h1>{problem}</h1>
                {/* set toggle state to reveal answer upon answering */}
                <h1>{answer}</h1>
            </div>
            <div className='row'>
                <h3>Punchline: {jokePunchLine}</h3>  
            </div>
        </div>
        
    )
}


export default Joke;