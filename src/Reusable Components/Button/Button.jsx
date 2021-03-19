import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      className={props.btnClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.btnName}
    </button>
  );
};

export default Button;
