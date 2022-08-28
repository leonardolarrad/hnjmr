import React from "react";

export default function Button({text, icon, primary, onClick}) {
  
  const style = primary 
    ? " bg-gradient-to-r from-cream-1 to-cream-2 hover:bg-gradient-to-br " + 
      " font-medium text-white dark:text-white "
    : " text-gray-800 dark:text-gray-200 " +
      " bg-light-2 hover:bg-light-3 dark:bg-dark-2 dark:hover:bg-dark-3 ";

  const className = " rounded-lg p-2 h-fit flex w-max " +
                      style;

  return (
    <button className={className} onClick={onClick}>
      <div className="flex flex-row space-x-1">
        {icon && <div className="text-gray-800 dark:text-gray-200">{React.createElement(icon)}</div>}
        {text && <span>{text}</span>}
      </div>
    </button>
  );
}
