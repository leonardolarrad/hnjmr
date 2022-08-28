// Components
import WaveHeader from "../common/wave-header";
import Dropdown   from "../common/dropdown";
import Searchbar  from "../common/searchbar";


export default function SuppliesPage() {

  const handleDropdown = (value) => { 
    console.log(value);
  }

  const handleSearch = (value) => {
    console.log(value);
  }

  const handleClear = () => {
    console.log("clear");
  }

  return ( 
    <div className="flex flex-col w-full h-full space-y-2 overflow-auto p-2">            
      <WaveHeader 
        title="Insumos médicos" 
        subtitle="Materiales e insumos almacenados o despachados en el hospital" 
      />
      <div className="flex flex-row justify-center  h-full w-full overflow-auto space-x-2">
        <Dropdown 
          items={[
            {name:'Mostrar 10', value:10}, 
            {name:'Mostrar 20', value:20}, 
            {name:'Mostrar 30', value:30}, 
            {name:'Mostrar 50', value:50}, 
            {name:'Mostrar 100', value:100}]} 
          onSelect={handleDropdown}
        />
        <Searchbar 
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}