import React, { useState } from 'react'

const Filters = ({ listAllTasks, listDoneTasks, listPendingTasks, filterActive, setFilterActive}) => {

  const handleClick = (id, action) => {
    action();
    setFilterActive(id);
  }

  return (
    <div className='px-5 mb-3 flex justify-end md:w-3/4 m-auto'>
      <button
        id='all'
        className={`px-5 py-1 text-sm rounded-l-lg border border-white border-opacity-50 
          ${filterActive === 'all' ? 'bg-[#017680] text-white' : 'bg-transparent text-black dark:text-white'}`}
        onClick={() => handleClick('all', listAllTasks)}
      >
        All
      </button>

      <button
        id='done'
        className={`px-5 py-1 text-sm border border-white border-opacity-50 
          ${filterActive === 'done' ? 'bg-[#017680] text-white' : 'bg-transparent text-black dark:text-white'}`}
        onClick={() => handleClick('done', listDoneTasks)}
      >
        Done
      </button>

      <button
        id='pending'
        className={`px-5 py-1 text-sm rounded-r-lg border border-white border-opacity-50 
          ${filterActive === 'pending' ? 'bg-[#017680] text-white' : 'bg-transparent text-black dark:text-white'}`}
        onClick={() => handleClick('pending', listPendingTasks)}
      >
        Pending
      </button>
    </div>
  )
}

export default Filters;
