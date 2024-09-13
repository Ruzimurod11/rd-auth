import React from "react";
import Form from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const Login = () => {
   const auth = getAuth();
   const dispatch = useDispatch();
   const handleLogin = () => {
      console.log();
   };
   return <div>Login</div>;
};

export default Login;
