import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Fonts = (props) => {
  return (
        <tr>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
            {props.name}
            </td>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
              {props.preview}
            </td>
            <td className="px-6 py-4 text-left border-b border-gray-200 text-sm">
              <Link>Delete</Link>
            </td>
        </tr>
  )
};

export default Fonts;
