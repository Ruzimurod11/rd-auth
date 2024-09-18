import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import {
   doc,
   setDoc,
   getDoc,
   query,
   collection,
   where,
   getDocs,
} from "firebase/firestore";
const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [position, setPosition] = useState("");
   const [isRegistering, setIsRegistering] = useState(false);
   const navigate = useNavigate();

   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         const q = query(collection(db, "users"), where("email", "==", email));
         const querySnapshot = await getDocs(q);

         if (!querySnapshot.empty) {
            alert("This email is already registered.");
            return;
         }

         const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );
         const user = userCredential.user;

         await setDoc(doc(db, "users", user.uid), {
            name: name,
            position: position,
            email: user.email,
            lastLogin: new Date().toISOString(),
            status: "active",
         });

         // alert("User registered successfully");
         navigate("/admin");
      } catch (error) {
         alert("Error registering user: " + error.message);
      }
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
         );
         const user = userCredential.user;

         const userDoc = await getDoc(doc(db, "users", user.uid));
         if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.status === "Blocked") {
               alert("Your account is blocked. Please contact the admin.");
               await signOut(auth);
               return;
            } else {
               alert("Logged in successfully");
               navigate("/admin");
            }
         } else {
            alert("User data not found.");
         }
      } catch (error) {
         alert("Error logging in: " + error.message);
      }
   };
   return (
      <>
         <div className='container'>
            <div className='row'>
               <div className='col-md-3'></div>
               <div className='col-md-6'>
                  <div className='card mt-5'>
                     {/* ============= */}
                     <div
                        class='modal fade'
                        id='exampleModal'
                        tabindex='-1'
                        role='dialog'
                        aria-labelledby='exampleModalLabel'
                        aria-hidden='true'>
                        <div class='modal-dialog' role='document'>
                           <div class='modal-content'>
                              <div class='modal-header'>
                                 <h5 class='modal-title' id='exampleModalLabel'>
                                    Modal title
                                 </h5>
                                 <button
                                    type='button'
                                    class='close'
                                    data-dismiss='modal'
                                    aria-label='Close'>
                                    <span aria-hidden='true'>&times;</span>
                                 </button>
                              </div>
                              <div class='modal-body'>Hello dereasdfs</div>
                              <div class='modal-footer'>
                                 <button
                                    type='button'
                                    class='btn btn-secondary'
                                    data-dismiss='modal'>
                                    Close
                                 </button>
                                 <button type='button' class='btn btn-primary'>
                                    Save changes
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* ============= */}
                     <div className='card-header'>
                        <h2>{isRegistering ? "Register" : "Login"}</h2>
                     </div>
                     <div className='card-body'>
                        <form
                           onSubmit={
                              isRegistering ? handleRegister : handleLogin
                           }>
                           {isRegistering && (
                              <>
                                 <div className='mb-2'>
                                    <label
                                       htmlFor='name'
                                       className='form-label'>
                                       Name
                                    </label>
                                    <input
                                       type='name'
                                       id='name'
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       required
                                       placeholder='Name'
                                       className='form-control'
                                    />
                                 </div>
                                 <div className='mb-2'>
                                    <label
                                       htmlFor='position'
                                       className='form-label'>
                                       Position
                                    </label>
                                    <input
                                       type='position'
                                       id='position'
                                       value={position}
                                       placeholder='Position'
                                       onChange={(e) =>
                                          setPosition(e.target.value)
                                       }
                                       className='form-control'
                                       required
                                    />
                                 </div>
                              </>
                           )}

                           <div className='mb-2'>
                              <label htmlFor='email' className='form-label'>
                                 Email address
                              </label>
                              <input
                                 type='email'
                                 id='email'
                                 value={email}
                                 className='form-control'
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder='email'
                                 required
                              />
                           </div>

                           <div className='mb-3'>
                              <label htmlFor='password' className='form-label'>
                                 Password
                              </label>
                              <input
                                 type='password'
                                 id='password'
                                 value={password}
                                 className='form-control'
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder='password'
                                 required
                              />
                           </div>

                           <button
                              type='submit'
                              className='btn btn-primary mb-2'>
                              {isRegistering ? "Register" : "Login"}
                           </button>
                           <p>
                              {isRegistering
                                 ? "Already have an account?"
                                 : "Don't have an account?"}
                              <button
                                 type='button'
                                 className='btn btn-primary'
                                 data-toggle='modal'
                                 data-target='#exampleModal'
                                 onClick={() =>
                                    setIsRegistering(!isRegistering)
                                 }>
                                 {isRegistering ? "Login" : "Register"}
                              </button>
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

export default LoginPage;
