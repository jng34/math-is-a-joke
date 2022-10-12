import React, { useEffect } from "react";

function JokeTimer({ setAnsMsg, jokeTime, setJokeTime }) {
  useEffect(() => {
    let timer;
    if (jokeTime > 0) {
      timer = setTimeout(() => setJokeTime(jokeTime - 1), 1000);
    } else {
      setAnsMsg("start");
      //   setTogglePL(false);
    }
  }, [jokeTime]);

  return (
    <div className="text-center">
      <p className="fs-5">
        <em>Time remaining:</em>
      </p>
      <p className="fs-4 fw-bold">
        <b>{jokeTime} s</b>
      </p>
    </div>
  );
}

export default JokeTimer;
