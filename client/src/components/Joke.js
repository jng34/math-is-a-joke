import { useState, useEffect } from 'react';


function Joke() {
    const [joke, setJoke] = useState({});
    const [problem, setProblem] = useState("");
    const [answer, setAnswer] = useState("");
    const [inputAns, setInputAns] = useState('');
    const [ansMsg, setAnsMsg] = useState(null);
    const [togglePL, setTogglePL] = useState(false);

    //Generate math problem - basic operations
    const num1 = Math.floor(Math.random()*50 + 1)
    const num2 = Math.floor(Math.random()*50 + 1)
    

    //Create array of divisors for division with integer quotients
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
            let multiplier = Math.floor(Math.random()*(num1/2) + 1);
            let multProb = `${num1} × ${multiplier}`;
            setProblem(multProb);
            setAnswer(num1 * multiplier);
        } else {
            let randomProb = `${num1} ${mathOper} ${num2}`;
            setProblem(randomProb);
            setAnswer(eval(randomProb));
        }
    }

    useEffect(() => {
        generateMathProb();
        fetch("/api/jokes")
        .then(res => res.json())
        .then((allJokes) => {
            //sets random joke
            const randomNum = Math.floor(Math.random() * allJokes.length);
            const randomJokeObj = allJokes[randomNum];
            setJoke(randomJokeObj)
        })
    }, [])

    //Reloads page from server
    function refreshPage() {
        window.parent.location = window.parent.location.href; 
    }


    function handleSubmitAns(e) {
        e.preventDefault();
        setAnsMsg('fire')
        if (inputAns === answer) {
            setTogglePL(!togglePL)
            setInputAns("")
        } else {
            setInputAns("")
        }
    }

    //create logic to adjust timer for problem difficulty
    //Easy - 1min, Medium = 30s, Hard = 15s
    
    return (
        <div className="container text-center">
            <div className='row'>
                <br/><br/>
                <h2>{joke.setup}</h2> 
            </div>
            {/* make this div a chalkboard */}
            <div className='row mt-2 mb-2 align-items-center' style={{width: '600px', height: '300px', border: 'double', margin: 'auto'}}>
                {/* make problem responsive CSS */}
                {/* <p style={{fontSize: "75px"}}>{problem} =</p> */}
                {/* set toggle state to reveal answer upon answering */}
                {/* <h4>hello</h4> */}

                {ansMsg ? 
                    (togglePL ? 
                    <div>
                        <label htmlFor="answer" style={{fontSize: "75px"}}>{problem} =</label>
                        <h4 style={{color: 'green'}}>Correct!</h4><br/>
                        <button className='button bg-success' onClick={() => refreshPage()}>Next Joke</button>
                    </div>
                    : 
                    <div>
                        <label htmlFor="answer" style={{fontSize: "75px"}}>{problem} =</label>
                        <h4 style={{color: 'red'}}>Incorrect.</h4><br/>
                        <h4>Correct Answer: {answer}</h4><br/>
                        <button className='button bg-danger' onClick={() => refreshPage()}>Next Joke</button>
                    </div>)
                : 
                <form onSubmit={handleSubmitAns}>
                    <label htmlFor="ansewr" style={{fontSize: "20px"}}>Solve:</label><br/>
                    <label htmlFor="answer" style={{fontSize: "75px"}}>{problem} =</label><br/>
                    <input style={{width: '75px'}} type="number" name="answer" value={inputAns} onChange={(e) => setInputAns(e.target.value)}/>&nbsp;
                    <button type="submit" className='button bg-warning'>Submit</button>
                </form>}
            </div>
            <div className='row'>
                <h3>Punchline: {togglePL ? <b>{joke.punchline}</b> : '???'}</h3>  
            </div>
        </div>
        
    )
}


export default Joke;