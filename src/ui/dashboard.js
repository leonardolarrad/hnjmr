import { Route, Routes, Navigate } from "react-router-dom";
import { getUser } from "../api/auth";
import SuppliesEditor from "./medical-supplies/supplies-editor";
import SuppliesPage from "./medical-supplies/supplies-page";
import SuppliesViewer from "./medical-supplies/supplies-viewer";
import AssetsEditor from "./national-assets/assets-editor";
import AssetsPage from "./national-assets/assets-page";
import SettingsPage from "./settings-page";
import Sidebar from "./sidebar";

export default function Dashboard() {

  const user = getUser();
  console.log(user);

  if (!user)
    return <Navigate to="/login" />;

  return (

    <div className="flex flex-row w-full h-full space-x-2 p-2">   
      <Routes>
        <Route path="/*" element={<Sidebar />}>

          {/* Medical Supplies */}
          <Route path="supplies" element={<SuppliesPage />} />
          <Route path="supplies/:id" element={<SuppliesViewer />} />
          <Route path="supplies/add" element={<SuppliesEditor />} />
          <Route path="supplies/:id/edit" element={<SuppliesEditor />} />

          {/* National assets */}
          <Route path="assets" element={<AssetsPage />} />
          <Route path="assets/:id" element={<AssetsEditor mode='view'/>} />
          <Route path="assets/add" element={<AssetsEditor mode='add'/>} />
          <Route path="assets/:id/edit" element={<AssetsEditor mode='edit'/>} />
          
          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />

        </Route>
      </Routes>
    </div>
  );
}