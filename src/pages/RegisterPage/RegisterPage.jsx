import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../../components/SignUp";

const RegisterPage = () => {
   return (
      <div className='container d-flex justify-content-center flex-column'>
         <SignUp />
      </div>
   );
};

export default RegisterPage;
