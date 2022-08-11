import React from 'react';
import { useHistory } from 'react-router-dom';
import usersPic from '../media/users2.png';
import { FiMail } from 'react-icons/fi';

function Header({ user, setUser }) {
    const history = useHistory();

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" })
        .then((r) => {
            if (r.ok) {
                setUser({});
                history.push("/login")
            }
        });
    }

    function handleLeaderBoard() {
        history.push("/leaderboard")
    }

    return (
      <div className="container" style={{ position: "sticky" }}>
        <div className="row align-items-center mx-auto">
          <div className="col text-center">
            <h3
              style={{ fontSize: "44px", cursor: "pointer" }}
              onClick={() => history.push("/")}
            >
              Math is a J😂ke!
            </h3>
          </div>
          <div className="col"></div>
          <div className="col text-end me-4">
            {user.username ? (
              <></>
            ) : (
              <button
                className="btn btn-secondary rounded-pill border border-2 border-dark"
                onClick={() => history.push("/login")}
              >
                Log In
              </button>
            )}
            &nbsp;
            {user.username ? (
              <div>
                <img
                  src={usersPic}
                  alt="leaderboard"
                  style={{ width: "2.5rem", cursor: "pointer" }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="LeaderBoard"
                  onClick={handleLeaderBoard}
                />
                &nbsp;
                <button
                  type="button"
                  className="btn btn-sm position-relative "
                  onClick={() => history.push("/notifications")}
                >
                  <FiMail style={{ fontSize: "45px" }}></FiMail>
                  {user.notifications.length &&
                  user.notifications.length > 0 ? (
                    <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
                      {user.notifications.length}
                    </span>
                  ) : (
                    <></>
                  )}
                </button>
                &nbsp;
                <button
                  className="btn btn-warning rounded-pill btn-small border border-2 border-dark"
                  onClick={() => history.push("/profile")}
                >
                  My Profile
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-secondary rounded-pill border border-2 border-dark"
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
                <p className="fs-6">
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