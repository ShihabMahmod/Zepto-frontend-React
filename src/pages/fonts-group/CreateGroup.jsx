import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [fonts, setFonts] = useState([]);
  const [rows, setRows] = useState([{ font: '', name: '' }]);

  const fontsList = async () => {
    try {
      const fontList = await axios.get('http://localhost/api/public/index.php?action=listFonts');
      setFonts(fontList.data);
    } catch (error) {
      console.error('Error fetching fonts:', error);
    }
  };

  useEffect(() => {
    fontsList();
  }, []);

  const handleAddRow = () => {
    setRows([...rows, { font: '', name: ''}]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rows.length < 2) {
      alert('Please select at least two fonts.');
      return;
    }

    const formData = new FormData();
    formData.append('name', groupName);
    rows.forEach((row, index) => {
      formData.append(`font_id[${index}]`, row.font);
      formData.append(`names[${index}]`, row.name);
    });

    try {
      const response = await axios.post('http://localhost/api/public/FontGroup.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Font group created successfully!');
    } catch (error) {
      console.error('Error creating font group:', error);
      alert('Failed to create font group.');
    }
  };

  return (
    <div className="container m-auto my-8 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Font Group</h2>
      <p className="text-gray-600 mb-6">You have to select at least two fonts</p>

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Group Title"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {rows.map((row, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            {/* Font Name Dropdown */}
            <div className="flex-1">
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={row.font}
                onChange={(e) => handleInputChange(index, 'font', e.target.value)}
              >
                <option value="">Select a Font</option>
                {fonts.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <input
                type="text"
                
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Specific name"
                value={row.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              />
            </div>

 
            <div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveRow(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}


      <div className='flex justify-between'>
        <div className="mb-6">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleAddRow}
            >
              + Add Row
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create
            </button>
          </div>
      </div>
      
      </form>
    </div>
  );
};

export default CreateGroup;
