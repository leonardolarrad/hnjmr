// import save icon
import { ReactComponent as SaveIcon } from '../assets/icons/save.svg';

import Button from "./common/button";
import Titlebar from './titlebar';

export default function App() {
  return (

    <div className="flex flex-col h-screen w-screen">
      <Titlebar />
      <div className="flex flex-col justify-center items-center h-screen w-full bg-light-1 dark:bg-dark-1">
        <div className="flex space-x-2">
      
          <Button text="Change theme" icon={SaveIcon} onClick={()=> {} } />
          <Button text="Change theme" primary onClick={()=> {} } />

        </div>
      </div>
    </div>
    
  )
}
