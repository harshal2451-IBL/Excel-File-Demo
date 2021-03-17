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

  const [jsonArray, setJsonArray] = useState(...props.dataArray)

  
  useEffect(() => {
    console.log("EFFECT");
    console.log(jsonArray);
    let json = jsonArray

    for(var i=1, j=0; i<props.dataArray.length; i++, j++){
      jsonArray[j] = {
        "Name": props.dataArray[i][0],
        "Age": props.dataArray[i][1],
        "Gender": props.dataArray[i][2]
      }
    }

    console.log(json);
    setJsonArray(json)
    
    
},[])
 

  const handleClick = (type) => {
    if (type === "name" && !isNameClicked) setIsNameClicked(true);
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

  console.log(jsonArray);
  console.log("render");
  return (
    <div className="table-container">
      <table className="table-form">
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
           jsonArray.map((data, index) => console.log(data))
          }
          <tr>
            <td>
              <div className="td-container" onClick={() => handleClick("name")}>
                {isNameClicked ? (
                  <InputTag
                    inputClass="input"
                    inputType="text"
                    inputValue={inputName}
                    onChange={(e) => handleChange(e, "name")}
                    onFocusOut={() => handleFocusOut("name")}
                  />
                ) : (
                  "Harshal"
                )}
              </div>
            </td>

            <td>
              <div className="td-container" onClick={() => handleClick("age")}>
                {isAgeClicked ? (
                  <InputTag
                    inputClass="input"
                    inputType="text"
                    inputValue={inputAge}
                    onChange={(e) => handleChange(e, "age")}
                    onFocusOut={() => handleFocusOut("age")}
                  />
                ) : (
                  "Harshal"
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
                    inputValue={inputGender}
                    onChange={(e) => handleChange(e,"gender")}
                    onFocusOut={() => handleFocusOut("gender")}
                  />
                ) : (
                  "Harshal"
                )}
              </div>
            </td>

            <td>
              <div className="delete-div">
                <i className="fa fa-trash-o delete-icon" aria-hidden="true"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
