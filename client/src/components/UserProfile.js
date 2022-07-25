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
        <div className='align-self-center mt-4'>
            <div className='container ms-5 me-5 px-5'>
                <div className='row'>
                    <p className='fw-bold text-center' style={{fontSize: '40px'}}>{username}</p>
                </div>
                <div className='row align-items-center mt-3'>
                    <div className='col text-end me-5'>
                        <img src={profile_img} alt="profile-img" style={{width: '175px', borderRadius: '50%'}}/>
                    </div>
                    <div className='col text-start ms-5'>
                        <p className='fs-4'>Score: {score}</p>
                        <p className='fs-4'><Link to='/myjokes'>My Jokes</Link></p>
                        <p className='fs-4'><Link to='/friends'>My Friends</Link></p>
                        <p className='fs-4'>Notifications</p>
                        <p className='fs-4'>Change Profile Pic</p>
                        <button type="button" className="btn btn-danger border border-2 border-dark fs-6 text-dark" onClick={handleDeleteUser}>Delete Account</button>
                    </div>
                </div>
                <div className='row'>
                    <button type="button" className='btn btn-large btn-warning fw-bold border border-2 border-dark mt-4 mx-auto' style={{width: '30rem'}} onClick={() => history.push("/joke")}>Play Now!</button>
                </div>
            </div>
        </div>
    )
}


export default UserProfile;