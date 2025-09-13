import React, { useState } from 'react';

const EnvironmentalImpactForm = () => {
  const [step, setStep] = useState(1);
  const [constructionType, setConstructionType] = useState('');
  const [formData, setFormData] = useState({
    floorsAbove: '',
    floorsBelow: '',
    baseDepth: '',
    fuelUsed: [],
    productType: [],
    treesCut: '',
    apartments: '',
    stores: '',
    vehicles: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 2) {
      setConstructionType('');
    }
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked ? [...formData[name], value] : formData[name].filter(item => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleConstructionType = (e) => {
    setConstructionType(e.target.value);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to the backend
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Construction Type</h2>
              <select
                onChange={handleConstructionType}
                value={constructionType}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              >
                <option value="">Select</option>
                <option value="factory">Factory</option>
                <option value="flat">Flat</option>
                <option value="tenement">Tenement</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          )}

          {step === 2 && constructionType === 'factory' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Factory Details</h2>
              <label className="block mb-2">
                Floors Above Ground:
                <input
                  type="number"
                  name="floorsAbove"
                  value={formData.floorsAbove}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Floors Below Ground:
                <input
                  type="number"
                  name="floorsBelow"
                  value={formData.floorsBelow}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Base Depth (in meters):
                <input
                  type="number"
                  name="baseDepth"
                  value={formData.baseDepth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">Fuel Used:</label>
              <div className="flex gap-4 mb-4">
                <label>
                  <input type="checkbox" name="fuelUsed" value="Coal" onChange={handleInputChange} className="mr-2" />
                  Coal
                </label>
                <label>
                  <input type="checkbox" name="fuelUsed" value="Oil" onChange={handleInputChange} className="mr-2" />
                  Oil
                </label>
                <label>
                  <input type="checkbox" name="fuelUsed" value="Petroleum" onChange={handleInputChange} className="mr-2" />
                  Petroleum
                </label>
              </div>
              <label className="block mb-2">Product Type:</label>
              <div className="flex gap-4 mb-4">
                <label>
                  <input type="checkbox" name="productType" value="Textile" onChange={handleInputChange} className="mr-2" />
                  Textile
                </label>
                <label>
                  <input type="checkbox" name="productType" value="Tiles" onChange={handleInputChange} className="mr-2" />
                  Tiles
                </label>
                <label>
                  <input type="checkbox" name="productType" value="Agriculture" onChange={handleInputChange} className="mr-2" />
                  Agriculture
                </label>
                <label>
                  <input type="checkbox" name="productType" value="Electronics" onChange={handleInputChange} className="mr-2" />
                  Electronics
                </label>
              </div>
              <label className="block mb-4">
                Trees Cut:
                <input
                  type="number"
                  name="treesCut"
                  value={formData.treesCut}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
                <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded-lg">Next</button>
              </div>
            </div>
          )}

          {step === 2 && constructionType === 'flat' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Flat Details</h2>
              <label className="block mb-2">
                Floors Above Ground:
                <input
                  type="number"
                  name="floorsAbove"
                  value={formData.floorsAbove}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Floors Below Ground:
                <input
                  type="number"
                  name="floorsBelow"
                  value={formData.floorsBelow}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Base Depth (in meters):
                <input
                  type="number"
                  name="baseDepth"
                  value={formData.baseDepth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-4">
                Number of Apartments:
                <input
                  type="number"
                  name="apartments"
                  value={formData.apartments}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
                <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded-lg">Next</button>
              </div>
            </div>
          )}

          {step === 2 && constructionType === 'tenement' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tenement Details</h2>
              <label className="block mb-2">
                Floors Above Ground:
                <input
                  type="number"
                  name="floorsAbove"
                  value={formData.floorsAbove}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Floors Below Ground:
                <input
                  type="number"
                  name="floorsBelow"
                  value={formData.floorsBelow}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Base Depth (in meters):
                <input
                  type="number"
                  name="baseDepth"
                  value={formData.baseDepth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-4">
                Number of Stores:
                <input
                  type="number"
                  name="stores"
                  value={formData.stores}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
                <button onClick={nextStep} className="bg-green-500 text-white px-4 py-2 rounded-lg">Next</button>
              </div>
            </div>
          )}

          {step === 2 && constructionType === 'commercial' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Commercial Details</h2>
              <label className="block mb-2">
                Floors Above Ground:
                <input
                  type="number"
                  name="floorsAbove"
                  value={formData.floorsAbove}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-2">
                Floors Below Ground:
                <input
                  type="number"
                  name="floorsBelow"
                  value={formData.floorsBelow}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <label className="block mb-4">
                Number of Vehicles:
                <input
                  type="number"
                  name="vehicles"
                  value={formData.vehicles}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </label>
              <div className="flex justify-between">
                <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EnvironmentalImpactForm;