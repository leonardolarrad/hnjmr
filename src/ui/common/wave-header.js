import wave from './../../assets/waves/lwave.svg';

export default function WaveHeader({title, subtitle}) {
  return (        
    <div 
    className="flex flex-col w-auto h-24 mx-4 my-1 rounded-xl
                bg-light-4 dark:bg-dark-4 bg-no-repeat bg-bottom bg-cover"
    style={{ backgroundImage: `url(${wave})`}}             
    >
      <div className="flex flex-col justify-start h-full p-2 px-4"> 
        <h1 className="font-medium text-white text-2xl">{title}</h1>
        <h2 className="text-gray-100 text-base">{subtitle}</h2>
      </div>
        
    </div>
  );
}