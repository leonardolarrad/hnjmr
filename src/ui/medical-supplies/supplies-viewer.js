// Components & icons
import ContentHeader from "../common/content-header";
import Button from "../common/button";
import Popup from "../common/popup";

import { ReactComponent as SupplyIcon }   from './../../assets/icons/vaccine.svg';
import { ReactComponent as PackageIcon }  from './../../assets/icons/package.svg';
import { ReactComponent as DonationIcon } from './../../assets/icons/donate.svg';
import { ReactComponent as BackIcon } from './../../assets/icons/back.svg';

// React hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Hash algorithm for generating unique keys
import { hash } from "./../../util/hash";

export default function SuppliesViewer() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const [modal, setModal ] = useState({
    show: false, 
    title: '', 
    isLoading: false,
    message: '',  
    onAccept: () => setModal(modal => ({ ...modal, show: false })),
    onCancel: null
  });

  useEffect(() => {
    
    fetch('https://hnjmr-server.onrender.com/api/lots/'+id, { headers: {"accepts": "application/json"}})
      .then(res => res.json())
      .then(data => {

        if (data.error) {

          setModal(modal => ({
            ...modal,
            show: true,
            title: 'Error interno de servidor',
            message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
            onAccept: () => setModal(modal => ({...modal, show: false}))
          }));

          return;
        }

        setData(data);
      })
      .catch(error => {

        setModal(modal => ({
          ...modal,
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Compruebe su conexión a internet e intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal(modal => ({...modal, show: false}))
        }));
      });
  },[id, navigate]);

  return (
    <div className="flex flex-col justify-center space-y-4 w-full h-full overflow-auto">
      <div className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">

        <Popup
          show={modal.show}
          title={modal.title}
          message={modal.message}
          onAccept={modal.onAccept}
          onCancel={modal.onCancel}
        />

        <ContentHeader primary icon={SupplyIcon} title='Insumo médico' subtitle="Información relacionada al tipo de material o insumo" />
                
        <table className="table-fixed border-separate border-spacing-y-4 border-spacing-x-10 px-2  place-self-center w-full"> 
          <tbody className="w-full">
            <tr className="w-full ">

              {/* UUUID*/}
              <td key='uuid' className="justify-center">
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Código</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">identificador único</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.id_lots && hash(data.id_lots.toString())}
                </div>
              </td>

            </tr>
            <tr className="w-full">

              {/* Name */}
              <td key='name'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Insumo</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">nombre del material</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.medicalSupply && data.medicalSupply.name_material}
                </div>              
              </td>
              
              {/* Desc */}
              <td key='desc'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Descripción</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">propiedades y detalles</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px]  bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.medicalSupply && data.medicalSupply.description}
                </div>              
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
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de entrega</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">llegó el día</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.date_delivery && data.date_delivery}
                </div>                
              </td>

              {/* Stock*/}
              <td key='stock'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Cantidad</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">despachada o almacenada</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.stock && data.stock}
                </div>                
              </td>

            </tr>
            <tr className="w-full">
              
              {/* Due date */}
              <td key='due_date'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de vencimiento</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">vence el</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.due_date && data.due_date}
                </div>                
              </td>

              {/* State */}
              <td key='state'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Estado</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">¿vencido?</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.due_date  && ((new Date(data.due_date) < Date.now()) ? 'Vencido' : 'No vencido')}
                </div>                
              </td>
              
            </tr>
          </tbody>
        </table>


        <ContentHeader icon={DonationIcon} title='Proveedor' subtitle="Organización, ente jurídico o donante proveedor"/>

        <table className="table-fixed border-separate border-spacing-y-4 border-spacing-x-10 px-2  place-self-center w-full"> 
          <tbody className="w-full">
            <tr className="w-full">

              {/* Supplier name */}
              <td key='supplier_name'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Proveedor</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">natural o jurídico</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  { data.supplier && data.supplier.name_supplier }
                </div>
              </td>

            </tr>
            <tr className="w-full">

              {/* Supplier phone */}
              <td key='supplier_phone'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Télefono</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5">de contacto</label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  { data.supplier && data.supplier.phone }
                </div>              
              </td>
              
              {/* Supplier address */}
              <td key='desc'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Dirección</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600 pb-0.5"></label>
                </div>
                <div className="flex flex-nowrap w-full min-w-[100px] bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  { data.supplier && data.supplier.address }
                </div>              
              </td>

            </tr>
          </tbody>
        </table>

      </div>
      <div className="flex flex-row justify-center items-center w-full h-fit pb-2">
        <Button icon={BackIcon} text="volver" onClick={() => {navigate(-1)}}/>
      </div>
    </div>
  );
}