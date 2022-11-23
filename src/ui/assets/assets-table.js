
import React from 'react';

// Components
import Dropdown  from "../common/dropdown";
import Searchbar from "../common/searchbar";
import Button    from "../common/button";
import Table     from "../common/table";

// Icons
import { ReactComponent as AddIcon }   from './../../assets/icons/add.svg';
import { ReactComponent as PrintIcon } from './../../assets/icons/print.svg';

// Hooks
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import Pagination from "../common/pagination";
import Popup from '../common/popup';
import { getUser } from '../../api/auth';

export default function AssetsTable() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = useSearchParams({
    'limit':20, 
    'search':'', 
    'offset':0,
    'sort':'updated_at',
    'order':'DESC'
  });
  
  const [count, setCount] = React.useState(0);

  const [modal, setModal ] = React.useState({
    show: false, 
    title: '', 
    message: '',  
    onAccept: () => setModal(modal => ({ ...modal, show: false })),
    onCancel: () => setModal(modal => ({ ...modal, show: false }))
  });
  
  /* Handle http request and response */
  React.useEffect(() => {

    setIsLoading(true);
    const user = getUser();

    const getParams = () => {
      return '?' + createSearchParams({
        'search': search.get('search'),
        'limit': search.get('limit'),
        'offset': search.get('offset'),
        'sort': search.get('sort'),
        'order': search.get('order')
      }).toString(); 
    };

    const getSearchParam = () => {
      return '?' + createSearchParams({
        'search' : search.get('search'),
      }).toString();
    }
    
    fetch('https://hnjmr-server.onrender.com/api/assets'+getSearchParam()+'&limit=999999999999999999')
      .then(response => response.json())
      .then(data => setCount(data.length))
      .catch(error => console.error('Error:', error));

    fetch('https://hnjmr-server.onrender.com/api/assets'+getParams())
      .then(res => res.json())
      .then(data => {

        setData(data.map(asset => { return {
          'key': asset.id_asset,
          'values': [
              asset.group ?? '00', 
              asset.subgroup ?? '00',
              asset.num ?? 'S/N',
              asset.desc ?? 'No hay descripción disponible',
              asset.tower,
              asset.floor,
              asset.room,
              //asset.source,
              //asset.destination, not using this one            
            ],
          'actions': {
            'view':   () => navigate(`${asset.id_asset}`),
            'edit':   () => navigate(`${asset.id_asset}/edit`),
            'delete': !user.roles.includes('admin') ? null : () => {      
                setModal(modal => ({ 
                  ...modal, 
                  show: true, 
                  title: 'Eliminar', 
                  message: '¿Está seguro que desea eliminar este registro? Esta acción será permanente.', 
                  onCancel: () => setModal(modal => ({ ...modal, show: false })),
                  onAccept: () => {
                    fetch('https://hnjmr-server.onrender.com/api/assets/'+asset.id_asset, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                      }
                    })
                      .then(res => { 

                        if (!res.status || !res.status === 200) {
                          setModal(modal => ({
                            show: true,
                            title: 'Error',
                            message: 'No se pudo eliminar el registro. Intente de nuevo más tarde.',
                            onAccept: () => setModal(modal => ({ ...modal, show: false })),       
                            onCancel: null                 
                          }))
                        }

                        setModal(modal => ({
                          show: true,
                          title: 'Eliminación exitosa',
                          message: 'Se ha eliminado el registro.',
                          onAccept: () => setModal(modal => ({ ...modal, show: false })),       
                          onCancel: null                 
                        }))
                      })
                      .catch(error => {                        
                        setModal(modal => ({
                          show: true,
                          title: 'Error',
                          message: 'No se pudo eliminar el registro. Intente de nuevo más tarde.',
                          onAccept: () => setModal(modal => ({ ...modal, show: false })),       
                          onCancel: null                 
                        }))});
                    
                    setModal(modal => ({ ...modal, show: false }));
                    navigate('');
                  }
                }));            
            }    
        }}}));
        setIsLoading(false);
      })
      .catch(error => {
        //setIsLoading(false);
        setModal(modal => ({
          ...modal,
          show: true,
          title: 'Error de conexión',
          message: 'No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.',
          more: error,
          onAccept: () => setModal(modal => ({ ...modal, show: false })),       
          onCancel: null                 
        }))        
      });
  }, [count, navigate, search]);

  /* Handle table params */ 
  const handleDropdown = (value) => { 
    setSearch(createSearchParams({
      'search': search.get('search'),
      'limit': value,
      'offset': 0,
      'sort': search.get('sort'),
      'order': search.get('order'),
    }));
  }

  const handleSearch = (value) => {
    setSearch(createSearchParams({
      'search': value,
      'limit': search.get('limit'),
      'offset': 0,
      'sort': search.get('sort'),
      'order': search.get('order'),
    }));
  }

  const handleClear = () => {
    setSearch(createSearchParams({
      'search': '',
      'limit': search.get('limit'),
      'offset': 0,
      'sort': search.get('sort'),
      'order': search.get('order'),
    }));
  }

  const handlePageChange = (page) => {
    setSearch(createSearchParams({
      'search': search.get('search'),
      'limit': search.get('limit'),
      'offset': (page-1) * search.get('limit'),
      'sort': search.get('sort'),
      'order': search.get('order'),
    }));
  }

  const handleSort = React.useCallback((sort) => {
    setSearch(createSearchParams({
      'search': search.get('search'),
      'limit': search.get('limit'),
      'offset': search.get('offset'),
      'sort': sort.value ? sort.value : 'updated_at',
      'order': sort.order ? sort.order.toUpperCase() : 'DESC',
    }));
  }, [search, setSearch]);

  return (    
   
      <>

        <div className="flex flex-row justify-between items-center h-fit w-full space-x-2">
        
        <Popup
          show={modal.show}
          title={modal.title}
          message={modal.message}
          onAccept={modal.onAccept}
          onCancel={modal.onCancel}
        />
        
        {/* Dropdown */}
        <div className="flex flex-row w-fit h-fit">
          <Dropdown 
            items={[
              {value:'Mostrar 10',  key:10}, 
              {value:'Mostrar 15',  key:15},
              {value:'Mostrar 20',  key:20}, 
              {value:'Mostrar 30',  key:30}, 
              {value:'Mostrar 50',  key:50}, 
              {value:'Mostrar 100', key:100},
              {value:'Mostrar 200', key:200},
              {value:'Mostrar 500', key:500}]} 
            onSelect={handleDropdown}
            defaultValue={20}
          />
          
        {/* Searchbar */}
        </div>
        <div className="flex w-full ">
          <Searchbar 
            onSearch={handleSearch}
            onClear={handleClear}
            placeholder="Buscar por número, descripción o torre"
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-2 justify-end">
          <Button text="Crear nuevo" icon={AddIcon} onClick={() => navigate("add")} />
          <Button text="Reporte" icon={PrintIcon} onClick={() => navigate("print")} />
        </div>
        
        </div>
              
        {/* Table */}
        <div className="flex flex-col justify-between h-full w-full rounded-lg overflow-auto space-x-2 py-2">        
          <Table 
            headers={[
              { key:'group',     value: 'Grupo'},
              { key:'subgroup',  value: 'Subgrupo'},
              { key:'num',       value: 'Número'},
              { key:'desc',      value: 'Descripción'},
              { key:'tower',     value: 'Torre'},
              { key:'floor',     value: 'Piso'},
              { key:'room',      value: 'Habitación'},
            ]}
            rows={data}     
            onSelected={handleSort}   
            isLoading={isLoading}
          />

        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center h-fit">        
          <Pagination 
            currentPage={Math.max((search.get('offset')/search.get('limit')+1), 1)} 
            totalPages={Math.max(Math.ceil(count/search.get('limit')), 1)} 
            onPageChange={handlePageChange} />        
        </div>
      </>
  );
}