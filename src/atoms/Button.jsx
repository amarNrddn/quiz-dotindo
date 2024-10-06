import React from 'react';

const Button = ({ children, onClick, variant = "default", size = "md", ...props }) => {
   const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none";

   const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline:
         "text-blue-600 hover:bg-blue-600 hover:text-white",
      ghost: "bg-transparent hover:bg-blue-100",
      link: "underline text-blue-600 hover:text-blue-800",
   };

   const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
   };

   const variantStyles = variants[variant] || variants.default;
   const sizeStyles = sizes[size] || sizes.md;

   return (
      <button className={`${baseStyles} ${variantStyles} ${sizeStyles}`} onClick={onClick}  {...props} >
         {children}
      </button>
   );
};

export default Button;
