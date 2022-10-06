
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

export default function SuppliesTable() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = useSearchParams({
    'limit':20, 
    'search':'', 
    'offset':0,
    'sort':'date_delivery',
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
    
    fetch('api/lots'+getSearchParam()+'&limit=999999999999999999')
      .then(response => response.json())
      .then(data => setCount(data.length))
      .catch(error => console.error('Error:', error));

    fetch('api/lots'+getParams())
      .then(res => res.json())
      .then(data => {

        setData(data.map(lot => { return {
          'key': lot.id_lots,
          'values': [
              lot.medicalSupply.name_material, 
              lot.medicalSupply.description,
              lot.stock,
              lot.date_delivery,
              lot.due_date,
            ],
          'actions': {
            'view':   () => navigate(`${lot.id_lots}`),
            'edit':   () => navigate(`${lot.id_lots}/edit`),
            'delete': () => {      
                setModal(modal => ({ 
                  ...modal, 
                  show: true, 
                  title: 'Eliminar', 
                  message: '¿Está seguro que desea eliminar este registro? Esta acción será permanente.', 
                  onCancel: () => setModal(modal => ({ ...modal, show: false })),
                  onAccept: () => {
                    fetch('/api/lots/'+lot.id_lots, {
                      method: 'DELETE',
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
        setIsLoading(false);
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
      'sort': sort.value ? sort.value : 'date_delivery',
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
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-2 justify-end">
          <Button text="Crear nuevo" icon={AddIcon} onClick={() => navigate("add")} />
          <Button icon={PrintIcon} onClick={() => navigate("print")} />
        </div>
        
      </div>
      
      {/* Table */}
      <div className="flex flex-col justify-between h-full w-full rounded-lg overflow-auto space-x-2 py-2">        
        <Table 
          headers={[
            { key:'name_material', value: 'Material'},
            { key:'description',   value: 'Descripción'},
            { key:'stock',         value: 'Cantidad'},
            { key:'date_delivery', value: 'Fecha de entrega'},
            { key:'due_date',      value: 'Fecha de vencimiento'},
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