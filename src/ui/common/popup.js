import Button from "./button";
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

export default function Popup({title, message, show, onAccept, onCancel, isLoading}) {

  if (!show) 
    return null;

  return (
    <div className="  z-50 fixed top-0 bottom-0 left-0 right-0 
                      flex flex-col w-full h- justify-center items-center 
                      bg-black bg-opacity-90 ">
      
      <div className="flex flex-col w-[400px] h-fit justify-between h-min-fit  space-y-2 
                      bg-light-1 dark:bg-dark-1 rounded-lg shadow-lg shadow-dark-1 dark:shadow-black">

        
        <div>
          <div className="w-full h-[5px]  bg-gradient-to-r from-cream-1  to-cream-2 rounded-t-lg mb-2 "></div>
          
          <div className="flex flex-row ">
            

            {isLoading && 
              <div className="flex flex-row justify-center items-center w-fit pl-2">
              
                <TailSpin  stroke='#a82654' strokeWidth={1.5}  width="60px" height="60px"/>

              </div>
            }
            
            <div className='flex flex-col'>
              <div className="flex w-full h-fit items-center py-1 px-2 pl-4 ">
                {title && <h1 className="text-left text-lg text-black dark:text-white">{title}</h1>}
              </div>

              <div className="flex w-full h-fit justify-start pl-4 items-center p-2">
                {message && <h1 className="text-gray-700 dark:text-gray-300">{message}</h1>}
              </div>
            </div>

          </div>

          
        </div>
        

        <div>
          <div className="flex w-row h-fit justify-end items-center p-2 space-x-2">
            { onAccept && <Button text="Aceptar" onClick={onAccept} /> }
            { onCancel && <Button text="Cancelar" onClick={onCancel} /> }
          </div>
        </div>

      </div>

    </div>
  );
}