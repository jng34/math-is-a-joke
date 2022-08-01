import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserRank from './UserRank';
import FriendReqModal from './FriendReqModal';
import uuid from 'react-uuid';


function LeaderBoard({ user }) {
    const [allUsers, setAllUsers] = useState([]);  
    const [reqsSent, setReqsSent] = useState([]);  
    const [madeFriends, setMadeFriends] = useState([]);  
    const [reRender, setReRender] = useState(false);  
    // const [toggleButton, setToggleButton] = useState(false);
    // const [alreadyFriends, setAlreadyFriends] = useState([]);
    // const [alreadyRequested, setAlreadyRequested] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        fetch("/api/users/rankings")
        .then(r => r.json())
        .then(users => setAllUsers(users))
    }, [reRender])
    
    useEffect(() => {
        fetch("/api/me").then((r) => {
        if (r.ok) {
            r.json().then((data) => {
                setMadeFriends(data.made_friends)
            })
        }
        });
    }, [reRender])

    useEffect(() => {
        fetch(`/api/friends/sent_requests/${user.id}`)
        .then(r => r.json())
        .then((reqs) => setReqsSent(reqs))
    }, [reRender])



    function handleFriendRequest(reqFriendId) {
        fetch("/api/friends", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sent_by_id: user.id,
                sent_to_id: reqFriendId
            })
        })
        .then(() => setReRender(!reRender))
    }



    // const renderButtons = friendReqs.map((friendship) => {
    //     if (friendship.sent_by_id === user.id && friendship.status === true) {
    //         return (
    //             <td key={uuid()}>
    //                 <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Already Friends</button><br/>
    //             </td>
    //         )
    //     } else if (friendship.sent_by_id === user.id && friendship.status === false) {
    //         return (
    //             <td key={uuid()}>
    //                 <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Sent!</button><br/>
    //             </td>    
    //         )
    //     } else {
    //         return (
    //             <td key={uuid()}>
    //                 <button type='button' className='btn btn-primary' onClick={handleClick} >Send Friend Request</button><br/>
    //             </td>    
    //         )
    //     }
    // })
    // const renderButtons = reqsSent.map((req) => (
    //     <FriendReqModal key={uuid()} username={req.sent_to.username} profileImg={req.sent_to.profile_img} onSendRequest={handleFriendRequest} />
    // ))

    const renderAllUsers = allUsers.map((person, index) => (
        <UserRank key={uuid()} user={user} person={person} index={index} onSendRequest={handleFriendRequest} />
    ))

    if (!user) { history.push("/") }

    return (
        <div id="lbtable" className='mx-auto mt-4'>
            <p className='text-center fs-1'>LeaderBoard</p>
            <table className='table table-bordered table-hover border border-2 border-dark mt-4'>
                <tbody>
                    <tr>
                        <th className='fs-3 fw-light'># Rank</th>
                        <th className='fs-3 fw-light'>Score</th>
                        <th className='fs-3 fw-light'># Problems Solved</th>
                        <th className='fs-3 fw-light'>Created Jokes</th>
                        <th className='fs-3 fw-light'>UserName</th>
                        {/* <th className='fs-3 fw-light'>Friend Requests</th> */}
                    </tr>
                    {renderAllUsers}
                </tbody>
            </table>
                    {/* {renderButtons} */}
        </div>
    )
}


export default LeaderBoard;