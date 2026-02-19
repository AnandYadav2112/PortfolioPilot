export interface TeamMember {
  id: string;
  name: string;
  skills: string[];
  currentAllocation: string; // product area id
}

export interface SubProduct {
  id: string;
  name: string;
  progress: number; // 0-100
  requiredSkills: string[];
  teamMembers: string[]; // member ids
}

export interface ProductArea {
  id: string;
  name: string;
  color: string;
  subProducts: SubProduct[];
}

export const teamMembers: TeamMember[] = [
  { id: 'm1', name: 'Alice Chen', skills: ['React', 'TypeScript', 'UI/UX'], currentAllocation: 'pa1' },
  { id: 'm2', name: 'Bob Kumar', skills: ['React', 'Node.js', 'APIs'], currentAllocation: 'pa1' },
  { id: 'm3', name: 'Carol Smith', skills: ['Java', 'Microservices', 'AWS'], currentAllocation: 'pa1' },
  { id: 'm4', name: 'David Lee', skills: ['Python', 'ML', 'Data'], currentAllocation: 'pa2' },
  { id: 'm5', name: 'Emma Wilson', skills: ['iOS', 'Swift', 'Mobile'], currentAllocation: 'pa2' },
  { id: 'm6', name: 'Frank Patel', skills: ['Android', 'Kotlin', 'Mobile'], currentAllocation: 'pa2' },
  { id: 'm7', name: 'Grace Ho', skills: ['Python', 'Data', 'SQL'], currentAllocation: 'pa3' },
  { id: 'm8', name: 'Henry Brown', skills: ['React', 'D3.js', 'UI/UX'], currentAllocation: 'pa3' },
  { id: 'm9', name: 'Iris Tanaka', skills: ['Node.js', 'APIs', 'AWS'], currentAllocation: 'pa4' },
  { id: 'm10', name: 'Jack Morris', skills: ['React', 'TypeScript', 'UI/UX'], currentAllocation: 'pa4' },
  { id: 'm11', name: 'Karen Davis', skills: ['DevOps', 'Kubernetes', 'AWS'], currentAllocation: 'pa5' },
  { id: 'm12', name: 'Leo Zhang', skills: ['DevOps', 'Docker', 'CI/CD'], currentAllocation: 'pa5' },
];

export const productAreas: ProductArea[] = [
  {
    id: 'pa1',
    name: 'E-Commerce Platform',
    color: 'blue',
    subProducts: [
      {
        id: 'sp1',
        name: 'Product Catalog',
        progress: 95,
        requiredSkills: ['React', 'TypeScript'],
        teamMembers: ['m1', 'm2'],
      },
      {
        id: 'sp2',
        name: 'Payment Gateway',
        progress: 88,
        requiredSkills: ['Node.js', 'APIs'],
        teamMembers: ['m2'],
      },
      {
        id: 'sp3',
        name: 'Order Management',
        progress: 92,
        requiredSkills: ['Java', 'Microservices'],
        teamMembers: ['m3'],
      },
    ],
  },
  {
    id: 'pa2',
    name: 'Mobile App',
    color: 'green',
    subProducts: [
      {
        id: 'sp4',
        name: 'User Authentication',
        progress: 10,
        requiredSkills: ['iOS', 'Android'],
        teamMembers: ['m5', 'm6'],
      },
      {
        id: 'sp5',
        name: 'Push Notifications',
        progress: 5,
        requiredSkills: ['Mobile', 'Swift'],
        teamMembers: ['m5'],
      },
      {
        id: 'sp6',
        name: 'Offline Mode',
        progress: 0,
        requiredSkills: ['Android', 'Kotlin'],
        teamMembers: ['m6'],
      },
    ],
  },
  {
    id: 'pa3',
    name: 'Analytics Dashboard',
    color: 'purple',
    subProducts: [
      {
        id: 'sp7',
        name: 'Real-time Charts',
        progress: 70,
        requiredSkills: ['React', 'D3.js'],
        teamMembers: ['m8'],
      },
      {
        id: 'sp8',
        name: 'Data Pipeline',
        progress: 55,
        requiredSkills: ['Python', 'Data'],
        teamMembers: ['m7'],
      },
      {
        id: 'sp9',
        name: 'Reports Engine',
        progress: 40,
        requiredSkills: ['Python', 'SQL'],
        teamMembers: ['m7'],
      },
    ],
  },
  {
    id: 'pa4',
    name: 'Customer Portal',
    color: 'orange',
    subProducts: [
      {
        id: 'sp10',
        name: 'Self-Service Portal',
        progress: 60,
        requiredSkills: ['React', 'TypeScript'],
        teamMembers: ['m10'],
      },
      {
        id: 'sp11',
        name: 'Ticketing System',
        progress: 45,
        requiredSkills: ['Node.js', 'APIs'],
        teamMembers: ['m9'],
      },
      {
        id: 'sp12',
        name: 'Knowledge Base',
        progress: 30,
        requiredSkills: ['React', 'UI/UX'],
        teamMembers: ['m10'],
      },
    ],
  },
  {
    id: 'pa5',
    name: 'DevOps Infrastructure',
    color: 'red',
    subProducts: [
      {
        id: 'sp13',
        name: 'CI/CD Pipeline',
        progress: 80,
        requiredSkills: ['DevOps', 'CI/CD'],
        teamMembers: ['m12'],
      },
      {
        id: 'sp14',
        name: 'Container Orchestration',
        progress: 65,
        requiredSkills: ['Kubernetes', 'Docker'],
        teamMembers: ['m11'],
      },
      {
        id: 'sp15',
        name: 'Monitoring & Alerting',
        progress: 50,
        requiredSkills: ['DevOps', 'AWS'],
        teamMembers: ['m11', 'm12'],
      },
    ],
  },
];
