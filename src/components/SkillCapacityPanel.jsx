export default function SkillCapacityPanel({ skillCapacity, teamMembers }) {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Skill-Based Capacity
      </h2>

      {/* Skill Utilization Bars */}
      <div className="space-y-3 mb-6">
        {skillCapacity.map((s) => {
          const utilColor =
            s.utilization >= 80
              ? "bg-red-400"
              : s.utilization >= 60
              ? "bg-yellow-400"
              : "bg-green-500";
          const labelColor =
            s.utilization >= 80
              ? "text-red-600"
              : s.utilization >= 60
              ? "text-yellow-600"
              : "text-green-600";
          return (
            <div key={s.skill}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">{s.skill}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {s.available} available / {s.total} total
                  </span>
                  <span className={`text-xs font-bold ${labelColor}`}>
                    {s.utilization}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${utilColor}`}
                  style={{ width: `${s.utilization}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Members */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Team Members</h3>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {teamMembers.map((m) => {
            const capacityColor =
              m.capacity >= 80
                ? "text-green-600"
                : m.capacity >= 50
                ? "text-yellow-600"
                : "text-red-500";
            return (
              <div
                key={m.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  }}
                >
                  {m.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {m.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{m.role}</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {m.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className={`text-xs font-bold ${capacityColor}`}>
                    {m.capacity}%
                  </span>
                  <span className="text-xs text-gray-400">free</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
