import React from 'react';

function ReceivedReqCard({ username, reqID, profileImg, handleAcceptRequest, handleDeleteRequest }) {

    return (
        <div className='card border border-dark'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 me-5 text-end'>
                        <img src={profileImg} alt="profile-img" style={{width: '15rem', borderRadius: '50%'}}/>
                    </div>
                    <div className='col align-self-center text-start ms-5'>
                        <h3>{username}</h3><br/>
                        <button type='button' className='btn btn-primary fs-5 rounded-pill' onClick={(id) => handleAcceptRequest(reqID)}>Accept Request</button>
                        
                        <button type='button' className='btn btn-secondary fs-5 rounded-pill' onClick={(id) => handleDeleteRequest(reqID)}>Decline Request</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceivedReqCard;