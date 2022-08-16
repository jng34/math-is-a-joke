import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
// import Main from './Main';


function CreateJoke({ user, setUser }) {
    const [newSetUp, setNewSetUp] = useState("");
    const [newPunchLine, setNewPunchLine] = useState("");
    const [show, setShow] = useState(false);
    const history = useHistory();

    function handleCreateJoke(e) {
        e.preventDefault();
        fetch("/api/jokes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                setup: newSetUp,
                punchline: newPunchLine,
                likes: 0
            })
        })

        //Add +3 pts to score for creating a joke
        fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: user.score + 5 })
        })
        .then((r) => r.json())
        .then((update) => setUser(update));
        setShow(true);
    }

    function onClose() {
        setShow(false);
        history.push("/joke");
    }
    
    //redirect for unauthorized user
    if (!user.username) { history.push("/")}
    
    const renderSuccessMsg = (             
        <Modal show={show} onHide={() => onClose()} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create A Joke</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You have successfully created a joke!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>
                Close
                </Button>
            </Modal.Footer>
        </Modal> 
    )

    return (
        <div className='align-self-center'>
            <div className='container'>
                <div className='row mb-3'>
                    <p className='text-center fs-3'>Create A Joke</p>
                </div>
                <div className='row ms-5 me-5'>
                    <form onSubmit={(e) => handleCreateJoke(e)}>
                        <label htmlFor="setup" className='fs-5'>Setup: </label><br/>
                        <input type="text" className="form-control border border-2 border-dark" value={newSetUp} placeholder='Type your joke...' onChange={(e) => setNewSetUp(e.target.value)}/><br/>
                        <label htmlFor="punchline" className='fs-5'>PunchLine: </label><br/>
                        <input type="text" className="form-control border border-2 border-dark" value={newPunchLine}placeholder='Type your answer to joke...' onChange={(e) => setNewPunchLine(e.target.value)}/><br/>
                        <button type='submit' className='btn btn-warning border border-2 border-dark fs-5'>Create Joke</button>
                    </form>
                    {renderSuccessMsg}
                </div>
            </div>
        </div>
    )
}


export default CreateJoke;