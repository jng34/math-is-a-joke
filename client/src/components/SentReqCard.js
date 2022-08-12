import React from "react";

function SentReqCard({ username, profileImg }) {
    return (
      <>
        <div className="card border border-dark border-2 bg-light ms-5 me-5 ">
          <div className="card-body">
            <div className="row">
              <div className="col-5 ms-3 text-end">
                <img
                  src={profileImg}
                  alt="profile-img"
                  style={{ width: "10rem", borderRadius: "50%" }}
                />
              </div>
              <div className="col align-self-center text-start ms-5">
                <h3>{username}</h3>
                <br />
                <span className="badge rounded-pill fs-6 bg-secondary">
                  Request Sent!
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
      </>
    );
}

export default SentReqCard;