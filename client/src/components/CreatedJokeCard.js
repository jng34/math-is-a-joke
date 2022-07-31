import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CreatedJokeCard({ index, joke, onDeleteMyJoke, setIsLoading, isLoading }) {
    const { id, setup, punchline, likes } = joke;
    const [newSetup, setNewSetup] = useState("");
    const [newPunchLine, setNewPunchLine] = useState("");
    const [show, setShow] = useState(false);
    
    function handleEditJoke(id) {
        fetch(`api/jokes/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                setup: newSetup,
                punchline: newPunchLine
            })
        })
        .then((r) => r.json())
        .then((update) => {
            setIsLoading(!isLoading);
            setShow(false);
        })
    }
    

    return (
        <div className="card border border-dark mt-3 mb-3 ms-5 me-5">
            <div className="card-header fs-5 fw-bold" style={{backgroundColor: 'lightblue'}}>
                # {index+1}
            </div>
            <div className="card-body">
                <h4 className="card-title fs-4"><b>Setup:</b> {setup}</h4>
                <h5 className="card-text fs-4"><b>Punchline:</b> {punchline}</h5>
                
            </div>
            <div className="card-footer text-end">
                <span className="badge rounded-pill text-bg-info fs-5">😂 {likes}</span>
                &nbsp;&nbsp;
                <button type='button' className='btn border border-2 rounded btn-warning' onClick={() => setShow(true)}>Edit</button>
                &nbsp;&nbsp;
                <button type='button' className='btn border border-2 rounded btn-danger' onClick={(jokeId) => onDeleteMyJoke(id)}>Delete</button>
            </div>

            
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Joke</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Setup:</Form.Label>
                        <Form.Control type="text" placeholder={setup} onChange={(e) => setNewSetup(e.target.value)}/>
                        <Form.Label>Punchline:</Form.Label>
                        <Form.Control type="text" placeholder={punchline} onChange={(e) => setNewPunchLine(e.target.value)}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={(jokeID)=> handleEditJoke(id)}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreatedJokeCard;