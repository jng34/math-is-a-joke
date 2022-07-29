import React from 'react';


function NotFriendCard({ username, reqID, profileImg, handleAcceptRequest, handleDeleteRequest }) {
    // const [toggleButton, setToggleButton] = React.useState(false);

    return (
        <div className='card border border-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 text-center'>
                        <img src={profileImg} alt="profile-img" style={{width: '20rem'}}/>
                    </div>
                    <div className='col'>
                        <h3>{username}</h3>
                        <button type='button' className='btn btn-primary fs-5 rounded-pill' onClick={(id) => handleAcceptRequest(reqID)}>Accept Request</button>
                        &nbsp;
                        <button type='button' className='btn btn-secondary fs-5 rounded-pill' onClick={(id) => handleDeleteRequest(reqID)}>Decline Request</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFriendCard;