import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import Form from "./Form";

const SignUp = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleRegister = (email, password) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            console.log(user);
            if (user) {
               const db = getDatabase();
               set(ref(db, "/users/" + user.uid), {
                  email: user.email,
               });
            }
            dispatch(
               setUser({
                  email: user.email,
                  id: user.uid,
                  token: user.accessToken,
               })
            );
            navigate("/");
         })
         .catch(console.error);
   };
   return <Form title='register' handleClick={handleRegister} />;
};

export default SignUp;
