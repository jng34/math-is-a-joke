import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function FriendReqModal({ profileImg, username, id, onSendRequest, setToggleModal, toggleModal }) {
    // const [reqsSent, setReqsSent] = useState([]);  
    // const [madeFriends, setMadeFriends] = useState([]);  
    // const [reRender, setReRender] = useState(false);

    // useEffect(() => {
    //     fetch(`/api/friends/sent_requests/${user.id}`)
    //     .then(r => r.json())
    //     .then((reqs) => setReqsSent(reqs))
    // }, [])

    // const reqsArr = [];
    // for (let i=0; i<reqsSent.length; i++) {
    //     reqsArr.push(reqsSent.)
    // }

    // const renderButton = reqsSent.forEach((req) => {}
    //     <Button></Button>
    // ))

    return (
        <Modal show={toggleModal} onHide={() => setToggleModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Friend Request</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img src={profileImg} alt="profile-img" style={{width: '10rem', borderRadius: "50%"}}/>
                    <p className='fs-4'>{username}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setToggleModal(false)}>
                    Close
                    </Button>
                    <Button>Sent!</Button>
                    {/* set up ternary here */}
                    <Button onClick={(userID) => onSendRequest(id)}>Send Friend Request</Button>
                </Modal.Footer>
        </Modal>
    )
}

export default FriendReqModal;