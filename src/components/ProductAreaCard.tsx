import type { ProductArea } from '../data/mockData';

interface Props {
  area: ProductArea;
}

const colorMap: Record<string, { bg: string; bar: string; badge: string; border: string }> = {
  blue: {
    bg: 'bg-blue-50',
    bar: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    bar: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-purple-50',
    bar: 'bg-purple-500',
    badge: 'bg-purple-100 text-purple-800',
    border: 'border-purple-200',
  },
  orange: {
    bg: 'bg-orange-50',
    bar: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-800',
    border: 'border-orange-200',
  },
  red: {
    bg: 'bg-red-50',
    bar: 'bg-red-500',
    badge: 'bg-red-100 text-red-800',
    border: 'border-red-200',
  },
};

function getProgressColor(progress: number): string {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-yellow-500';
  if (progress >= 20) return 'bg-orange-500';
  return 'bg-red-500';
}

function getProgressLabel(progress: number): string {
  if (progress === 100) return 'Complete';
  if (progress >= 80) return 'Near Done';
  if (progress >= 50) return 'In Progress';
  if (progress >= 20) return 'Early Stage';
  return 'Just Started';
}

export default function ProductAreaCard({ area }: Props) {
  const colors = colorMap[area.color] ?? colorMap['blue'];
  const overallProgress = Math.round(
    area.subProducts.reduce((sum, sp) => sum + sp.progress, 0) / area.subProducts.length
  );

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-5 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">{area.name}</h2>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>
          {overallProgress}% overall
        </span>
      </div>

      {/* Overall progress bar */}
      <div className="mb-5">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${colors.bar} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Sub-products */}
      <div className="space-y-3">
        {area.subProducts.map((sp) => (
          <div key={sp.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{sp.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{sp.progress}%</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                  {getProgressLabel(sp.progress)}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${getProgressColor(sp.progress)} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${sp.progress}%` }}
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {sp.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
