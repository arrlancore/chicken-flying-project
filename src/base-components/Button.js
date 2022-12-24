import React from "react";

const buttonVariants = {
  default:
    "border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-grey-400",
  danger:
    "border-transparent bg-danger text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500",
  primary:
    "border-transparent bg-primary text-white shadow-sm hover:bg-[#20818E] focus:outline-none focus:ring-2 focus:ring-primary-light",
};

const Button = ({ variant, loading, children, className, ...props }) => {
  const buttonVariant = buttonVariants[variant || "default"];

  return (
    <button
      type="button"
      className={`inline-flex justify-center rounded-md border disabled:opacity-50
      w-auto text-sm leading-6 focus:ring-offset-2 font-bold px-4 h-[32px] items-center
      ${className || ""}
      ${buttonVariant}`}
      {...props}
    >
      <div className="flex">
        {loading ? <div className="button-loader" /> : null} {children}
      </div>
    </button>
  );
};

export default Button;
