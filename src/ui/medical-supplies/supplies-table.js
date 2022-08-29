
import React from 'react';

// Components
import Dropdown  from "../common/dropdown";
import Searchbar from "../common/searchbar";
import Button    from "../common/button";
import Table     from "../common/table";

// Icons
import { ReactComponent as AddIcon }   from './../../assets/icons/add.svg';
import { ReactComponent as PrintIcon } from './../../assets/icons/print.svg';

// Hooks
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from "../common/pagination";

export default function SuppliesTable() {

  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('api/lot')
      .then(res => res.json())
      .then(data => setData(data.map(lot => [
        lot.medicalSupply.name_material, 
        lot.medicalSupply.description,
        lot.stock,
        lot.date_delivery,
        lot.due_date,
        ''
      ])))
      .catch(err => console.log(err));
  }, [location]);

  /* Handle table params */ 
  const handleDropdown = (value) => { 
    console.log(value);
  }

  const handleSearch = (value) => {
    console.log(value);
  }

  const handleClear = () => {
    console.log("clear");
  }

  const handlePageChange = (page) => {
    console.log(page);
  }

  return (    
    <>
      <div className="flex flex-row justify-between h-fit w-full space-x-2">
        
        {/* Dropdown */}
        <div className="flex flex-row w-fit h-fit">
          <Dropdown 
            items={[
              {name:'Mostrar 10', value:10}, 
              {name:'Mostrar 20', value:20}, 
              {name:'Mostrar 30', value:30}, 
              {name:'Mostrar 50', value:50}, 
              {name:'Mostrar 100', value:100}]} 
            onSelect={handleDropdown}
          />
          
        {/* Searchbar */}
        </div>
        <div className="flex w-full ">
          <Searchbar 
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-2 justify-end">
          <Button text="Crear nuevo" icon={AddIcon} onClick={() => navigate("add")} />
          <Button icon={PrintIcon} onClick={() => navigate("print")} />
        </div>
        
      </div>
      
      {/* Table */}
      <div className="flex flex-col justify-between h-full w-full rounded-lg overflow-auto space-x-2 py-2
                      ">
        {/* Table header */}
        <Table 
          header={[ 'Nombre', 'Descripción', 'Cantidad', 'Fecha de despacho', 'Fecha de caducidad', 'Acciones' ]} 
          rows={data}        
        />

      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center h-fit">        
        <Pagination currentPage={1} totalPages={3} onPageChange={handlePageChange} />        
      </div>
    </>
  );
}