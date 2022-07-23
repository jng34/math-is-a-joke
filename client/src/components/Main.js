import React from 'react';
import { useHistory } from 'react-router-dom';
// import mathvid from '../mathvid.mp4'
import Joke from './Joke.js'


function Main() {
    let history = useHistory();
    
    return (
        <div className="container" style={{paddingTop:"20px"}}>
            {/* <video autoPlay muted loop id="myVideo">
                <source src={mathvid} type="video/mp4" />
            </video> */}
            <div className="row">
                <div className="col">
                    <h1 style={{fontSize: '44px', cursor: 'pointer'}} onClick={() => history.push("/")}>MATH is a Joke!</h1>
                </div>
                <div className="col">
                </div>
                <div style={{paddingTop:"20px", paddingBottom:"15px"}} className="col text-end">
                    <button className="btn btn-secondary" onClick={() => history.push("/login")}>Log In</button> &nbsp;
                    <button className="btn btn-primary" onClick={() => history.push("/signup")}>Sign Up</button>
                    {/* {user.name ? <></> : <button className="btn btn-success" onClick={() => history.push("/signup")}>Sign Up</button>} &nbsp;
                    {user.name ? <div><button className="btn btn-warning btn-small" onClick={()=>history.push("/profile")}>My Profile</button> &nbsp; <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button></div>
                    : <button className="btn btn-secondary" onClick={() => history.push("/login")}>Log In</button>}
                    {user.name ? <p>Welcome, {user.name}! <br/></p> : <></>} */}
                </div>
            </div>
            <div className='align-self-center mt-5'>
                <Joke/>
            </div>
        </div>
    )
}


export default Main;