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
          setUser(update);
          setShowPW(false);
        });
    };

    function handleDeleteUser() {
        fetch(`/api/users/${id}`, { method: "DELETE" })
        fetch("/api/logout", { method: "DELETE" })
        .then((r) => {
            if (r.ok) {
                setUser({});
                history.push("/signup");
            }
        });
    };


    return (
      <div className="align-self-center text-center">
        <div className="container mx-auto px-5">
          <div className="row">
            <p className="fs-3">My Profile</p>
          </div>
          <div className="row align-items-center border border-2 border-dark bg-light rounded mx-auto pt-5 pb-5">
            <div className="col">
              <p className="fs-4">{username}</p>
              <img
                src={profile_img}
                alt="profile-img"
                style={{ width: "175px", borderRadius: "50%" }}
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
            <div className="col text-start">
              <div className="row">
                <div className="col">
                  <p>
                    Score: <b>{score}</b>
                    <br/>
                    Problems solved: <b>{problems_solved}</b>
                  </p>
                  <p>
                    <Link to="/notifications">My Inbox</Link>
                  </p>
                  <p>
                    <Link to="/myjokes">My Jokes</Link>
                  </p>
                  <p>
                    <Link to="/friends">My Friends</Link>
                  </p>
                </div>
                <div className="col">
                  Email: {email}
                  <Button
                    variant="secondary"
                    onClick={() => setShowEmail(true)}
                    className="rounded-pill"
                    size="sm"
                  >
                    Change Email
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="secondary"
                    onClick={() => setShowPW(true)}
                    className="rounded-pill"
                    size="sm"
                  >
                    Change Password
                  </Button>
                  <br />
                  <br />
                  <Button
                    variant="danger"
                    onClick={() => setShow(true)}
                    className="rounded-pill"
                    size="sm"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>

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