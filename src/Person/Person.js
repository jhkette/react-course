import React from 'react';

const person = (props) => {
    return (
        <div>
           
    <p onClick={props.click}>I'm {props.name} and I am {props.age}</p>
    <p>{props.children}</p>
    <input type="text" />
    </div>
    )
}

export default person;