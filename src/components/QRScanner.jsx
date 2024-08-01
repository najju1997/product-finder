import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const QRScanner = () => {
  const videoRef = useRef(null);
  const [data, setData] = useState('No result');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(mobile);

    if (mobile) {
      const codeReader = new BrowserMultiFormatReader();

      const startScanning = () => {
        codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setData(result.text);
          }
          if (err) {
            setError(err.message);
          }
        });
      };

      startScanning();

      return () => {
        codeReader.reset();
      };
    }
  }, []);

  if (!isMobile) {
    return <p>QR Scanner is only available on mobile devices.</p>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
      <p>Result: {data}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default QRScanner;
