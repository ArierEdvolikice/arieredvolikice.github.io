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
      <nav className='navbar'>
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


          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>{user? <img width="50" max-height="20" src={user.photoURL}/> :<img width="50" max-height="20" src={imguser}></img>}
          {user?.email}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled>Configurações</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout} >Sair</DropdownItem>
          </DropdownMenu>
        </Dropdown>


          {///Lucas Levi: Se ele nao conseguir ler o displayName e o email, vai dar erro, por isso constantemente perguntar se há .email e
          ///.displayName pro codigo nao tentar ler um nulll
          /// assim, se o Usuario deslogar, ele nao lê o null.
          }
          {user?<Button>{<img height={300}  src={imguser}></img>,
            user?.displayName,
            user?.email
          }</Button>:button && <Button buttonStyle='btn--outline'>ACESSAR</Button>}
        </div>  
      </nav>
    </>
  );
}

export default Navbar;