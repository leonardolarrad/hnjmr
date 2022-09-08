import React from "react";
import { ReactComponent as CancelIcon } from './../../assets/icons/cancel.svg';

export default function Searchbar({onSearch, onClear, placeholder}) {

  const [search, setSearch] = React.useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  }

  const handleClear = () => {
    setSearch('');
    onClear();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.value);
  }

  return (
    <div className="flex flex-row rounded-full justify-end w-full h-fit space-x-2 p-2 px-3
                  text-gray-800 dark:text-gray-200 bg-light-2 dark:bg-dark-2">
      <form className="flex w-full" 
        onSubmit={handleSubmit}
      >
        <input 
          className="flex flex-row w-full bg-transparent outline-none pl-2 
                    placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none" 
          type="text" 
          placeholder={placeholder ? placeholder : "Pruebe buscando un nombre o una fecha ..." }
          value={search}
          onChange={handleChange}
        />
      </form>
      
      <button onClick={handleClear}>
        <CancelIcon />
      </button>
    </div>
  );
}
