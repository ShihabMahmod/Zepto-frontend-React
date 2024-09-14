import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FontGroupList = () => {
  const [group, setGroup] = useState([]);

  const fontsList = async() =>{
    const groupList = await  axios.get('http://localhost/api/public/FontGroup.php?action=listFontGroups');
    setGroup(groupList.data);
  }
  useEffect(() => {
    fontsList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost/api/public/FontGroup.php?_method=DELETE&id=${id}`;
      const response = await axios.post(url);
      if (response.data.status === 'success') {
        alert('Font deleted successfully');
        setGroup(group.filter(font => font.id !== id));
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
      <h2 className='text-left text-xl font-bold'>Our Font Groups</h2>
      <h5 className='text-left mb-5'>List of all availeable groups</h5>
      <div>
       
        <table className="min-w-full bg-white border border-gray-200 ">
        <thead>
          <tr className="w-full bg-gray-100">
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase">
              Fonts
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {group.map((item,index)=>(
          <tr key={index}>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
            {item.group_name}
            </td>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
              {item.custom_names}
            </td>
             <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
                <Link to={`/edit-group/${item.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                  </Link>
             
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
export default FontGroupList;

