import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

function ProfileModals({
  profileImg,
  show,
  setShow,
  showPicURL,
  setShowPicURL,
  setNewPic,
  handleUpdatePic,
  handleDeleteUser,
  showEmail,
  setShowEmail,
  email,
  setNewEmail,
  handleUpdateEmail,
  showPW,
  setShowPW,
  setNewPW,
  handleUpdatePW,
}) {
  const editPicModal = (
    <Modal show={showPicURL} onHide={() => setShowPicURL(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder={profileImg}
          onChange={(e) => setNewPic(e.target.value)}
        />
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
  );

  const editEmail = (
    <Modal show={showEmail} onHide={() => setShowEmail(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder={email}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEmail(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateEmail}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const editPW = (
    <Modal show={showPW} onHide={() => setShowPW(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter new password..."
          onChange={(e) => setNewPW(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPW(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdatePW}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );

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
  );

  return (
    <>
      {editPicModal}
      {editEmail}
      {editPW}
      {deleteAcctModal}
    </>
  );
}

export default ProfileModals;