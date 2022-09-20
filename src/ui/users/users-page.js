
import { useState, useEffect } from "react";
import { getUser } from "../../api/auth";
import ContentHeader from "../common/content-header";
import { ReactComponent as Icon }   from './../../assets/icons/group.svg';

import Popup from "../common/popup";

import { ReactComponent as BlockIcon }   from './../../assets/icons/block.svg';
import { ReactComponent as CheckIcon }   from './../../assets/icons/check.svg';

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({});

  useEffect(() => {

    const user = getUser();

    fetch('api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUsers(data);
    })
    .catch(error => console.log(error));
  }, []);

  const blockUser = (id) => {
    const user = getUser();

    fetch(`api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        'isActive': false
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUsers(users => users.map(user => {
        if (user.id === id) {
          user.isActive = false;
        }
        return user;
      }));
    })
    .catch(error => console.log(error));
  };

  const unblockUser = (id) => {
    const user = getUser();

    fetch(`api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        'isActive': true
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUsers(users => users.map(user => {
        if (user.id === id) {
          user.isActive = true;
        }
        return user;
      }));
    })
    .catch(error => console.log(error));
  };

  const handleBlock = (user) => {    
    setModal({
      show: true,
      title: 'Bloquear usuario',
      message: `¿Está seguro que desea bloquear al usuario ${user.fullName}?`,
      onAccept: () => {
        setModal({ show: false });
        blockUser(user.id);
      },
      onCancel: () => setModal({ show: false })
    });    
  };

  const handleUnblock = (user) => {
    setModal({
      show: true,
      title: 'Desbloquear usuario',
      message: `¿Está seguro que desea desbloquear al usuario ${user.fullName}?`,
      onAccept: () => {
        setModal({ show: false });
        unblockUser(user.id);
      },
      onCancel: () => setModal({ show: false })
    });    
  };

  const handleMakeAdmin = (account) => {
    const currentUser = getUser();
    
    fetch(`api/users/${account.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify({
        'roles': ['admin', 'user']
      })
    })
    .then(response => response.json())
    .then(data => {
      setUsers(users => users.map(user => {
        if (user.id === account.id) {
          user.roles = ['admin', 'user'];
        }
        return user;
      }));
    })
    .catch(error => console.log(error));
  };

  return ( 
    <div className="flex flex-col w-full h-full space-y-6 p-2">  

        <Popup
          show={modal.show}
          title={modal.title}
          message={modal.message}
          onAccept={modal.onAccept}
          onCancel={modal.onCancel}
        />

      <ContentHeader 
        primary
        icon={Icon}
        title="Usuarios" 
        subtitle="Gestionar usuarios del sistema" 
      />

      <table className="table-auto w-full overflow-auto ">
        <thead>
          <tr className="text-gray-800 dark:text-gray-200 text-sm text-left">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rol</th>
            <th className="px-4 py-2">Activo</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="text-gray-700 dark:text-gray-300 ">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.roles.includes('admin') ? 'Admin' : 'Usuario'}</td>
              <td className="px-4 py-2">{user.isActive ? 'Habilitado' : 'Deshabilitado'}</td>
              
              <td className="flex flex-row px-4 py-2 space-x-2">
                { !user.roles.includes('admin') &&
                  <>
                  <button 
                    className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-cream-1 hover:text-white hover:bg-cream-1" 
                    onClick={() => handleMakeAdmin(user)}
                  >
                    <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                      <div className="px-2">Asignar admin</div>                  
                    </div>
                  </button>
                  <button 
                    className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-cream-1 hover:text-white hover:bg-cream-1" 
                    onClick={() => user.isActive ? handleBlock(user) : handleUnblock(user)}
                  >
                    <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                      <div className="">{user.isActive ? <BlockIcon /> : <CheckIcon />}</div>                  
                    </div>
                  </button>
                  </>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  );
}