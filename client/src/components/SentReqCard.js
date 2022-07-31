import React from "react";

function SentReqCard({ username, profileImg }) {
    return (
        <div className='card border border-dark'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 me-5 text-end'>
                        <img src={profileImg} alt="profile-img" style={{width: '15rem', borderRadius: '50%'}}/>
                    </div>
                    <div className='col align-self-center text-start ms-5'>
                        <h3>{username}</h3><br/>
                        <span className="badge rounded-pill fs-5 bg-secondary">Request Sent!</span>
        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SentReqCard;