import { useState } from "react";
import { Link } from "react-router-dom";

import React from "react";

const Form = ({ title, handleClick }) => {
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");

   return (
      <div className='container'>
         <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
               <div className='card mt-5'>
                  <div className='card-header'>
                     <h2>Login Page</h2>
                  </div>
                  <div className='card-body'>
                     <form>
                        <div class='mb-3'>
                           <label for='exampleInputEmail1' class='form-label'>
                              Email address
                           </label>
                           <input
                              type='email'
                              class='form-control'
                              id='exampleInputEmail1'
                              aria-describedby='emailHelp'
                           />
                        </div>
                        <div class='mb-3'>
                           <label
                              for='exampleInputPassword1'
                              class='form-label'>
                              Password
                           </label>
                           <input
                              type='password'
                              class='form-control'
                              id='exampleInputPassword1'
                           />
                        </div>

                        <button
                           type='submit'
                           class='btn btn-primary'
                           onClick={handleClick}>
                           {title}
                        </button>
                        <p>
                           No account?
                           <Link to='/register'> {"  Register now"}</Link>
                        </p>
                     </form>
                  </div>
               </div>
            </div>
            <div className='col-md-3'></div>
         </div>
      </div>
   );
};

export default Form;
