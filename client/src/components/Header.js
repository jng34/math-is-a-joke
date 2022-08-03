import React from 'react';
import { useHistory } from 'react-router-dom';
import usersPic from '../media/users2.png';

function Header({ user, setUser }) {
    const history = useHistory();

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" })
        .then((r) => {
            if (r.ok) {
                setUser({});
                history.push("/")
            }
        });
    }

    function handleLeaderBoard() {
        history.push("/leaderboard")
    }

    return (
      <div className="container" style={{ paddingTop: "5px" }}>
        <div className="row align-items-center">
          <div className="col">
            <h2
              style={{ fontSize: "55px", cursor: "pointer" }}
              onClick={() => history.push("/")}
            >
              Math is a J😂ke!
            </h2>
            {/* <span className="badge rounded-pill border border-4 border-dark bg-info text-dark"style={{fontSize: '55px', cursor: 'pointer'}} onClick={() => history.push("/")}>Math is a J😂ke!</span> */}
          </div>
          <div className="col">
            <p id="emoji">😂</p>
          </div>
          <div className="col text-end">
            {user.username ? (
              <></>
            ) : (
              <button
                className="btn btn-secondary rounded-pill border border-2 border-dark fs-5"
                onClick={() => history.push("/login")}
              >
                Log In
              </button>
            )}
            &nbsp;&nbsp;
            {user.username ? (
              <div>
                <img
                  src={usersPic}
                  alt="leaderboard"
                  style={{ width: "3rem", cursor: "pointer" }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="LeaderBoard"
                  onClick={handleLeaderBoard}
                />
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                  onClick={() => history.push("/notifications")}
                >
                  Inbox
                  {/* if notification count > 0, then render notification span. if not, render nothing */}
                  {user.notifications.length && user.notifications.length > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {user.notifications.length}
                    </span>
                  ) : (
                    <></>
                  )}
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-warning rounded-pill btn-small border border-2 border-dark fs-5"
                  onClick={() => history.push("/profile")}
                >
                  My Profile
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-secondary rounded-pill border border-2 border-dark fs-5"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary rounded-pill border border-2 border-dark fs-5"
                onClick={() => history.push("/signup")}
              >
                Sign Up
              </button>
            )}
            {user.username ? (
              <>
                <p className="fs-5">
                  Welcome, {user.username}!<br />
                  Score: <b>{user.score}</b>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
    }
    
    export default Header;