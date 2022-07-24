import React from 'react';
import { useHistory, Link } from 'react-router-dom';


function UserProfile({ user }) {
    const { username, profile_img, score } = user;
    let history = useHistory();

    //border border-3 border-dark

    return (
        <div className='align-self-center mt-5'>
            <div className='container border border-1 border-dark ms-5 me-5 px-5'>
                <div className='row border border-1 border-dark'>
                    <p className='fw-bold text-center' style={{fontSize: '40px'}}>{username}</p>
                </div>
                <div className='row align-items-center border border-1 border-dark mt-3'>
                    <div className='col text-end table-responsive me-5'>
                        <table className='table'>
                            <tr className='fs-5 fw-bold'>
                                <Link to='/jokeslist'>My Jokes</Link>
                            </tr><br/>
                            <tr className='fs-5 fw-bold'>
                                <Link to='/friends'>My Friends</Link>
                            </tr><br/>
                            <tr className='fs-5 fw-bold'>
                                Change Profile Pic
                            </tr><br/>
                            <tr className='fs-5 fw-bold'>Score: {score}</tr>
                        </table>
                    </div>
                    <div className='col text-start ms-5'>
                        <img src={profile_img} style={{width: '175px', borderRadius: '50%'}}/>
                    </div>
                </div>
                <div className='row'>
                    <button type="button" className='btn btn-large btn-warning fw-bold border border-2 border-dark mt-5' onClick={() => history.push("/joke")}>Play Now!</button>
                </div>
            </div>
        </div>
    )
}


export default UserProfile;