import React from "react";
import Button from "../../Reusable Components/Button";
import InputTag from "../../Reusable Components/Input";
import "./Header.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="button-container"></div>
      <div className="upload-btn-div">
        <span>
          <i className="fa fa-upload upload-icon" aria-hidden="true"></i>
          <InputTag
            inputId="fileInput"
            inputClass="input upload-input"
            inputType="file"
            onChange={props.handleFile}
          />
        </span>
      </div>

      <div className="right">
        <div className="add-btn-div">
          <Button
            btnClass="button add-button"
            btnName="Add a row"
            onClick={props.handleAddRow}
          />
        </div>

        <div className="download-btn-div">
          <i className="fa fa-download download-icon" aria-hidden="true"></i>
          <Button
            btnClass="button download-button"
            btnName="Download Excel File"
            onClick={props.handleDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
