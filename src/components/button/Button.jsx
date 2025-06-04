function Button({ onClick, children }) {
  return (
    <div 
      onClick={onClick} 
      className="flex-1 px-4 py-2 text-xl text-center bg-blue-800/50 backdrop-blur-sm rounded-md cursor-pointer select-none text-gray-50 hover:bg-gray-400"
    >
      {children}
    </div>
  );
}

export default Button