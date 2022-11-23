
import ContentHeader                      from "../common/content-header";
import Button                             from "../common/button";
import Popup                              from "./../common/popup";
import { ReactComponent as BackIcon }     from './../../assets/icons/cancel.svg';
import { ReactComponent as DesktopIcon }  from './../../assets/icons/report.svg';
import { ReactComponent as PrintIcon }    from './../../assets/icons/print.svg';

import { useNavigate }                    from "react-router-dom";
import { useState }                       from "react";

import { jsPDF }                          from "jspdf";
import "jspdf-autotable";

import header                            from "./../../assets/report/header_oficial.jpg";

export default function SuppliesReport() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ from:'1900-01-01', to:'2100-01-01' });
  const [modal, setModal] = useState({});

  const print = () => {

    setModal({
      show: true,
      title: 'Reporte de insumos',
      message: 'Generando reporte ...',
      isLoading: true,
    });

    // Fetch report 
    fetch('https://hnjmr-j3fs.onrender.com/api/lots?limit=9999999999999999')
      .then(response => response.json())
      .then(data => {

        // filter data by date 'from' and date 'to'
        data = data.filter(item => {
          const date = new Date(item.date_delivery);
          return date >= new Date(form.from) && date <= new Date(form.to);
        });

        // Create table
        const tableHeader = [
          'Número', 'Material', 'Cantidad', 'Fecha de entrega', 'Fecha de vencimiento', 'Proveedor',
        ]

        const tableBody = data.map(row => [
          ((row.id_lots * 5139857 * 5139857) % 10000000), 
          row.medicalSupply.name_material + ' ' + row.medicalSupply.description,
          row.stock,
          row.date_delivery,
          row.due_date ?? 'N/A',
          row.supplier ? row.supplier.name_supplier : 'No especificado'
        ]);

        const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

        // Create pdf
        let doc = new jsPDF();
        console.log(doc);

        doc.addImage(header, 'JPG', 3, 3, 202.522666667, 19.812, undefined, false);
        doc.setTextColor(70,70,70);
        doc.setFontSize(7);
        doc.text('Hospital de Niños Dr. J. M. de los Ríos.', 15, 24);
        doc.text('Reporte de insumos médicos. Generado a fecha ' + date + '.', 15, 27) ;

        //doc.addImage(header, 'PNG', 10, 10, 2392, 234, undefined, false);
        
        // Add table to pdf
        doc.autoTable({
          head: [tableHeader],
          body: tableBody,
          theme: 'grid',
          styles: {
            fontSize: 8,
            cellPadding: 1,
            overflow: 'linebreak',
            cellWidth: 'wrap',
          },
          columnStyles: {
            0: { cellWidth: 15 },
            1: { cellWidth: 66.7793333333 },
            2: { cellWidth: 20 },
            3: { cellWidth: 25 },
            4: { cellWidth: 25 },
            5: { cellWidth: 30 },
          },
          headStyles: {
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            fontSize: 7,
          },
          bodyStyles: {
            fontSize: 8,
          },
          margin: { top: 30 },          
        });

        // Generate report
        
        const filename = 'HNJMR - REPORTE INSUMOS - ' + date + '.pdf';
        doc.output('dataurlnewwindow', filename);

        setModal({
          show: true,
          title: 'Reporte generado',
          message: 'El reporte se ha generado satisfactoriamente.',
          onAccept: () => setModal({ show: false }),
        });
      })
      .catch(error => {
        console.error('Error:', error);
        setModal({
          show: true,
          title: 'Error',
          message: 'No se pudo generar el reporte',
          onAccept: () => setModal(modal => ({ show: false })),
        });
      });
  }

  return (

    <>    
    <div className="flex flex-col justify-center space-y-4 w-full h-full overflow-auto">
      <div id='scroll' className="flex flex-col p-2 space-y-3 w-full h-full overflow-auto">
        
        <Popup
          show={modal.show}
          title={modal.title}
          message={modal.message}
          onAccept={modal.onAccept}
          onCancel={modal.onCancel}
          isLoading={modal.isLoading}
        />

        {/* Header */}
       
        <ContentHeader 
          primary icon={DesktopIcon} 
          title='Generador de reportes' 
          subtitle="Reporte de insumos médicos." />
        
        {/* Form */}
        <div className="flex flex-col space-y-6">
          {/* Row 3 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6 mt-2 text-gray-700 dark:text-gray-300">          
            <p>
              Rellene los campos para generar un reporte especializado según los parametros que necesite. 
              Posteriormente haga click en <b>Generar</b>, se abrirá una nueva ventana donde podrá visualizar, descargar o imprimir el reporte. 
            </p>
          </div>

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

        

      </div>
      <div className="flex flex-row justify-center space-x-2 items-center w-full h-fit pb-2"> 
       <Button primary icon={PrintIcon} text="Generar" onClick={() => {print()}}/>
        <Button icon={BackIcon} text="Cancelar" onClick={() => {navigate(-1)}}/>  
      </div>
    </div>
    </>
  );
}