import "./App.scss";

import DisplayTable from "./Components/DisplayTable";
import Header from "./Components/Header";
import * as XLSX from "xlsx";
import React, { useState } from "react";

function App() {
  const [dataArray, setDataArray] = useState([[]]);

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

      setDataArray(dataParse);
    };
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    readFile(file);
  };
  return (
    <div className="App">
      <p>Sample Excel sheet</p>

      <Header handleFile={handleFile} />

      <DisplayTable dataArray={dataArray} />
    </div>
  );
}

export default App;
