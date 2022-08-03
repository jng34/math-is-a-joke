import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function FriendReqModal({ profileImg, username, id, onSendRequest, setToggleModal, toggleModal }) {

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
                    <Button onClick={(userID) => onSendRequest(id)}>Send Friend Request</Button>
                </Modal.Footer>
        </Modal>
    )
}

export default FriendReqModal;