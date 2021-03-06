import React from "react";
import "./InputTag.scss";

const InputTag = (props) => {
  return (
    <input
      id={props.inputId}
      className={props.inputClass}
      type={props.inputType}
      value={props.inputValue}
      placeholder={props.placeHolder}
      onChange={props.onChange}
      onBlur={props.onFocusOut}
    />
  );
};

export default InputTag;
