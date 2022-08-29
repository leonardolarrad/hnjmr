// Components
import WaveHeader from "../common/wave-header";
import SuppliesTable from "./supplies-table";

export default function SuppliesPage() {

  return ( 
    <div className="flex flex-col w-full h-full space-y-2 overflow-auto p-2">            
      <WaveHeader 
        title="Insumos médicos" 
        subtitle="Materiales e insumos almacenados y despachados en el hospital" 
      />
      <SuppliesTable />
    </div>
  );
}