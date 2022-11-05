
import ContentHeader from "./common/content-header";
import { ReactComponent as DesktopIcon }  from './../assets/icons/settings.svg';
import { getUser } from "../api/auth";

export default function SettingsPage() {

  const user = getUser();

  return (

    <>    
    <div className="flex flex-col justify-center space-y-4 w-full h-full overflow-auto">
      <div id='scroll' className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">
        
        {/* Header */}
       
        <ContentHeader 
          primary icon={DesktopIcon} 
          title='Configuración' 
          subtitle="Cuenta de usuario" />
        
        {/* Form */}
        <div className="flex flex-col space-y-6">

          {/* Row 1 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* Id */}
            <div className="flex flex-col h-full w-1/2 justify-end pr-3">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">ID</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">identificador de la cuenta</label>
              </div>
              <input 
                name="id"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={user.id}
                disabled
              />
            </div>            
          </div>

          {/* Row 2 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            
            {/* Nombre */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Nombre completo</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="name"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={user.fullName}
                disabled
              />
            </div> 

            {/* Correo */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Correo eléctronico</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="email"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={user.email}
                disabled
              />
            </div> 
          </div>
        </div>

          {/* Row 3 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* Id */}
            <div className="flex flex-col h-full w-1/2 justify-end pr-3">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Rol</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">privilegios de la cuenta</label>
              </div>
              <input 
                name="role"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={user.roles.includes('admin') ? 'Administrador' : 'Usuario'}
                disabled
              />
            </div>            
          </div>

      </div>
      
    </div>
    </>
  );
}