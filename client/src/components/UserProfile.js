import React from 'react';
import Main from './Main';
import { useHistory, Link } from 'react-router-dom';


function UserProfile({ user }) {
    const { id, username, profile_img, score } = user;
    const history = useHistory();

    function handleDeleteUser() {
        fetch(`/api/users/${id}`, { method: "DELETE" })
        history.push("/")
    }

    //border border-3 border-dark
    if (!username) return (<div><Main/></div>)

    return (
        <div className='align-self-center mt-5'>
            <div className='container border border-1 border-dark ms-5 me-5 px-5'>
                <div className='row border border-1 border-dark'>
                    <p className='fw-bold text-center' style={{fontSize: '40px'}}>{username}</p>
                </div>
                <div className='row align-items-center border border-1 border-dark mt-3'>
                    <div className='col text-end me-5'>
                        <h5>Score: {score}</h5>
                        <h5><Link to='/jokeslist'>My Jokes</Link></h5>
                        <h5><Link to='/friends'>My Friends</Link></h5>
                        <h5></h5>
                        <h5>Notifications</h5>
                        <h5>Change Profile Pic</h5>
                        <button type="button" className="btn btn-danger border border-2 border-dark fs-6 text-dark" onClick={handleDeleteUser}>Delete Account</button>
                    </div>
                    <div className='col text-start ms-5'>
                        <img src={profile_img} style={{width: '175px', borderRadius: '50%'}}/>
                    </div>
                </div>
                <div className='row'>
                    <button type="button" className='btn btn-large btn-warning fw-bold border border-2 border-warning mt-5' onClick={() => history.push("/joke")}>Play Now!</button>
                </div>
            </div>
        </div>
    )
}


export default UserProfile;