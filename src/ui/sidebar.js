import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import { setUser, getUser } from "../api/auth";

import { ReactComponent as HomeIcon }     from './../assets/icons/apps.svg';
import { ReactComponent as VaccineIcon }  from './../assets/icons/vaccine.svg';
import { ReactComponent as DesktopIcon }  from './../assets/icons/desktop.svg';
import { ReactComponent as GroupIcon }    from './../assets/icons/group.svg';
import { ReactComponent as HelpIcon }     from './../assets/icons/help.svg';
import { ReactComponent as ShutdownIcon } from './../assets/icons/shutdown.svg';
import { ReactComponent as SettingsIcon } from './../assets/icons/settings.svg';

function renderSidebarButton(icon, text, onClick, current, label) {
  
  const className = " rounded-full w-full py-2 px-4 " +
                    " text-gray-800 dark:text-gray-200 focus:outline-none" +
                    " hover:bg-light-3  dark:hover:bg-dark-3 focus:bg-light-2 dark:focus:bg-dark-2 " +
                    (current ? " bg-light-3  dark:bg-dark-3 " : "");

  

  return (
    <button className={className} onClick={onClick}>
      <div className="flex flex-row w-max flex-nowrap items-center space-x-2">
        {icon && <div className="text-gray-800 dark:text-gray-200">
          {React.createElement(icon)}
        </div>}
        {text && <span>{text}</span>}
        {label && <span className="text-xs bg-cream-1 text-gray-100 p-[1px] px-2 rounded-xl">{label}</span>}
      </div>
    </button>
  );
}

export default function Sidebar() {

  const user = getUser();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col overflow-y-auto justify-between h-full w-fit min-w-min">
        <div className="flex flex-col space-y-2">
          {renderSidebarButton(HomeIcon, "Inicio", () => navigate("/"), location.pathname === "/")}
          {/*renderSidebarButton(PatientIcon, "Pacientes", () => navigate("/patients"), location.pathname.includes("/patients"))*/}
          {renderSidebarButton(VaccineIcon, "Insumos médicos", () => navigate("/supplies"), location.pathname.includes("/supplies"))}
          {renderSidebarButton(DesktopIcon, "Bienes nacionales", () => navigate("/assets"), location.pathname.includes("/assets"))}
          { user && user.roles.includes('admin') && 
            renderSidebarButton(GroupIcon, "Usuarios", () => navigate("/users"), location.pathname.includes("/users"), "admin")
          }
        </div>
        <div className="flex flex-col space-y-2">
          {renderSidebarButton(HelpIcon, "Ayuda", () => navigate("/help"), location.pathname.includes("/help"))}
          {renderSidebarButton(SettingsIcon, "Configuración", () => navigate("/settings"), location.pathname.includes("/settings"))}
          {renderSidebarButton(ShutdownIcon, "Cerrar sesión", () => { setUser(null); navigate("/login");}, location.pathname.includes("/logout"))}
        </div>
      </div> 
      <Outlet className="" />
    </>
  );
}