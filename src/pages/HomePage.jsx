import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../store/slices/userSlice";
// import { useAuth } from "../hooks/use-auth";
// import { Navigate } from "react-router-dom";
import { RiCheckboxIndeterminateLine } from "react-icons/ri";
import { BiCheckbox } from "react-icons/bi";
// import { getFirestore, getDoc, doc } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const HomePage = () => {
   const [users, setUsers] = useState({});
   const fetchUserData = async () => {
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `users/`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               setUsers(snapshot.val());
            } else {
               console.log("No data available");
            }
         })
         .catch((error) => {
            console.error(error);
         });
   };

   useEffect(() => {
      fetchUserData();
   }, []);

   let userInfo = [];

   for (let key in users) {
      userInfo.push(users[key]);
   }

   console.log(userInfo);

   return (
      <div className='container'>
         <button>Log out from</button>
         <table className='mt-2 table table-bordered border-secondary'>
            <thead>
               <tr>
                  <th>
                     <RiCheckboxIndeterminateLine />
                  </th>
                  <th>
                     Name <span>Position</span>
                  </th>
                  <th>email</th>
                  <th>Last login</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {userInfo.map((user, idx) => (
                  <tr key={idx}>
                     <th>
                        <BiCheckbox className='check' />
                     </th>
                     <td>Mark</td>
                     <td> {user.email} </td>
                     <td>@mdo</td>
                     <td>@mdo</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default HomePage;
