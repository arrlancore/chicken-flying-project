import React from "react";

const ItemCard = ({ children }) => {
  return (
    <div
      className={`p-4 rounded border-[#E0E0E0]
                border-[1px] border-solid bg-[#FAFAFA]`}
    >
      {children}
    </div>
  );
};

export default ItemCard;
