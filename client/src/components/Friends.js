import React, { useState } from 'react';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FriendCard from './FriendCard';


function Friends({ user }) {
    const history = useHistory();

    // function handleRemoveFriend() {
    //     fetch(`/api/friends`)
    // }

    const renderFriends = user && user.username ? user.made_friends.map((friend) => (
        <FriendCard key={uuid()} user={user} username={friend.username} email={friend.email} profileImg={friend.profile_img} score={friend.score}/>
    )) : <></>


    if (!user) { history.push("/") }

    return (
        <div className='mx-auto'>
            <p className='fs-1 text-center'>Friends</p>
            {renderFriends}
        </div>
    )
}


export default Friends;