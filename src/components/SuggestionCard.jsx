export default function SuggestionCard({ suggestion, index }) {
  const typeConfig = {
    resource_borrow: {
      icon: "🔄",
      label: "Resource Transfer",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      badgeColor: "bg-indigo-100 text-indigo-700",
    },
    capacity_boost: {
      icon: "⚡",
      label: "Capacity Boost",
      bg: "bg-amber-50",
      border: "border-amber-200",
      badgeColor: "bg-amber-100 text-amber-700",
    },
  };

  const priorityConfig = {
    High: "bg-red-100 text-red-700 border border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Low: "bg-gray-100 text-gray-600",
  };

  const config = typeConfig[suggestion.type] ?? typeConfig.resource_borrow;

  return (
    <div
      className={`rounded-xl border-2 ${config.border} ${config.bg} p-4 transition-all hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.badgeColor}`}>
                {config.label}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  priorityConfig[suggestion.priority] ?? priorityConfig.Medium
                }`}
              >
                {suggestion.priority} Priority
              </span>
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mt-1 leading-tight">
              {suggestion.title}
            </h4>
          </div>
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0 font-medium">#{index + 1}</span>
      </div>

      {/* Progress Visual */}
      <div className="flex items-center gap-3 mb-3 p-2 bg-white rounded-lg border border-gray-100">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1 truncate">{suggestion.sourceName}</p>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-red-400"
                style={{ width: `${suggestion.sourceProgress ?? 30}%` }}
              />
            </div>
            <span className="text-xs font-bold text-red-500 w-8">
              {suggestion.sourceProgress != null ? `${suggestion.sourceProgress}%` : "—"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{suggestion.sourceArea}</p>
        </div>
        <div className="text-gray-300 text-lg">→</div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1 truncate">{suggestion.targetName}</p>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-green-500"
                style={{ width: `${suggestion.targetProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-green-600 w-8">
              {suggestion.targetProgress}%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{suggestion.targetArea}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-2 leading-relaxed">{suggestion.description}</p>

      {/* Action & Impact */}
      <div className="space-y-1.5">
        <div className="flex items-start gap-1.5">
          <span className="text-xs font-semibold text-gray-700 flex-shrink-0">Action:</span>
          <p className="text-xs text-gray-600">{suggestion.action}</p>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-xs font-semibold text-green-700 flex-shrink-0">Impact:</span>
          <p className="text-xs text-green-700">{suggestion.impact}</p>
        </div>
      </div>

      {/* Suggested Member */}
      {suggestion.suggestedMember && (
        <div className="mt-3 flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            {suggestion.suggestedMember.avatar}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              {suggestion.suggestedMember.name}
            </p>
            <p className="text-xs text-gray-400">{suggestion.suggestedMember.role} • {suggestion.suggestedMember.capacity}% capacity free</p>
          </div>
        </div>
      )}
    </div>
  );
}
