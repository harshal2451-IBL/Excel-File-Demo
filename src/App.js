import "./App.scss";
import saveAs from 'file-saver'
import DisplayTable from "./Components/DisplayTable";
import Header from "./Components/Header";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import Sample from './SampleExcelFile/sample.xlsx'

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

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

      console.log(dataParse);

      let json = []

      for(var i=1, j=0; i<dataParse.length; i++){
        json[j++] = {
          "Name": dataParse[i][0],
          "Age": dataParse[i][1],
          "Gender": dataParse[i][2]
        }
        console.log("array", json[j-1]);
      }

      console.log(json);

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
      Gender: "Female"    
    }
    
    setDataArray([addRow, ...dataArray])

  }

  const handleDelete = (index) => {
    //alert(index)
    let deleteArray = [...dataArray]

    deleteArray.splice(index, 1)

    setDataArray(deleteArray)
  }

  const handleDownload = () => {
    // alert("h")

    // var wb = XLSX.utils.book_new();

    // wb.Props = {
    //   Title: "Excel File",
    //   Subject: "DEMO",
    //   Author: "Harshal Patil",
    //   CreatedDate: new Date()
    // };

    // wb.SheetNames.push("Sheet1");

    // var ws = XLSX.utils.json_to_sheet(dataArray);

    // wb.Sheets['sheet1'] = ws

    // var file = XLSX.write(wb, {bookType: "xlsx", type: "binary"});

    // var binary = s2ab(file);
    var table = document.getElementById("excelTable");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"Customer Report"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
	    type: "application/octet-stream"
	  });
    // return sheet file
    return saveAs(blob, "example.xlsx");

  }

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  return (
    <div className="App">
      <a href={Sample} download><p>Sample Excel sheet</p></a>

      <Header handleFile={handleFile} handleAddRow={handleAddRow} handleDownload={handleDownload}/>

      <DisplayTable dataArray={dataArray} onDelete={handleDelete}/>
    </div>
  );
}

export default App;
