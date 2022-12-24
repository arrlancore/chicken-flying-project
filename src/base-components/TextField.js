import React from "react";
import { renderIf } from "../utils";

const TextField = ({ label, id, className, ...rest }) => {
  const defaultId = "text-input-id";
  return (
    <div className="min-w-[300px]">
      {renderIf(Boolean(label))(
        <label
          className="block text-[#404040] text-xs leading-5 font-bold mb-2"
          htmlFor={id || defaultId}
        >
          {label}
        </label>
      )}
      <input
        id={id || defaultId}
        className={`text-xs leading-5 rounded-lg appearance-none border-2 h-[36px] w-full px-4 py-2
                focus:outline-none focus:shadow-outline text-[#404040] border-solid border-[#EDEDED]
                ${className}`}
        type="text"
        {...rest}
      />
    </div>
  );
};

export default TextField;
