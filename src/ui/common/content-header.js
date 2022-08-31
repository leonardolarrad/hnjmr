import React from "react";

export default function ContentHeader(props) {

  const className = " flex flex-col w-auto h-[74px] rounded-xl " +
                    " bg-no-repeat bg-bottom bg-cover  "   +
                    (props.primary 
                    ? " wave-l bg-cream-3 " 
                    : " bg-light-4 dark:bg-dark-4 ");

  const titleClass = " font-medium text-2xl " +
                    (props.primary
                    ? " text-white "
                    : " text-black dark:text-white ");

  const subtitleClass = " text-base " +
                    (props.primary  
                    ? " text-gray-200 "
                    : " text-gray-800 dark:text-gray-200 ");

  const iconClass = " flex items-center justify-center pl-4 " +
                    (props.primary
                    ? " text-white "
                    : " text-gray-800 dark:text-gray-200 ");

  return (        
    <div 
    className={className}         
    >
      <div className="flex flex-row justify-start items-center h-[72px] w-full space-x-1">
      {props.icon && <div className={iconClass}>{React.createElement(props.icon, {className: "w-10 h-10"})}</div>}
        <div className="flex flex-col justify-start h-full py-2 pl-2"> 
          <h1 className={titleClass}>{props.title}</h1>
          <h2 className={subtitleClass}>{props.subtitle}</h2>
        </div>        
        {props.children && 
          <div className="flex flex-row justify-end items-center h-full p-2 pr-4 ">
            {props.children}
          </div>
        }
      </div>  
    </div>
  );
  }