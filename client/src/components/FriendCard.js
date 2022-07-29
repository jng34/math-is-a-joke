import React from 'react';


function FriendCard({ friendID, username, profileImg, email, score, handleDeleteFriend }) {

    return (
        <div className='card border border-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 text-center'>
                        <img src={profileImg} alt="profile-img" style={{width: '20rem'}}/>
                    </div>
                    <div className='col'>
                        <h3>{username}</h3><br/><br/>
                        <h3>{email}</h3><br/><br/>
                        <h4>Score: {score}</h4>
                        <p>Jokes List</p>
                        <br/>
                        <button type='button' className='btn btn-secondary fs-5' onClick={(id) => handleDeleteFriend(friendID)}>Remove Friend</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendCard;