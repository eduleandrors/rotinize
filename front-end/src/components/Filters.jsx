import React, { useState } from 'react'

const Filters = ({listAllTasks, listDoneTasks, listPendingTasks}) => {

  const [active, setActive] = useState(null);
    const handleClick = (id) => {
      setActive(id); 
    }

  return (
    <div className='px-5 mb-3 flex justify-end'>
        <button id='all' className='px-2 py-1 border text-xs rounded-l-lg border-white border-opacity-50' onClick={()=>{listAllTasks(); handleClick('all');}} style={
          {backgroundColor: active === 'all' ? '#017680' : 'transparent'}
        }>All</button>
        <button id='done' className='px-2 py-1 border text-xs border-white border-opacity-50' onClick={()=>{listDoneTasks(); handleClick('done');}} style={
          {backgroundColor: active === 'done' ? '#017680' : 'transparent'}
        }>Done</button>
        <button id='pending' className='px-2 py-1 border text-xs rounded-r-lg border-white border-opacity-50'  onClick={()=>{listPendingTasks(); handleClick('pending');}} style={
          {backgroundColor: active === 'pending' ? '#017680' : 'transparent'}
        }>Pending</button>
    </div>
  )
}

export default Filters