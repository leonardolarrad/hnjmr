import { Route, Routes } from "react-router-dom";
import SuppliesPage from "./medical-supplies/supplies-page";
import AssetsPage from "./national-assets/assets-page";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return (
    <div className="flex flex-row w-full h-full space-x-2 p-2">   
      <Routes>
        <Route path="/*" element={<Sidebar />}>
          <Route path="supplies" element={<SuppliesPage />} />
          <Route path="assets" element={<AssetsPage />} />
        </Route>
      </Routes>
    </div>
  );
}