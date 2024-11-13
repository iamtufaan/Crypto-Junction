import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={` px-5 py-2 border hover:bg-yellow-500 hover:text-black font-semibold ${
        selected ? "bg-yellow-500 text-black" : ""
      }`}>
      {children}
    </div>
  );
};

export default SelectButton;
