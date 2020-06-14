import React from 'react';
import './../styles/Navbar.css';

function NavBar(props:any){
    return(
        <div>
            <nav id='navbar'>
                <ul id='navlist'>
                    <li><a href="#main" className='navbar-item'>{props.title}</a></li>
                    <li><a href="#downloads" className='navbar-item'>Descargas</a></li>
                    <li><a href="#info" className='navbar-item'>Info</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;