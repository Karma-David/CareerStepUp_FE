

import React from 'react';
import { useParams } from 'react-router-dom';

const Test = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>hello</h1>
            <p>ID: {id}</p>
        </div>
    );
};

export default Test;
