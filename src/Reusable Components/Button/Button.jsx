import React from 'react';
import './Button.scss'

const Button = (props) =>{

    return (
        <button className={props.btnClass} onClick={props.onClick}>{props.btnName}</button>
    )
}


export default Button