import React, { useState, useEffect } from 'react';

function PreLoader() {
    const [data, setData] = useState([]);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
            setDone(true);
        });
    }, 2000);
    }, []);

    return (
        <>hello</>
    )
}

export default PreLoader;