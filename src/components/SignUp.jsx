import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const SignUp = () => {
   const [email, setEmail] = useState("");
   const [pass, setPass] = useState("");
   const [newName, setNewName] = useState("");
   const [newPosition, setNewPostion] = useState("");
   const [status, setStatus] = useState(true);
   const [onSelect, setSelect] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleRegister = (email, password) => {
      const auth = getAuth();
      const usersCollectionRef = collection(db, "users");
      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            console.log(user);
            if (user) {
               addDoc(usersCollectionRef, {
                  name: newName,
                  position: newPosition,
                  email: user.email,
                  lastLogin: user.metadata.lastSignInTime,
                  status: status,
                  onSelect: onSelect,
               });
            }
            dispatch(
               setUser({
                  name: newName,
                  position: newPosition,
                  email: user.email,
                  lastLogin: user.metadata.lastSignInTime,
                  status: status,
                  onSelect: onSelect,

                  id: user.uid,
                  token: user.accessToken,
               })
            );
            navigate("/");
         })
         .catch(console.error);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      handleRegister(email, pass);
   };

   return (
      <>
         <div className='container'>
            <div className='row'>
               <div className='col-md-3'></div>
               <div className='col-md-6'>
                  <div className='card mt-5'>
                     <div className='card-header'>
                        <h2>Register Page</h2>
                     </div>
                     <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                           <div className='mb-2'>
                              <label htmlFor='name' className='form-label'>
                                 Name
                              </label>
                              <input
                                 type='text'
                                 id='name'
                                 className='form-control'
                                 onChange={(e) => setNewName(e.target.value)}
                                 placeholder='Name'
                              />
                           </div>
                           <div className='mb-2'>
                              <label htmlFor='position' className='form-label'>
                                 Position
                              </label>
                              <input
                                 type='text'
                                 id='position'
                                 className='form-control'
                                 onChange={(e) => setNewPostion(e.target.value)}
                                 placeholder='Position'
                              />
                           </div>
                           <div className='mb-2'>
                              <label htmlFor='email' className='form-label'>
                                 Email address
                              </label>
                              <input
                                 type='email'
                                 id='email'
                                 className='form-control'
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder='email'
                              />
                           </div>

                           <div className='mb-3'>
                              <label htmlFor='password' className='form-label'>
                                 Password
                              </label>
                              <input
                                 type='password'
                                 id='password'
                                 className='form-control'
                                 onChange={(e) => setPass(e.target.value)}
                                 placeholder='password'
                              />
                           </div>

                           <button
                              type='submit'
                              className='btn btn-primary mb-2'>
                              Submit
                           </button>
                           <p>
                              Already have an account?
                              <Link to='/login'>{" Sign in"}</Link>
                           </p>
                        </form>
                     </div>
                  </div>
               </div>
               <div className='col-md-3'></div>
            </div>
         </div>
         {/* ===================== */}
      </>
   );
};

export default SignUp;
