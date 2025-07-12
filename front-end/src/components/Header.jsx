import ToggleTheme from './ToggleTheme'
import logoMobile from '../assets/img/logo_mobile.png';
import logo from '../assets/img/logo.png';
import {Bars3Icon} from "@heroicons/react/24/outline"

const Header = ({
  onOpenSideBarMobile,
}) => {

  return (
    <div className='relative w-full p-8 items-center  pr-8 flex justify-between text-dark-200 font-bold dark:text-white lg:py-12 lg:w-3/4 m-auto'>
      <img src={logoMobile} alt="Logo do sistema Rotinize" className='h-10 md:hidden' />
      <img src={logo} alt="Logo do sistema Rotinize" className='h-10 hidden md:block' />
      <h1 className='absolute left-1/2 transform -translate-x-1/2 text-xl text-dark-100 md:text-2xl dark:text-white'>My Tasks</h1>
      
      <button onClick={onOpenSideBarMobile}>
        <Bars3Icon className='h-7 text-dark-200 md:h-10 dark:text-white'/>
      </button>
    </div>
  )
}

export default Header;