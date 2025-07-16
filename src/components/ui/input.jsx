import * as React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={
                `block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-0 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`
            }
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input }; 