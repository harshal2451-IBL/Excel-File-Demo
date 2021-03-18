import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Button from "../../Reusable Components/Button";

import InputTag from "../../Reusable Components/Input";
import "./DisplayTable.scss";

const DisplayTable = (props) => {
  const [inputName, setInputName] = useState();
  const [inputAge, setInputAge] = useState([]);
  const [inputGender, setInputGender] = useState([]);

  function hideAllInput() {
    let data = [...props.dataArray];

    for (var i = 0; i < data.length; i++) {
      data[i].Name[1] = false;
      data[i].Age[1] = false;
      data[i].Gender[1] = false;
    }

    props.setDataArray(data);
  }

  const handleClick = (type, index) => {
    hideAllInput();

    let data = [...props.dataArray];
    if (type === "name") {
      data[index].Name[1] = true;
      setInputName(data[index].Name[0]);
      props.setDataArray(data);
    } else if (type === "age") {
      data[index].Age[1] = true;
      setInputAge(data[index].Age[0]);
      props.setDataArray(data);
    } else if (type === "gender") {
      data[index].Gender[1] = true;
      setInputGender(data[index].Gender[0]);
      props.setDataArray(data);
    }
  };

  const handleFocusOut = (type, index) => {
    let data = [...props.dataArray];
    if (type === "name") {
      data[index].Name[0] = inputName;
      data[index].Name[1] = false;
      props.setDataArray(data);
    } else if (type === "age") {
      data[index].Age[0] = inputAge;
      data[index].Age[1] = false;
      props.setDataArray(data);
    } else if (type === "gender") {
      data[index].Gender[0] = inputGender;
      data[index].Gender[1] = false;
      props.setDataArray(data);
    }
  };

  const handleChange = (e, type) => {
    if (type === "name") {
      setInputName(e.target.value);
    } else if (type === "age") {
      setInputAge(e.target.value);
    } else if (type === "gender") setInputGender(e.target.value);
  };

  const handleCancel = () => {
    ReactTooltip.hide();
  };

  const handleDelete = (index) => {
    ReactTooltip.hide();
    let deleteArray = [...props.dataArray];

    deleteArray.splice(index, 1);

    props.setDataArray(deleteArray);
  };

  return (
    <div className="table-container">
      <table id="excelTable" className="table-form">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.dataArray.map((data, index) => (
            <tr key={index}>
              <td>
                <div
                  className="td-container"
                  onClick={() => handleClick("name", index)}
                >
                  {data.Name[1] ? (
                    <InputTag
                      inputClass="input"
                      inputType="text"
                      inputValue={inputName}
                      onChange={(e) => handleChange(e, "name", index)}
                      onFocusOut={() => handleFocusOut("name", index)}
                    />
                  ) : (
                    data.Name[0]
                  )}
                </div>
              </td>

              <td>
                <div
                  className="td-container"
                  onClick={() => handleClick("age", index)}
                >
                  {data.Age[1] ? (
                    <InputTag
                      inputClass="input"
                      inputType="text"
                      inputValue={inputAge}
                      onChange={(e) => handleChange(e, "age")}
                      onFocusOut={() => handleFocusOut("age", index)}
                    />
                  ) : (
                    data.Age[0]
                  )}
                </div>
              </td>

              <td>
                <div
                  className="td-container"
                  onClick={() => handleClick("gender", index)}
                >
                  {data.Gender[1] ? (
                    <InputTag
                      inputClass="input"
                      inputType="text"
                      inputValue={inputGender}
                      onChange={(e) => handleChange(e, "gender")}
                      onFocusOut={() => handleFocusOut("gender", index)}
                    />
                  ) : (
                    data.Gender[0]
                  )}
                </div>
              </td>

              <td>
                <div className="delete-div">
                  <i
                    className="fa fa-trash-o delete-icon"
                    aria-hidden="true"
                    // onClick={() => ReactTooltip.show(this.fooRef)}
                    data-tip=""
                    data-for={"test" + index}
                  />
                  <ReactTooltip
                    id={"test" + index}
                    event="click"
                    effect="solid"
                    clickable={true}
                    backgroundColor="rgb(224, 217, 217)"
                  >
                    <div className="tooltip-container">
                      <div className="tooltip-header">
                        <i
                          className="fa fa-exclamation-circle tooltip-icon"
                          aria-hidden="true"
                        />
                        <p>Are you sure?</p>
                      </div>

                      <Button
                        btnClass="button tooltip-cancel"
                        btnName="Cancel"
                        onClick={handleCancel}
                      />

                      <Button
                        btnClass="button tooltip-ok"
                        btnName="Ok"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </ReactTooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
