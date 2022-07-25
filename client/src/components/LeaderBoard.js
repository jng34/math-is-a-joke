import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';


function LeaderBoard({ user }) {
    const [allUsers, setAllUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch("/api/users/rankings")
        .then(r => r.json())
        .then(users => setAllUsers((users)))
    }, [])

    function handleFriendRequest() {
        alert('request sent')
    }


    const renderAllUsers = allUsers.map((user, index) => (
        <tr key={uuid()}>
            <td>{index+1}</td>
            <td>{user.score}</td>
            <td>{user.username}</td>
            <td>{user.jokes.length}</td>
            <td>
                <button type='button' className='btn btn-primary' onClick={handleFriendRequest}>Send Friend Request</button>                
            </td>
        </tr>
    ))

    if (!user) { history.push("/") }


    return (
        <div className='text-center mx-auto'>
            <p className='fs-1'>LeaderBoard</p>
            <table className='table table-bordered table-hover mt-4'>
                <tbody>
                    <tr>
                        <th className='fs-4'>Ranking #</th>
                        <th className='fs-4'>Score</th>
                        <th className='fs-4'>UserName</th>
                        <th className='fs-4'># Created Jokes</th>
                        <th className='fs-4'>Send Friend Request</th>
                    </tr>
                    {renderAllUsers}
                </tbody>
            </table>
        </div>
    )
}


export default LeaderBoard;