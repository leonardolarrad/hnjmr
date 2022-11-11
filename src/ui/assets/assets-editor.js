
import ContentHeader from "../common/content-header";
import Button        from "../common/button";

import { ReactComponent as EditIcon }     from './../../assets/icons/edit.svg';
import { ReactComponent as AddIcon }      from './../../assets/icons/add.svg';
import { ReactComponent as BackIcon }     from './../../assets/icons/back.svg';
import { ReactComponent as SaveIcon }     from './../../assets/icons/save.svg';
import { ReactComponent as CancelIcon }   from './../../assets/icons/cancel.svg';
import { ReactComponent as DesktopIcon }  from './../../assets/icons/desktop.svg';
import { ReactComponent as BuildingIcon }  from './../../assets/icons/building.svg';

import { useState, useEffect }    from "react";
import { useNavigate, useParams } from "react-router-dom";

import Popup from "../common/popup";
import { towers } from "./assets-config";

export default function AssetsEditor({mode}) {

  const navigate = useNavigate();

  console.log(towers.find(tower => tower.name === 'Hospital'));

  const { id } = useParams();    
  const [ modal, setModal ] = useState({});  
  const [form, setForm] = useState({
    group: '00',
    subgroup: '00',
    section: '',
    num: '',
    desc: '',
    tower: '',
    floor: '',
    room: '',
    serial: '',
    cin: '',
    unit_value: null,
    quantity: null
 });
 
  useEffect(() => {
    if (!id) 
      return;

    fetch('https://hnjmr-j3fs.onrender.com/api/assets/'+id, { headers: {"accepts": "application/json"}})
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
          group: asset.group,
          subgroup: asset.subgroup,
          section: asset.section,
          num: asset.num,
          desc: asset.desc,
          tower: asset.tower,
          floor: asset.floor,
          room: asset.room,
          serial: asset.serial,
          cin: asset.cin,
          unit_value: asset.unit_value,
          quantity: asset.quantity
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
       
    if (!form.group || form.group === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Grupo'.";
    
    if (!form.subgroup || form.subgroup === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Subgrupo'.";

    if (!form.num || form.num === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Número'.";

    if (!form.desc || form.desc === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Descripción'.";

    if (form.quantity && form.quantity !== '' && isNaN(form.quantity))
      error = "El campo 'Cantidad' debe ser un número.";

    if (form.unit_value && form.unit_value !== '' && isNaN(form.unit_value))
      error = "El campo 'Valor unitario' debe ser un número.";

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

    console.log(form);

    // Send http request     
    const requestOptions = {
      method: id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        group: form.group,
        subgroup: form.subgroup,
        section: form.section !== '' ? form.section : null,
        num: form.num,
        desc: form.desc,
        tower: form.tower !== '' ? form.tower : null,
        floor: form.floor !== '' ? form.floor : null,
        room: form.room !== '' ? form.room : null,
        serial: form.serial !== '' ? form.serial : null,
        cin: form.cin !== '' ? form.cin : null,
        unit_value: form.unit_value !== '' ? parseInt(form.unit_value) : null,
        quantity: form.quantity !== '' ? parseInt(form.quantity) : null
      })
    };

    fetch('https://hnjmr-j3fs.onrender.com/api/assets/' + (id ? id : ''), requestOptions)
      .then(response => response.json())
      .then(data => {
        
        console.log(data);

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
          title: 'Activos y bienes', 
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
      <Popup 
          show={modal.show} 
          title={modal.title} 
          isLoading={modal.isLoading}
          message={modal.message} 
          onAccept={modal.onAccept}
        />   

    <div className="flex flex-col justify-center space-y-4 w-full h-full overflow-auto">
      <div id='scroll' className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">
        
             
          
        {/* Header */}
        {mode === 'view' && 
          <ContentHeader 
          primary icon={DesktopIcon} 
          title='Bienes y activos' 
          subtitle="Equipo médico, equipo de oficina u otros bienes" />
        }
        {mode === 'edit' && 
          <ContentHeader 
          primary icon={EditIcon} 
          title='Actualizar bienes y activos' 
          subtitle="Edición de equipo y mobiliario del hospital" />
        }
        {mode === 'add' && 
          <ContentHeader 
          primary icon={AddIcon} 
          title='Registrar bienes y activos' 
          subtitle="Registro de equipo y mobiliario del hospital" />
        }      

        {/* Form */}
        <div className="flex flex-col space-y-6">

          {/* Row 1 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* Group */}
            <div className="flex flex-col h-full w-1/6 justify-end">
              {mode !== 'view' && <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>}              
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Grupo</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="group"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.group}
                onChange={handleChange}
                disabled={mode === 'view'}

              />
            </div>
            {/* Subgrpup */}
            <div className="flex flex-col h-full w-1/6 justify-end">
              {mode !== 'view' && <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>}              
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Subgrupo</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="subgroup"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.subgroup}
                onChange={handleChange}
                disabled={mode === 'view'}
              />
            </div>
            {/* section */}
            <div className="flex flex-col h-full w-1/6 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Sección</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="section"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.section}
                onChange={handleChange}
                disabled={mode === 'view'}
              />
            </div>
            {/* num */}
            <div className="flex flex-col h-full w-1/2 justify-end ">
              {mode !== 'view' && <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>}              
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Número de identificación</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="num"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.num}
                onChange={handleChange}
                disabled={mode === 'view'}

              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            
            {/* desc */}
            <div className="flex flex-col h-full w-full justify-end ">
              {mode !== 'view' && <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>}
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">                
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Descripción</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">detalles y propiedades</label>
              </div>
              <textarea 
                name="desc"
                className="flex flex-nowrap w-full min-w-[100px] h-16 rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.desc}
                onChange={handleChange}
                disabled={mode === 'view'}
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">          
            {/* serial */}
            <div className="flex flex-col h-full w-1/2 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Serial</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="serial"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.serial}
                onChange={handleChange}
                disabled={mode === 'view'}

              />
            </div>
            {/* cin */}
            <div className="flex flex-col h-full w-1/2 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">CIN</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="cin"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.cin}
                onChange={handleChange}
                disabled={mode === 'view'}
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">      
            {/* quantity */}
            <div className="flex flex-col h-full w-1/2 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Cantidad</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="quantity"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.quantity}
                onChange={handleChange}
                disabled={mode === 'view'}

              />
            </div>
            {/* unit_value */}
            <div className="flex flex-col h-full w-1/2 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Valor unitario</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <input 
                name="unit_value"
                className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                          bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                value={form.unit_value}
                onChange={handleChange}
                disabled={mode === 'view'}
              />
            </div>            
          </div>
          <ContentHeader 
          icon={BuildingIcon} 
          title='Ubicación' 
          subtitle="Torre, piso y habitación en donde está localizado un activo" />
          {/* Row 6 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6">                 
            {/* tower */}
            <div className="flex flex-col h-full w-1/3 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Torre</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <select className="p-2 rounded-lg h-fit border-none outline-none w-full min-w-[100px]
                                   focus:outline-none text-gray-800 
                                 dark:text-gray-200 bg-light-2 dark:bg-dark-2 disabled:opacity-100 disabled:appearance-none" 
                     
                      value={form.tower}
                      onChange={(e) => {setForm(form => ({...form, tower: e.target.value, floor: '', room: ''}))}}
                      disabled={mode === 'view'}
                    >
                      <option key={0} value={''} >No especificado</option>
                      {towers && towers.map(item => (
                        <option 
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                </select>
            </div>
            {/* floor */}
            <div className="flex flex-col h-full w-1/3 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Piso</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <select className="p-2 rounded-lg h-fit border-none outline-none w-full min-w-[100px]
                                   focus:outline-none text-gray-800 
                                 dark:text-gray-200 bg-light-2 dark:bg-dark-2 disabled:opacity-100 disabled:appearance-none" 
                     
                      value={form.floor}
                      onChange={(e) => {setForm(form => ({...form, floor: e.target.value, room: ''}))}}
                      disabled={mode === 'view'}
                    >
                      <option key={0} value={''} >No especificado</option>
                      {towers.find(e => e.name === form.tower) 
                      && towers.find(e => e.name === form.tower).floors.map(item => (
                        <option 
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                </select>
            </div>
            {/* room */}
            <div className="flex flex-col h-full w-1/3 justify-end">             
              <div className="flex flex-row pl-1 justify-start items-end space-x-1">
                <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Habitación</label>
                <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
              </div>
              <select className="p-2 rounded-lg h-fit border-none outline-none w-full min-w-[100px]
                                   focus:outline-none text-gray-800 
                                 dark:text-gray-200 bg-light-2 dark:bg-dark-2 disabled:opacity-100 disabled:appearance-none" 
                     
                      value={form.room}
                      onChange={(e) => {setForm(form => ({...form, room: e.target.value}))}}
                      disabled={mode === 'view'}
                    >
                      <option key={0} value={''} >No especificado</option>
                      { 
                        towers.find(e => e.name === form.tower) && 
                        towers.find(e => e.name === form.tower).floors.find(e => e.name === form.floor) &&
                        towers.find(e => e.name === form.tower).floors.find(e => e.name === form.floor).rooms.map(item => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                </select>
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