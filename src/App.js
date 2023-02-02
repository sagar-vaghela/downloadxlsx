import "./App.css";
import { items } from "./response";
import FileSaver from "file-saver";

function App() {
  const getTableData = () => {
    const excelData = [];
    items.forEach((data, i) => {
      const obj = {};
      if (i > 0) {
        items[0].forEach((item, i) => {
          obj[item] = data[i];
        });
        if (Object.keys(obj).length !== 0) {
          excelData.push(obj);
        }
      }
    });
    return excelData;
  };

  const saveAsExcelFile = (buffer, fileName, extension) => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const data = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + "." + extension);
  };

  const handleClick = () => {
    import("xlsx").then((xlsx) => {
      const data = getTableData();
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "testfile", "xlsx");
    });
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          handleClick();
        }}
      >
        download file
      </button>
    </div>
  );
}

export default App;
