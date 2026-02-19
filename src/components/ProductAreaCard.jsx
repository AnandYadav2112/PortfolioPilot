import { getOverallProgress, getProgressBarColor, getProgressColor, getPriorityBadgeColor } from "../utils/suggestionEngine";

export default function ProductAreaCard({ area, isSelected, onClick }) {
  const overallProgress = getOverallProgress(area);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-indigo-500 ring-2 ring-indigo-100" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: area.color }}
            />
            <h3 className="font-semibold text-gray-800 text-sm leading-tight">{area.name}</h3>
          </div>
          <span className={`text-xl font-bold ${getProgressColor(overallProgress)}`}>
            {overallProgress}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getProgressBarColor(overallProgress)}`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{area.subProducts.length} sub-products</p>
      </div>

      {/* Sub-Products */}
      <div className="p-4 space-y-3">
        {area.subProducts.map((sp) => (
          <div key={sp.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 font-medium truncate max-w-[60%]">{sp.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${getPriorityBadgeColor(sp.priority)}`}>
                  {sp.priority}
                </span>
                <span className={`text-xs font-bold ${getProgressColor(sp.progress)}`}>
                  {sp.progress}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${getProgressBarColor(sp.progress)}`}
                style={{ width: `${sp.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
