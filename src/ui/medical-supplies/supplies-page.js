import WaveHeader from "../common/wave-header";


export default function SuppliesPage() {
  return ( 
    <div className="flex flex-col w-full h-full space-y-2  overflow-auto">            
      <WaveHeader title="Insumos médicos" subtitle="Materiales e insumos almacenados o despachados en el hospital" />
    </div>
  );
}