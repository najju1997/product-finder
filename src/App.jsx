// App.jsx
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import BarcodeScanner from './components/BarcodeScanner';

const App = () => {
  const [productData, setProductData] = useState([]);

  const handleDataLoaded = (data) => {
    setProductData(data);
  };

  return (
    <div>
      <FileUpload onDataLoaded={handleDataLoaded} />
      <BarcodeScanner productData={productData} />
    </div>
  );
};

export default App;
