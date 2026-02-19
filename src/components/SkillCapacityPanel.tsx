import type { ProductArea, TeamMember } from '../data/mockData';

interface Props {
  areas: ProductArea[];
  members: TeamMember[];
}

interface SkillCapacity {
  skill: string;
  members: { name: string; area: string }[];
}

export default function SkillCapacityPanel({ areas, members }: Props) {
  // Build a map of all skills and who has them
  const skillMap: Record<string, { name: string; area: string }[]> = {};

  members.forEach((m) => {
    const areaName = areas.find((a) => a.id === m.currentAllocation)?.name ?? 'Unassigned';
    m.skills.forEach((skill) => {
      if (!skillMap[skill]) skillMap[skill] = [];
      skillMap[skill].push({ name: m.name, area: areaName });
    });
  });

  const skillCapacities: SkillCapacity[] = Object.entries(skillMap)
    .map(([skill, memberList]) => ({ skill, members: memberList }))
    .sort((a, b) => b.members.length - a.members.length);

  // Build area capacity summary
  const areaCapacity = areas.map((area) => {
    const areaMembers = members.filter((m) => m.currentAllocation === area.id);
    const allSkills = new Set(areaMembers.flatMap((m) => m.skills));
    const avgProgress = Math.round(
      area.subProducts.reduce((s, sp) => s + sp.progress, 0) / area.subProducts.length
    );
    return {
      id: area.id,
      name: area.name,
      memberCount: areaMembers.length,
      skills: Array.from(allSkills),
      avgProgress,
      color: area.color,
    };
  });

  const colorBadge: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Skill-Based Capacity</h2>

      {/* Per-area capacity table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 pr-4 font-semibold text-gray-600">Product Area</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-600">Members</th>
              <th className="text-center py-2 px-2 font-semibold text-gray-600">Progress</th>
              <th className="text-left py-2 pl-2 font-semibold text-gray-600">Skills Available</th>
            </tr>
          </thead>
          <tbody>
            {areaCapacity.map((ac) => (
              <tr key={ac.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2 pr-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorBadge[ac.color] ?? ''}`}>
                    {ac.name}
                  </span>
                </td>
                <td className="text-center py-2 px-2 font-medium text-gray-700">{ac.memberCount}</td>
                <td className="text-center py-2 px-2">
                  <span
                    className={`text-xs font-semibold ${
                      ac.avgProgress >= 80
                        ? 'text-green-600'
                        : ac.avgProgress >= 50
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {ac.avgProgress}%
                  </span>
                </td>
                <td className="py-2 pl-2">
                  <div className="flex flex-wrap gap-1">
                    {ac.skills.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skill distribution */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Skill Distribution Across Teams</h3>
      <div className="grid grid-cols-2 gap-2">
        {skillCapacities.map((sc) => (
          <div key={sc.skill} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-gray-700">{sc.skill}</span>
            <span className="text-xs text-gray-500">{sc.members.length} member{sc.members.length !== 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
