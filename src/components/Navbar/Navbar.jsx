import React from "react";
import { Link } from "react-router-dom";
import s from "./Navbar.module.scss";

const Navbar = () => {
   return (
      <nav className='navbar bg-body-secondary'>
         <div className='container d-flex justify-content-end'>
            <Link to='/register'>Register</Link>
            <div className='mx-3'>
               Hello, <a href='#'>John Lennon! </a>
            </div>
            <div className={s.link__text}></div>
            <a href='#'>Logout </a>
         </div>
      </nav>
   );
};

export default Navbar;
