
import ContentHeader                      from "./../common/content-header";
import Button                             from "./../common/button";
import { ReactComponent as BackIcon }     from './../../assets/icons/cancel.svg';
import { ReactComponent as DesktopIcon }  from './../../assets/icons/report.svg';
import { ReactComponent as PrintIcon }  from './../../assets/icons/print.svg';

import { useNavigate }                    from "react-router-dom";
import { useState }                       from "react";

export default function SuppliesReport() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ from:'1900-01-01', to:'2100-01-01' });

  return (

    <>    
    <div className="flex flex-col justify-center space-y-4 w-full h-full overflow-auto">
      <div id='scroll' className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">
        
        {/* Header */}
       
        <ContentHeader 
          primary icon={DesktopIcon} 
          title='Generador de reportes' 
          subtitle="Seleccione el intervalo de fechas requerido y genere un reporte" />
        
        {/* Form */}
        <div className="flex flex-col space-y-6">

          {/* Row 2 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            
            {/* Nombre */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha inicial</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">desde</label>
              </div>
              <input 
                name="name"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.from}
                onChange={e => setForm({ ...form, from: e.target.value })}
              />
            </div> 

            {/* Correo */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha final</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">hasta</label>
              </div>
              <input 
                name="email"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.to}
                onChange={e => setForm({ ...form, to: e.target.value })}
              />
            </div> 
          </div>
        </div>

          {/* Row 3 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
                   
          </div>

      </div>
      <div className="flex flex-row justify-center space-x-2 items-center w-full h-fit pb-2"> 
       <Button primary icon={PrintIcon} text="Imprimir" onClick={() => {navigate('/')}}/>
        <Button icon={BackIcon} text="Cancelar" onClick={() => {navigate('/')}}/>  
      </div>
    </div>
    </>
  );
}