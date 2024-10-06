import React from 'react'

const Form = ({ placeholder, label, type, onChange, name, value }) => {
   return (
      <div className="w-full max-w-xs">
         <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
         <input
            type={type}
            name={name}
            value={value}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
            onChange={onChange}
         />
      </div>
   )
}

export default Form