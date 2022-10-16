
import ContentHeader from "../common/content-header";
import AssetsTable from "./assets-table";
import { ReactComponent as Icon }   from './../../assets/icons/desktop.svg';

export default function AssetsPage() {

  return ( 
    <div className="flex flex-col w-full h-full space-y-2 p-2">            
      <ContentHeader 
        primary
        icon={Icon}
        title="Equipos, bienes y activos" 
        subtitle="Equipos médicos, equipos de oficina y otros bienes nacionales" 
      />
      <AssetsTable />
    </div>
  );
}