import { useState } from 'react';
import BarcodeGenerator from './BarcodeGenerator'; // Import BarcodeGenerator for use in modal

const BarcodeScanner = ({ productData, onGenerateBarcode }) => {
  const [upc, setUpc] = useState('');
  const [binLocation, setBinLocation] = useState('');
  const [productName, setProductName] = useState('');
  const [material, setMaterial] = useState('');
  const [grv, setGrv] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUpc = upc.trim();
    const product = productData.find(item => item.UPC?.toString().trim() === trimmedUpc);

    console.log('Entered UPC:', trimmedUpc);
    console.log('Product Data:', productData);
    console.log('Found Product:', product);

    if (product) {
      const trimmedBin = product['Bin'] ? product['Bin'].trim() : 'N/A';
      const name = product['ProductName'] ? product['ProductName'] : 'N/A'; 
      const mat = product['Material'] ? product['Material'].trim() : 'N/A';
      const grvValue = product['GrV'] ? product['GrV'].trim() : 'N/A';

      setBinLocation(trimmedBin);
      setProductName(name);
      setMaterial(mat);
      setGrv(grvValue);
      setIsModalOpen(true); // Open the modal
    } else {
      setBinLocation('Not Found');
      setProductName('');
      setMaterial('');
      setGrv('');
      setIsModalOpen(true); // Open the modal even if not found
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUpc(''); // Clear the UPC input when the modal is closed
  };

  return (
    <div className="bg-white p-4">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg">
  <label className="block">
    <span className="text-gray-700 text-lg font-medium">UPC Code:</span>
    <input
      type="text"
      value={upc}
      onChange={(e) => setUpc(e.target.value)}
      required
      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3 text-gray-700 bg-white placeholder-gray-500"
      placeholder="Enter UPC code"
    />
  </label>
  <button
    type="submit"
    className="w-40 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
  >
    Generate Barcode
  </button>
</form>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <div className="flex flex-col gap-4">
              {binLocation !== 'Not Found' ? (
                <div className="flex justify-center mb-4">
                  <BarcodeGenerator value={binLocation} />
                </div>
              ) : (
                <p className="text-gray-700 text-lg font-bold">No barcode to display</p>
              )}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-700">Product Name:</span>
                  <div className="p-2 border border-gray-300 rounded-md bg-white text-lg mt-1">
                    {productName}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-32 font-semibold text-gray-700">UPC:</span>
                  <div className="flex-1 p-2 border border-gray-300 rounded-md bg-white">
                    {upc}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-32 font-semibold text-gray-700">Bin Location:</span>
                  <div className="flex-1 p-2 border border-gray-300 rounded-md bg-white">
                    {binLocation}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-32 font-semibold text-gray-700">Material:</span>
                  <div className="flex-1 p-2 border border-gray-300 rounded-md bg-white">
                    {material}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-32 font-semibold text-gray-700">GrV:</span>
                  <div className="flex-1 p-2 border border-gray-300 rounded-md bg-white">
                    {grv}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
