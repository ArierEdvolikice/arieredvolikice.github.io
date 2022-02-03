import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { auth } from "./../../firebase-config";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imguser from './../../../src/componentes/Navbar/none.png';


function Navbar() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user,setUser] = useState({});

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    console.log(user);
})

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  
  const logout = async ()=>{
    await signOut(auth);
};

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar-er'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            NEO
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/projetos'
                className='nav-links'
                onClick={closeMobileMenu}
              >{}
                Projetos
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contato'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sobre nós
              </Link>
            </li>

            <li>
              <Link
                to='/Login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Acessar
              </Link>
            </li>
          </ul>

          {
          user?
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret> <p>{user.displayName?
          user.displayName
          :
          user.email}</p> 
          {user.photoURL?
          <img width="50" className='fotinha' max-height="20" src={user.photoURL}/> 
          : 
          <img className='fotinha' width="50" max-height="20" src={imguser}></img>
          }
          </DropdownToggle>
          <DropdownMenu>
            <Link  to='/Login'><DropdownItem>Configurações</DropdownItem></Link>
            <DropdownItem divider />
            <DropdownItem onClick={logout} >Sair</DropdownItem>
          </DropdownMenu>
        </Dropdown>
          :
          button && <Button buttonStyle='btn--outline'>ACESSAR</Button>
          }
        </div>  
      </nav>
    </>
  );
}

export default Navbar;