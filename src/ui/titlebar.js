import React from "react";

import { ReactComponent as MinimizeIcon } from '../assets/icons/minimize.svg';
import { ReactComponent as MaximizeIcon } from '../assets/icons/maximize.svg';
import { ReactComponent as RestoreIcon }  from '../assets/icons/restore.svg';
import { ReactComponent as CloseIcon }    from '../assets/icons/close.svg';
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/moon.svg';


export default function Titlebar() {

  const [theme, setTheme] = React.useState('light');
  const [isMaximized, setIsMaximized] = React.useState(false);

  window.ipc.handleToggleTheme((event, value) => setTheme(value));
  window.ipc.handleMaximizeChanged((event, value) => setIsMaximized(value));

  return (
    <div className="flex flex-none flex-row h-[36px] min-h-fit w-full justify-between bg-light-1 dark:bg-dark-1 ">
      <span className="title-bar-drag flex w-full" />
      <div className="flex flex-row justify-end items-center h-full">
        
        {/* Theme toggle */}
        {theme === 'light' &&  
          <button  
            className="flex items-center justify-center w-12 h-full
                        hover:bg-light-2 dark:hover:bg-dark-2"
            onClick={() => window.ipc.toggleTheme()}
          >
            <SunIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 " />
          </button>        
        }
        {theme === 'dark' &&
          <button  
            className="flex items-center justify-center w-12 h-full
                        hover:bg-light-2 dark:hover:bg-dark-2"
            onClick={() => window.ipc.toggleTheme()}
          >
            <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 " />
          </button>
        } 
        
        <span className="title-bar-drag flex w-8 h-full"/>
        
        {/* Minimize */}
        <button  
          className="flex items-center justify-center w-12 h-full
                      hover:bg-light-2 dark:hover:bg-dark-2"
          onClick={() => window.ipc.minimize()}
        >
          <MinimizeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 " />
        </button>

        {/* Restore */}
        {isMaximized && 
          <button  
            className="flex items-center justify-center w-12 h-full
                        hover:bg-light-2 dark:hover:bg-dark-2"
            onClick={() => window.ipc.restore()}
          >
            <RestoreIcon className="w-5 h-5 rotate-180 text-gray-700 dark:text-gray-300"/>
          </button>
        }

        {/* Maximize */}
        {!isMaximized &&
        <button  
          className="flex items-center justify-center w-12 h-full
                      hover:bg-light-2 dark:hover:bg-dark-2"
          onClick={() => window.ipc.maximize()}
        >
          <MaximizeIcon className="w-5 h-5 rotate-180 text-gray-700 dark:text-gray-300"/>
        </button>
        }
        
        
        {/* Close */}
        <button  
          className="flex items-center justify-center w-12 h-full
                      hover:bg-red-700  hover:text-gray-300 text-gray-700 dark:text-gray-300"
          onClick={() => window.ipc.close()}
        >
          <CloseIcon className="w-5 h-5"/>
        </button>

      </div>   
    </div>
  );
}