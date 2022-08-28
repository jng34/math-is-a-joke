import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Timer from './Timer';
import HowToPlayModal from './HowToPlayModal';
import { Player } from '@lottiefiles/react-lottie-player';


function Joke({  user,  setUser,  noticeReRender,  setNoticeReRender,  toggleJokeFetch }) {
  const [joke, setJoke] = useState({});
  const [likesCount, setLikesCount] = useState();
  const [problem, setProblem] = useState("");
  const [answer, setAnswer] = useState("");
  const [inputAns, setInputAns] = useState("");
  const [ansMsg, setAnsMsg] = useState(null);
  const [togglePL, setTogglePL] = useState(false);
  const [level, setLevel] = useState(20);
  const [count, setCount] = useState(20);
  const [toggleMathProb, setToggleMathProb] = useState(false);
  const [toggleLikeFav, setToggleLikeFav] = useState(false);
  const [toggleAfterLike, setToggleAfterLike] = useState(false);
  const [showPointSys, setShowPointSys] = useState(false);
  const [freeProbsCt, setFreeProbsCt] = useState(0);
  const history = useHistory();

  //Easy - 20s, Medium = 15s, Hard = 10s
  function diffLevel() {
    const difficulty = [10, 15, 20];
    let i = Math.floor(Math.random() * 3);
    setLevel(difficulty[i]);
    setCount(difficulty[i]);
  }

  //Generate numbers for math problem
  const num1 = Math.floor(Math.random() * 100 + 1);
  const num2 = Math.floor(Math.random() * 50 + 1);

  //Create array of divisors for division with integer quotients
  function createDivisors(n) {
    let divisors = [];
    for (let i = 1; i <= num1; i++) {
      if (num1 % i === 0) {
        divisors.push(i);
      }
    }
    return divisors;
  }

  //Generate math problem - basic operations
  function generateMathProb() {
    const operations = ["+", "-", "*", "/"];
    let index = Math.floor(Math.random() * 4);
    let mathOper = operations[index];
    if (mathOper === "/") {
      //Division - whole integer quotients
      const divisors = createDivisors(num1);
      let divIndex = Math.floor(Math.random() * divisors.length);
      let divProb = `${num1} ÷ ${divisors[divIndex]}`;
      setProblem(divProb);
      setAnswer(num1 / divisors[divIndex]);
    } else if (mathOper === "*") {
      let multiplier = Math.floor(Math.random() * (num1 / 2) + 1);
      let multProb = `${num1} × ${multiplier}`;
      setProblem(multProb);
      setAnswer(num1 * multiplier);
    } else if (mathOper === "-") {
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

  //state for joke list
  const [allJokes, setAllJokes] = useState([]);

  //generate new joke in front end w/o API call
  const setNewJoke = () => {
    const randomNum = Math.floor(Math.random() * allJokes.length);
    const randomJokeObj = allJokes[randomNum];
    setJoke(randomJokeObj);
    setLikesCount(randomJokeObj.likes);
  };

  useEffect(() => {
    generateMathProb();
    fetch("/api/jokes")
      .then((res) => res.json())
      .then((allJokes) => {
        //sets entire joke list
        setAllJokes(allJokes);
        //sets initial random joke
        const randomNum = Math.floor(Math.random() * allJokes.length);
        const randomJokeObj = allJokes[randomNum];
        setJoke(randomJokeObj);
        setLikesCount(randomJokeObj.likes);
      });
    setTogglePL(false);
  }, [toggleJokeFetch]);

  //send notification after reaching every 50pt milestone
  function handleCreateScoreNotif(score) {
    fetch(`/api/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender_id: user.id,
        user_id: user.id,
        notice_type: "score",
        message: `Congratulations! You reached a score of ${score}.`,
      }),
    })
      .then((r) => r.json())
      .then((update) => setNoticeReRender(!noticeReRender));
  }

  function handleUpdateScore(score, numSolved) {
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: score,
        problems_solved: numSolved,
      }),
    })
      .then((r) => r.json())
      .then((update) => setUser(update));

    if (score % 50 === 0 && score !== 0) {
      handleCreateScoreNotif(score);
    }
  }

  function handleSubmitAns(e) {
    e.preventDefault();
    setAnsMsg("activated");
    if (inputAns == answer) {
      setTogglePL(true);
      if (user && user.username) {
        if (level == 20) {
          handleUpdateScore(user.score + 1, user.problems_solved + 1);
        } else if (level == 15) {
          handleUpdateScore(user.score + 2, user.problems_solved + 1);
        } else {
          handleUpdateScore(user.score + 3, user.problems_solved + 1);
        }
      }
    } else {
      setTogglePL(false);
      if (level == 20) {
        handleUpdateScore(user.score - 1);
      } else if (level == 15) {
        handleUpdateScore(user.score - 2);
      } else {
        handleUpdateScore(user.score - 2);
      }
    }
  }

  function handleLikeAndFavorite() {
    setToggleLikeFav(true);
    setToggleAfterLike(true);
    setLikesCount(likesCount + 1);
    if (user.id !== joke.user_id) {
      fetch(`/api/jokes/${joke.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: likesCount + 1 }),
      });

      //create favorite
      fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          joke_id: joke.id,
        }),
      });
      //create notification for like
      fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: user.id,
          user_id: joke.user_id,
          notice_type: "favorite",
          message: `${user.username} liked your joke: \n "${joke.setup}" \n "${joke.punchline}"`,
        }),
      });
    }
  }

  function handleDislike() {
    setToggleLikeFav(true);
    setToggleAfterLike(false);
  }

  function getNewJokeAndProb() {
      generateMathProb();
      setNewJoke();
      setInputAns("");
      setToggleLikeFav(false);
      setToggleMathProb(!toggleMathProb);
      setAnsMsg(null);
      diffLevel();
  }

  function handleNextClick() {
    if (user.username) {
      getNewJokeAndProb();
    } else if (freeProbsCt < 2) {
      // 3 free problems before signup prompt
      setFreeProbsCt(freeProbsCt + 1);
      getNewJokeAndProb();
    } else {
      history.push("/login");
    }
  }

  if (!user.username) {
    history.push("/");
  }

  return (
    <div id="chalkboard" className="container">
      <div id="joke-board" className="col">
        <div className="align-self-center">
          <div className="container text-center align-items-center">
            <div className="row">
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="row mt-2 mb-2 align-items-center text-light">
              {!toggleMathProb ? (
                <div>
                  <br />
                  <h3>{joke.setup}</h3>
                  <br />
                  <br />
                  <button
                    type="button"
                    className="border border-3 border-dark rounded-pill btn btn-warning fs-5"
                    onClick={() => setToggleMathProb(!toggleMathProb)}
                  >
                    {" "}
                    Get Answer!
                  </button>
                  <br />
                  <br />
                  <button
                    type="button"
                    className="border border-dark rounded-pill btn btn-sm bg-light text-dark"
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
                        <h4>{joke.setup}</h4>
                        <h5>
                          <em> ⇾ {joke.punchline}</em>
                        </h5>
                        <br />
                        {!toggleLikeFav ? (
                          <button
                            type="button"
                            className="transparent-button"
                            onClick={() => handleLikeAndFavorite()}
                          >
                            <Player
                              hover
                              loop
                              speed={"1.5"}
                              src="https://assets10.lottiefiles.com/packages/lf20_RfD6Lb.json"
                              style={{ height: "60px", width: "60px" }}
                            ></Player>
                          </button>
                        ) : toggleAfterLike ? (
                          <p className="fs-5 fw-bold">Liked!</p>
                        ) : (
                          <></>
                        )}
                        &nbsp;&nbsp;
                        {!toggleLikeFav ? (
                          <button
                            type="button"
                            className="transparent-button"
                            onClick={handleDislike}
                          >
                            <Player
                              hover
                              loop
                              speed={"7"}
                              src="https://assets9.lottiefiles.com/private_files/lf30_kbu3mkpv.json"
                              style={{ height: "60px", width: "60px" }}
                            ></Player>
                          </button>
                        ) : toggleAfterLike ? (
                          <></>
                        ) : (
                          <p className="fs-5 fw-bold">Disiked!</p>
                        )}
                        <br />
                        <br />
                        {user.username &&
                        user.problems_solved % 5 == 0 &&
                        user.problems_solved != 0 ? (
                          <>
                            <p className="text-light">
                              Create a joke for +5 pts!
                            </p>
                            <button
                              className="btn fs-6 border border-2 border-light bg-primary text-light"
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
                          className="btn fs-6 border border-2 bg-secondary text-light"
                          onClick={handleNextClick}
                        >
                          Next Joke
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontSize: "65px" }}>{problem}</p>
                        <h5 style={{ color: "red", fontWeight: "bold" }}>
                          Incorrect.
                        </h5>
                        <br />
                        <h5>Your Answer: {inputAns}</h5>
                        <h5>Correct Answer: {answer}</h5>
                        <br />
                        <button
                          className="btn btn-sm fs-5 border border-2 bg-secondary text-light"
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
                      <label htmlFor="answer" style={{ fontSize: "70px" }}>
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
      </div>
    </div>
  );
}


export default Joke;