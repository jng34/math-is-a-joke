import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Timer from './Timer';


function Joke({ user, setUser }) {
    const [joke, setJoke] = useState({});
    const [likesCount, setLikesCount] = useState();
    const [problem, setProblem] = useState("");
    const [answer, setAnswer] = useState("");
    const [inputAns, setInputAns] = useState('');
    const [ansMsg, setAnsMsg] = useState(null);
    const [togglePL, setTogglePL] = useState(false);
    const [level, setLevel] = useState(20);
    const [count, setCount] = useState(20);
    const [toggleFetch, setToggleFetch] = useState(false);
    const [toggleMathProb, setToggleMathProb] = useState(false);
    const [toggleLikeFav, setToggleLikeFav] = useState(false);
    const [showPointSys, setShowPointSys] = useState(false);
    const history = useHistory();

    //create logic to adjust timer for problem difficulty
    //Easy - 20s, Medium = 15s, Hard = 10s
    function diffLevel() {
        const difficulty= [10,15,20];
        let i = Math.floor(Math.random()*3);
        setLevel(difficulty[i]);
        setCount(difficulty[i]);
    }

    //Generate numbers for math problem
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

    //Generate math problem - basic operations
    function generateMathProb() {
        const operations = ['+', '-', '*', '/'];  
        let index = Math.floor(Math.random()*4);
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
                setAnswer(num1 - num2);
            } else if (num2 > num1) {
                let subtraction2 = `${num2} ${mathOper} ${num1}`;
                setProblem(subtraction2);
                setAnswer(num2 - num1);
            }
        } else {
            let randomProb = `${num1} ${mathOper} ${num2}`;
            setProblem(randomProb);
            setAnswer(num1 + num2);
        }
    }

    useEffect(() => {
        generateMathProb();
        fetch("/api/jokes")
        .then(res => res.json())
        .then((allJokes) => {
            //sets random joke
            const randomNum = Math.floor(Math.random()*allJokes.length);
            const randomJokeObj = allJokes[randomNum];
            setJoke(randomJokeObj)  
            setLikesCount(randomJokeObj.likes)
        });
        setTogglePL(false);

    }, [toggleFetch])
    

    function handleUpdateScore(score, numSolved) {
        fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                score: score,
                problems_solved: numSolved
            })
        })
        .then((r) => r.json())
        .then((update) => {
            console.log(update);
            setUser(update);
        });
    }

    
    function handleSubmitAns(e) {
        e.preventDefault();
        setAnsMsg('activated')
        if (inputAns == answer) {
            setTogglePL(true);
            if (user && user.username) {
                if (level == 20) {
                    handleUpdateScore(user.score+1, user.problems_solved+1);
                } else if (level == 15) {
                    handleUpdateScore(user.score+2, user.problems_solved+1);
                } else {
                    handleUpdateScore(user.score+3, user.problems_solved+1);
                }
            }
        } else {
            setTogglePL(false);
            if (level == 20) {
                handleUpdateScore(user.score-1);
            } else if (level == 15) {
                handleUpdateScore(user.score-2);
            } else {
                handleUpdateScore(user.score-2);
            }
        }
    }


    function handleLikeAndFavorite() {
        setToggleLikeFav(true)
        setLikesCount(likesCount + 1)
        fetch(`/api/jokes/${joke.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ likes: likesCount + 1 }),
        })
        .then(r => r.json())
        .then((update) => {
            console.log(update)
        });   
        //create favorite
        fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ 
                user_id: user.id,
                joke_id: joke.id 
            }),
        })
    }
    
    function handleNextClick() {
        if (user.username) {
            setInputAns("");
            setToggleLikeFav(false);
            setToggleFetch(!toggleFetch);
            setToggleMathProb(!toggleMathProb);
            setAnsMsg(null);
            diffLevel()
        } else {
            history.push("/login")
        }
    }


    return (
        <div className='align-self-center mt-5'>
            <div className="container text-center">
                <div className='row'>
                    <br/><br/>
                </div>
                {/* make this div a chalkboard */}
                <div className='row mt-2 mb-2 align-items-center' style={{width: '750px', height: '500px', border: 'double', margin: 'auto'}}>
                 
                    { !toggleMathProb ? 
                        <div>
                            <h1>{joke.setup}</h1><br/><br/>
                            <button type='button' className='border rounded-pill btn btn-lg btn-warning' onClick={() => setToggleMathProb(!toggleMathProb)}> Get Answer!</button><br/><br/>
                            <button type='button' className='border border-dark rounded btn btn-sm' onClick={() => setShowPointSys(true)}>How To Play</button>

                            <Modal show={showPointSys} onHide={() => setShowPointSys(false)} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>How To Play</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>A random setup for a joke will appear. Solve a math problem to increase your score and get the punchline. After every 5 correct answers, you will be able to create your own joke!</p>
                                    <p>Create a Joke: +5</p>
                                    <table className='table fs-5'>
                                        <thead>
                                            <tr>
                                                <th>Difficulty</th>
                                                <th>Time</th>
                                                <th>Correct</th>
                                                <th>Incorrect</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Easy</td>
                                                <td>20 s</td>
                                                <td>+1</td>
                                                <td>-1</td>
                                            </tr>
                                            <tr>
                                                <td>Medium</td>
                                                <td>15 s</td>
                                                <td>+2</td>
                                                <td>-2</td>
                                            </tr>
                                            <tr>
                                                <td>Hard</td>
                                                <td>10 s</td>
                                                <td>+3</td>
                                                <td>-2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowPointSys(false)}>
                                    Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div> :  
                    
                    <>
                        {ansMsg ? 
                            (togglePL ? 
                            <div className='col'>
                                <h3>{joke.setup}</h3>
                                <h1><b>{joke.punchline}</b></h1>  
                                <br/>
                                <p style={{fontSize: "45px"}}>{problem} = {answer}</p>
                                <h4 style={{color: 'green'}}>Correct!</h4>
                                    <br/>
                                { !toggleLikeFav ? <button type='button' className='border border-2 rounded-pill btn btn-info fs-3' onClick={() => handleLikeAndFavorite()}>Funny 😂</button> 
                                : 
                                <button type='button' className='border border-2 rounded-pill btn btn-info fs-3 disabled' aria-disabled="true">Funny 😂</button> 
                                }
                                    &nbsp;&nbsp;
                                { !toggleLikeFav ? <button type='button' className='border border-2 rounded-pill btn btn-info fs-3' onClick={() => setToggleLikeFav(!toggleLikeFav)}>Not Funny 😒</button> 
                                :
                                <button type='button' className='border border-2 rounded-pill btn btn-info fs-3 disabled' aria-disabled="true">Not Funny 😒</button>
                                }
                                    <br/><br/>
                                {user.username && user.problems_solved % 5 == 0 && user.problems_solved != 0 ? 
                                    <>
                                        <p className='text-primary'>Create a joke for +5 pts!</p>
                                        <button className='btn fs-5 bg-primary text-light' onClick={() => history.push("/createjoke")}>Create Joke</button>
                                    </>
                                : <></>} 
                                    &nbsp;
                                <button className='btn fs-5 bg-secondary text-light' onClick={handleNextClick}>Next Joke</button>
                            </div>
                            : 
                            <div>
                                <p style={{fontSize: "75px"}}>{problem}</p>
                                <h4 style={{color: 'red'}}>Incorrect.</h4><br/>
                                <h4>Your Answer: {inputAns}</h4>
                                <h4>Correct Answer: {answer}</h4>
                                    <br/>
                                <button className='btn fs-5 bg-secondary text-light' onClick={handleNextClick}>Next Joke</button>
                            </div>)
                        : 
                        <form onSubmit={handleSubmitAns}>
                            {user && user.username ? <Timer count={count} setCount={setCount} setTogglePL={setTogglePL} setAnsMsg={setAnsMsg} /> : <></>}
                            <br/>
                            <label htmlFor="answer" style={{fontSize: "20px"}}>Solve:</label><br/>
                            <label htmlFor="answer" style={{fontSize: "75px"}}>{problem}</label><br/>
                            <input style={{width: '100px', height: '35px'}} type="number" name="answer" value={inputAns} onChange={(e) => setInputAns(e.target.value)}/>&nbsp;
                            <button type="submit" className='btn btn-large border border-dark border-1 bg-warning'>Submit</button>
                        </form>}
                    </>
                    }
                </div>
            </div>
        </div>
        
    )
}


export default Joke;