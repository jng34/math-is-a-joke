import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

function ProfileModals({ profileImg, show, setShow, showPicURL, setShowPicURL, setNewPic, handleUpdatePic, handleDeleteUser }) {
    

    const editPicModal = (
        <Modal show={showPicURL} onHide={() => setShowPicURL(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="text" placeholder={profileImg} onChange={(e) => setNewPic(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowPicURL(false)}>
                Close
                </Button>
                <Button variant="primary" onClick={handleUpdatePic}>
                Update
                </Button>
            </Modal.Footer>
        </Modal>
    )

    const deleteAcctModal = (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                Close
                </Button>
                <Button variant="danger" onClick={handleDeleteUser}>
                Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )

    return (
        <>
            {editPicModal}
            {deleteAcctModal}
        </>
    )
}

export default ProfileModals;