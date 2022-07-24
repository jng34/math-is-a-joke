import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import CreateJoke from './CreateJoke';


function Joke({ user, setUser }) {
    const [joke, setJoke] = useState({});
    const [likes, setLikes] = useState(joke.likes);
    const [problem, setProblem] = useState("");
    const [answer, setAnswer] = useState("");
    const [inputAns, setInputAns] = useState('');
    const [ansMsg, setAnsMsg] = useState(null);
    const [togglePL, setTogglePL] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const history = useHistory();

    //Generate math problem - basic operations
    const num1 = Math.floor(Math.random()*100 + 1)
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
            //Division - whole integer quotients
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
        } else if (mathOper === '-') { 
            //Subtraction - no negative answers
            if (num1 > num2) {
                let subtraction1 = `${num1} ${mathOper} ${num2}`;
                setProblem(subtraction1);
                setAnswer(eval(subtraction1));
            } else if (num2 > num1) {
                let subtraction2 = `${num2} ${mathOper} ${num1}`;
                setProblem(subtraction2);
                setAnswer(eval(subtraction2));
            }
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

    function handleUpdateScore(score) {
        fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score })
        })
        .then(r => r.json())
        .then(update => {
            console.log(update)
            setUser(update)
        })
    }
    
    function handleSubmitAns(e) {
        e.preventDefault();
        setAnsMsg('fire')
        if (inputAns == answer) {
            setTogglePL(!togglePL)
            setInputAns("")
            if (user.username) {
                setCorrectCount(correctCount+1);
                handleUpdateScore(correctCount+1);
            }
        } else {
            setInputAns("")
        }
    }
    console.log(answer)

    function handleUpdateLikes() {
        setLikes(likes+1)
        fetch(`/api/jokes/${joke.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ likes: likes }),
        })
        .then(r => r.json())
        .then(update => console.log(update))
    }


    //Reloads page from server
    function refreshPage() {
        window.parent.location = window.parent.location.href; 
    }

    function handleNextClick() {
        user.username ? refreshPage() : history.push("/login")
    }

    function handleCreateJoke() {
        history.push("/createjoke")
    }

    //create logic to adjust timer for problem difficulty
    //Easy - 45s, Medium = 30s, Hard = 15s
    //🤣😒😂
    
    return (
        <div className='align-self-center mt-5'>
            <div className="container text-center">
                <div className='row'>
                    <br/><br/>
                    <h2>{joke.setup}</h2> 
                </div>
                {/* make this div a chalkboard */}
                <div className='row mt-2 mb-2 align-items-center' style={{width: '600px', height: '300px', border: 'double', margin: 'auto'}}>
                    {/* make problem responsive CSS */}
                    {/* <p style={{fontSize: "75px"}}>{problem} =</p> */}

                    {ansMsg ? 
                        (togglePL ? 
                        <div className='col'>
                            <label htmlFor="answer" style={{fontSize: "75px"}}>{problem} =</label>
                            <h4 style={{color: 'green'}}>Correct!</h4><br/>
                            <button type='button' className='border border-2 border-dark rounded' onClick={handleUpdateLikes}>Funny 😂</button>&nbsp;&nbsp;
                            <button type='button' className='border border-2 border-dark rounded' onClick={() => refreshPage()}>Not Funny 😒</button><br/><br/>
                            {user.username && correctCount % 5 == 0 ? 
                            <button className='button bg-primary' onClick={handleCreateJoke}>Create Joke</button>
                            : <></>}&nbsp;
                            <button className='button bg-success text-light' onClick={handleNextClick}>Next Joke</button>
                        </div>
                        : 
                        <div>
                            <label htmlFor="answer" style={{fontSize: "75px"}}>{problem} =</label>
                            <h4 style={{color: 'red'}}>Incorrect.</h4><br/>
                            <h4>Correct Answer: {answer}</h4><br/>
                            <button className='button bg-danger text-light' onClick={handleNextClick}>Next Joke</button>
                        </div>)
                    : 
                    <form onSubmit={handleSubmitAns}>
                        <label htmlFor="answer" style={{fontSize: "20px"}}>Solve:</label><br/>
                        <label htmlFor="answer" style={{fontSize: "75px"}}>{problem} =</label><br/>
                        <input style={{width: '75px'}} type="number" name="answer" value={inputAns} onChange={(e) => setInputAns(e.target.value)}/>&nbsp;
                        <button type="submit" className='button bg-warning'>Submit</button>
                    </form>}
                </div>
                <div className='row'>
                    <h3>Punchline: {togglePL ? <b>{joke.punchline}</b> : '???'}</h3>  
                </div>
            </div>
        </div>
        
    )
}


export default Joke;