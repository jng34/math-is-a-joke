import React, { useState, useEffect } from 'react';


function UserRank({ user, person, index, onSendRequest }) {
    const [friendReqs, setFriendReqs] = useState([]);
    const [toggleButton, setToggleButton] = useState(false);

    // useEffect(() => {
    //     fetch("/api/friends")
    //     .then(r => r.json())
    //     .then((friends) => setFriends(friends))
    // })

    function handleClick() {
        setToggleButton(true);
        onSendRequest(person.id);
    }
    
    return (
        <tr className={person.username !== user.username ? 'fs-5' : 'fw-bold fs-4'}>
            <td>{index+1}</td>
            <td>{person.username}</td>
            <td>{person.score}</td>
            <td>{person.jokes.length}</td>
            <td>
                { person.username !== user.username ? 
                ( !toggleButton ? 
                <button type='button' className='btn btn-primary' onClick={handleClick} >Send Friend Request</button>    
                : <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Sent!</button> ) 
                :
                <p>---</p>}              
            </td>
        </tr>
    )
}

export default UserRank;