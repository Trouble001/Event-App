import { twMerge } from "tailwind-merge";

const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-rose-500 text-white hover:bg-rose-600",
}

const Button = ({type, disabled, onClick, variant = "primary", children, className = "", ...props}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={twMerge(
                `w-full shadow rounded-3xl text-white mb-4 px-2 py-2 flex items-center justify-center cursor-pointer font-semibold transition ${variants[variant]}`,
                className
            )}
            { ...props }
        >{children}</button>
    );
}

export default Button;