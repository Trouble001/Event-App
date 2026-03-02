const Button = ({type, disabled, children}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full shadow rounded-md text-base bg-cyan-500 hover:bg-cyan-600 text-cyan-50 mb-4 px-2 py-2 flex items-center justify-center cursor-pointer"
        >{children}</button>
    );
}

export default Button;