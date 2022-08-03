import React, { useState, useEffect } from 'react';
import addFriendPic from '../media/add-friend.png';
import sentReqPic from '../media/sentReq.png';
import friendsPic from '../media/friends.png';


function UserRank({ user, person, index, madeFriends,  pendingFriends,  onSendRequest }) {
    const { id, username, score, jokes, problems_solved } = person;
    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(()=> {
        for (let i=0; i<madeFriends.length; i++) {
            if (madeFriends[i].id === id) {
                setIsFriend(true)
            }
        }
        for (let friend of pendingFriends){
            if (friend.id === id){
                setIsPending(true)
            }
        }
    }, [])


    return (
        <>
            <tr className={username !== user.username ? 'fs-5' : 'fw-bold fs-4'} style={{cursor: 'pointer'}}>
                <td>{index+1}</td>
                <td>{score}</td>
                <td>{problems_solved}</td>
                <td>{jokes.length}</td>
                <td>{username}</td>
                <td>
                    { user.id === id ? '---' :
                        (isFriend ? 
                        ( < >
                            Friends
                            <img src={friendsPic} alt="already-friends" style={{width: '2rem'}}/>
                        </> )
                        : ( isPending ? 
                        ( <>
                            Sent Request &nbsp;
                            <img src={sentReqPic} alt="sent-request" style={{width: '2rem'}}/>
                        </>
                        )
                        : 
                        ( <>
                        <button type='button' className='btn btn-sm border border-2 border-info text-info fs-5' onClick={(friendID) => onSendRequest(id)}>
                            Add Friend &nbsp;
                            <img src={addFriendPic} alt="add-friend" style={{width: '2rem'}}/> 
                        </button>
                        </>
                        ))
                        )
                    }
                </td>
            </tr>
        </>
    )
}

export default UserRank;