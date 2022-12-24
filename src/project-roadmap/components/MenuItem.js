import React from "react";
import { ReactComponent as ArrowLeftIcon } from "../../assets/icon/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icon/arrow-right.svg";
import { ReactComponent as EditIcon } from "../../assets/icon/edit-alt.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icon/trash-alt.svg";

const MenuItem = () => {
  const menus = [
    { title: "Move Left", icon: <ArrowLeftIcon />, hide: false },
    { title: "Move Right", icon: <ArrowRightIcon />, hide: false },
    { title: "Edit", icon: <EditIcon /> },
    { title: "Delete", icon: <DeleteIcon /> },
  ];

  return (
    <div className="flex p-4 gap-4 flex-col rounded-lg bg-white min-w-[260px] shadow-lg">
      {menus.map((menu) => (
        <div className="flex items-center cursor-pointer card-menu-item">
          {menu.icon}
          <div className="text-sm ml-4 text-strong-black font-[600]">
            {menu.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItem;
