import React from 'react';
import './Button.scss'

const Button = (props) =>{

    return (
        <button className={props.btnClass}>{props.btnName}</button>
    )
}


export default Button