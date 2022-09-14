
import ContentHeader from "../common/content-header";
import Button        from "../common/button";

import { ReactComponent as EditIcon }     from './../../assets/icons/edit.svg';
import { ReactComponent as AddIcon }      from './../../assets/icons/add.svg';
import { ReactComponent as BackIcon }     from './../../assets/icons/back.svg';
import { ReactComponent as SaveIcon }     from './../../assets/icons/save.svg';
import { ReactComponent as CancelIcon }   from './../../assets/icons/cancel.svg';

import { useState, useEffect }    from "react";
import { useNavigate, useParams } from "react-router-dom";

import { formatDate } from './../../util/date';
import Popup from "../common/popup";

export default function AssetsEditor({mode}) {

  const navigate = useNavigate();

  const { id } = useParams();    
  const [ modal, setModal ] = useState({});  
  const [form, setForm] = useState({
    name: '',
    description: '',
    status:'',
    note:'',
    date_acquisition: formatDate(Date.now()),
    date_discontinued: formatDate(Date.now()),
    storage: '',
    source: '',
    destination: '',
 });
 
  useEffect(() => {
    if (!id) 
      return;

    fetch('/api/national-assets/'+id, { headers: {"accepts": "application/json"}})
      .then(res => res.json())
      .then(asset => {
        
        if (asset.statusCode && asset.statusCode !== 200) {
          setModal(modal => ({         
            show: true,
            title: 'Error interno',
            message: 'Ha ocurrido un error inesperado.',
            onAccept: () => setModal({ show: false }),                
          }));
          return;
        }

        setForm({
          name: asset.name ?? '',
          description: asset.description ?? null,
          status: asset.status ?? '',
          note: asset.note ?? null,
          date_acquisition: asset.date_acquisition ?? formatDate(Date.now()),
          date_discontinued: asset.date_discontinued ?? formatDate(Date.now()),
          storage: asset.storage ?? '',
          source: asset.source ?? '',
          destination: asset.destination ?? null,
        });
      })
      .catch(error => {
        setModal(modal => ({         
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
          onAccept: () => setModal({ show: false }),                
        }))        
      });
  },[id]);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSave = () => {
        
    // Validate form
    let error = '';
       
    if (!form.source || form.source === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Fuente'.";
      
    if (!form.storage || form.storage === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Sector o Almacen'.";  
      
    if (!form.status || form.status === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Estado'.";
      
    if (!form.date_discontinued || form.date_discontinued === "") 
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Fecha de depreciación'.";

    if (!form.date_acquisition || form.date_acquisition === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Fecha de adquisición'.";

    if (!form.name || form.name === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Nombre'.";

    if (error !== '') {
      setModal({ 
        show: true, title: 'Error', message: error,
        onAccept: () => setModal({show: false })
      });
      return;
    }

    setModal({
      title: id ? 'Guardando registro' : 'Creando registro',
      message: 'Por favor espere...',
      isLoading: true,
      show: true,
    });

    // Send http request     
    const requestOptions = {
      method: id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        description: (form.description !== "") ? form.description : null,
        status: form.status,
        note: (form.note !== '') ? form.note : null,
        date_acquisition: form.date_acquisition,
        date_discontinued: form.date_discontinued,
        storage: form.storage,
        source: form.source,
        destination: (form.destination !== '') ? form.destination : null,
      })
    };

    fetch('/api/national-assets/' + (id ? id : ''), requestOptions)
      .then(response => response.json())
      .then(data => {
        
        if (data.statusCode && data.statusCode !== 200) {
          setModal(modal => ({
            title: 'Error interno',
            message: 'Ha ocurrido un error inesperado.',
            show: true,
            onAccept: () => setModal({ show: false }),
          }));  
          return;
        }

        const message = id ? 
          'El registro se ha actualizado correctamente.' : 
          'El registro se ha creado correctamente.';

        setModal({
          show: true, 
          title: 'Bienes nacionales', 
          message: message,
          onAccept: () => { setModal({ show: false}); navigate(-1);},
        });
      }) 
      .catch(error => {
        setModal({         
          show: true,
          title: 'Error al guardar',
          message: 'No se pudo guardar el registro. Intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal({ show: false }),                
        })        
      });          
  };

  return (

    <>    
    <div className="flex flex-col justify-center space-y-4 w-full h-full overflow-auto">
      <div id='scroll' className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">
        
        <Popup 
          show={modal.show} 
          title={modal.title} 
          isLoading={modal.isLoading}
          message={modal.message} 
          onAccept={modal.onAccept}
        />        
          
        {/* Header */}
        {mode === 'view' && 
          <ContentHeader 
          primary icon={EditIcon} 
          title='Bienes nacionales' 
          subtitle="Equipo médico, equipo de oficina u otros bienes" />
        }
        {mode === 'edit' && 
          <ContentHeader 
          primary icon={EditIcon} 
          title='Editar bienes nacionaless' 
          subtitle="Edición de equipo y mobiliario encargado al hospital" />
        }
        {mode === 'add' && 
          <ContentHeader 
          primary icon={AddIcon} 
          title='Registrar bienes nacionales' 
          subtitle="Registro de equipo y mobiliario encargado al hospital" />
        }      

        {/* Form */}
        <div className="flex flex-col space-y-6">

          {/* Row 1 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* Name */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Nombre</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">del bien nacional</label>
              </div>
              <input 
                name="name"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.name}
                onChange={handleChange}
              />
            </div>
            
          </div>

          {/* Row 2 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            
            {/* Description */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Descripción</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">detalles y propiedades</label>
              </div>
              <textarea 
                name="description"
                className="flex flex-nowrap w-full min-w-[100px] h-24 rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* Adquisition date */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de adquisición</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">recibido el</label>
              </div>
              <input 
                name="date_acquisition"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.date_acquisition}
                onChange={handleChange}
              />
            </div>
            {/* date_discontinued */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de depreciación</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">calculada para el</label>
              </div>
              <input 
                name="date_discontinued"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.date_discontinued}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">      
            {/* Status */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Estado</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">del equipo</label>
              </div>
              <input 
                name="status"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.status}
                onChange={handleChange}
              />
            </div>    
            {/* storage */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
              <div className="flex flex-row pl-1 w-full justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Sector o almacén</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">donde se encuentra el equipo</label>
              </div>
              <input 
                name="storage"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.storage}
                onChange={handleChange}
              />
            </div>
            
          </div>

          {/* Row 6 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* source */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Proveedor</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">quien proporcionó el equipo</label>
              </div>
              <input 
                name="source"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.source}
                onChange={handleChange}
              />
            </div>
            {/* destination */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Destino</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">a donde se retornará el equipo</label>
              </div>
              <input 
                name="destination"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.destination}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 8 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            
            {/* Note */}
            <div className="flex flex-col h-full w-1/2 justify-end">
              
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Nota</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">detalles opcionales</label>
              </div>
              <textarea 
                name="note"
                className="flex flex-nowrap w-full min-w-[100px] h-24 rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.note}
                onChange={handleChange}
              />
            </div>
          </div>

        </div>

      </div>
      <div className="flex flex-row justify-center space-x-2 items-center w-full h-fit pb-2">
        { mode !== 'view' &&
          <>
            <Button icon={SaveIcon} primary text="Guardar" onClick={handleSave}/>
            <Button icon={CancelIcon} text="Cancelar" onClick={() => {navigate(-1)}}/>          
          </>
        }
        {
          mode === 'view' && 
          <Button icon={BackIcon} text="Volver" onClick={() => {navigate(-1)}}/>  
        }
      </div>
    </div>
    </>
  );
}