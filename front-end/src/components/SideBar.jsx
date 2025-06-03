import logo from '../assets/img/logo_horizontal.png';


const SideBar = () => {
  

  return (
    <nav className={`side__bar`}>
      <div className="container-logo">
        <img id="logo" src={logo} alt="logotipo" />
      </div>
      <ul className="list__items__side">
        <li>
          <a href="/" className='link'>
            <span className="icon">
              <i className='bx bx-time-five icones'></i>
            </span>
            <span className="txt-item">Diário</span>
          </a>
        </li>
        <li>
          <a href="/" className='link'>
            <span className="icon">
            </span>
            <span className="txt-item">Importantes</span>
          </a>
        </li>
        {/* ...outros itens */}
      </ul>
    </nav>
  );
};

export default SideBar;
