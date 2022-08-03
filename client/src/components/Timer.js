import React, { useEffect } from 'react';


function Timer({ setTogglePL, setAnsMsg, count, setCount }) {

    useEffect(() => {
        let timer;
        if( count > 0 ) {
            timer = setTimeout(() => setCount(count-1), 1000)
        } else {
            setAnsMsg('fire')
            setTogglePL(false)
        }
    }, [count])

    return (
        <div className='text-center'>
            <p className='fs-3'><em>Time remaining:</em></p>
            { count <= 5 ? 
            <p className='fs-2 fw-bold text-danger'><b>{count} s</b></p> 
            :
            <p className='fs-2 fw-bold'><b>{count} s</b></p> }
        </div>
    )
}

export default Timer;