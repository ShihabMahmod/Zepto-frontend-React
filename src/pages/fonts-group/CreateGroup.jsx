import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [fonts, setFonts] = useState([]);
  const [selectedFonts, setSelectedFonts] = useState([]);

  const fontsList = async() =>{
    const fontList = await  axios.get('http://localhost/api/public/index.php?action=listFonts');
    setFonts(fontList.data);
  }

  useEffect(() => {
    fontsList();
  }, []);

  const handleAddRow = () => {
    setSelectedFonts([...selectedFonts, ""]);
  };

  const handleSelectChange = (e, index) => {
    const newSelectedFonts = [...selectedFonts];
    newSelectedFonts[index] = e.target.value;
    setSelectedFonts(newSelectedFonts);
  };

  const handleSubmit = async () => {
    if (selectedFonts.length < 2) {
      alert("Please select at least two fonts.");
      return;
    }
    const formData = new FormData();
    formData.append("name", groupName);
    selectedFonts.forEach((font, index) => {
      formData.append(`font_id[${index}]`, font);
    });

    try {
      const response = await axios.post('http://localhost/api/public/FontGroup.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data); // Handle the response from the server
      alert('Font group created successfully!');
    } catch (error) {
      console.error(error); // Handle any errors
      alert('Failed to create font group.');
    }
  };

  return (
    <div>
      <h2>Create Font Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      {selectedFonts.map((_, index) => (
        <select key={index} onChange={(e) => handleSelectChange(e, index)}>
          <option value="">Select Font</option>
          {fonts.map((font) => (
            <option key={font.id} value={font.id}>
              {font.name}
            </option>
          ))}
        </select>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleSubmit}>Submit Group</button>
    </div>
  );
};

export default CreateGroup;
