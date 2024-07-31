
import * as XLSX from 'xlsx';

const FileUpload = ({ onDataLoaded }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      onDataLoaded(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />;
};

export default FileUpload;
