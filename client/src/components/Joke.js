import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Timer from './Timer';
import HowToPlayModal from './HowToPlayModal';
import { Player, Controls } from '@lottiefiles/react-lottie-player';


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

    function handleCreateScoreNotif(score, numSolved) {
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
        //create notification for like
        fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ 
                sender_id: user.id,
                user_id: joke.user_id,
                notice_type: "favorite",
                message: `${user.username} liked your joke: \n "${joke.setup}" \n "${joke.punchline}"`
            })
        })
        .then(r => r.json())
        .then(data => console.log(data))

    }
    
    function handleNextClick() {
        if (user.username) {
            setInputAns("");
            setToggleLikeFav(false);
            setToggleFetch(!toggleFetch);
            setToggleMathProb(!toggleMathProb);
            setAnsMsg(null);
            diffLevel();
        } else {
            history.push("/login")
        }
    } 

    if (!user.username) { history.push("/")}


    return (
      <div className="align-self-center mt-5">
        <div className="container text-center align-items-center">
          <div className="row text-center">
            <br />
            <br />
          </div>
          <div className="row mt-2 mb-2 align-items-center text-light">
            {!toggleMathProb ? (
              <div>
                <br />
                <h1>{joke.setup}</h1>
                <br />
                <br />
                <br />
                <button
                  type="button"
                  className="border border-3 border-dark rounded-pill btn btn-lg btn-warning fs-4"
                  onClick={() => setToggleMathProb(!toggleMathProb)}
                >
                  {" "}
                  Get Answer!
                </button>
                <br />
                <br />
                <button
                  type="button"
                  className="border border-dark rounded-pill btn btn-sm bg-light text-dark fs-5"
                  onClick={() => setShowPointSys(true)}
                >
                  How To Play
                </button>

                <HowToPlayModal
                  showPointSys={showPointSys}
                  setShowPointSys={setShowPointSys}
                />
              </div>
            ) : (
              <>
                {ansMsg ? (
                  togglePL ? (
                    <div className="col">
                      <h4 style={{ color: "orange", fontWeight: "bold" }}>
                        Correct!
                      </h4>
                      <br />
                      <h1>{joke.setup}</h1>
                      <h2>
                        <em> --- {joke.punchline}</em>
                      </h2>
                      <br />
                      {!toggleLikeFav ? (
                        <button
                          type="button"
                          className="transparent-button"
                          onClick={() => handleLikeAndFavorite()}
                        >
                          {/* className='border border-2 rounded-pill btn btn-info fs-3' */}
                          <Player
                            hover
                            src="https://assets10.lottiefiles.com/packages/lf20_RfD6Lb.json"
                            style={{ height: "80px", width: "80px" }}
                          ></Player>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="transparent-button"
                          aria-disabled="true"
                        >
                          <Player
                            onEvent={(event) => {
                              if (event === "load") this.stop(); // check event type and do something
                            }}
                            autoplay={false}
                            hover={false}
                            src="https://assets10.lottiefiles.com/packages/lf20_RfD6Lb.json"
                            style={{ height: "80px", width: "80px" }}
                          ></Player>
                        </button>
                      )}
                      &nbsp;&nbsp;
                      {!toggleLikeFav ? (
                        <button
                          type="button"
                          className="border border-2 rounded-pill btn btn-info text-light fs-4"
                          onClick={() => setToggleLikeFav(!toggleLikeFav)}
                        >
                          Not Funny 😒
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="border border-2 rounded-pill btn btn-info fs-4 text-light disabled"
                          aria-disabled="true"
                        >
                          Not Funny 😒
                        </button>
                      )}
                      {user.username &&
                      // user.problems_solved % 5 == 0 &&
                      user.problems_solved != 0 ? (
                        <>
                          <p className="text-light">
                            Create a joke for +5 pts!
                          </p>
                          <button
                            className="btn fs-5 border border-2 border-light bg-primary text-light"
                            onClick={() => history.push("/createjoke")}
                          >
                            Create Joke
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                      &nbsp;
                      <button
                        className="btn fs-5 border border-2 bg-secondary text-light"
                        onClick={handleNextClick}
                      >
                        Next Joke
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: "75px" }}>{problem}</p>
                      <h4 style={{ color: "red", fontWeight: "bold" }}>
                        Incorrect.
                      </h4>
                      <br />
                      <h4>Your Answer: {inputAns}</h4>
                      <h4>Correct Answer: {answer}</h4>
                      <br />
                      <button
                        className="btn fs-5 border border-2 bg-secondary text-light"
                        onClick={handleNextClick}
                      >
                        Next Joke
                      </button>
                    </div>
                  )
                ) : (
                  <form onSubmit={handleSubmitAns}>
                    {user && user.username ? (
                      <Timer
                        count={count}
                        setCount={setCount}
                        setTogglePL={setTogglePL}
                        setAnsMsg={setAnsMsg}
                      />
                    ) : (
                      <></>
                    )}
                    <br />
                    <label htmlFor="answer" style={{ fontSize: "20px" }}>
                      Solve:
                    </label>
                    <br />
                    <label htmlFor="answer" style={{ fontSize: "75px" }}>
                      {problem}
                    </label>
                    <br />
                    <input
                      style={{ width: "100px", height: "35px" }}
                      type="number"
                      name="answer"
                      value={inputAns}
                      onChange={(e) => setInputAns(e.target.value)}
                    />
                    &nbsp;
                    <button
                      type="submit"
                      className="btn btn-large border border-dark border-2 bg-warning"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
}


export default Joke;