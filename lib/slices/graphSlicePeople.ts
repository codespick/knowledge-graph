import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonNode, SkillNode, SkillConnection } from '../types';
import { seedPeople, seedSkills, seedConnections } from '../seedDataPeople';

const STORAGE_KEY = 'peopleSkills-graphState';

interface GraphState {
  people: PersonNode[];
  skills: SkillNode[];
  connections: SkillConnection[];
  selectedNodeId: string | null;
  initialized: boolean;
}

const initialState: GraphState = {
  people: [],
  skills: [],
  connections: [],
  selectedNodeId: null,
  initialized: false,
};

// Layout function to arrange nodes
function layoutNodes(people: PersonNode[], skills: SkillNode[]) {
  const radius = 300;
  const centerX = 500;
  const centerY = 400;

  // Layout people on the left
  const peopleAngleStep = (Math.PI * 2) / people.length;
  people.forEach((person, i) => {
    const angle = peopleAngleStep * i - Math.PI / 2;
    person.x = centerX - radius + Math.cos(angle) * 150;
    person.y = centerY + Math.sin(angle) * 150;
  });

  // Layout skills on the right
  const skillsAngleStep = (Math.PI * 2) / skills.length;
  skills.forEach((skill, i) => {
    const angle = skillsAngleStep * i - Math.PI / 2;
    skill.x = centerX + radius + Math.cos(angle) * 150;
    skill.y = centerY + Math.sin(angle) * 150;
  });

  return { people, skills };
}

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    initializeWithSeed: (state) => {
      if (state.initialized) return;

      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (!stored) {
        const { people, skills } = layoutNodes([...seedPeople], [...seedSkills]);
        state.people = people;
        state.skills = skills;
        state.connections = seedConnections;
        state.initialized = true;
        saveToLocalStorage(state);
      } else {
        loadFromLocalStorage(state);
        state.initialized = true;
      }
    },

    addPerson: (state, action: PayloadAction<PersonNode>) => {
      const newPerson: PersonNode = {
        ...action.payload,
        x: action.payload.x || Math.random() * 400 + 300,
        y: action.payload.y || Math.random() * 400 + 200,
      };
      state.people.push(newPerson);
      saveToLocalStorage(state);
    },

    addSkill: (state, action: PayloadAction<SkillNode>) => {
      const newSkill: SkillNode = {
        ...action.payload,
        x: action.payload.x || Math.random() * 400 + 600,
        y: action.payload.y || Math.random() * 400 + 200,
      };
      state.skills.push(newSkill);
      saveToLocalStorage(state);
    },

    addConnection: (state, action: PayloadAction<SkillConnection>) => {
      state.connections.push(action.payload);
      saveToLocalStorage(state);
    },

    updatePerson: (state, action: PayloadAction<{ id: string; updates: Partial<PersonNode> }>) => {
      const { id, updates } = action.payload;
      const person = state.people.find((p) => p.id === id);
      if (person) {
        Object.assign(person, updates);
        saveToLocalStorage(state);
      }
    },

    updateSkill: (state, action: PayloadAction<{ id: string; updates: Partial<SkillNode> }>) => {
      const { id, updates } = action.payload;
      const skill = state.skills.find((s) => s.id === id);
      if (skill) {
        Object.assign(skill, updates);
        saveToLocalStorage(state);
      }
    },

    updateConnection: (state, action: PayloadAction<{ id: string; proficiency: 'learning' | 'familiar' | 'expert' }>) => {
      const { id, proficiency } = action.payload;
      const connection = state.connections.find((c) => c.id === id);
      if (connection) {
        connection.proficiency = proficiency;
        saveToLocalStorage(state);
      }
    },

    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.people = state.people.filter((p) => p.id !== nodeId);
      state.skills = state.skills.filter((s) => s.id !== nodeId);
      state.connections = state.connections.filter((c) => c.personId !== nodeId && c.skillId !== nodeId);
      if (state.selectedNodeId === nodeId) {
        state.selectedNodeId = null;
      }
      saveToLocalStorage(state);
    },

    deleteConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter((c) => c.id !== action.payload);
      saveToLocalStorage(state);
    },

    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },

    updateNodePosition: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const { id, x, y } = action.payload;
      const person = state.people.find((p) => p.id === id);
      if (person) {
        person.x = x;
        person.y = y;
      }
      const skill = state.skills.find((s) => s.id === id);
      if (skill) {
        skill.x = x;
        skill.y = y;
      }
      saveToLocalStorage(state);
    },
  },
});

function saveToLocalStorage(state: GraphState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      people: state.people,
      skills: state.skills,
      connections: state.connections,
    })
  );
}

function loadFromLocalStorage(state: GraphState) {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const { people, skills, connections } = JSON.parse(stored);
      state.people = people;
      state.skills = skills;
      state.connections = connections;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }
}

export const {
  initializeWithSeed,
  addPerson,
  addSkill,
  addConnection,
  updatePerson,
  updateSkill,
  updateConnection,
  deleteNode,
  deleteConnection,
  setSelectedNode,
  updateNodePosition,
} = graphSlice.actions;

export default graphSlice.reducer;
