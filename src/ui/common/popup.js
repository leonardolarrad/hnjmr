import Button from "./button";

export default function Popup({title, message, show,  onAccept, onCancel}) {

  if (!show) 
    return null;

  return (
    <div className="  z-0 fixed top-0 bottom-0 left-0 right-0 
                      flex flex-col w-full h- justify-center items-center 
                      bg-black bg-opacity-90 ">
      
      <div className="flex flex-col w-[400px] h-fit justify-between h-min-fit  space-y-2 
                      bg-light-1 dark:bg-dark-1 rounded-lg shadow-lg shadow-dark-1 dark:shadow-black">

        
        <div>
          <div className="w-full h-[5px]  bg-gradient-to-r from-cream-1  to-cream-2 rounded-t-lg"></div>
          <div className="flex w-full h-fit  items-center p-2 pl-4  ">
            {title && <h1 className="text-left font-semibold text-black dark:text-white">{title}</h1>}
          </div>

          <div className="flex w-full h-fit justify-start pl-4 items-center p-2">
            {message && <h1 className="text-gray-900 dark:text-gray-100">{message}</h1>}
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