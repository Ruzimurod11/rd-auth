import React from "react";
import cl from "classnames";
import s from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = ({ userName, currentUser, handleLogout }) => {
   return (
      <nav className='navbar bg-body-secondary'>
         <div className='container d-flex justify-content-end gap-4'>
            <span className={cl(s.heading, "mr-4")}>
               Hello,
               <Link to='#' className={s.user__name}>
                  {userName || currentUser?.email || "User"}!
               </Link>
            </span>
            <button className={s.logout} onClick={handleLogout}>
               Logout
            </button>
         </div>
      </nav>
   );
};

export default Navbar;
