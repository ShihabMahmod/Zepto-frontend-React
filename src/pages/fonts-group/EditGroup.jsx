import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditGroup = () => {
    
  const [groupName, setGroupName] = useState('');
  const [fonts, setFonts] = useState([]);
  const [selectedFonts, setSelectedFonts] = useState([]);
  
  const { groupId } = useParams();
  console.log(groupId);
  const fontsList = async () => {
    const fontList = await axios.get('http://localhost/api/public/index.php?action=listFonts');
    setFonts(fontList.data);
  };

  const fetchGroupDetails = async () => {
    const response = await axios.get(`http://localhost/api/public/FontGroup.php?action=getGroup&group_id=${groupId}`);
    const groupData = response.data;
    setGroupName(groupData.group_name);
    setSelectedFonts(groupData.font_ids); 
  };

  useEffect(() => {
    fontsList();
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

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
    formData.append("id", groupId); 
    formData.append("name", groupName);
    selectedFonts.forEach((font, index) => {
      formData.append(`font_id[${index}]`, font);
    });

    try {
      const response = await axios.post(`http://localhost/api/public/FontGroup.php?action=updateGroup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data); // Handle the response from the server
      alert('Font group updated successfully!');
    } catch (error) {
      console.error(error); // Handle any errors
      alert('Failed to update font group.');
    }
  };

  return (
    <div>
      <h2>Edit Font Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      {selectedFonts.map((fontId, index) => (
        <select key={index} value={fontId} onChange={(e) => handleSelectChange(e, index)}>
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

export default EditGroup;
