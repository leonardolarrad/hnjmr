// Components & icons
import ContentHeader from "../common/content-header";
import Button from "../common/button";

import { ReactComponent as SupplyIcon }   from './../../assets/icons/vaccine.svg';
import { ReactComponent as PackageIcon }  from './../../assets/icons/package.svg';
import { ReactComponent as DonationIcon } from './../../assets/icons/donate.svg';
import { ReactComponent as BackIcon } from './../../assets/icons/back.svg';

// React hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hash algorithm for generating unique keys
import {xxHash32} from 'js-xxhash';

export default function SuppliesViewer({id}) {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  var crc32 = require("crc-32/crc32c");

  useEffect(() => {
    fetch('/api/lots/1', { headers: {"accepts": "application/json"}})
      .then(res => res.json())
      .then(data => {
        setData(data); console.log(data);
      })
      .catch(error => console.error('Error:', error));
  },[id]);


  return (
    <div className="flex flex-col justify-between space-y-4 w-full h-full overflow-auto">
      <div className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">
        
        <ContentHeader primary icon={SupplyIcon} title='Insumo médico' subtitle="Información relacionada al tipo de material o insumo" />
        
        <table className="table-column items-start border-separate border-spacing-y-4 border-spacing-x-2 px-2"> 
          <tbody>
            <tr>

              {/* UUUID*/}
              <td key='uuid'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Código</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">identificador único</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.id_lots && xxHash32(data.id_lots.toString())}
                </div>
              </td>

            </tr>
            <tr>

              {/* Name */}
              <td key='name'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Insumo</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">nombre del material</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {'Aguja de Biopsia renal'}
                </div>              
              </td>
              
              {/* Desc */}
              <td key='desc'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Descripción</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">propiedades y detalles</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {'14g x 100mm'}
                </div>              
              </td>

            </tr>
          </tbody>
        </table>

        <ContentHeader icon={PackageIcon} title='Lote' subtitle="Paquete de insumos despachados en una fecha determinada"/>
         
        <table className="table-column items-start border-separate border-spacing-y-4 border-spacing-x-2 px-2 "> 
          <tbody>
            <tr>

              {/* Delivery date */}
              <td key='delivery_date'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de entrega</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">llegó el día</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.date_delivery && data.date_delivery}
                </div>                
              </td>

              {/* Stock*/}
              <td key='stock'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Cantidad</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">despachada o almacenada</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.stock && data.stock}
                </div>                
              </td>

              

            </tr>
            <tr>
              
              {/* Due date */}
              <td key='due_date'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Fecha de vencimiento</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">vence el</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {data.date_delivery && data.date_delivery}
                </div>                
              </td>

              {/* Due date */}
              <td key='state'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Estado</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">¿vencido?</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {'No vencido'}
                </div>                
              </td>
              
            </tr>
          </tbody>
        </table>


        <ContentHeader icon={DonationIcon} title='Proveedor' subtitle="Organización, ente jurídico o donante proveedor"/>

        <table className="table-column items-start border-separate border-spacing-y-4 border-spacing-x-2 px-2"> 
          <tbody>
            <tr>

              {/* Supplier name */}
              <td key='supplier_name'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Proveedor</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">natural o jurídico</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {'Ministerio de salud'}
                </div>
              </td>

            </tr>
            <tr>

              {/* Supplier phone */}
              <td key='supplier_phone'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Télefono</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600">de contacto</label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {'+56988888888'}
                </div>              
              </td>
              
              {/* Supplier address */}
              <td key='desc'>
                <div className="flex flex-row pl-1 items-end space-x-1">
                  <label className="text-left font-medium text-lg text-gray-900 dark:text-gray-100">Dirección</label>
                  <label className="text-left text-sm text-gray-400 dark:text-gray-600"></label>
                </div>
                <div className="w-64 bg-light-2 dark:bg-dark-2 text-black dark:text-white  h-fit rounded-lg p-2">
                  {'Av. de la Libertad, Santiago'}
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