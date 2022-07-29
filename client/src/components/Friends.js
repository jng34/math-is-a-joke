import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import FriendCard from './FriendCard';
import NotFriendCard from './NotFriendCard';



function Friends({ user }) {
    const [friendsList, setFriendsList] = useState([]);
    const [friendReqList, setFriendReqList] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetch("/api/me").then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                setFriendsList(data.made_friends);
                setFriendReqList(data.not_friends);
            })
        }});
    }, [isLoading])
    

    function handleDeleteFriend(id) {
        fetch("/api/friends/delete_friend", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sent_by_id: user.id,
                sent_to_id: id,
                status: true
            }),
        })
        .then((r) => {
            console.log(r);
            setIsLoading(!isLoading);
        });    

    }


    function handleAcceptRequest(id) {
        fetch("/api/friends/accept_friend", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sent_by_id: user.id,
                sent_to_id: id,
                status: true
            }),
        })
        .then((r) => r.json())
        .then((update) => {
            console.log(update);
            setIsLoading(!isLoading);
        });    
    }
    
    function handleDeleteRequest(id) {
        fetch("/api/friends/decline_friend_req", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sent_by_id: user.id,
                sent_to_id: id,
                status: false
            }),
        })
        .then((r) => {
            console.log(r);
            setIsLoading(!isLoading);
        });     
    }


    const renderFriends = user && user.username ? friendsList.map((friend) => (
        <FriendCard key={uuid()} friendID={friend.id} username={friend.username} email={friend.email} profileImg={friend.profile_img} score={friend.score} handleDeleteFriend={handleDeleteFriend}/>
    )) : <></>


    const renderRequests = user && user.username ? friendReqList.map((friend) => (
        <NotFriendCard key={uuid()} reqID={friend.id} username={friend.username} profileImg={friend.profile_img} handleAcceptRequest={handleAcceptRequest} handleDeleteRequest={handleDeleteRequest}/>
    )) : <></>


    if (!user) { history.push("/") }

    return (
        <div className='mx-auto'>
            <p className='fs-1 text-center'>Friends</p>
            {!toggle ? 
            <button type='button' className='btn btn-large btn-success fs-5 fw-light border border-2 disabled' aria-disabled="true">Friends</button> 
            : 
            <button type='button' className='btn btn-large btn-success fs-5 fw-light border border-2' onClick={() => setToggle(!toggle)}>Friends</button>}

            &nbsp;&nbsp;

            {!toggle ? 
            <button type='button' className='btn btn-large btn-info fs-5 fw-light border border-2 text-light' onClick={() => setToggle(!toggle)}>Friend Requests</button>
            : 
            <button type='button' className='btn btn-large btn-info fs-5 fw-light  border border-2 text-light disabled' aria-disabled="true">Friend Requests</button>}
            
            <br/>
            {!toggle ? <div className='col'>{renderFriends}</div> : <div className='col'>{renderRequests}</div> }
        </div>
    )
}


export default Friends;