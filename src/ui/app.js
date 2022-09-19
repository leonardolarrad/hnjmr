import { Route, Routes } from "react-router-dom";
import LoginPage         from "./auth/login-page";
import SingupPage        from "./auth/singup-page";
import Dashboard         from './dashboard';
import Titlebar          from './titlebar';

export default function App() {
  return (

    <div className="flex flex-col h-screen w-screen">
      {window.ipc && 
        <Titlebar />
      }
      <div 
        className="flex flex-col justify-center items-center 
                   h-screen w-full overflow-auto bg-light-1 dark:bg-dark-1"
      >
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/login"      element={<LoginPage />} />
          <Route path="/signup"     element={<SingupPage />} />
        </Routes>            
      </div>
    </div>
    
  )
}
