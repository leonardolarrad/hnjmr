import { ReactComponent as ExpandIcon }  from './../../assets/icons/expand.svg'; 

export default function Pagination({onPageChange, currentPage, totalPages}) {

  // calculate the range of pages to display
  // based on current page and total pages, 
  // calculate start and end current page should be
  // in the middle of the range
  const range = 10;
  const start = Math.max(2, currentPage - range / 2);
  const end = Math.min(totalPages - 1, currentPage + range / 2);

  const handlePageChange = (page) => {
    onPageChange(page);
  }
  
  const handlePrevious = () => {
    if (currentPage > 1) 
      handlePageChange(currentPage - 1);
    
  }
  
  const handleNext = () => {
    if (currentPage < totalPages) 
      handlePageChange(currentPage + 1);    
  }
    
  return (
    <div className="flex flex-row justify-center items-center h-fit w-fit space-x-0.5  p-2 px-3 rounded-full
                 bg-light-2 dark:bg-dark-2">
      <button 
        className='flex rounded-lg w-7 h-7 
        text-gray-800 dark:text-gray-200 hover:bg-light-3 hover:dark:bg-dark-3'
        onClick={handlePrevious}
      >
          <ExpandIcon className='rotate-90 self-center text-gray-800 dark:text-gray-200' />
      </button>
      
      { totalPages <= 10 &&
        Array.from({length: totalPages}, (v, i) => i + 1).map(page => (
          <button
            key={page}
            className={`flex rounded-lg w-7 h-7 hover:bg-light-3 hover:dark:bg-dark-3 ${page === currentPage ? 'bg-light-3 dark:bg-dark-3' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            <span className='w-full self-center text-gray-800 dark:text-gray-200'>{page}</span>
        </button>))
      }
      {
        totalPages > 10 &&
        <>
          <button
            className={`flex rounded-lg w-7 h-7 hover:bg-light-3 hover:dark:bg-dark-3 ${1 === currentPage ? 'bg-light-3 dark:bg-dark-3' : ''}`}
            onClick={() => handlePageChange(1)}
          >
            <span className='w-full self-center text-gray-800 dark:text-gray-200'>1</span>
          </button>
          {start > 2 && <span className='self-center text-gray-800 dark:text-gray-200'>...</span>}
          {Array.from({length: end - start + 1}, (v, i) => i + start).map(page => (
            <button
              key={page}
              className={`flex rounded-lg w-7 h-7 hover:bg-light-3 hover:dark:bg-dark-3 ${page === currentPage ? 'bg-light-3 dark:bg-dark-3' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              <span className='w-full self-center text-gray-800 dark:text-gray-200'>{page}</span>
            </button>))
          }
          {end < totalPages - 1 && <span className='self-center text-gray-800 dark:text-gray-200'>...</span>}
          <button
            className={`flex rounded-lg w-7 h-7 hover:bg-light-3 hover:dark:bg-dark-3 ${totalPages === currentPage ? 'bg-light-3 dark:bg-dark-3' : ''}`}
            onClick={() => handlePageChange(totalPages)}
          >
            <span className='w-full self-center text-gray-800 dark:text-gray-200'>{totalPages}</span>
          </button>
        </>
      }
      

      <button 
        className='flex rounded-lg w-7 h-7 hover:bg-light-3 hover:dark:bg-dark-3'
        onClick={handleNext}
      >
        <ExpandIcon className='-rotate-90 self-center text-gray-800 dark:text-gray-200 dark:-gray-200' />
      </button>
    </div>
  );
}