import React from 'react';

function HowToPlay({ user }) {
    return (
        <div className="text-center mx-auto mt-4" style={{width: '700px'}}>
            <p className='fs-1'>How To Play</p><br/>
            <p className='fs-4 text-success'>Get a joke. Solve a math problem. Bump up your score. Laugh!</p>
            <table className='table fs-4 border border-2'>
                <thead>
                    <tr>
                        <th>Difficulty</th>
                        <th>Time</th>
                        <th>Correct</th>
                        <th>Incorrect</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Easy</td>
                        <td>20 s</td>
                        <td>+1</td>
                        <td>-1</td>
                    </tr>
                    <tr>
                        <td>Medium</td>
                        <td>15 s</td>
                        <td>+2</td>
                        <td>-2</td>
                    </tr>
                    <tr>
                        <td>Hard</td>
                        <td>10 s</td>
                        <td>+3</td>
                        <td>-2</td>
                    </tr>
                </tbody>
            </table>
            <div style={{fontSize: "18px", fontWeight: 'bold'}}>A <button className='btn btn-sm bg-primary text-light'>Create Joke</button> will appear after every 5 problems you answer correctly.</div>
            <p style={{fontStyle: 'italic', fontSize: "25px", color: 'blue'}}>Create a Joke: +5 !</p>
        </div>
    )
}

export default HowToPlay;