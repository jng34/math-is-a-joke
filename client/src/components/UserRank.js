import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';


function UserRank({ user, person, index, onSendRequest, friendReqs }) {
    const { id, username, score, jokes, made_friends, pending_friends } = person;
    // const [alreadyFriends, setAlreadyFriends] = useState([]);
    // const [alreadyRequested, setAlreadyRequested] = useState([]);
    const [toggleButton, setToggleButton] = useState(false);
    // console.log(not_friends)

    const renderButtons = pending_friends.find((friend) => friend.id === user.id)
    // console.log(renderButtons)


    // const renderButtons = user.username ? friendReqs.map((friendship) => {
    //     if (friendship.sent_by_id === user.id && friendship.status === true) {
    //         return (
    //             <td key={uuid()}>
    //                 <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Already Friends</button>
    //             </td>
    //         )
    //     } else if (friendship.sent_by_id === user.id && friendship.status === false) {
    //         return (
    //             <td key={uuid()}>
    //                 <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Request Sent</button>
    //             </td>    
    //         )
    //     } else {
    //         return (
    //             <td key={uuid()}>
    //                 <button type='button' className='btn btn-primary' onClick={handleClick}>Send Friend Request</button>  
    //             </td>    
    //         )
    //     }
    // }) : <></>


    function handleClick() {
        setToggleButton(true);
        onSendRequest(id);
    }
    
    return (
        <tr className={username !== user.username ? 'fs-5' : 'fw-bold fs-4'}>
            <td>{index+1}</td>
            <td>{username}</td>
            <td>{score}</td>
            <td>{jokes.length}</td>
            <td>
                { friendReqs[0] && id === friendReqs[0].sent_to_id ? 
                ( !toggleButton  ? 
                <button type='button' className='btn btn-primary' onClick={handleClick} >Send Friend Request</button>    
                : <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Sent!</button> ) 
                : <button type='button' className='btn btn-primary' onClick={handleClick} >Send Friend Request</button> }              
            </td>
            {/* {renderButtons} */}
        </tr>
    )
}

export default UserRank;