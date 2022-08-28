import wave from './../../assets/waves/lwave.svg';

export default function WaveHeader(props) {
  return (        
    <div 
    className="flex flex-col w-auto h-24 rounded-xl
                bg-light-4 dark:bg-dark-4 bg-no-repeat bg-bottom bg-cover"
    style={{ backgroundImage: `url(${wave})`}}             
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