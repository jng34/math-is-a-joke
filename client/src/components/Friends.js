import React from 'react';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';


function Friends({ user }) {
    const history = useHistory();

    // function renderJokesModal(jokesArr) {
    //     if (user && user.username) {       
    //         return (
    //             <div className="modal-dialog modal-dialog-centered       modal-dialog-scrollable">
                    // {jokesArr.map((joke) => (
                    //     <div key={uuid()}>
                    //         <p>{joke.setup}</p>
                    //         <p>{joke.punchline}</p>
                    //     </div>
                    // ))}
    //             </div>
    //         )
    //     }
    // }
    function handleRemoveFriend() {
        fetch(`/api/friends`)
    }

    const renderFriends = user && user.username ? user.made_friends.map((friend) => (
        <div key={uuid()} className='card border border-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 text-center'>
                        <img src={friend.profile_img} alt="profile-img" style={{width: '15rem'}}/>
                    </div>
                    <div className='col'>
                        <h3>{friend.username}</h3><br/><br/>
                        <h4>Score: {friend.score}</h4>
                        {/* <button type="button">Joke List</button>
                         */}
                        {/* {friend.jokes.map((joke) => (
                            <div key={uuid()}>
                                <p>{joke.setup}</p>
                                <p>{joke.punchline}</p>
                            </div>
                        ))} */}
                        <p>Jokes List</p>
                        <br/>
                        <button type='button' className='btn btn-secondary fs-5' onClick={handleRemoveFriend}>Remove Friend</button>
                    </div>
                </div>
            </div>
        </div>
    )) : <></>
    
    // const renderFriends = user && user.username ? user.made_friends.map((friend) => (
    //     <div key={uuid()} className="col align-content-end">
    //         <div className="card" style={{width: '15rem'}}>
    //             <img src={friend.profile_img} className="card-img-top" alt="profile-pic"/>
    //             <div className="card-body">
    //                 <h5 className="card-title">{friend.username}</h5>
    //             </div>
    //             <ul className="list-group list-group-flush">
    //                 <li className="list-group-item">Score: {friend.score}</li>
    //                 <li className="list-group-item">Jokes List</li>
    //             </ul>
    //             <div className="card-body">
    //                 <button className="btn btn-secondary">Remove Friend</button>
    //             </div>
    //         </div>
    //     </div>
    // )) : <></>

    if (!user) { history.push("/") }

    return (
        <div className='mx-auto'>
            <p className='fs-1 text-center'>Friends</p>
            {/* <div className="row row-cols-1 row-cols-md-3 ms-5 me-5 mt-3 text-end"> */}
                {renderFriends}
            {/* </div>     */}
        </div>
    )
}


export default Friends;