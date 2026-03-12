export type NodeType = 'person' | 'skill';
export type ProficiencyLevel = 'learning' | 'familiar' | 'expert';

export interface PersonNode {
  id: string;
  type: 'person';
  name: string;
  role?: string;
  x?: number;
  y?: number;
}

export interface SkillNode {
  id: string;
  type: 'skill';
  name: string;
  category?: string;
  x?: number;
  y?: number;
}

export type GraphNode = PersonNode | SkillNode;

export interface SkillConnection {
  id: string;
  personId: string;
  skillId: string;
  proficiency: ProficiencyLevel;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  proficiency?: ProficiencyLevel;
}

export interface GraphState {
  people: PersonNode[];
  skills: SkillNode[];
  connections: SkillConnection[];
  selectedNodeId: string | null;
  addPerson: (person: PersonNode) => void;
  addSkill: (skill: SkillNode) => void;
  addConnection: (connection: SkillConnection) => void;
  deleteNode: (id: string) => void;
  deleteConnection: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
}
