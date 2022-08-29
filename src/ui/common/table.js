import wave from './../../assets/waves/lwave.svg';

export default function Table({header, rows}) {

  return (     
    <table className="table-auto h-fit w-full space-x-2"> 
      {/* Table header */}
      <thead className="">
        <tr className="text-left text-sm text-gray-900 dark:text-gray-100">
          <th></th>
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
          <tr className="hover:wave-l-2 text-left font-base text-sm
                       text-gray-700 dark:text-gray-300 
                         hover:bg-cream-3 bg-no-repeat bg-cover bg-center  hover:text-gray-100"
          >
            <td className=""/>
            {row.map(value => (
              <>
                <td
                  key={value}
                  className="px-4 py-2 rounded-none"
                >
                  {value}
                </td>
              </>
            ))}
          <td className=""/>
          </tr>
        </>
        ))}
      </tbody>
    </table>  
  );
}