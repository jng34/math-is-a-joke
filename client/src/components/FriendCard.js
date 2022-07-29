import React from 'react';


function FriendCard({ user, username, profile_img, email, score }) {
    // const [toggleButton, setToggleButton] = React.useState(false);

    
    function handleRemoveFriend() {
        fetch(`/api/friends`)
    }


    return (
        <div className='card border border-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5 text-center'>
                        <img src={profile_img} alt="profile-img" style={{width: '20rem'}}/>
                    </div>
                    <div className='col'>
                        <h3>{username}</h3><br/><br/>
                        <h3>{email}</h3><br/><br/>
                        <h4>Score: {score}</h4>
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
    )
}

export default FriendCard;