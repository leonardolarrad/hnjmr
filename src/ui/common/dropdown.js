import React from "react";

export default function Dropdown({items, onSelect}) {
  
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSelect(e.target.value);
  }
    
  return (
    <select className="p-2 rounded-lg h-fit border-none outline-none 
                       focus:outline-none text-gray-800 
                       dark:text-gray-200 bg-light-2 dark:bg-dark-2 " 
      onChange={handleChange}
      value={value}
    >
      {items.map(item => (
        <option 
          className=" "
          value={item.value}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
}