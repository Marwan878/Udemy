export function CourseIcon() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-14 border-2 border-gray-400 rounded-sm flex items-center justify-center transform -rotate-6 mb-1">
        <div className="w-8 h-10 border-b-2 border-r-2 border-gray-400"></div>
      </div>
      <div className="w-14 h-10 border-2 border-gray-400 rounded-sm flex items-center justify-center transform rotate-3">
        <div className="w-10 h-6 flex">
          <div className="w-5 h-6 bg-gray-300"></div>
          <div className="w-5 h-6 bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

