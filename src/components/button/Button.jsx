function Button({ onClick, children }) {
  return (
    <div 
      onClick={onClick} 
      className="flex-1 px-4 py-3 text-xl text-center bg-gray-300 rounded-md cursor-pointer text-gray-50 hover:bg-gray-400"
    >
      {children}
    </div>
  );
}

export default Button