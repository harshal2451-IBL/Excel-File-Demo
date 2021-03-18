import React, { useState, useEffect } from "react";
import InputTag from "../../Reusable Components/Input";
import "./DisplayTable.scss";

const DisplayTable = (props) => {
  const [isNameClicked, setIsNameClicked] = useState(false);

  const [isAgeClicked, setIsAgeClicked] = useState(false);

  const [isGenderClicked, setIsGenderClicked] = useState(false);

  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputGender, setInputGender] = useState("");


  useEffect(() => {
    
      console.log(isNameClicked);
  }, [isNameClicked])
 

  const handleClick = (type) => {
   // alert(type)
    if (type === "name") {
      setIsNameClicked(true);
    }
    else if (type === "age") setIsAgeClicked(true);
    else if (type === "gender") setIsGenderClicked(true);
  };

  const handleFocusOut = (type) => {
    //alert("type")
    if (type === "name") setIsNameClicked(false);
    else if (type === "age") setIsAgeClicked(false);
    else if (type === "gender") setIsGenderClicked(false);
  };

  

  const handleChange = (e, type) => {
    // alert("hello")
   // alert(e.target.value)
    if (type === "name") setInputName(e.target.value);
    else if (type === "age") setInputAge(e.target.value);
    else if (type === "gender") setInputGender(e.target.value);

    if (e.keyCode === 'Enter') {
      alert("enter")
    }
    
    
  }

  console.log(props.dataArray);
  console.log("render");
  console.log(props.addRow);
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
          {
           props.dataArray.map((data, index) => (
            <tr key={index}>
            <td>
              <div className="td-container" onClick={() => handleClick("name")}>
                {isNameClicked ? (
                  <InputTag
                    inputClass="input"
                    inputType="text"
                    inputValue={data.Name}
                    onChange={(e) => handleChange(e, "name")}
                    onFocusOut={() => handleFocusOut("name")}
                  />
                ) : (
                  data.Name
                )}
              </div>
            </td>

            <td>
              <div className="td-container" onClick={() => handleClick("age")}>
                {isAgeClicked ? (
                  <InputTag
                    inputClass="input"
                    inputType="text"
                    inputValue={data.Age}
                    onChange={(e) => handleChange(e, "age")}
                    onFocusOut={() => handleFocusOut("age")}
                  />
                ) : (
                  data.Age
                )}
              </div>
            </td>

            <td>
              <div
                className="td-container"
                onClick={() => handleClick("gender")}
              >
                {isGenderClicked ? (
                  <InputTag
                    inputClass="input"
                    inputType="text"
                    inputValue={data.Gender}
                    onChange={(e) => handleChange(e,"gender")}
                    onFocusOut={() => handleFocusOut("gender")}
                  />
                ) : (
                  data.Gender
                )}
              </div>
            </td>

            <td>
              <div className="delete-div" onClick={() => props.onDelete(index)}>
                <i className="fa fa-trash-o delete-icon" aria-hidden="true"></i>
              </div>
            </td>
          </tr>
           ))
          }
          
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
