// BarcodeGenerator.jsx

import Barcode from 'barcode-generator';

const BarcodeGenerator = ({ value }) => {
  return <Barcode value={value} />;
};

export default BarcodeGenerator;
