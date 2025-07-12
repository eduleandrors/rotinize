import {MoonIcon, SunIcon} from '@heroicons/react/24/solid'
import { useEffect } from 'react';

const ToggleTheme = () => {

    // const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const pageClasses = document.documentElement.classList;

    // useEffect(() =>{
    //     systemPreference && pageClasses.add('dark');
    // })

    const toggle = () => {
        document.documentElement.classList.toggle("dark");
    }

  return (
    <div className='cursor-pointer'>
        <MoonIcon className='h-8 text-sky-950 block dark:hidden' onClick={toggle}/>
          <SunIcon className='h-8 hidden dark:block text-sky-200' onClick={toggle}/>
    </div>
  )
}

export default ToggleTheme