import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import FriendCard from './FriendCard';
import ReceivedReqCard from './ReceivedReqCard';
import SentReqCard from './SentReqCard';


function Friends({ user }) {
    const [friendsList, setFriendsList] = useState([]);
    const [sentReqs, setSentReqs] = useState([]);
    const [receivedReqs, setReceivedReqs] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetch("/api/me").then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                setFriendsList(data.made_friends);
            })
        }});

    }, [isLoading])


    useEffect(() => {
        fetch(`/api/friends/sent_requests/${user.id}`)
        .then(r => r.json())
        .then((receivedReqs) => {
            console.log(receivedReqs);
            setSentReqs(receivedReqs);
        })
    }, [isLoading])

    useEffect(() => {
        fetch(`/api/friends/received_requests/${user.id}`)
        .then(r => r.json())
        .then((receivedReqs) => {
            console.log(receivedReqs);
            setReceivedReqs(receivedReqs);
        })
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
        .then(() => setIsLoading(!isLoading));    
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
            // setIsLoading(!isLoading);
        });    

        //create notification to sender
        fetch("/api/notifications", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user_id: id,
                sender_id: id,
                notice_type: "friend_request",
                message: `${user.username} accepted your friend request.`
            })
        })
        .then(r => r.json())
        .then((data) => {
            console.log(data);
            setIsLoading(!isLoading);
        })
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
        .then(() => setIsLoading(!isLoading));     
    }


    const renderFriends = user && user.username ? friendsList.map((friend) => (
        <FriendCard key={uuid()} user={user} friendID={friend.id} username={friend.username} email={friend.email} profileImg={friend.profile_img} score={friend.score} jokes={friend.jokes} handleDeleteFriend={handleDeleteFriend}/>
    )) : <></>

    //render sent requests
    const renderSentReqs = user && user.username ? 
    ( sentReqs[0] ? 
        sentReqs.map((friend) => (
        <SentReqCard key={uuid()} username={friend.sent_to.username} profileImg={friend.sent_to.profile_img}/>
    )) : <></> ) 
    : <></>
        
    
    const renderRecReqs = user && user.username ? 
    ( receivedReqs[0] ? receivedReqs.map((friend) => (
        <ReceivedReqCard key={uuid()} reqID={friend.sent_by.id} username={friend.sent_by.username} profileImg={friend.sent_by.profile_img} handleAcceptRequest={handleAcceptRequest} handleDeleteRequest={handleDeleteRequest}/>
    )) : <></> ) 
    : <></>


    if (!user.username) { history.push("/") }

    return (
        <div className='text-center mt-4'>
            <p className='fs-1'>Friends</p>
            <div className='container'>
                <div className='col text-start'>
                    {!toggle ? 
                    <button type='button' className='btn btn-large btn-success fs-5 fw-light border border-2 disabled' aria-disabled="true">Friends</button> 
                    : 
                    <button type='button' className='btn btn-large btn-success fs-5 fw-light border border-2' onClick={() => setToggle(!toggle)}>Friends</button>}
                    &nbsp;&nbsp;
                    {!toggle ? 
                    <button type='button' className='btn btn-large btn-info fs-5 fw-light border border-2 text-light' onClick={() => setToggle(!toggle)}>Friend Requests</button>
                    : 
                    <button type='button' className='btn btn-large btn-info fs-5 fw-light  border border-2 text-light disabled' aria-disabled="true">Friend Requests</button>}
                </div>
            <br/>
                {!toggle ? <div className='col'>{renderFriends}</div> :
                <div className='row'>
                    <div className='col'>
                        <h3>Sent Requests</h3>               
                        {renderSentReqs}
                    </div>
                    <div className='col'>
                        <h3>Pending Requests</h3>               
                        {renderRecReqs}
                    </div>
                </div>}
            </div>
        </div>
    )
}


export default Friends;