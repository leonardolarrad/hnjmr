// Components & icons
import ContentHeader from "../common/content-header";
import Button        from "../common/button";
import Swtich        from "../common/switch";
import Searchbar     from "../common/searchbar";

import { ReactComponent as PackageIcon }  from './../../assets/icons/package.svg';
import { ReactComponent as DonationIcon } from './../../assets/icons/donate.svg';
import { ReactComponent as EditIcon }     from './../../assets/icons/edit.svg';
import { ReactComponent as AddIcon }      from './../../assets/icons/add.svg';
import { ReactComponent as SaveIcon }     from './../../assets/icons/save.svg';
import { ReactComponent as CancelIcon }   from './../../assets/icons/cancel.svg';

// React hooks
import { useState, useEffect }    from "react";
import { useNavigate, useParams } from "react-router-dom";

// Util
import {formatDate} from './../../util/date';
import Popup from "../common/popup";

export default function SuppliesEditor() {

  const navigate = useNavigate();

  const { id } = useParams();
  const [ supplies, setSupplies ] = useState([]);
  const [ suppliers, setSuppliers ] = useState([]);
  const [ selectedSupply, setSelectedSupply ] = useState({});
  const [ selectedSupplier, setSelectedSupplier ] = useState(0);
  const [ search, setSearch ] = useState('');
  const [ option, setOption ] = useState(1);  
  const [ modal, setModal ] = useState({
    show: false, 
    title: '', 
    message: '', 
    onAccept: () => setModal(modal => ({ ...modal, show: false }))
  });
  
  const [form, setForm] = useState({
    name: '',
    desc: '',
    stock:'',
    date: formatDate(Date.now()),
    dueDate: '',
    supplierId: null
 });

  /* Fetch lots */
  useEffect(() => {
    if (!id) return;

    fetch('/api/lots/'+id, { headers: {"accepts": "application/json"}})
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.medicalSupply.name_material,
          desc: data.medicalSupply.description ?? '',
          stock: data.stock,
          date: data.date_delivery,
          dueDate: data.due_date ?? '',
          supplierId: data.supplier ? data.supplier.id_suppliers : 0,
        });
        setSelectedSupply(data.medicalSupply);
        setSelectedSupplier(data.supplier ? data.supplier.id_suppliers : 0);
        console.log(data);
      })
      .catch(error => {
        setModal(modal => ({         
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal(modal => ({ ...modal, show: false })),                
        }))        
      });
  },[id]);

  /* Fetch supplies */
  useEffect(() => {

    fetch('/api/medical-supplies?limit=999999999999999999&search='+search, 
    { headers: {"accepts": "application/json"}})
      .then(res => res.json())
      .then(supplies => {
        setSupplies(supplies);
      })
      .catch(error => {
        setModal(modal => ({         
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal(modal => ({ ...modal, show: false })),                
        }))        
      });

  },[search]);

  /* Fetch selected supply */
  useEffect(() => {
    setForm(form => ( { ...form,
      name: option === 1 ? selectedSupply.name_material : '', 
      desc: option === 1 ? (selectedSupply.description ? selectedSupply.description : '') : '',
    }));
    
    const isScrolledIntoView = (el) => {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
  
      // Only completely visible elements return true:
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      // Partially visible elements return true:
      //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
  }

    if (document.getElementById(selectedSupply.id_medical_supplies) && 
        document.getElementById('scroll') ) {

        if (!isScrolledIntoView(document.getElementById(selectedSupply.id_medical_supplies))) {
          document.getElementById(selectedSupply.id_medical_supplies).scrollIntoView(); 
          document.getElementById(selectedSupply.id_medical_supplies).scrollIntoView();          
          document.getElementById('scroll').scrollTo(0, 0);
        }
    }
  },[selectedSupply, option]);

  /* Fetch suppliers */
  useEffect(() => {
    fetch('/api/lots/suppliers/all', { headers: {"accepts": "application/json"}})
      .then(res => res.json())
      .then(suppliers => {
        setSuppliers(suppliers); console.log(suppliers);
      })
      .catch(error => {
        setModal(modal => ({         
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal(modal => ({ ...modal, show: false })),                
        }))        
      });
  } ,[]);

  /* Fetch selected supplier */
  useEffect(() => {
    setForm(form => ({ ...form, supplierId: selectedSupplier }));
  },[selectedSupplier]);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSave = () => {
        
    /* Validate form */

    let error = '';

    if (!form.stock || isNaN(form.stock) || form.stock < 0 )
       error = "La cantidad del lote debe ser un número. Por favor ingrese un número mayor a cero.";

    if (!form.stock || form.stock === '' ) 
      error = "Existen campos obligatorios vacios. Por favor rellene los campos requeridos.";

    if (!form.name || form.name === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Insumo'.";

    if (!form.date || form.date === "")
      error = "Existen campos obligatorios vacios. Por favor rellene el campo 'Fecha de entrega'.";

    if (option === 1 && (!selectedSupply || !selectedSupply.id_medical_supplies))
      error = "Debe seleccionar un insumo en la lista de insumos existentes.";

    if (error !== '') {
      setModal(modal => ({ 
        show: true, title: 'Error', message: error,
        onAccept: () => setModal(modal => ({ ...modal, show: false }))
      }));
      return;
    }

    setModal({
      show: true,
      title: 'Guardando registro',
      message: 'Por favor espere...',
      isLoading: true,
    });

    /* Create or update medical supply */
      
    const requestOptions = {
      method: option === 1 ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name_material: form.name,
        description: form.desc ?? null, 
      })
    };

    fetch('/api/medical-supplies/'+(option===1 ? selectedSupply.id_medical_supplies : ''), requestOptions)
      .then(response => response.json())
      .then(data => {
                
        /* Create or update lot */

        const requestOptions = {
          method: id ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stock: parseInt(form.stock),
            date_delivery: form.date,          
            due_date: form.dueDate === "" ? null : form.dueDate,
            id_medical_supplies: parseInt(data.id_medical_supplies),
            id_suppliers: parseInt(form.supplierId),
          })
        };

        fetch('/api/lots/'+(id ?? ''), requestOptions)
          .then(response => response.json())
          .then(lot => {
            
            /* When creating a new lot, show message and then redirect */

            const message = id ? 
              'El insumo se ha actualizado correctamente.' : 
              'El insumo se ha creado correctamente.';

            setModal(modal => ({
              show: true, 
              title: 'Registro de insumo', 
              message: message,
              onAccept: () => { modal.show = false; navigate(-1);},
            }));
          })
          .catch(error => setModal(modal => ({            
            show: true,
            title: 'Error al guardar',            
            message: 'No se pudo guardar el registro. Intente de nuevo más tarde.',
            more: error,
            onAccept: () => setModal(modal => ({ ...modal, show: false })),      
          })));
      }) 
      .catch(error => {
        setModal(modal => ({         
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal(modal => ({ ...modal, show: false })),                
        }))        
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
        {id && 
          <ContentHeader 
          primary icon={EditIcon} 
          title='Editar insumo' 
          subtitle="Edite un insumo médico almacenado en el servidor" />
        }
        {!id && 
          <ContentHeader 
          primary icon={AddIcon} 
          title='Crear insumo' 
          subtitle="Crear un insumo, especificando su material, lote de despacho y proveedor" />
        }      

        {/* Tab page */}
        <div className="flex flex-col space-y-6 px-12 w-full h-80">

          <Swtich 
              className=""
              optionA={{key: 1, value:"Seleccionar un material existente"}}
              optionB={{key: 2, value:"Registrar un nuevo material"}}
              onSwitch={(selected) => { setOption(selected.key) }} 
            />
          {/* Table */}
          {option === 1 && 
          
          <div className="space-y-2">          
          <div className="flex flex-col  w-full h-52 bg-light-4 dark:bg-dark-4 overflow-auto rounded-lg">
            {
              supplies.map(supply => (
                
                <div 
                  id={supply.id_medical_supplies}
                  key={supply.id_medical_supplies}
                  className={" flex flex-row space-x-2 w-full items-center select-none " +
                             "  " +
                             (selectedSupply && supply.id_medical_supplies === selectedSupply.id_medical_supplies
                              ? " bg-cream-1 text-white " : " hover:bg-light-3 hover:dark:bg-dark-3 ")}

                  onClick={() => { setSelectedSupply(supply); console.log(selectedSupply) }}                                
                >
                  <div className={" pl-4 font-medium " + 
                                (selectedSupply && supply.id_medical_supplies === selectedSupply.id_medical_supplies
                              ? " text-white " : " text-gray-900 dark:text-gray-100 ")}>
                    {supply.name_material}
                  </div>
                  <div className={" text-sm " + (selectedSupply && supply.id_medical_supplies === selectedSupply.id_medical_supplies
                              ? " text-white " : " text-gray-700 dark:text-gray-300 ")}>
                    {supply.description}
                  </div>
                </div>
            ))}
          </div>
          <Searchbar 
            placeholder="Busque un insumo por su nombre"
            onSearch={(search) => { setSearch(search) }}
            onClear= {() => { setSearch('') }}
          />
          </div>
          
          }
        </div>


        <table className="table-fixed border-separate border-spacing-y-4 border-spacing-x-10 px-2  place-self-center w-full"> 
          <tbody className="w-full">
           
            <tr className="w-full">

              {/* Name */}
              <td key='name' className="flex flex-col justify-center">
                <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Insumo</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">nombre del material</label>
                </div>
                <input 
                  name="name"
                  className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                           bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                  value={form.name}
                  onChange={handleChange}
                />
              </td>
              
              {/* Desc */}
              <td key='desc'>
                <label className="text-left text-sm text-light-1 dark:text-dark-1 select-none pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Descripción</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">propiedades y detalles</label>
                </div>
                <input 
                  name="desc"
                  className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                           bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                  value={form.desc}
                  onChange={handleChange}
                />              
              </td>

            </tr>
          </tbody>
        </table>

        <ContentHeader icon={PackageIcon} title='Lote' subtitle="Paquete de insumos despachados en una fecha determinada"/>
         
        <table className="table-fixed border-separate border-spacing-y-4 border-spacing-x-10 px-2  place-self-center w-full"> 
          <tbody className="w-full">
            <tr className="w-full">

              {/* Delivery date */}
              <td key='delivery_date'>
                <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de entrega</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
                </div>
                <input 
                  name="date"
                  className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                           bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                  value={form.date}
                  onChange={handleChange}
                />                 
              </td>

              {/* Stock*/}
              <td key='stock'>
                <label className="text-left text-sm text-cream-1 pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Cantidad</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">despachada o almacenada</label>
                </div>
                <input 
                  name="stock"                  
                  className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                           bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                  value={form.stock}
                  onChange={handleChange}
                />            
              </td>

            </tr>
            <tr className="w-full">
              
              {/* Due date */}
              <td key='due_date'>
                <label className="text-left text-sm text-light-1 dark:text-dark-1 select-none pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de vencimiento</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
                </div>
                <input 
                  name="dueDate"
                  className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                           bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                  value={form.dueDate}
                  onChange={handleChange}
                />                
              </td>
              
            </tr>
          </tbody>
        </table>

        <ContentHeader icon={DonationIcon} title='Proveedor' subtitle="Organización, ente jurídico o donante proveedor"/>

        <table className="table-fixed border-separate border-spacing-y-4 border-spacing-x-10 px-2  place-self-center w-full"> 
          <tbody className="w-full">
            <tr className="w-full">
              
              {/* Supplier */}
              <td key='supplier_name'>
                <label className="text-left text-sm text-light-1 dark:text-dark-1 select-none pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Proveedor</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">natural o jurídico</label>
                </div>
                <select className="p-2 rounded-lg h-fit border-none outline-none w-full min-w-[100px]
                                   focus:outline-none text-gray-800 
                                 dark:text-gray-200 bg-light-2 dark:bg-dark-2 " 
                     
                      value={selectedSupplier}
                      onChange={(e) => {setSelectedSupplier(e.target.value)}}
                      
                    >
                      <option
                        key={0}
                        value={0}                        
                      >
                          No especificado
                      </option>
                      {suppliers && suppliers.map(item => (
                        <option 
                          key={item.id_suppliers}
                          value={item.id_suppliers}
                        >
                          {item.name_supplier}
                        </option>
                      ))}
                      
                </select>
              </td>

              {/* Empty */}
              <td key='empty-space' className="invisible">
                <label className="text-left text-sm text-light-1 dark:text-dark-1 select-none pb-0.5">* Obligatorio</label>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de vencimiento</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">formato aaaa-mm-dd</label>
                </div>
                <input 
                  name="empty"
                  className="flex flex-nowrap w-full min-w-[100px] h-fit rounded-lg p-2 outline-none
                           bg-light-2 dark:bg-dark-2 text-black dark:text-white  "
                  
                />                
              </td>

            </tr>
          </tbody>
        </table>

      </div>
      <div className="flex flex-row justify-center space-x-2 items-center w-full h-fit pb-2">
        <Button icon={SaveIcon} primary text="Guardar" onClick={handleSave}/>
        <Button icon={CancelIcon} text="Cancelar" onClick={() => {navigate(-1)}}/>
      </div>
    </div>
    </>
  );
}