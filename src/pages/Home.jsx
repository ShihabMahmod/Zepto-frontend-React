import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Fonts from '../components/Fonts';
import { Link } from 'react-router-dom';

const Home = () => {
  const [fonts, setFonts] = useState([]);

  const fontsList = async() =>{
    const fontList = await  axios.get('http://localhost/api/public/index.php?action=listFonts');
    setFonts(fontList.data);
  }

  useEffect(() => {
    fontsList();
  }, []);


  const handleDelete = async (id) => {
    try {
      // Make a POST request with _method=DELETE query parameter
      const url = `http://localhost/api/public/index.php?_method=DELETE&id=${id}`;
      const response = await axios.post(url);

      if (response.data.status === 'success') {
        alert('Font deleted successfully');
        setFonts(fonts.filter(font => font.id !== id)); // Remove deleted font from the list
      } else {
        alert(response.data.message || 'Failed to delete font');
      }
    } catch (error) {
      console.error('Error deleting font:', error);
      alert('Error deleting font');
    }
  };

  return (
    <div className='container m-auto text-center items-center'>
      <h2 className='text-left'>Font List</h2>
      <div>
       
        <table className="min-w-full bg-white border border-gray-200 ">
        <thead>
          <tr className="w-full bg-gray-100">
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase">
              Age
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {fonts.map((item,index)=>(
          <tr key={index}>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
            {item.name}
            </td>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
              {item.preview}
            </td>
             <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
              </td>
              
        </tr>
        ))}
        </tbody>
      </table>
         
       
      </div>
    </div>
  );
};
export default Home;
