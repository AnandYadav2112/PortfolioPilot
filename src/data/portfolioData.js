export const productAreas = [
  {
    id: "pa-1",
    name: "Customer Experience Platform",
    color: "#6366f1",
    subProducts: [
      { id: "sp-1a", name: "Onboarding Flow", progress: 95, priority: "High" },
      { id: "sp-1b", name: "Self-Service Portal", progress: 88, priority: "High" },
      { id: "sp-1c", name: "Mobile App v3", progress: 72, priority: "Medium" },
    ],
  },
  {
    id: "pa-2",
    name: "Data & Analytics Suite",
    color: "#10b981",
    subProducts: [
      { id: "sp-2a", name: "Real-time Dashboard", progress: 10, priority: "High" },
      { id: "sp-2b", name: "Predictive Engine", progress: 15, priority: "High" },
      { id: "sp-2c", name: "Data Export API", progress: 30, priority: "Medium" },
    ],
  },
  {
    id: "pa-3",
    name: "Payments & Billing",
    color: "#f59e0b",
    subProducts: [
      { id: "sp-3a", name: "Subscription Manager", progress: 60, priority: "High" },
      { id: "sp-3b", name: "Invoice Automation", progress: 55, priority: "Medium" },
      { id: "sp-3c", name: "Multi-currency Support", progress: 40, priority: "Low" },
    ],
  },
  {
    id: "pa-4",
    name: "Developer Ecosystem",
    color: "#ef4444",
    subProducts: [
      { id: "sp-4a", name: "SDK v2.0", progress: 78, priority: "High" },
      { id: "sp-4b", name: "API Gateway", progress: 82, priority: "High" },
      { id: "sp-4c", name: "Dev Console Redesign", progress: 20, priority: "Medium" },
    ],
  },
  {
    id: "pa-5",
    name: "Enterprise Security",
    color: "#8b5cf6",
    subProducts: [
      { id: "sp-5a", name: "SSO Integration", progress: 90, priority: "High" },
      { id: "sp-5b", name: "Audit Logging", progress: 65, priority: "High" },
      { id: "sp-5c", name: "Zero Trust Network", progress: 12, priority: "Critical" },
    ],
  },
];

export const teamMembers = [
  {
    id: "tm-1",
    name: "Alice Chen",
    role: "Senior Frontend Engineer",
    skills: ["React", "TypeScript", "UX/UI"],
    capacity: 80,
    assignedTo: "pa-1",
    avatar: "AC",
  },
  {
    id: "tm-2",
    name: "Bob Martinez",
    role: "Backend Engineer",
    skills: ["Node.js", "PostgreSQL", "APIs"],
    capacity: 60,
    assignedTo: "pa-2",
    avatar: "BM",
  },
  {
    id: "tm-3",
    name: "Carol Singh",
    role: "Data Engineer",
    skills: ["Python", "ML", "Data Pipelines"],
    capacity: 40,
    assignedTo: "pa-2",
    avatar: "CS",
  },
  {
    id: "tm-4",
    name: "David Kim",
    role: "Full-Stack Engineer",
    skills: ["React", "Node.js", "AWS"],
    capacity: 90,
    assignedTo: "pa-3",
    avatar: "DK",
  },
  {
    id: "tm-5",
    name: "Eva Patel",
    role: "DevOps Engineer",
    skills: ["Kubernetes", "CI/CD", "Security"],
    capacity: 70,
    assignedTo: "pa-4",
    avatar: "EP",
  },
  {
    id: "tm-6",
    name: "Frank Liu",
    role: "Security Engineer",
    skills: ["Cybersecurity", "SSO", "Compliance"],
    capacity: 50,
    assignedTo: "pa-5",
    avatar: "FL",
  },
  {
    id: "tm-7",
    name: "Grace Thomas",
    role: "Product Designer",
    skills: ["UX/UI", "Figma", "User Research"],
    capacity: 85,
    assignedTo: "pa-1",
    avatar: "GT",
  },
  {
    id: "tm-8",
    name: "Henry Brown",
    role: "Backend Engineer",
    skills: ["Payments", "APIs", "Compliance"],
    capacity: 55,
    assignedTo: "pa-3",
    avatar: "HB",
  },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Data/ML",
  "DevOps",
  "Security",
  "Design",
];

export const skillCapacity = [
  { skill: "Frontend", total: 10, available: 3, utilization: 70 },
  { skill: "Backend", total: 8, available: 2, utilization: 75 },
  { skill: "Data/ML", total: 5, available: 3, utilization: 40 },
  { skill: "DevOps", total: 4, available: 1, utilization: 75 },
  { skill: "Security", total: 3, available: 1, utilization: 67 },
  { skill: "Design", total: 4, available: 2, utilization: 50 },
];
