import "./App.scss";
import saveAs from "file-saver";
import DisplayTable from "./Components/DisplayTable";
import Header from "./Components/Header";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import Sample from "./SampleExcelFile/sample.xlsx";

function App() {
  const [dataArray, setDataArray] = useState([]);

  const readFile = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

      let json = [];

      for (var i = 1, j = 0; i < dataParse.length; i++) {
        json[j++] = {
          Name: [dataParse[i][0], false],
          Age: [dataParse[i][1], false],
          Gender: [dataParse[i][2], false],
        };
      }

      setDataArray(json);
    };
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    readFile(file);
  };

  const handleAddRow = () => {
    let addRow = {
      Name: "User's name",
      Age: "22",
      Gender: "Female",
    };

    setDataArray([addRow, ...dataArray]);
  };

  const handleDelete = (index) => {
    let deleteArray = [...dataArray];

    deleteArray.splice(index, 1);

    setDataArray(deleteArray);
  };

  const handleDownload = () => {
    let json = [];

    for (var i = 0, j = 0; i < dataArray.length; i++) {
      json[j++] = {
        Name: dataArray[i].Name[0],
        Age: dataArray[i].Age[0],
        Gender: dataArray[i].Gender[0],
      };
    }

    /* make the worksheet */
    var ws = XLSX.utils.json_to_sheet(json);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");

    var blob = new Blob(
      [s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))],
      {
        type: "application/octet-stream",
      }
    );

    // return sheet file
    return saveAs(blob, "updated.xlsx");
  };

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return (
    <div className="App">
      <a href={Sample} download>
        <p>Sample Excel sheet</p>
      </a>

      <Header
        handleFile={handleFile}
        handleAddRow={handleAddRow}
        handleDownload={handleDownload}
      />

      <DisplayTable
        dataArray={dataArray}
        setDataArray={setDataArray}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
