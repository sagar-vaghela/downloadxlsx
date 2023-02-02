import "./App.css";
import { items } from "./response";
import FileSaver from "file-saver";

function App() {
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
      const worksheet = xlsx.utils.aoa_to_sheet(items);
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
