function SkeletonUI() {
  return (
    <div className="relative max-w-md min-h-screen mx-auto bg-gray-50 animate-pulse">
      <div className="relative p-2">
        {/* 맵 스켈레톤 */}
        <div className="w-full rounded-xl h-[calc(100vh-20px)] bg-gray-200" />
        
        {/* 버튼 스켈레톤 */}
        <div className="absolute left-0 right-0 z-10 px-4 bottom-6">
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-300 rounded-md" />
            <div className="flex-1 h-12 bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonUI;