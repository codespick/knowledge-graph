import { PersonNode, SkillNode, SkillConnection } from './types';

// People data
export const seedPeople: PersonNode[] = [
  { id: 'p1', type: 'person', name: 'Alice', role: 'Frontend Engineer' },
  { id: 'p2', type: 'person', name: 'Bob', role: 'Full-Stack Engineer' },
  { id: 'p3', type: 'person', name: 'Carol', role: 'Backend Engineer' },
  { id: 'p4', type: 'person', name: 'Dan', role: 'Designer' },
  { id: 'p5', type: 'person', name: 'Eva', role: 'DevOps Engineer' },
];

// Skills data
export const seedSkills: SkillNode[] = [
  { id: 's1', type: 'skill', name: 'React', category: 'Frontend' },
  { id: 's2', type: 'skill', name: 'TypeScript', category: 'Frontend' },
  { id: 's3', type: 'skill', name: 'Node.js', category: 'Backend' },
  { id: 's4', type: 'skill', name: 'PostgreSQL', category: 'Backend' },
  { id: 's5', type: 'skill', name: 'Docker', category: 'DevOps' },
  { id: 's6', type: 'skill', name: 'Figma', category: 'Design' },
  { id: 's7', type: 'skill', name: 'CSS', category: 'Frontend' },
  { id: 's8', type: 'skill', name: 'GraphQL', category: 'Backend' },
  { id: 's9', type: 'skill', name: 'CI/CD', category: 'DevOps' },
  { id: 's10', type: 'skill', name: 'Next.js', category: 'Frontend' },
];

// Connections with proficiency levels
export const seedConnections: SkillConnection[] = [
  { id: 'c1', personId: 'p1', skillId: 's1', proficiency: 'expert' },
  { id: 'c2', personId: 'p1', skillId: 's2', proficiency: 'expert' },
  { id: 'c3', personId: 'p1', skillId: 's10', proficiency: 'familiar' },
  { id: 'c4', personId: 'p1', skillId: 's7', proficiency: 'familiar' },
  { id: 'c5', personId: 'p1', skillId: 's6', proficiency: 'learning' },
  { id: 'c6', personId: 'p2', skillId: 's1', proficiency: 'familiar' },
  { id: 'c7', personId: 'p2', skillId: 's3', proficiency: 'expert' },
  { id: 'c8', personId: 'p2', skillId: 's2', proficiency: 'familiar' },
  { id: 'c9', personId: 'p2', skillId: 's4', proficiency: 'learning' },
  { id: 'c10', personId: 'p2', skillId: 's10', proficiency: 'expert' },
  { id: 'c11', personId: 'p3', skillId: 's3', proficiency: 'expert' },
  { id: 'c12', personId: 'p3', skillId: 's4', proficiency: 'expert' },
  { id: 'c13', personId: 'p3', skillId: 's8', proficiency: 'expert' },
  { id: 'c14', personId: 'p3', skillId: 's5', proficiency: 'familiar' },
  { id: 'c15', personId: 'p3', skillId: 's2', proficiency: 'learning' },
  { id: 'c16', personId: 'p4', skillId: 's6', proficiency: 'expert' },
  { id: 'c17', personId: 'p4', skillId: 's7', proficiency: 'familiar' },
  { id: 'c18', personId: 'p4', skillId: 's1', proficiency: 'learning' },
  { id: 'c19', personId: 'p5', skillId: 's5', proficiency: 'expert' },
  { id: 'c20', personId: 'p5', skillId: 's9', proficiency: 'expert' },
  { id: 'c21', personId: 'p5', skillId: 's3', proficiency: 'familiar' },
  { id: 'c22', personId: 'p5', skillId: 's4', proficiency: 'familiar' },
];
