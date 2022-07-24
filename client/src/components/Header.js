import React from 'react';
import { useHistory } from 'react-router-dom';

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

    //border border-3 border-dark
    
    return (
        <div className="container" style={{paddingTop:"20px"}}>
            <div className="row align-items-center">
                <div className="col">
                    <h1 style={{fontSize: '50px', cursor: 'pointer'}} onClick={() => history.push("/")}>MATH is a Joke!</h1>
                </div>
                <div className="col">
                </div>
                <div className="col text-end ">
                    {user.username ? <></> : <button className="btn btn-secondary" onClick={() => history.push("/login")}>Log In</button>} &nbsp;
                    {user.username ? <div><button className="btn btn-warning btn-small" onClick={()=>history.push("/profile")}>My Profile</button> &nbsp; <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button></div>
                    : <button className="btn btn-primary" onClick={() => history.push("/signup")}>Sign Up</button>}
                    {user.username ? <p>Welcome, {user.username}! <br/></p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Header;