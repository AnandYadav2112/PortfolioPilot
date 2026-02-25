const products = [
  {
    name: "Product A",
    progress: 95,
    owner: "Growth Squad",
    targetWeeks: 4,
    subProducts: ["Onboarding", "Pricing", "Activation"],
  },
  {
    name: "Product B",
    progress: 62,
    owner: "Core Platform",
    targetWeeks: 9,
    subProducts: ["API Gateway", "Auth", "Observability"],
  },
  {
    name: "Product C",
    progress: 48,
    owner: "Enterprise",
    targetWeeks: 12,
    subProducts: ["RBAC", "Audit Logs"],
  },
  {
    name: "Product D",
    progress: 78,
    owner: "Payments",
    targetWeeks: 6,
    subProducts: ["Settlement", "Fraud Rules", "Ledger"],
  },
];

const capacity = [
  { skill: "Backend", available: 4, allocated: 13, max: 14 },
  { skill: "Frontend", available: 2, allocated: 8, max: 10 },
  { skill: "Data", available: 1, allocated: 6, max: 7 },
  { skill: "QA", available: 3, allocated: 5, max: 8 },
  { skill: "DevOps", available: 0, allocated: 5, max: 5 },
];

const progressGrid = document.getElementById("progress-grid");
const capacityTable = document.getElementById("capacity-table");
const recommendationsList = document.getElementById("recommendations");
const healthPill = document.getElementById("portfolio-health");

const fromSelect = document.getElementById("from-product");
const toSelect = document.getElementById("to-product");
const skillSelect = document.getElementById("skill");
const engineersInput = document.getElementById("engineers");
const simForm = document.getElementById("sim-form");
const simResult = document.getElementById("sim-result");

function renderProgressView() {
  progressGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-top">
        <div class="product-name">${product.name}</div>
        <div class="sub-count">${product.subProducts.length} sub-products</div>
      </div>
      <div class="bar"><span style="width:${product.progress}%"></span></div>
      <div class="meta">
        <span>${product.progress}% complete</span>
        <span>${product.owner}</span>
      </div>
    `;
    progressGrid.appendChild(card);
  });

  const avg = Math.round(products.reduce((sum, item) => sum + item.progress, 0) / products.length);
  let healthClass = "steady";
  let healthText = `Portfolio Health: ${avg}%`;

  if (avg >= 80) {
    healthClass = "strong";
    healthText += " (Strong)";
  } else if (avg < 55) {
    healthClass = "risk";
    healthText += " (At Risk)";
  } else {
    healthText += " (Steady)";
  }

  healthPill.className = `pill ${healthClass}`;
  healthPill.textContent = healthText;
}

function capacityStatus(item) {
  const utilization = item.allocated / item.max;
  if (utilization >= 1) return "overloaded";
  if (utilization > 0.8) return "balanced";
  return "available";
}

function renderCapacityView() {
  const rows = capacity
    .map((item) => {
      const utilization = Math.round((item.allocated / item.max) * 100);
      const status = capacityStatus(item);

      return `
        <tr>
          <td>${item.skill}</td>
          <td>${item.available}</td>
          <td>${item.allocated}/${item.max}</td>
          <td>${utilization}%</td>
          <td class="status ${status}">${status}</td>
        </tr>
      `;
    })
    .join("");

  capacityTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Available</th>
          <th>Allocation</th>
          <th>Utilization</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function recommendationScore(source, target, skill, engineers) {
  const completionGap = source.progress - target.progress;
  const skillPressure = skill.allocated / skill.max;
  return completionGap * 0.7 + skillPressure * 20 + engineers * 3;
}

function generateRecommendations() {
  const backend = capacity.find((item) => item.skill === "Backend");
  const source = products.find((item) => item.name === "Product B");
  const target = products.find((item) => item.name === "Product A");

  const topScenario = {
    from: source,
    to: target,
    skill: backend,
    engineers: 2,
    accelerationWeeks: 2,
  };

  const allRecommendations = [
    `Product A is at ${target.progress}% completion. Reassign ${topScenario.engineers} ${topScenario.skill.skill.toLowerCase()} engineers from ${source.name} to ${target.name} to accelerate release by ${topScenario.accelerationWeeks} weeks.`,
    `Shift 1 QA engineer from Product D to Product C to reduce regression cycle time by 18% and improve release confidence.`,
    `Delay non-critical DevOps hardening on Product B by 1 sprint and redirect effort to Product C RBAC milestone to protect enterprise commitments.`,
    `Trigger a cross-squad frontend guild for Product B and Product D; projected to recover 1 week across both roadmaps through reusable UI assets.`,
  ];

  const score = recommendationScore(topScenario.from, topScenario.to, topScenario.skill, topScenario.engineers);
  allRecommendations.unshift(`Priority score ${score.toFixed(1)}: ${allRecommendations.shift()}`);

  recommendationsList.innerHTML = allRecommendations
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function fillSimulatorOptions() {
  const productOptions = products
    .map((product) => `<option value="${product.name}">${product.name}</option>`)
    .join("");

  fromSelect.innerHTML = productOptions;
  toSelect.innerHTML = productOptions;
  toSelect.selectedIndex = 1;

  skillSelect.innerHTML = capacity
    .map((item) => `<option value="${item.skill}">${item.skill}</option>`)
    .join("");
}

function simulateScenario(fromName, toName, skillName, engineers) {
  if (fromName === toName) {
    return { error: "From Product and To Product must be different." };
  }

  const from = products.find((p) => p.name === fromName);
  const to = products.find((p) => p.name === toName);
  const skill = capacity.find((s) => s.skill === skillName);

  if (!from || !to || !skill) {
    return { error: "Invalid simulation input." };
  }

  const reassignable = Math.min(engineers, Math.max(skill.available, 1));
  const progressGain = Math.min(10, reassignable * 2.2);
  const newTargetProgress = Math.min(100, Math.round(to.progress + progressGain));
  const weeksSaved = Math.max(1, Math.round((reassignable * to.targetWeeks) / 8));
  const sourceDelay = Math.round((reassignable * from.targetWeeks) / 16);
  const utilizationShift = Math.round((reassignable / skill.max) * 100);

  return {
    from,
    to,
    skill,
    engineers: reassignable,
    newTargetProgress,
    weeksSaved,
    sourceDelay,
    utilizationShift,
  };
}

function showSimulationResult(result) {
  if (result.error) {
    simResult.classList.remove("empty");
    simResult.innerHTML = `<strong>Cannot simulate:</strong> ${result.error}`;
    return;
  }

  simResult.classList.remove("empty");
  simResult.innerHTML = `
    <strong>Scenario Summary</strong>
    <ul class="impact-list">
      <li>Move ${result.engineers} ${result.skill.skill.toLowerCase()} engineer(s) from ${result.from.name} to ${result.to.name}.</li>
      <li>${result.to.name} projected progress: ${result.to.progress}% → ${result.newTargetProgress}%.</li>
      <li>Estimated acceleration: ${result.weeksSaved} week(s) faster delivery.</li>
      <li>Potential impact to ${result.from.name}: up to ${result.sourceDelay} week(s) timeline extension.</li>
      <li>${result.skill.skill} utilization shift: +${result.utilizationShift}% toward target team.</li>
    </ul>
  `;
}

simForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const from = fromSelect.value;
  const to = toSelect.value;
  const skill = skillSelect.value;
  const engineers = Math.max(1, Number(engineersInput.value) || 1);

  const result = simulateScenario(from, to, skill, engineers);
  showSimulationResult(result);
});

renderProgressView();
renderCapacityView();
generateRecommendations();
fillSimulatorOptions();