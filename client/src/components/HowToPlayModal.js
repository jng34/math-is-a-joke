import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function HowToPlayModal({ showPointSys, setShowPointSys }) {
  const modal = (
    <Modal show={showPointSys} onHide={() => setShowPointSys(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>How To Play</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          A random setup for a joke will appear. Solve a math problem to
          increase your score and get the punchline. After every 5 correct
          answers, you will be able to create your own joke!
        </p>
        <p>Create a Joke: +5</p>
        <table className="table fs-5">
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Time</th>
              <th>Correct</th>
              <th>Incorrect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Easy</td>
              <td>20 s</td>
              <td>+1</td>
              <td>-1</td>
            </tr>
            <tr>
              <td>Medium</td>
              <td>15 s</td>
              <td>+2</td>
              <td>-2</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>10 s</td>
              <td>+3</td>
              <td>-2</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPointSys(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return <>{modal}</>;
}

export default HowToPlayModal;