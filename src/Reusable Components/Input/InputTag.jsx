import React from "react";
import "./InputTag.scss";

const InputTag = (props) => {
  return (
    <input
      className={props.inputClass}
      type={props.inputType}
      value={props.inputValue}
      onChange={props.onChange}
      onBlur={props.onFocusOut}
      
    />
  );
};

export default InputTag;
