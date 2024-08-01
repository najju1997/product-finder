// QRScanner.jsx
import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';

const QRScanner = () => {
  const [data, setData] = useState('No result');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  if (!isMobile) {
    return <p>QR Scanner is only available on mobile devices.</p>;
  }

  const handleScan = (result) => {
    if (result) {
      setData(result);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      <p>Result: {data}</p>
    </div>
  );
};

export default QRScanner;
