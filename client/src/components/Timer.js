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
        <div className='text-center fs-5'>Time remaining: <b>{count} s</b></div>
    )
}

export default Timer;