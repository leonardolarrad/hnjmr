import { useState, useEffect } from 'react';

export default function Swtich({optionA, optionB, onSwitch }) {

  const [selected, setSelected] = useState(optionA);

  useEffect(() => {
    onSwitch(selected);
  } , [selected, onSwitch]);

  const activeStyle = " text-black dark:text-white bg-light-1 dark:bg-dark-3 ";
  const inactiveStyle = " text-gray-400 dark:text-gray-600 bg-light-4 dark:bg-dark-4 ";

  return (
    <div className="flex flex-row rounded-lg w-full h-fit  bg-light-4 dark:bg-dark-4 p-1">
      <button 
        className={" flex flex-row items-center justify-center w-full h-fit rounded-l-lg p-2 "  +
                    (selected.key === optionA.key ? activeStyle : inactiveStyle)}
        onClick={() => { setSelected(optionA) }}
      >
        {optionA.value}
      </button>
      <button 
        className={" flex flex-row items-center justify-center w-full h-fit rounded-r-lg p-2 " +
                    (selected.key === optionB.key ? activeStyle : inactiveStyle)}
        onClick={() => { setSelected(optionB) }}
      >
        {optionB.value}
      </button>
    </div>
  );
}