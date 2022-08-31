
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

export default function SuppliesTable() {

  const navigate = useNavigate();

  const [data, setData] = React.useState([]);
  const [search, setSearch] = useSearchParams({
    'limit':20, 
    'search':'', 
    'offset':0,
    'sort':'date_delivery',
    'order':'ASC'
  });
  const [count, setCount] = React.useState(0);
  
  /* Handle http request/response */
  React.useEffect(() => {

    const getParams = () => {
      return '?' + createSearchParams({
        'search' : search.get('search'),
        'limit'   : search.get('limit'),
        'offset'  : search.get('offset'),
        'sort'    : search.get('sort'),
        'order'   : search.get('order')
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
            'edit':   () => navigate(`:${lot.id_lots}/edit`),
            'delete': () => navigate(`delete${lot.id_lots}`),
          }          
        }}));
      })
      .catch(err => console.error(err));

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

  /*
  const handleSort = (sort) => {
    setSearch(createSearchParams({
      'search': search.get('search'),
      'limit': search.get('limit'),
      'offset': 0,
      'sort': sort.value ? sort.value : 'date_delivery',
      'order': sort.order ? sort.order.toUpperCase() : 'ASC',
    }));
  }
  */
  const handleSort = React.useCallback((sort) => {
    setSearch(createSearchParams({
      'search': search.get('search'),
      'limit': search.get('limit'),
      'offset': 0,
      'sort': sort.value ? sort.value : 'date_delivery',
      'order': sort.order ? sort.order.toUpperCase() : 'ASC',
    }));
  }, [search, setSearch]);

  return (    
    <>
      <div className="flex flex-row justify-between items-center h-fit w-full space-x-2">
        
        {/* Dropdown */}
        <div className="flex flex-row w-fit h-fit">
          <Dropdown 
            items={[
              {name:'Mostrar 10', value:10}, 
              {name:'Mostrar 15', value:15},
              {name:'Mostrar 20', value:20}, 
              {name:'Mostrar 30', value:30}, 
              {name:'Mostrar 50', value:50}, 
              {name:'Mostrar 100', value:100},
              {name:'Mostrar 200', value:200},
              {name:'Mostrar 500', value:500}]} 
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
      <div className="flex flex-col justify-between h-full w-full rounded-lg overflow-auto space-x-2 py-2
                      ">        
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