import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Button from "../../Reusable Components/Button";

import InputTag from "../../Reusable Components/Input";
import "./DisplayTable.scss";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let temp;
let isClicked = false;
const DisplayTable = (props) => {
  const [inputName, setInputName] = useState();
  const [inputAge, setInputAge] = useState([]);
  const [inputGender, setInputGender] = useState([]);
  const [inputDate, setInputDate] = useState([]);

  const [inputSearch, setInputSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [errorMsg, setErrorMsg] = useState(
    Array(props.dataArray.length).fill("")
  );

  useEffect(() => {
    let records = [];

    for (var i = 0; i < props.dataArray.length; i++) {
      if (i < 10) records[i] = props.dataArray[i];
      else break;
    }
    console.log(records);

    if (props.dataArray.length > 0) {
      setCurrentPage(1);
    }

    temp = records;
    setTotalPage(Math.ceil(props.dataArray.length / 10));

    setRecordsPerPage(records);
  }, [props.dataArray]);

  function hideAllInput() {
    let data = [...props.dataArray];

    for (var i = 0; i < data.length; i++) {
      data[i].Name[1] = false;
      data[i].Age[1] = false;
      data[i].Gender[1] = false;
      data[i].Date[1] = false;
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
    else if (type === "date") setInputDate(e.target.value);
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

  const handleSearch = (e) => {
    console.log("temp", temp);
    setInputSearch(e.target.value);
    let searchValue = e.target.value;
    let searchData = [];

    if (searchValue === "") {
      console.log(typeof e.target.value);
      for (var j = 0; j < props.dataArray.length; j++) {
        if (j < 10) searchData[j] = props.dataArray[j];
        else break;
      }
    } else {
      console.log(temp);
      for (var i = 0; i < temp.length; i++) {
        // first check for name
        console.log("searchvalue = ", searchValue);
        if (
          temp[i].Name[0].toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1
        ) {
          searchData.push(temp[i]);
          console.log(
            "name",
            temp[i].Name[0].toLowerCase().indexOf(searchValue.toLowerCase())
          );
        }

        // check for age
        else if (temp[i].Age[0].toString().indexOf(searchValue) !== -1) {
          searchData.push(temp[i]);
          console.log("age", temp[i]);
        }

        // check for gender
        else if (
          temp[i].Gender[0].toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1
        ) {
          searchData.push(temp[i]);
          console.log("gender", temp[i]);
        }

        // check for gender
        else if (
          temp[i].Date[0].toLowerCase().indexOf(searchValue.toLowerCase()) !==
          -1
        ) {
          searchData.push(temp[i]);
          console.log("date", temp[i]);
        }
      }

      console.log(searchData);
    }

    setRecordsPerPage(searchData);
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      let rows = [];

      let index = 10 * currentPage;
      for (var i = index; i < index + 10; i++) {
        if (i < props.dataArray.length) rows.push(props.dataArray[i]);
      }

      setCurrentPage(currentPage + 1);
      setRecordsPerPage(rows);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      let rows = [];
      let index = 10 * (currentPage - 1);
      for (var i = index - 10; i < index; i++) {
        console.log(index);
        if (i < props.dataArray.length) rows.push(props.dataArray[i]);
      }
      setRecordsPerPage(rows);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDatePickerChange = (date, index) => {
    let data = [...props.dataArray];
    data[index].Date[1] = false;
    data[index].Date[0] = moment(date).format("MM/DD/YYYY");
    setInputDate(moment(date).format("MM/DD/YYYY"));
    props.setDataArray(data);
  };

  const handleDatePickerClick = (index) => {
    let data = [...props.dataArray];
    data[index].Date[1] = true;
    setInputDate(data[index].Date[0]);
    props.setDataArray(data);
  };

  //console.log("dataArray", props.dataArray);
  console.log("inputDate", inputDate);
  return (
    <div className="table-container">
      <div className="search-container">
        <InputTag
          inputClass="input search-input"
          inputType="text"
          inputValue={inputSearch}
          placeHolder="Search here..."
          onChange={handleSearch}
        />
      </div>
      <table id="excelTable" className="table-form">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="table-body">
          {recordsPerPage.length === 0 && (
            <tr className="change-color">
              <td className="no-record" colSpan="5">
                <p>No records found!</p>
              </td>
            </tr>
          )}
          {recordsPerPage.map((data, index) => (
            <tr key={index} className="change-color">
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
                <div className="td-container">
                  {data.Date[1] ? (
                    <DatePicker
                      selected={moment(inputDate).toDate()}
                      onSelect={(date) => handleDatePickerChange(date, index)}
                    />
                  ) : (
                    <p
                      className="date-show"
                      onClick={() => handleDatePickerClick(index)}
                    >
                      {data.Date[0]}
                    </p>
                  )}
                  <div
                    className="error-msg"
                    id={"date-error-msg" + index}
                  ></div>
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
                        onClick={handleDelete}
                      />
                    </div>
                  </ReactTooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <div className="footer-content">
          <p>Rows per page: 10</p>
          <p>Total records: {props.dataArray.length}</p>
          <p>
            Current Page: {currentPage}/{totalPage}
          </p>

          <i
            className="fa fa-chevron-circle-left left-aerrow"
            aria-hidden="true"
            onClick={prevPage}
          ></i>

          <i
            className="fa fa-chevron-circle-right right-aerrow"
            aria-hidden="true"
            onClick={nextPage}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default DisplayTable;
