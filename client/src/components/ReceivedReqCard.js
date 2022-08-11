import React from 'react';

function ReceivedReqCard({ username, reqID, profileImg, handleAcceptRequest, handleDeleteRequest }) {

    return (
      <>
        <div className="card border border-2 border-dark bg-light ms-5 me-5 ">
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
                <button
                  type="button"
                  className="btn btn-primary rounded-pill"
                  onClick={(id) => handleAcceptRequest(reqID)}
                >
                  Accept Request
                </button>
                <br />
                <br />
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill"
                  onClick={(id) => handleDeleteRequest(reqID)}
                >
                  Decline Request
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </>
    );
}

export default ReceivedReqCard;