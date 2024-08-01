import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const FileUpload = ({ onDataLoaded }) => {
  const [filename, setFilename] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = data[0];
      const jsonData = data.slice(1).map(row => {
        let obj = {};
        row.forEach((cell, i) => {
          obj[headers[i]] = cell;
        });
        return obj;
      });

      onDataLoaded(jsonData);
    };

    reader.readAsArrayBuffer(file);
    setFilename(file.name); // Set the filename when the file is attached
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      {filename ? (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="w-12 h-12 mb-4 text-green-600"
          />
          <span className="ml-2 text-gray-700">{filename}</span>
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faPaperclip}
            className="w-12 h-12 mb-4 text-gray-600 cursor-pointer"
            onClick={triggerFileInput}
          />
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Attach Products Sheet</h2>
        </>
      )}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
