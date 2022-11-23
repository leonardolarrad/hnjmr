
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
import { towers  } from "./assets-config";

export default function AssetsReport() {

  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    tower: '',
    floor: '',
    room: '', 
  });
  const [modal, setModal] = useState({});

  const print = () => {

    setModal({
      show: true,
      title: 'Reporte de bienes y activos',
      message: 'Generando reporte ...',
      isLoading: true,
    });

    // Fetch report 
    fetch('https://hnjmr-j3fs.onrender.com/api/assets?limit=9999999999999999')
      .then(response => response.json())
      .then(data => {

        if (form.tower !== '') {
          data = data.filter(item => item.tower === form.tower);
        }

        if (form.floor !== '') {
          data = data.filter(item => item.floor === form.floor);
        }

        if (form.room !== '') {
          data = data.filter(item => item.room === form.room);
        }
        

        // Create table
        const tableHeader = [
          'Grupo', 'Subgrupo', 'Sección', 'Número de identificación', 
          'Descripción', 'Ubicación', 
          'Serial', 'CIN', 'Cantidad', 'Valor unitario'
        ]

        // format if room exists: Tower, Floor, Room
        // format if floor exists but not room: Tower, Floor
        // format if tower exists but not floor: Tower
        const location = (item) => {
          let location = '';
          if (item.tower) location += item.tower;
          if (item.floor) location += ', ' + item.floor;
          if (item.room) location += ', ' + item.room;
          return location !== '' ? location : 'No especificado.';
        }

        const tableBody = data.map(row => [
          row.group ?? '00', row.subgroup ?? '00', row.section ?? 'N/A', row.num ?? '000000',
          row.desc ?? 'Sin descripción.', location(row), 
          row.serial ?? 'N/A', row.cin ?? 'N/A', row.quantity ?? 'N/A', row.unit_value ?? 'N/A'
        ]);

        console.log(tableBody);

        const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

        // Create pdf
        let doc = new jsPDF();

        doc.addImage(header, 'JPG', 3, 3, 202.522666667, 19.812, undefined, false);
        doc.setTextColor(60,60,60);
        doc.setFontSize(7);
        doc.text('Hospital de Niños Dr. J. M. de los Ríos.', 15, 24);
        doc.text('Reporte de Bienes y Activos. Generado a fecha ' + date + '.', 15, 27) ;
        
        // Add table to pdf
        doc.autoTable({
          head: [tableHeader],
          // get only first 1000 rows body
          body: tableBody,
          theme: 'grid',
          styles: {
            fontSize: 8,
            cellPadding: 1,
            overflow: 'linebreak',
            cellWidth: 'wrap',
          },
          columnStyles: {
            0: { cellWidth: 8 },
            1: { cellWidth: 8 },
            2: { cellWidth: 8 },
            3: { cellWidth: 20 },
            4: { cellWidth: 50 },
            5: { cellWidth: 30 },
            6: { cellWidth: 13 },
            7: { cellWidth: 13 },
            8: { cellWidth: 13 },
            9: { cellWidth: 13 },
          },
          headStyles: {
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            fontSize: 6,
          },
          bodyStyles: {
            fontSize: 6,
          },
          margin: { top: 30 },          
        });
        
        // Generate report
        
        const filename = 'HNJMR - REPORTE BIENES Y ACTIVOS - ' + date + '.pdf';
        
        if (tableBody.length < 500) {
          doc.output('dataurlnewwindow', filename);
        } else {
          doc.save(filename);
        }

        setModal({
          show: true,
          title: 'Reporte generado',
          message: 'El reporte se ha generado satisfactoriamente. ' + 
            (tableBody.length < 500 ? 'Vista previa disponible en una nueva ventana.' : 'No se ha podido mostrar la vista previa debido a que el reporte es muy largo. Guarde el archivo PDF'),
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
          subtitle="Reporte de Bienes y Activos." />
        
        {/* Form */}
        <div className="flex flex-col space-y-6">
          {/* Row 3 */}
          <div className="flex flex-row h-fit w-full space-x-6 px-6 mt-2 text-gray-700 dark:text-gray-300">          
            <p>
              Rellene los campos para generar un reporte especializado según los parametros que necesite. 
              Posteriormente haga click en <b>Generar</b>, se abrirá una nueva ventana donde podrá visualizar, descargar o imprimir el reporte. 
            </p>
          </div>

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
       <Button primary icon={PrintIcon} text="Generar" onClick={() => {print()}}/>
        <Button icon={BackIcon} text="Cancelar" onClick={() => {navigate(-1)}}/>  
      </div>
    </div>
    </>
  );
}