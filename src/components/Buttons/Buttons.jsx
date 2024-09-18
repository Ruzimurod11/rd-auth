import React from "react";
import s from "./Buttons.module.scss";
import cl from "classnames";
import { IoLockClosedSharp } from "react-icons/io5";
import { BsUnlockFill } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Buttons = ({ handleBlock, handleUnblock, handleDelete }) => {
   return (
      <div className={cl(s.btns, "container mt-3 gap-3")}>
         <button onClick={handleBlock} className={s.btns__item}>
            <IoLockClosedSharp /> Block
         </button>
         <button onClick={handleUnblock} className={s.btns__item}>
            <BsUnlockFill />
         </button>
         <button
            onClick={handleDelete}
            className={cl(s.btns__item, s.btns__item_delete)}>
            <RiDeleteBin6Fill className={s.btn__delete} />
         </button>
      </div>
   );
};

export default Buttons;
