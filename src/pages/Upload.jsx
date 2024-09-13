import React, { useState } from 'react';
import axios from 'axios';

const Upload = ({ onFontUploaded }) => {
  const [selectedFont, setSelectedFont] = useState(null);
  const [preview, setPreview] = useState(''); 

  const handleFontChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (fileExtension === 'ttf') { 
        console.log(file);

        const formData = new FormData();
        formData.append("font", file);  
        formData.append("preview", preview);
        console.log(formData.get("font"));
    
        axios.post('http://localhost/api/public/index.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(response => {
            const data = response.data;
            console.log(response);
            if (data.success) {
              alert('Font uploaded successfully');
            } else {
              alert(data.message);
            }
          })
          .catch((error) => {
            console.error('Error during font upload:', error);
          });
      } else {
        alert("Only TTF files are allowed.");
      }
    } else {
      alert("No file selected.");
    }
  };

  const handlePreviewTextChange = (e) => {
    setPreview(e.target.value); 
  };

  return (
    <div>
   
      <textarea 
        value={preview}
        onChange={handlePreviewTextChange}
        placeholder="Enter preview text here"
        rows="4"
        cols="50"
      />
      <br />

     
      <input 
        type="file" 
        accept=".ttf" 
        onChange={handleFontChange} 
      />
    </div>
  );
};

export default Upload;
