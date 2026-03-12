'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { deleteNode, deleteConnection } from '@/lib/slices/graphSlicePeople';

interface SkillDetailPanelProps {
  skillId: string;
  onClose: () => void;
}

export const SkillDetailPanel: React.FC<SkillDetailPanelProps> = ({ skillId, onClose }) => {
  const dispatch = useDispatch();
  const { people, skills, connections } = useSelector((state: RootState) => state.graph);

  const skill = skills.find((s) => s.id === skillId);

  if (!skill) {
    return null;
  }

  // Get all people with this skill and their proficiency levels
  const skillPeople = connections
    .filter((conn) => conn.skillId === skillId)
    .map((conn) => {
      const person = people.find((p) => p.id === conn.personId);
      return { connection: conn, person };
    })
    .filter(({ person }) => person !== undefined);

  const categoryColors = {
    Frontend: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', icon: '🎨' },
    Backend: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: '⚙️' },
    DevOps: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', icon: '🚀' },
    Design: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', icon: '🎭' },
  };

  const proficiencyColors = {
    learning: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      label: '🟡 Learning',
    },
    familiar: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      label: '🔵 Familiar',
    },
    expert: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      label: '🟢 Expert',
    },
  };

  const category = skill.category || 'Frontend';
  const categoryStyle = categoryColors[category as keyof typeof categoryColors] || categoryColors.Frontend;

  const handleDeletePerson = (connectionId: string) => {
    dispatch(deleteConnection(connectionId));
  };

  const handleDeleteSkill = () => {
    if (confirm(`Delete ${skill.name} and all its people connections?`)) {
      dispatch(deleteNode(skillId));
      onClose();
    }
  };

  // Calculate proficiency distribution
  const proficiencyStats = {
    learning: skillPeople.filter((sp) => sp.connection.proficiency === 'learning').length,
    familiar: skillPeople.filter((sp) => sp.connection.proficiency === 'familiar').length,
    expert: skillPeople.filter((sp) => sp.connection.proficiency === 'expert').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -400 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed top-0 left-96 w-96 h-full bg-white border-r border-slate-200 shadow-2xl z-30 flex flex-col overflow-hidden bg-[#cce0f4]"
    >
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 z-10 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">⚡</span>
              <div>
                <h3 className="text-xl font-bold">{skill.name}</h3>
                <div className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold mt-2 ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
                  {categoryStyle.icon} {category}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/30 transition-all text-lg font-bold hover:scale-110 shrink-0"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Proficiency Stats */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
          <p className="text-xs font-bold text-slate-900 pb-3 border-b border-slate-200">Proficiency Distribution</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">🟡 Learning</span>
              <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full font-semibold text-xs">
                {proficiencyStats.learning}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">🔵 Familiar</span>
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold text-xs">
                {proficiencyStats.familiar}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">🟢 Expert</span>
              <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-semibold text-xs">
                {proficiencyStats.expert}
              </span>
            </div>
          </div>
        </div>

        {/* People Section */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 pb-3 border-b border-slate-200">
            <span className="text-xl">👤</span>
            Team Members ({skillPeople.length})
          </h4>

          {skillPeople.length === 0 ? (
            <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-lg border border-slate-200">
              No people assigned yet
            </div>
          ) : (
            <div className="space-y-3">
              {skillPeople.map(({ connection, person }) => {
                if (!person) return null;
                const colors = proficiencyColors[connection.proficiency];
                return (
                  <motion.div
                    key={connection.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${colors.bg} ${colors.border} border rounded-lg p-4 flex items-center justify-between gap-3 group hover:shadow-md transition-shadow`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate text-sm">{person.name}</p>
                      <p className={`text-xs font-medium ${colors.text} mt-1`}>{colors.label}</p>
                      {person.role && <p className="text-xs text-slate-600 mt-1">{person.role}</p>}
                    </div>
                    <button
                      onClick={() => handleDeletePerson(connection.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-red-600 hover:bg-red-50 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <p className="text-xs text-slate-600 mb-2 font-semibold">ID</p>
          <code className="text-xs bg-white p-3 rounded border border-slate-200 block truncate font-mono text-slate-700">
            {skillId}
          </code>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDeleteSkill}
          className="w-full px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
        >
          🗑️ Delete Skill
        </motion.button>
      </div>
    </motion.div>
  );
};
