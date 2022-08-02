import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserRank from './UserRank';
import uuid from 'react-uuid';


function LeaderBoard({ user }) {
    const [allUsers, setAllUsers] = useState([]);  
    const [madeFriends, setMadeFriends] = useState([]);  
    const [pendingFriends, setPendingFriends] = useState([]);  
    const [reRender, setReRender] = useState(false);  
    const history = useHistory();
    
    useEffect(() => {
        fetch("/api/users/rankings")
        .then(r => r.json())
        .then(users => setAllUsers(users))
    }, [reRender])
    
    useEffect(() => {
        fetch("/api/me")
        .then(r => r.json())
        .then((users) => {
            setMadeFriends(users.made_friends)
            setPendingFriends(users.pending_friends)
        })
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
        .then((r) => {
            console.log(r)
            setReRender(!reRender)})
    }
   
    const renderAllUsers = allUsers.map((person, index) => { 
        return ( <UserRank key={uuid()} user={user} person={person} index={index} onSendRequest={handleFriendRequest} madeFriends={madeFriends} pendingFriends={pendingFriends} /> )
    })

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
                        <th className='fs-3 fw-light'>Friend Requests</th>
                    </tr>
                    {renderAllUsers}
                </tbody>
            </table>
        </div>
    )
}


export default LeaderBoard;