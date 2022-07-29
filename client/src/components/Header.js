import React from 'react';
import { useHistory } from 'react-router-dom';
import usersPic from '../users.png';

function Header({ user, setUser }) {
    const history = useHistory();

    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" })
        .then((r) => {
            if (r.ok) {
                setUser({});
                history.push("/")
            }
        });
    }

    function handleLeaderBoard() {
        history.push("/leaderboard")
    }

    // function refreshPage() {
    //     window.parent.location = window.parent.location.href; 
    // }
    
    return (
        <div className="container" style={{paddingTop:"20px"}}>
            <div className="row align-items-center">
                <div className="col">
                    <h1 style={{fontSize: '47px', cursor: 'pointer'}} onClick={() => history.push("/")}>Math is a J😂ke!</h1>
                </div>
                <div className="col">
                </div>
                <div className="col text-end">
                    {user.username ? <></> 
                    : <button className="btn btn-secondary rounded-pill border border-2 border-dark" onClick={() => history.push("/login")}>Log In</button>} 
                    &nbsp;&nbsp;
                    {user.username ? 
                    <div>
                        <img src={usersPic} alt="leaderboard" style={{width: '3rem', cursor: 'pointer'}}
                        data-bs-toggle="tooltip" data-bs-placement="right" title="LeaderBoard"
                        onClick={handleLeaderBoard}/>
                        &nbsp;&nbsp;
                        <button className="btn btn-warning rounded-pill btn-small border border-2 border-dark" onClick={()=>history.push("/profile")}>My Profile</button> 
                        &nbsp;&nbsp;
                        <button className="btn btn-secondary rounded-pill border border-2 border-dark" onClick={handleLogout}>Log Out</button>
                    </div>
                    : <button className="btn btn-primary rounded-pill border border-2 border-dark" onClick={() => history.push("/signup")}>Sign Up</button>}

                    {user.username ? <p className='fs-5'>Welcome, {user.username}! <br/></p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Header;