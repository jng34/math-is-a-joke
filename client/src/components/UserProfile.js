import React from 'react';
import Main from './Main';
import { useHistory, Link } from 'react-router-dom';


function UserProfile({ user }) {
    const { id, username, profile_img, score } = user;
    // const [newPic, setNewPic] = useState("");
    const history = useHistory();

    function handleDeleteUser() {
        fetch(`/api/users/${id}`, { method: "DELETE" })
        history.push("/")
    }

    // function handleUpdatePic(id) {
    //     fetch(`/api/users/${id}`, {
    //         method: "PATCH",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({ profile_img:  })
    //     })
    // }

    //border border-3 border-dark
    if (!username) { history.push("/") }

    return (
        <div className='align-self-center text-center mt-4'>
            <div className='container mx-auto px-5'>
                <div className='row'>
                    <p className='fs-1'>{username}</p>
                </div>
                <div className='row align-items-center mt-3'>
                    <div className='col text-end me-5'>
                        <img src={profile_img} alt="profile-img" style={{width: '250px', borderRadius: '50%'}}/>
                    </div>
                    <div className='col text-start ms-5'>
                        <p className='fs-4'>Score: {score}</p>
                        <p className='fs-4'><Link to='/myjokes'>My Jokes</Link></p>
                        <p className='fs-4'><Link to='/friends'>My Friends</Link></p>
                        <p className='fs-4'>Notifications</p>
                        {/* <button type='button' onClick={((id) => handleUpdatePic(user.id))}>Change Picture</button> */}
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