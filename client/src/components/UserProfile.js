import React, { useState } from 'react';
import ProfileModals from './ProfileModals';
import { Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';


function UserProfile({ user, setUser }) {
    const { id, username, email, profile_img, score, problems_solved } = user;
    const [newPic, setNewPic] = useState(profile_img);
    const [newEmail, setNewEmail] = useState(email);
    const [newPW, setNewPW] = useState("");
    const [show, setShow] = useState(false);
    const [showPicURL, setShowPicURL] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showPW, setShowPW] = useState(false);
    const history = useHistory();


    function handleUpdatePic() {
        fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ profile_img: newPic })
        })
        .then(r => r.json())
        .then(update => {
            console.log(update);
            setUser(update);
            setShowPicURL(false);
        });
    };

    function handleUpdateEmail() {
        fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email: newEmail })
        })
        .then(r => r.json())
        .then(update => {
            console.log(update);
            setUser(update);
            setShowEmail(false);
        });
    };

    function handleUpdatePW() {
      fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPW }),
      })
        .then((r) => r.json())
        .then((update) => {
          console.log(update);
          setUser(update);
          setShowPW(false);
        });
    };

    function handleDeleteUser() {
        fetch(`/api/users/${id}`, { method: "DELETE" }).then(r => console.log(r));
        fetch("/api/logout", { method: "DELETE" })
        .then((r) => {
            if (r.ok) {
                setUser({});
                history.push("/signup");
            }
        });
    };


    return (
      <div className="align-self-center text-center mt-4">
        <div className="container mx-auto px-5">
          <div className="row">
            <p className="fs-1">My Profile</p>
          </div>
          <div className="row align-items-center mt-3 border border-2 border-dark bg-light rounded mx-auto pt-5 pb-5">
            <div className="col me-5">
              <p className="fs-1">{username}</p>
              <img
                src={profile_img}
                alt="profile-img"
                style={{ width: "200px", borderRadius: "50%" }}
              />
              <br />
              <br />
              <Button
                variant="secondary"
                onClick={() => setShowPicURL(true)}
                className="rounded"
                size="sm"
              >
                Edit
              </Button>
            </div>
            <div className="col text-start ms-5">
              <p className="fs-4">
                Score: <b>{score}</b> <br />
                Problems solved: <b>{problems_solved}</b>
              </p>
              <p className="fs-4">
                <Link to="/notifications">My Inbox</Link>
              </p>
              <p className="fs-4">
                <Link to="/myjokes">My Jokes</Link>
              </p>
              <p className="fs-4">
                <Link to="/friends">My Friends</Link>
              </p>
              <p className="fs-4">Email: {email}</p>
              <Button
                variant="secondary"
                onClick={() => setShowEmail(true)}
                className="rounded-pill"
                size="sm"
              >
                Change Email
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowPW(true)}
                className="rounded-pill"
                size="sm"
              >
                Change Password
              </Button>
              <Button
                variant="danger"
                onClick={() => setShow(true)}
                className="rounded-pill"
                size="sm"
              >
                Delete Account
              </Button>
              <ProfileModals
                profileImg={profile_img}
                showPicURL={showPicURL}
                setShowPicURL={setShowPicURL}
                setNewPic={setNewPic}
                show={show}
                setShow={setShow}
                handleUpdatePic={handleUpdatePic}
                handleDeleteUser={handleDeleteUser}
                showEmail={showEmail}
                setShowEmail={setShowEmail}
                email={email}
                setNewEmail={setNewEmail}
                handleUpdateEmail={handleUpdateEmail}
                showPW={showPW}
                setShowPW={setShowPW}
                setNewPW={setNewPW}
                handleUpdatePW={handleUpdatePW}
              />
            </div>
            <div className="col">
              <br />
              <button
                type="button"
                className="btn btn-large btn-success fs-3 fw-bold border border-2 border-dark mt-4 mx-auto"
                style={{ width: "200px", height: "100px" }}
                onClick={() => history.push("/joke")}
              >
                Play Now!
              </button>
              <Link to="/howtoplay">
                <p className="fs-5">How To Play</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}


export default UserProfile;