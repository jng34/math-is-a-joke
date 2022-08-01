import React from 'react';
import { useHistory } from 'react-router-dom';

function HowToPlay({ user }) {
    const history = useHistory();

    return (
        <div className="text-center mx-auto mt-4" style={{width: '700px'}}>
            <p className='fs-1'>How To Play</p><br/>
            <p className='fs-4 text-success'>Get a joke. Solve a math problem.<br/>Bump up your score. Try not to laugh! 😂</p>
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
            <br/>
            <div className="text-start" style={{fontSize: "20px"}}>
                *** A <button className='btn btn-sm bg-primary text-light'>Create Joke</button> will appear after every five (5) problems you answer correctly. Create your own joke and get <b>+5</b> points!
            </div>
            <button type="button" className='btn btn-large btn-success fs-3 fw-bold border border-2 border-dark mt-4 mx-auto' style={{width: '200px', height: '80px'}} onClick={() => history.push("/joke")}>Play Now!</button>
        </div>
    )
}

export default HowToPlay;