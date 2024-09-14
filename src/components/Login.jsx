import React from "react";
import Form from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const Login = () => {
   const dispatch = useDispatch();

   const handleLogin = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
         .then(console.log())
         .catch(console.error);
   };

   return <Form title='sign in' handleClick={handleLogin} />;
};

export default Login;
