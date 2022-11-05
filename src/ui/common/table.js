
import { useState, useEffect } from 'react';

// Icons
import { ReactComponent as EditIcon }   from './../../assets/icons/edit.svg';
import { ReactComponent as RemoveIcon } from './../../assets/icons/remove.svg';
import { ReactComponent as ExpandIcon } from './../../assets/icons/expand.svg';
import { ReactComponent as ViewIcon }   from './../../assets/icons/view.svg';

export default function Table({headers, rows, onSelected, isLoading}) {

  const [selected, setSelected] = useState({});


  useEffect(() => {
    onSelected(selected);
  }, [selected, onSelected]); 

  return (   
    <table className="table-auto h-fit w-full space-x-2 justify-start overflow-auto"> 
      {/* Table header */}
      <thead className="">
        <tr 
          className="text-left text-sm text-gray-900 dark:text-gray-100"
          key='header'
        >        
        
          {/* Loading */}
          {false && 
              [...Array(headers.length +1)].map((e, i) => 
                <th className="px-2 py-2" key={'loading-header-'+i}>
                  <div className="animate-pulse bg-light-3 dark:bg-dark-3 h-6 w-full rounded-md"></div>
                </th>
              )
          }        

          {true && headers.map(header => (
            
              <th 
                key={header.key} 
                className={`pl-4 pr-2 py-2 font-medium rounded-lg select-none hover:bg-light-3 hover:dark:bg-dark-3
                            ${selected.value===header.key ? ' bg-light-4 dark:bg-dark-4 ' : ''}`}
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
        <th key='space'><div className="invisible">acciones</div></th>
            
        </tr>        
      </thead>
      
      {/* Table body */}
      <tbody className="overflow-auto">
        
        {/* Loading */}
        {isLoading &&
          [...Array(10)].map((e,i) =>
            <tr key={'loading-row-'+i}>
              {[...Array(headers.length +1)].map((e, j) =>
                <td className="px-2 py-2" key={'loading-cell-'+j}>
                  <div className="animate-pulse bg-light-4 dark:bg-dark-2 h-5 w-full rounded-sm"></div>
                </td>
              )}
            </tr>
          )
        }

        {!isLoading && rows.map(row => (
          <>
          <tr 
            className=" text-left font-base text-sm 
                       text-gray-700 dark:text-gray-300 
                       hover:bg-light-4 dark:hover:bg-dark-3 bg-no-repeat bg-cover bg-center 
                       hover:text-gray-900 hover:dark:text-gray-100"

            key={row.key}                      
          >
            
            {row.values.map(value => (
              <>
                <td
                  key={'values'+row.key}
                  className="px-4 py-2 rounded-none w-fit align-top"
                >
                  {value}
                </td>
              </>
            ))}
          {row.actions && 
            <td key={'actions'+row.key} className="flex justify-center items-center space-x-2 h-full  px-3">
              <button className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-gray-700 dark:text-gray-300 hover:text-gray-200 hover:bg-cream-1" onClick={row.actions.view}>
                <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                  <div className=""><ViewIcon /></div>                  
                </div>
              </button> 
              <button className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-gray-700 dark:text-gray-300 hover:text-gray-200 hover:bg-cream-1" onClick={row.actions.edit}>
                <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                  <div className=""><EditIcon /></div>                  
                </div>
              </button> 
              {row.actions.delete &&              
                <button 
                  className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-cream-1 hover:text-white hover:bg-cream-1" 
                  onClick={row.actions.delete}
                >
                  <div className="flex flex-row justify-center space-x-1 items-center h-full">                  
                    <div className=""><RemoveIcon /></div>                  
                  </div>
                </button>
              }
            </td>
          }
          
          </tr>
        </>
        ))}
      </tbody>
    </table>  
  );
}