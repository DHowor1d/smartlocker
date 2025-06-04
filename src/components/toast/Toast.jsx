function Toast({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed left-0 right-0 z-50 flex justify-center top-4">
      <div className="max-w-sm flex-1 px-6 py-3 font-medium text-white whitespace-pre-line rounded-lg shadow-lg bg-purple-700/50 backdrop-blur-sm animate-slide-down-up">
        {message}
      </div>
    </div>
  );
}

export default Toast;