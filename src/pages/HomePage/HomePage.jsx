import { useEffect, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaCaretDown } from "react-icons/fa";
import cl from "classnames";
import s from "./HomePage.module.scss";
import { db } from "../../firebase";
import Navbar from "../../components/Navbar/Navbar";
import Buttons from "../../components/Buttons/Buttons";
import {
   deleteUserIs,
   getUser,
   updataUserIs,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
   const { user, changeStatus } = useSelector((state) => state.user);
   const [localStatus, setLocalStatus] = useState(false);
   const [users, setUsers] = useState();
   const dispatch = useDispatch();

   const updataUser = async (id, status) => {
      const userDoc = doc(db, "users", id);
      const newStatus = { status: !status };
      await updateDoc(userDoc, newStatus);
   };

   // handle update
   const handleUpdateUser = (id, status) => {
      dispatch(updataUserIs({ id, status }));
      updataUser(id, status);
   };

   const deleteUser = async (id) => {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
   };

   // handle delete
   const handleDeleteUser = (id) => {
      dispatch(deleteUserIs(id));
      // deleteUser(id);
   };

   useEffect(() => {
      dispatch(getUser());
   }, []);

   return (
      <>
         <Navbar />
         <Buttons />
         <div className='container'>
            <table className='mt-2 table table-bordered border-secondary'>
               <thead>
                  <tr className={cl(s.items__row)}>
                     <th className={s.blockForm__input}>
                        <div className={s.checkbox}>
                           <input type='checkbox' value='checkAll' />
                        </div>
                     </th>
                     <th
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
                     <th>email</th>
                     <th>Last login</th>
                     <th>Status</th>
                     <th>Status change</th>
                     <th>del</th>
                  </tr>
               </thead>
               <tbody>
                  {user?.map((user) => (
                     <tr key={user.id} className={s.items__row}>
                        <th className={s.blockForm__input}>
                           <div className={s.checkbox}>
                              <input type='checkbox' />
                           </div>
                        </th>
                        <td className={cl("d-flex flex-column")}>
                           <div className={s.user__name}>{user.name}</div>
                           <span> {user.position} </span>
                        </td>
                        <td className={s.user__info}> {user.email} </td>
                        <td className={s.user__info}> {user.lastLogin} </td>
                        <td className={s.user__info}>
                           {user.status ? "active" : "blocked"}
                        </td>
                        <td>
                           <button
                              onClick={() => {
                                 handleUpdateUser(user.id, user.status);
                              }}>
                              status change
                           </button>
                        </td>
                        <td>
                           <button
                              onClick={() => {
                                 handleDeleteUser(user.id);
                              }}>
                              del
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default HomePage;
