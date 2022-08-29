
export default function WaveHeader(props) {
  return (        
    <div 
    className="wave-l flex flex-col w-auto h-24 rounded-xl mb-2
               bg-no-repeat bg-bottom bg-cover bg-cream-3"          
    >
      <div className="flex flex-row justify-between items-center h-fit w-full space-x-1">
        <div className="flex flex-col justify-start h-full p-2 px-4"> 
          <h1 className="font-medium text-white text-2xl">{props.title}</h1>
          <h2 className="text-gray-100 text-base">{props.subtitle}</h2>
        </div>        
        {props.children && 
          <div className="flex flex-row justify-end items-center h-fit p-2 pr-4 ">
            {props.children}
          </div>
        }
      </div>

    </div>
  );
}