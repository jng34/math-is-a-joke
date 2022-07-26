import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import Main from './Main';


function CreateJoke({ user }) {
    const [newSetUp, setNewSetUp] = useState("");
    const [newPunchLine, setNewPunchLine] = useState("");
    const history = useHistory();

    function handleCreateJoke(e) {
        e.preventDefault();
        fetch("/api/jokes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                setup: newSetUp,
                punchline: newPunchLine,
                likes: 0
            })
        })
        .then(r => r.json())
        .then(data => console.log(data))  
        alert('Created joke!')
        history.push("/joke")
    }
    
    //redirect for unauthorized user
    if (!user.username) {
        history.push("/")
    }
    //configure error handling

    return (
        <div className='align-self-center mt-4'>
            <div className='container'>
                <div className='row mb-3'>
                    <p className='text-center' style={{fontSize: '40px'}}>Create A Joke</p>
                </div>
                <div className='row ms-5 me-5'>
                    <form onSubmit={(e) => handleCreateJoke(e)}>
                        <label htmlFor="setup" className='fs-4'>Setup: </label><br/>
                        <input type="text" className="form-control border border-2 border-dark" value={newSetUp} placeholder='Type your joke...' onChange={(e) => setNewSetUp(e.target.value)}/><br/>
                        <label htmlFor="punchline" className='fs-4'>PunchLine: </label><br/>
                        <input type="text" className="form-control border border-2 border-dark" value={newPunchLine}placeholder='Type your answer to joke...' onChange={(e) => setNewPunchLine(e.target.value)}/><br/>
                        <button type='submit' className='btn btn-warning border border-2 border-dark fs-4'>Create Joke</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default CreateJoke;