// App.jsx
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import BarcodeScanner from './components/BarcodeScanner';
import QRScanner from './components/QRScanner'; // Import the QRScanner component
import logo from './assets/logo.png';

const App = () => {
  const [productData, setProductData] = useState([]);

  const handleDataLoaded = (data) => {
    console.log('Loaded Data:', data); // Debugging statement
    setProductData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 transition-transform duration-500 ease-in-out hover:scale-105">
      <style>
        {`
          @keyframes slow-heartbeat {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          .animate-slow-heartbeat {
            animation: slow-heartbeat 2s infinite;
          }
        `}
      </style>
      <div className="mb-8">
        <img
          src={logo}
          alt="Logo"
          className="w-64 h-auto transition-transform duration-300 ease-in-out transform hover:scale-110 animate-slow-heartbeat"
        />
      </div>
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-2xl">
        <FileUpload onDataLoaded={handleDataLoaded} />
        {productData.length > 0 && (
          <div className="mt-6">
            <BarcodeScanner productData={productData} />
          </div>
        )}
        <div className="mt-6">
          <QRScanner /> {/* Include the QR scanner component */}
        </div>
      </div>
    </div>
  );
};

export default App;
