// Components
import WaveHeader from "../common/wave-header";
import Dropdown   from "../common/dropdown";
import Searchbar  from "../common/searchbar";
import Button     from "../common/button";

// Icons
import { ReactComponent as AddIcon } from './../../assets/icons/add.svg';
import { ReactComponent as PrintIcon } from './../../assets/icons/print.svg';

// Hooks
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from "../common/pagination";

export default function SuppliesPage() {

  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="flex flex-col w-full h-full space-y-2 overflow-auto p-2">            
      <WaveHeader 
        title="Insumos médicos" 
        subtitle="Materiales e insumos almacenados o despachados en el hospital" 
      >
        
      </WaveHeader>
      <div className="flex flex-row justify-between h-fit w-full  space-x-2">
        
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
          
        </div>
        <div className="flex w-[400px]">
          <Searchbar 
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </div>
        <div className="flex space-x-2 justify-end">
          <Button text="Crear nuevo" icon={AddIcon} onClick={() => navigate("add")} />
          <Button icon={PrintIcon} onClick={() => navigate("print")} />
        </div>
        
      </div>
      
      <div className="flex flex-col justify-between h-full w-full overflow-auto space-x-2">
      </div>
      <div className="flex justify-end items-center h-fit">        
        <Pagination currentPage={1} totalPages={3} onPageChange={handlePageChange} />        
      </div>
    </div>
  );
}