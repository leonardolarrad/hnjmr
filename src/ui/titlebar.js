// Icons
import { ReactComponent as MinimizeIcon } from '../assets/icons/minimize.svg';
import { ReactComponent as MaximizeIcon } from '../assets/icons/maximize.svg';
import { ReactComponent as RestoreIcon }  from '../assets/icons/restore.svg';
import { ReactComponent as CloseIcon }    from '../assets/icons/close.svg';

import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/moon.svg';

export default function Titlebar() {
    return (
        <div className=" flex flex-row h-[36px] w-full justify-between bg-light-1 dark:bg-dark-1 ">
            <span className="title-bar-drag flex w-full" />
            <div className="flex flex-row justify-end items-center h-full">
                <button  
                    className="flex items-center justify-center w-12 h-full
                               hover:bg-light-2 dark:hover:bg-dark-2"
                >
                    <SunIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 " />
                </button>
                <span className="flex w-8"/>
                <button  
                    className="flex items-center justify-center w-12 h-full
                               hover:bg-light-2 dark:hover:bg-dark-2"
                    onClick={() => window.win.minimize()}
                >
                    <MinimizeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 " />
                </button>
                <button  
                    className="flex items-center justify-center w-12 h-full
                               hover:bg-light-2 dark:hover:bg-dark-2"
                >
                    <MaximizeIcon className="w-5 h-5 rotate-180 text-gray-700 dark:text-gray-300"/>
                </button>
                <button  
                    className="flex items-center justify-center w-12 h-full
                               hover:bg-red-700  hover:text-gray-300 text-gray-700 dark:text-gray-300"
                >
                    <CloseIcon className="w-5 h-5"/>
                </button>
            </div>   
        </div>
    );
}