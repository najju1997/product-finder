// BarcodeGenerator.jsx
import React from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = ({ value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Bin Barcode:</h3>
      {value ? (
        <Barcode value={value} />
      ) : (
        <p className="text-gray-700">No barcode to display</p>
      )}
    </div>
  );
};

export default BarcodeGenerator;
