import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';


function LeaderBoard({ user }) {
    const [allUsers, setAllUsers] = useState([]);
    const [requestSent, setRequestSent] = useState({});
    const [toggleButton, setToggleButtons] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        fetch("/api/users/rankings")
        .then(r => r.json())
        .then(users => setAllUsers((users)))
    }, [])

    function handleFriendRequest(reqFriendId) {
        fetch("/api/friends", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                sent_by_id: user.id,
                sent_to_id: reqFriendId
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            setRequestSent(data);
        });
        setToggleButtons(!toggleButton)
    }

    console.log(requestSent)

    const renderAllUsers = allUsers.map((person, index) => (
        <tr key={uuid()}>
            <td>{index+1}</td>
            <td>{person.username}</td>
            <td>{person.score}</td>
            <td>{person.jokes.length}</td>
            <td>
                { !toggleButton ? 
                <button type='button' className='btn btn-primary' onClick={(id) => handleFriendRequest(person.id)}>Send Friend Request</button>    
                : <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Sent!</button> }               
{/*               
                <button type='button' className='btn btn-primary' onClick={(id) => handleFriendRequest(person.id)}>Send Friend Request</button> */}

            </td>
        </tr>
    ))

    if (!user) { history.push("/") }

    return (
        <div className='text-center mx-auto'>
            <p className='fs-1'>LeaderBoard</p>
            <table className='table table-bordered table-hover border border-2 border-dark mt-4'>
                <tbody>
                    <tr>
                        <th className='fs-4 fw-light'>Ranking #</th>
                        <th className='fs-4 fw-light'>UserName</th>
                        <th className='fs-4 fw-light'>Score</th>
                        <th className='fs-4 fw-light'>Created Jokes</th>
                        <th className='fs-4 fw-light'>Friend Requests</th>
                    </tr>
                    {renderAllUsers}
                </tbody>
            </table>
        </div>
    )
}


export default LeaderBoard;