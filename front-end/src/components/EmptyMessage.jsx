import React from 'react'

const EmptyMessage = ({filterActive}) => {
  return (
    <div className="w-full min-h-[60vh] text-center py-12 flex flex-col items-center justify-center text-rotinize-200 dark:text-rotinize-100">
        {filterActive === 'done' && (
          <>
            <h2 className="text-3xl font-bold">You don't have any completed tasks!</h2>
            <h3 className='opacity-70'>Mark one as done to see it here.</h3>
          </>
        )}
        {filterActive === 'pending' && (
          <>
            <h2 className="text-3xl font-bold">No pending tasks at the moment!</h2>
            <h3 className='opacity-70'>You're all caught up 🎉</h3>
          </>
        )}
        {filterActive === 'all' && (
          <>
            <h2 className="text-3xl font-bold">You don't have any tasks yet!</h2>
            <h3 className='opacity-70'>Add one by clicking the "+" button below</h3>
          </>
        )}
      </div>
  )
}

export default EmptyMessage