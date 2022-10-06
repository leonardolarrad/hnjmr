

import { getUser } from '../api/auth'
import { InstagramEmbed } from 'react-social-media-embed';

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export default function HomePage() {

  const user = getUser();
  const posts = [
    'CgzSuCysoRe',
    'CORPTK0nV_5',
    'CXnzsUfudrl',
    'CX8tXaaOfQE',
    'CdQoRTnOwRL',
    'Cf3y2VvgiQ3',
    'CjJnLRzu011',
    'Cf-Yb4lswPc',    
    'CdjPpeGu-1c',
    'CdS-sTVOOn5',
    'Ccn2CL2u69i',
    'CcG9_AHM8T_',
    'Cbz-lvEuoG5',
    'CbYT0ZDu3sJ',
    'Ca7xYonO5pc',
    'CZ1zoTQusTj',
    'CY90oVJO7jK',
    'CUv0TCGsE6U',
    'CUdfTw1MtF9',
    'CUddau6MtKD',
    'CSfuvR_MmMb',
    'COeGpzPMoON',
    'CMsVLR8MTbA',
    'CK4t8XFMQUR',
    'CJ38Sqxs2In',
    'CJRFW03sHeo',
    'CJPFRwbsMXY',
    'CHiYnHdMyv1',
    'CHXqGI_Mduo',
    'CGV30y3MtX7',
    'CDjhTLcscIM',
    'CEAQte_ss2r',
    'CC06bSjsyfj',
    'CCmNn6UMbbo',
    'CBtNotWMgJL'
  ]

  shuffleArray(posts);
  const selected = posts.slice(0, 9);
   
  return (    
      <div className="flex flex-col justify-start  items-center w-full h-full space-y-4 space-x-4 overflow-y-auto overflow-x-clip p-4">
        
        <div className="flex flex-col justify-center w-fit h-fit mb-16 mt-8">
          <h1 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300 h-fit mb-8">
            ¡Bienvenido de vuelta, <span className="bg-clip-text bg-gradient-to-tr from-cream-1 to-cream-2">{user.fullName.split(" ")[0]}</span>!
          </h1>
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 h-fit">
            Sistema de Gestión <br/><span className="bg-clip-text bg-gradient-to-tr from-cream-1 to-cream-2">Hospital de Niños Dr. J. M. de los Ríos</span>
          </h1>

        </div>

        <div className="items-center content-center columns-1 sm:columns-1 md:columns-2 xl:columns-3 2xl:columns-4 w-full h-fit">

          {selected.map((post, index) => (  
            <InstagramEmbed key={index} url={`https://www.instagram.com/p/${post}/`} width={323} />
          ))} 


        </div>

      </div>
    
  );
}