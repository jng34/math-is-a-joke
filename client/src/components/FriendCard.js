import React, { useState, useEffect } from 'react';
import JokeList from './JokeList';
import uuid from 'react-uuid';
import { Modal, Button } from 'react-bootstrap';


function FriendCard({ friendID, username, profileImg, email, score, handleDeleteFriend }) {
    const [showJokes, setShowJokes] = useState(false);
    const [jokeList, setJokeList] = useState([]);

    useEffect(() => {
        fetch(`/api/users/${friendID}`)
        .then(r => r.json())
        .then(userObj => setJokeList(userObj.jokes))
    }, [])

    const renderJokeList = jokeList.map((joke) => (
        <div key={uuid()}>
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
            <br/>
        </div>
    ))

    const showFriendJokes = (             
        <Modal show={showJokes} onHide={() => setShowJokes(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{username}'s Jokes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderJokeList}
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
                        <h4>Email: {email}</h4>
                        <h4>Score: {score}</h4>
                        <button type="button" onClick={() => console.log("need custom serializer for friend's jokes")}>{username}'s Joke List</button>
                        <br/>
                        <button type='button' className='btn btn-secondary fs-5' onClick={(id) => handleDeleteFriend(friendID)}>Remove Friend</button>
                    </div>
                    {showFriendJokes}
                    {/* {renderJokeList} */}
                    {/* <Modal show={showJokes} onHide={() => setShowJokes(false)} centered>
                        <Modal.Header>
                            <Modal.Title>{username}'s Jokes</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {renderJokeList}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowJokes(false)}>
                            Close
                            </Button>
                        </Modal.Footer>
                    </Modal> */}
                </div>
            </div>
        </div>
    )
}

export default FriendCard;