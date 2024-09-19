import { useEffect, useState } from "react";
import {
   collection,
   deleteDoc,
   doc,
   getDoc,
   getDocs,
   updateDoc,
} from "firebase/firestore";
import { FaCaretDown } from "react-icons/fa";
import cl from "classnames";
import s from "./AdminPage.module.scss";
import { auth, db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import Buttons from "../../components/Buttons/Buttons";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
   const [users, setUsers] = useState();
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [currentUser, setCurrentUser] = useState(null);
   const [isCheckAll, setIsCheckAll] = useState(false);
   const [userName, setUserName] = useState("");
   const navigate = useNavigate();
   useEffect(() => {
      const fetchCurrentUserData = async () => {
         const user = auth.currentUser;

         if (user) {
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
               const userData = userDoc.data();

               if (userData.status === "blocked") {
                  // alert("Your account is blocked. You will be logged out.");
                  await signOut(auth);
                  navigate("/login");
               } else {
                  setCurrentUser(user);
                  setUserName(userData.name || "User");
               }
            }
         }
         const querySnapshot = await getDocs(collection(db, "users"));
         const usersList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setUsers(usersList);
      };
      fetchCurrentUserData();
   }, [navigate]);

   const handleLogout = async () => {
      await signOut(auth);
      navigate("/login");
   };

   const handleSelectUser = (userId) => {
      setSelectedUsers((prev) =>
         prev.includes(userId)
            ? prev.filter((id) => id !== userId)
            : [...prev, userId]
      );
   };

   const handleSelectAll = () => {
      setIsCheckAll(!isCheckAll);
      setSelectedUsers(users.map((li) => li.id));
      if (isCheckAll) {
         setSelectedUsers([]);
      }
   };

   const handleBlockUsers = async () => {
      await Promise.all(
         selectedUsers.map(async (userId) => {
            await updateDoc(doc(db, "users", userId), { status: "blocked" });
            navigate("/");
         })
      );
      setUsers((prevUsers) =>
         prevUsers.map((user) =>
            selectedUsers.includes(user.id)
               ? { ...user, status: "blocked" }
               : user
         )
      );

      setSelectedUsers([]);
   };

   const handleUnblockUsers = async () => {
      await Promise.all(
         selectedUsers.map(async (userId) => {
            await updateDoc(doc(db, "users", userId), { status: "active" });
         })
      );
      setUsers((prevUsers) =>
         prevUsers.map((user) =>
            selectedUsers.includes(user.id)
               ? { ...user, status: "active" }
               : user
         )
      );
      setSelectedUsers([]);
   };

   const handleDeleteUsers = async () => {
      await Promise.all(
         selectedUsers.map(async (userId) => {
            await updateDoc(doc(db, "users", userId), { status: "deleted" });
            await deleteDoc(doc(db, "users", userId));
         })
      );
      setUsers((prevUsers) =>
         prevUsers.filter((user) => !selectedUsers.includes(user.id))
      );
      setSelectedUsers([]);
   };

   return (
      <>
         <Navbar
            userName={userName}
            currentUser={currentUser}
            handleLogout={handleLogout}
         />
         <Buttons
            handleBlock={handleBlockUsers}
            handleUnblock={handleUnblockUsers}
            handleDelete={handleDeleteUsers}
         />

         <div className='container'>
            <table className='mt-2 table table-bordered border-secondary'>
               <thead>
                  <tr className={cl(s.items__row)}>
                     <th scope='col' className={s.blockForm__input}>
                        <input
                           name='allSelect'
                           type='checkbox'
                           checked={isCheckAll}
                           onChange={handleSelectAll}
                        />
                     </th>
                     <th
                        scope='col'
                        className={cl(
                           "d-flex align-items-center justify-content-between"
                        )}>
                        <div className={cl("d-flex flex-column")}>
                           <div>Name</div>
                           <span className={s.user__position}>Position</span>
                        </div>
                        <div>
                           <FaCaretDown />
                        </div>
                     </th>
                     <th scope='col'>email</th>
                     <th scope='col'>Last login</th>
                     <th scope='col'>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {users?.map((user) => (
                     <tr key={user.id}>
                        <td>
                           <input
                              type='checkbox'
                              name={user.name}
                              checked={selectedUsers?.includes(user.id)}
                              onChange={() => handleSelectUser(user.id)}
                           />
                        </td>
                        <td
                           className={
                              user.status === "blocked"
                                 ? cl(
                                      s.user__info,
                                      s.user__blocked,
                                      "d-flex flex-column"
                                   )
                                 : s.user__info
                           }>
                           <div className={s.user__name}>{user.name}</div>
                           <span className={s.user__position}>
                              {user.position || "-"}
                           </span>
                        </td>
                        <td
                           className={
                              user.status === "blocked"
                                 ? cl(s.items__row, s.user__blocked)
                                 : s.items__row
                           }>
                           {user.email}
                        </td>
                        <td
                           className={
                              user.status === "blocked"
                                 ? cl(s.items__row, s.user__blocked)
                                 : s.items__row
                           }>
                           {" "}
                           {user.lastLogin}{" "}
                        </td>
                        <td
                           className={
                              user.status === "blocked"
                                 ? cl(s.user__info, s.user__status)
                                 : s.user__info
                           }>
                           {user.status}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {/* {selectedUsers} */}
         </div>
      </>
   );
};

export default AdminPage;
