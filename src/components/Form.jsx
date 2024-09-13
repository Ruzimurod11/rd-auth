import { useState } from "react";

import React from "react";

const Form = ({ title, handleClick }) => {
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");
   return (
      <form>
         <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
         />
         <input
            type='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='password'
         />
         <button onClick={handleClick}> {title} </button>
      </form>
   );
};

export default Form;
