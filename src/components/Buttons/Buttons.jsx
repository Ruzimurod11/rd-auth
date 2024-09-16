import React from "react";
import s from "./Buttons.module.scss";
import cl from "classnames";
import { IoLockClosedSharp } from "react-icons/io5";
import { BsUnlockFill } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Buttons = () => {
   return (
      <div className={cl(s.btns, "container mt-3 gap-3")}>
         <div className={s.btns__item}>
            <IoLockClosedSharp /> Block
         </div>
         <div className={s.btns__item}>
            <BsUnlockFill />
         </div>
         <div className={cl(s.btns__item, s.btns__item_delete)}>
            <RiDeleteBin6Fill className={s.btn__delete} />
         </div>
      </div>
   );
};

export default Buttons;
