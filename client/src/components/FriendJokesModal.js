import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function FriendJokesModal({ showJokes, setShowJokes, username, renderJokeList }) {
  return (
    <Modal
      show={showJokes}
      onHide={() => setShowJokes(false)}
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{username}'s Jokes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>{renderJokeList}</ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowJokes(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FriendJokesModal;