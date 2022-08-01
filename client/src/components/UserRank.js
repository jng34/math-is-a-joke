import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
import FriendReqModal from './FriendReqModal';
import uuid from 'react-uuid';


function UserRank({ user, person, index, onSendRequest }) {
    const { id, username, score, profile_img, jokes, problems_solved } = person;
    const [reqsSent, setReqsSent] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);

    useEffect(() => {
        fetch(`/api/friends/sent_requests/${user.id}`)
        .then(r => r.json())
        .then((reqs) => setReqsSent(reqs))
    }, [])

    // const requestModal = (
    //         <Modal show={toggleModal} onHide={() => setToggleModal(false)} centered>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Friend Request</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body className="text-center">
    //                 <img src={profile_img} alt="profile-img" style={{width: '10rem', borderRadius: "50%"}}/>
    //                 <p className='fs-4'>{username}</p>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={() => setToggleModal(false)}>
    //                 Close
    //                 </Button>
    //                 <Button>Sent!</Button>
    //                 <Button onClick={(userID) => onSendRequest(id)}>Send Friend Request</Button>
    //             </Modal.Footer>
    //         </Modal>
    // );
    const renderButtons = reqsSent.map((req) => { 
        req.sent_to.id === id ? 
        <FriendReqModal key={uuid()} id={id} username={username} profileImg={profile_img} onSendRequest={onSendRequest} setToggleModal={setToggleModal} toggleModal={toggleModal}/>
        : <></> }
    )
    
    return (
        <>
            <tr className={username !== user.username ? 'fs-5' : 'fw-bold fs-4'} style={{cursor: 'pointer'}} onClick={() => setToggleModal(true)}>
                <td>{index+1}</td>
                <td>{score}</td>
                <td>{problems_solved}</td>
                <td>{jokes.length}</td>
                <td>{username}</td>
                
                {/* <td>
                    { friendReqs[0] && id === friendReqs[0].sent_to_id ? 
                    ( !toggleButton  ? 
                    <button type='button' className='btn btn-primary' onClick={handleClick} >Send Friend Request</button>    
                    : <button type='button' className='btn btn-secondary disabled' aria-disabled="true">Sent!</button> ) 
                    : <button type='button' className='btn btn-primary' onClick={handleClick} >Send Friend Request</button> }              
                </td> */}
                {/* {renderButtons} */}
            </tr>
            {/* <FriendReqModal id={id} user={user} username={username} profileImg={profile_img} onSendRequest={onSendRequest} setToggleModal={setToggleModal} toggleModal={toggleModal}/> */}
            {renderButtons}
        </>
    )
}

export default UserRank;