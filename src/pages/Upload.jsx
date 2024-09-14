import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = ({ onFontUploaded }) => {
  const [selectedFont, setSelectedFont] = useState(null);
  const [preview, setPreview] = useState(''); 
  const navigate = useNavigate();

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
              navigate('/');
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
    
    <div className='container m-auto'>

        <div className='mt-5 mb-5'>
          <textarea 
            className='p-3 border-solid border-dashed border-2 border-gray-400 '
            value={preview}
            onChange={handlePreviewTextChange}
            placeholder="Enter preview text here"
            rows="4"
            cols="187"
          />
        </div>
        <div className="flex items-center justify-center w-full">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"  fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Only TTF file allow</p>
                </div>
                <input id="dropzone-file"  className="hidden"
                  type="file" 
                  accept=".ttf" 
                  onChange={handleFontChange} 
                />
            </label>
        </div> 

    </div>
  );
};

export default Upload;
