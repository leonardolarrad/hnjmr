
import { useState, useEffect } from 'react';
// Icons
import { ReactComponent as EditIcon } from './../../assets/icons/edit.svg';
import { ReactComponent as RemoveIcon } from './../../assets/icons/remove.svg';
import { ReactComponent as ExpandIcon } from './../../assets/icons/expand.svg';

export default function Table({headers, rows, onSelected}) {

  const [selected, setSelected] = useState({});

  useEffect(() => {
    if(onSelected) {
      onSelected(selected);
    }
  }, [selected]);

  return (     
    <table className="table-auto  h-fit w-full space-x-2"> 
      {/* Table header */}
      <thead className="">
        <tr className="text-left text-sm text-gray-900 dark:text-gray-100">        
          {headers.map(header => (
            
              <th 
                key={header.key} 
                className={`pl-4 pr-2 py-2 font-medium rounded-lg select-none hover:bg-light-3 hover:dark:bg-dark-3
                            ${selected.value===header.key ? 'bg-light-4 dark:bg-dark-4' : ''}`}
                onClick={
                  () => {
                    if (selected.value === header.key && selected.order === 'asc') 
                      setSelected({value: header.key, order: 'desc'});                    
                    else if (selected.value === header.key && selected.order === 'desc') 
                      setSelected({});
                    else 
                      setSelected({value: header.key, order: 'asc'});             
                  }                  
                }
              >
                <div className="flex flex-row justify-between items-center">
                  {header.value}
                  {(selected.value === header.key && selected.order === 'asc')  && <ExpandIcon className="w-5 h-5" />}
                  {(selected.value === header.key && selected.order === 'desc') && <ExpandIcon className="rotate-180 w-5 h-5" />}
                </div>
              </th>
            
          ))}
        <th></th>
        </tr>        
      </thead>
      
      {/* Table body */}
      <tbody className="">
        {rows.map(row => (
          <>
          <tr 
            className="hover:wave-l-2 text-left font-base text-sm select-none
                       text-gray-700 dark:text-gray-300 
                       hover:bg-cream-3 bg-no-repeat bg-cover bg-center  hover:text-gray-100"

            key={row.id}
            onClick={row.actions.view}
          >
            
            {row.values.map(value => (
              <>
                <td
                  key={value}
                  className="px-4 py-2 rounded-none w-fit"
                >
                  {value}
                </td>
              </>
            ))}
          {row.actions && 
            <td className="flex justify-center items-center space-x-2 h-full  px-3">
              <button className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 hover:bg-light-3 hover:dark:bg-dark-3" onClick={row.actions.edit}>
                <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                  <div className="text-gray-700 dark:text-gray-300"><EditIcon /></div>                  
                </div>
              </button> 
              <button className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-cream-1 hover:text-white hover:bg-cream-1" 
                onClick={row.actions.remove}>
                <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                  <div className=""><RemoveIcon /></div>                  
                </div>
              </button>
            </td>
          }
          
          </tr>
        </>
        ))}
      </tbody>
    </table>  
  );
}