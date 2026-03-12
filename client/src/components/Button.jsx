const Button = ({type, disabled, children}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full shadow bg-cyan-500 hover:bg-white/40 rounded-lg text-white mb-4 px-2 py-2 flex items-center justify-center cursor-pointer font-semibold transition"
        >{children}</button>
    );
}

export default Button;