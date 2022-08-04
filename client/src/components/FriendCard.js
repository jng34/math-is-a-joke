import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
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

    const showFriendJokes = (             
        <Modal show={showJokes} onHide={() => setShowJokes(false)} centered scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{username}'s Jokes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ol>
                    {renderJokeList}
                </ol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowJokes(false)}>
                Close
                </Button>
            </Modal.Footer>
        </Modal> 
    )


    return (
        <div className='card border border-dark'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 text-center'>
                        <img src={profileImg} alt="profile-img" style={{width: '20rem', borderRadius: "50%"}}/>
                    </div>
                    <div className='col align-self-center text-start ms-5'>
                        <h3>{username}</h3><br/>
                        <h4>Score: {score}</h4>
                        <h4>Email: {email}</h4>
                        <button type="button" className='btn btn-success' onClick={() => setShowJokes(true)}>{username}'s Joke List</button>
                        &nbsp;&nbsp;
                        <button type='button' className='btn btn-secondary' onClick={(id) => handleDeleteFriend(friendID)}>Remove Friend</button>
                    </div>
                    {showFriendJokes}
                </div>
            </div>
        </div>
    )
}

export default FriendCard;