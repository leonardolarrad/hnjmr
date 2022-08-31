// Components
import ContentHeader from "../common/content-header";
import SuppliesTable from "./supplies-table";
import { ReactComponent as SupplyIcon }   from './../../assets/icons/vaccine.svg';

export default function SuppliesPage() {

  return ( 
    <div className="flex flex-col w-full h-full space-y-2  p-2">            
      <ContentHeader 
        primary
        icon={SupplyIcon}
        title="Insumos médicos" 
        subtitle="Materiales e insumos almacenados y despachados en el hospital" 
      />
      <SuppliesTable />
    </div>
  );
}