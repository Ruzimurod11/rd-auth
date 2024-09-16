import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <nav className='navbar bg-body-secondary'>
         <div className='container d-flex justify-content-end'>
            <Link to='/register'>Register</Link>
            <div className='mx-3'>
               Hello, <a href='#'>John Lennon! </a>
            </div>
            <a href='#'>Logout </a>
         </div>
      </nav>
   );
};

export default Navbar;
