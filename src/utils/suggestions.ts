import type { ProductArea, TeamMember } from '../data/mockData';

export interface Suggestion {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: 'borrow' | 'reallocate' | 'accelerate';
  fromArea: string;
  toArea: string;
  members: string[];
  reason: string;
  impact: string;
}

function getOverallProgress(area: ProductArea): number {
  if (area.subProducts.length === 0) return 0;
  const total = area.subProducts.reduce((sum, sp) => sum + sp.progress, 0);
  return Math.round(total / area.subProducts.length);
}

function getAllMembersForArea(areaId: string, members: TeamMember[]): TeamMember[] {
  return members.filter((m) => m.currentAllocation === areaId);
}

function hasCriticalSubProduct(area: ProductArea): boolean {
  return area.subProducts.some((sp) => sp.progress >= 85);
}

function getEarlyStageArea(area: ProductArea): boolean {
  return getOverallProgress(area) <= 20;
}

export function generateSuggestions(
  areas: ProductArea[],
  members: TeamMember[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  for (const targetArea of areas) {
    const targetProgress = getOverallProgress(targetArea);
    const hasCritical = hasCriticalSubProduct(targetArea);

    if (!hasCritical) continue;

    // Find critical sub-products that are close to done (>=85%)
    const criticalSubs = targetArea.subProducts.filter((sp) => sp.progress >= 85 && sp.progress < 100);
    if (criticalSubs.length === 0) continue;

    for (const sourceArea of areas) {
      if (sourceArea.id === targetArea.id) continue;
      const sourceProgress = getOverallProgress(sourceArea);

      // Source area is early-stage (<=20% overall) — resources can be borrowed
      if (getEarlyStageArea(sourceArea)) {
        const sourceMembers = getAllMembersForArea(sourceArea.id, members);
        // Find members with matching skills for critical sub-products
        const matchingMembers = sourceMembers.filter((m) =>
          criticalSubs.some((sp) =>
            sp.requiredSkills.some((skill) => m.skills.includes(skill))
          )
        );

        if (matchingMembers.length > 0) {
          suggestions.push({
            id: `sug-${targetArea.id}-${sourceArea.id}`,
            priority: 'high',
            type: 'borrow',
            fromArea: sourceArea.name,
            toArea: targetArea.name,
            members: matchingMembers.map((m) => m.name),
            reason: `${targetArea.name} has sub-products at ${targetProgress}% average completion with critical items near the finish line (${criticalSubs.map((s) => s.name).join(', ')}). ${sourceArea.name} is only ${sourceProgress}% complete — it can spare resources without blocking its own roadmap.`,
            impact: `Borrowing ${matchingMembers.map((m) => m.name).join(', ')} could accelerate ${targetArea.name} to completion 2–3 sprints earlier, unblocking downstream dependencies.`,
          });
        }
      } else if (sourceProgress < 40 && targetProgress > 70) {
        // Source is in early-to-mid stage, target is advanced
        const sourceMembers = getAllMembersForArea(sourceArea.id, members);
        const matchingMembers = sourceMembers.filter((m) =>
          criticalSubs.some((sp) =>
            sp.requiredSkills.some((skill) => m.skills.includes(skill))
          )
        );

        if (matchingMembers.length > 0) {
          suggestions.push({
            id: `sug-${targetArea.id}-${sourceArea.id}-mid`,
            priority: 'medium',
            type: 'reallocate',
            fromArea: sourceArea.name,
            toArea: targetArea.name,
            members: matchingMembers.map((m) => m.name),
            reason: `${targetArea.name} is ${targetProgress}% complete with near-done items. ${sourceArea.name} is only ${sourceProgress}% along and has available capacity.`,
            impact: `Temporary reallocation of ${matchingMembers.map((m) => m.name).join(', ')} for 1 sprint could finish ${targetArea.name} faster.`,
          });
        }
      }
    }
  }

  // Sort by priority
  const order = { high: 0, medium: 1, low: 2 };
  return suggestions.sort((a, b) => order[a.priority] - order[b.priority]);
}
