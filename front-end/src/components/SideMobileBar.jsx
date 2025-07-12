import React from 'react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import ToggleTheme from './ToggleTheme'
const SideMobileBar = ({aberto, onOpenSideBarMobile}) => {
  return (
    <div className={`bg-white fixed top-0 right-0 w-3/4 h-full max-w-xs text-dark-100 font-semibold text-xl z-50 transform transition-transform duration-700
     ${aberto ? 'translate-x-0' : 'translate-x-full'} dark:bg-dark-200 dark:text-white`}>
        <ul className='p-10 w-full flex flex-col items-center gap-10 mt-10 '>
            <li className='w-full text-center'><a href="#" className='m-auto active:bg-dark-100 w-3/4 block rounded-lg' >Home</a></li>
            <li className='w-full text-center'><a href="#" className='m-auto active:bg-dark-100 w-3/4 block rounded-lg' >About</a></li>
            <li className='w-full text-center'><a href="#" className='m-auto active:bg-dark-100 w-3/4 block rounded-lg' >Help</a></li>
            <ToggleTheme/>
        </ul>
        <button className='p-5 absolute top-2 right-2' onClick={onOpenSideBarMobile}>
            <XMarkIcon className='h-10'/>
        </button>
    </div>
  )
}

export default SideMobileBar