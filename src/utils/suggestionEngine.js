/**
 * Generates real-time resource allocation suggestions for the CPO.
 * Identifies near-complete projects that could benefit from additional resources,
 * and early-stage projects that can temporarily lend resources.
 */
export function generateSuggestions(productAreas, teamMembers) {
  const suggestions = [];

  const allSubProducts = productAreas.flatMap((pa) =>
    pa.subProducts.map((sp) => ({ ...sp, productArea: pa }))
  );

  const nearComplete = allSubProducts.filter((sp) => sp.progress >= 80 && sp.progress < 100);
  const earlyStage = allSubProducts.filter((sp) => sp.progress <= 20);
  const stalled = allSubProducts.filter(
    (sp) => sp.progress > 20 && sp.progress < 50 && sp.priority === "High"
  );

  nearComplete.forEach((target) => {
    earlyStage.forEach((source) => {
      if (source.productArea.id !== target.productArea.id) {
        const sourceMembers = teamMembers.filter(
          (m) => m.assignedTo === source.productArea.id && m.capacity >= 50
        );
        if (sourceMembers.length > 0) {
          const member = sourceMembers[0];
          const estimatedDaysAccelerated = Math.round(
            ((100 - target.progress) / 100) * 30 * 0.4
          );
          suggestions.push({
            id: `sug-${target.id}-${source.id}`,
            type: "resource_borrow",
            priority: target.priority === "High" || target.priority === "Critical" ? "High" : "Medium",
            title: `Accelerate "${target.name}" by borrowing from "${source.name}"`,
            description: `"${target.name}" (${target.productArea.name}) is ${target.progress}% complete — close to the finish line. "${source.name}" (${source.productArea.name}) is only ${source.progress}% complete and can spare capacity early in its lifecycle.`,
            action: `Temporarily reassign ${member.name} (${member.role}) from "${source.productArea.name}" to "${target.productArea.name}".`,
            impact: `Estimated to accelerate delivery of "${target.name}" by ~${estimatedDaysAccelerated} days, freeing up resources for other high-priority work sooner.`,
            sourceName: source.name,
            sourceArea: source.productArea.name,
            sourceProgress: source.progress,
            targetName: target.name,
            targetArea: target.productArea.name,
            targetProgress: target.progress,
            suggestedMember: member,
          });
        }
      }
    });
  });

  stalled.forEach((sp) => {
    const areaMembers = teamMembers.filter(
      (m) => m.assignedTo === sp.productArea.id
    );
    const otherAreaWithSpareCapacity = teamMembers.find(
      (m) => m.assignedTo !== sp.productArea.id && m.capacity >= 70
    );
    if (areaMembers.length < 2 && otherAreaWithSpareCapacity) {
      suggestions.push({
        id: `sug-stalled-${sp.id}`,
        type: "capacity_boost",
        priority: "Medium",
        title: `Boost capacity for high-priority "${sp.name}"`,
        description: `"${sp.name}" (${sp.productArea.name}) is a high-priority initiative at ${sp.progress}% but has limited team capacity assigned.`,
        action: `Add ${otherAreaWithSpareCapacity.name} (${otherAreaWithSpareCapacity.role}, ${otherAreaWithSpareCapacity.capacity}% capacity free) from another product area.`,
        impact: `Improve throughput and reduce risk of delay for this high-priority deliverable.`,
        sourceName: otherAreaWithSpareCapacity.name,
        sourceArea: "Cross-functional",
        sourceProgress: null,
        targetName: sp.name,
        targetArea: sp.productArea.name,
        targetProgress: sp.progress,
        suggestedMember: otherAreaWithSpareCapacity,
      });
    }
  });

  suggestions.sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2);
  });

  return suggestions;
}

export function getOverallProgress(productArea) {
  if (!productArea.subProducts.length) return 0;
  const total = productArea.subProducts.reduce((sum, sp) => sum + sp.progress, 0);
  return Math.round(total / productArea.subProducts.length);
}

export function getProgressColor(progress) {
  if (progress >= 80) return "text-green-600";
  if (progress >= 50) return "text-yellow-600";
  return "text-red-500";
}

export function getProgressBarColor(progress) {
  if (progress >= 80) return "bg-green-500";
  if (progress >= 50) return "bg-yellow-400";
  return "bg-red-400";
}

export function getPriorityBadgeColor(priority) {
  switch (priority) {
    case "Critical": return "bg-red-100 text-red-800 border border-red-200";
    case "High": return "bg-orange-100 text-orange-800 border border-orange-200";
    case "Medium": return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    case "Low": return "bg-gray-100 text-gray-600 border border-gray-200";
    default: return "bg-gray-100 text-gray-600";
  }
}
