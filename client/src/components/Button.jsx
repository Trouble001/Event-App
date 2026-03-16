const Button = ({type, disabled, className = "", onClick, children}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`w-full shadow bg-cyan-500 hover:bg-white/40 rounded-lg text-white mb-4 px-2 py-2 flex items-center justify-center cursor-pointer font-semibold transition ${className}`}
        >{children}</button>
    );
}

export default Button;