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
   const { user } = useSelector((state) => state.user);
   const [isCheckAll, setIsCheckAll] = useState(false);
   const [selectedUsers, setSelectedUsers] = useState([]);
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

   // checked users
   const handleCheckbox = async (e) => {
      const { value, checked } = e.target;
      setSelectedUsers([...selectedUsers, value]);
      if (!checked) {
         setSelectedUsers(selectedUsers.filter((item) => item !== value));
      }
   };
   console.log(selectedUsers);

   const allChecked = async () => {
      setIsCheckAll(!isCheckAll);
      setSelectedUsers(user.map((li) => li.id));
      if (isCheckAll) {
         setSelectedUsers([]);
      }
   };

   const allDelete = () => {
      selectedUsers.map((item) => {
         handleDeleteUser(item);
      });
   };

   useEffect(() => {
      dispatch(getUser());
   }, []);

   return (
      <>
         <Navbar selectedUsers={selectedUsers} />
         <Buttons onDelete={allDelete} />

         <div className='container'>
            <table className='mt-2 table table-bordered border-secondary'>
               <thead>
                  <tr className={cl(s.items__row)}>
                     <th scope='col' className={s.blockForm__input}>
                        <input
                           type='checkbox'
                           checked={isCheckAll}
                           onChange={allChecked}
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
                     <th scope='col'>Status change</th>
                     <th scope='col'>del</th>
                  </tr>
               </thead>
               <tbody>
                  {user?.map((user) => (
                     <tr key={user.id} className={s.items__row}>
                        <td>
                           <input
                              className={s.checked}
                              type='checkbox'
                              onChange={handleCheckbox}
                              value={user.id}
                              checked={selectedUsers.includes(user.id)}
                              tabIndex={user.tabIndex}
                           />
                        </td>
                        <td className={cl("d-flex flex-column")}>
                           <div className={s.user__name}>{user.name}</div>
                           <span> {user.position} </span>
                        </td>
                        <td className={s.user__info}>{user.email}</td>
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
                                 console.log(user);
                              }}>
                              del
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {selectedUsers}
         </div>
      </>
   );
};

export default HomePage;
