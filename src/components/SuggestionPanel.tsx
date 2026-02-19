import type { Suggestion } from '../utils/suggestions';

interface Props {
  suggestions: Suggestion[];
}

const priorityStyles: Record<string, { badge: string; icon: string; border: string; bg: string }> = {
  high: {
    badge: 'bg-red-100 text-red-700',
    icon: '🚨',
    border: 'border-red-200',
    bg: 'bg-red-50',
  },
  medium: {
    badge: 'bg-yellow-100 text-yellow-700',
    icon: '⚡',
    border: 'border-yellow-200',
    bg: 'bg-yellow-50',
  },
  low: {
    badge: 'bg-blue-100 text-blue-700',
    icon: '💡',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
  },
};

const typeLabels: Record<string, string> = {
  borrow: 'Borrow Resources',
  reallocate: 'Reallocate Team',
  accelerate: 'Accelerate',
};

export default function SuggestionPanel({ suggestions }: Props) {
  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-2">AI Resource Suggestions</h2>
        <p className="text-gray-500 text-sm">No resource reallocation suggestions at this time. All projects are balanced! ✅</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">AI Resource Suggestions</h2>
        <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-1 rounded-full">
          {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        {suggestions.map((sug) => {
          const styles = priorityStyles[sug.priority];
          return (
            <div
              key={sug.id}
              className={`rounded-xl border ${styles.border} ${styles.bg} p-4`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{styles.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {typeLabels[sug.type]}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}>
                    {sug.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Transfer arrow */}
              <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                <span className="font-medium bg-white border border-gray-200 px-2 py-0.5 rounded">{sug.fromArea}</span>
                <span>→</span>
                <span className="font-medium bg-white border border-gray-200 px-2 py-0.5 rounded">{sug.toArea}</span>
              </div>

              {/* Members */}
              <div className="flex flex-wrap gap-1 mb-2">
                {sug.members.map((name) => (
                  <span key={name} className="text-xs bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                    👤 {name}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Why:</span> {sug.reason}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Impact:</span> {sug.impact}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
