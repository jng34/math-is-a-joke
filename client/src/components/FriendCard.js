import React, { useState, useEffect } from 'react';
import FriendJokesModal from './FriendJokesModal';
import uuid from 'react-uuid';

function FriendCard({ friendID, username, profileImg, email, score, handleDeleteFriend }) {
    const [showJokes, setShowJokes] = useState(false);
    const [jokeList, setJokeList] = useState([]);

    useEffect(() => {
        fetch(`/api/users/${friendID}`)
        .then(r => r.json())
        .then(userObj => setJokeList(userObj.jokes))
    }, [])

    const renderJokeList = jokeList.map((joke) => (
        <li key={uuid()}>
            {joke.setup}<br/>
            <b>{joke.punchline}</b>
            <br/>
        </li>
    ))


    return (
      <>
        <div className="card border border-dark ms-5 me-5 border-2 bg-light">
          <div className="card-body">
            <div className="row">
              <div className="col-5 text-center">
                <img
                  src={profileImg}
                  alt="profile-img"
                  style={{ width: "12rem", borderRadius: "50%" }}
                />
              </div>
              <div className="col align-self-center text-start ms-5 text-wrap">
                <h4>{username}</h4>
                <br/>
                <h5>Score: {score}</h5>
                <h5>Email: {email}</h5>
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={() => setShowJokes(true)}
                >
                  {username}'s Joke List
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={(id) => handleDeleteFriend(friendID)}
                >
                  Remove Friend
                </button>
              </div>
              <FriendJokesModal
                showJokes={showJokes}
                setShowJokes={setShowJokes}
                username={username}
                renderJokeList={renderJokeList}
              />
            </div>
          </div>
        </div>
        <br />
      </>
    );
}

export default FriendCard;