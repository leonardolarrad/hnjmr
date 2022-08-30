
// Icons
import { ReactComponent as EditIcon } from './../../assets/icons/edit.svg';
import { ReactComponent as RemoveIcon } from './../../assets/icons/remove.svg';

// Components
import Button from './button';

export default function Table({header, rows}) {

  console.log(rows);

  return (     
    <table className="table-auto  h-fit w-full space-x-2"> 
      {/* Table header */}
      <thead className="">
        <tr className="text-left text-sm text-gray-900 dark:text-gray-100">
        
          {header.map(value => (
            
              <th 
                key={value} 
                className="px-4 py-2 font-medium rounded-lg select-none hover:bg-light-3 hover:dark:bg-dark-3"
              >
                {value}
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
            <td className="space-x-2 items-center h-full bg-light-1 dark:bg-dark-1 px-3">
              <button className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 hover:bg-light-3 hover:dark:bg-dark-3 h-full" onClick={row.actions.edit}>
                <div className="flex flex-row justify-center space-x-1 items-center ">                  
                  <div className="text-gray-700 dark:text-gray-300"><EditIcon /></div>                  
                </div>
              </button> 
              <button className="bg-light-2 dark:bg-dark-2 rounded-lg p-0.5 text-cream-1 hover:text-white hover:bg-cream-1 h-full" 
                onClick={row.actions.remove}>
                <div className="flex flex-row justify-center space-x-1 items-center ">                  
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