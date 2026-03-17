import { twMerge } from "tailwind-merge";

const Button = ({type, disabled, onClick, children, className = "", ...props}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={twMerge(
                "w-full shadow bg-cyan-600 hover:bg-cyan-700 rounded-3xl text-white mb-4 px-2 py-2 flex items-center justify-center cursor-pointer font-semibold transition",
                className
            )}
            { ...props }
        >{children}</button>
    );
}

export default Button;