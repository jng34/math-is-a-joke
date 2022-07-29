import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';


function UserProfile({ user, setUser }) {
    const [newPic, setNewPic] = useState(user.profile_img);
    const [show, setShow] = useState(false);
    const [showPicURL, setShowPicURL] = useState(false);
    const { id, username, email, profile_img, score } = user;
    const history = useHistory();


    function handleUpdatePic() {
        fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ profile_img: newPic })
        })
        .then(r => r.json())
        .then(update => {
            console.log(update)
            setUser(update)
            setShowPicURL(false);
        });
    };

    function handleDeleteUser() {
        fetch(`/api/users/${id}`, { method: "DELETE" });
        fetch("/api/logout", { method: "DELETE" })
        .then((r) => {
            if (r.ok) {
                setUser({});
                history.push("/")
            }
        });
    };


    return (
        <div className='align-self-center text-center mt-4'>
            <div className='container mx-auto px-5'>
                <div className='row'>
                    <p className='fs-1'>{username}</p>
                </div>
                <div className='row align-items-center mt-3'>
                    <div className='col text-end me-5'>
                        <img src={profile_img} alt="profile-img" style={{width: '250px', borderRadius: '50%'}}/>
                    </div>
                    <div className='col text-start ms-5'>
                        <p className='fs-4'>Score: {score}</p>
                        <p className='fs-4'><Link to='/myjokes'>My Jokes</Link></p>
                        <p className='fs-4'><Link to='/friends'>My Friends</Link></p>
                        <p className='fs-4'>Email: {email}</p>
                        <p className='fs-4'>Notifications</p>

                        <Button variant="secondary" onClick={() => setShowPicURL(true)} className="rounded-pill" size='sm'>
                            Edit Picture
                        </Button>

                        <Modal show={showPicURL} onHide={() => setShowPicURL(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Profile Picture</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Control type="text" placeholder={user.profile_img} onChange={(e) => setNewPic(e.target.value)}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowPicURL(false)}>
                                Close
                                </Button>
                                <Button variant="primary" onClick={handleUpdatePic}>
                                Change
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        &nbsp;
                        <Button variant="danger" onClick={() => setShow(true)} className="rounded-pill" size='sm'>
                            Delete Account
                        </Button>

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
                    </div>
                </div>
                <div className='row'>
                    <button type="button" className='btn btn-large btn-warning fw-bold border border-2 border-dark mt-4 mx-auto' style={{width: '30rem'}} onClick={() => history.push("/joke")}>Play Now!</button>
                </div>
            </div>
        </div>
    )
}


export default UserProfile;