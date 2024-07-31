// BarcodeScanner.jsx
import { useState } from 'react';
import { BarcodeReader } from '@zxing/library';
import BarcodeGenerator from './BarcodeGenerator';

const BarcodeScanner = ({ productData }) => {
  const [scannedUPC, setScannedUPC] = useState('');
  const [binLocation, setBinLocation] = useState('');

  const handleScan = (result) => {
    const upc = result.text;
    setScannedUPC(upc);
    const product = productData.find(item => item.UPC === upc);
    if (product) {
      setBinLocation(product['Bin Location']);
    } else {
      setBinLocation('Not Found');
    }
  };

  const handleError = (error) => {
    console.error('Error scanning barcode:', error);
  };

  return (
    <div>
      <h2>Scan Barcode</h2>
      <BarcodeReader onScan={handleScan} onError={handleError} />
      <div>
        <p>UPC: {scannedUPC}</p>
        <p>Bin Location: {binLocation}</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;
