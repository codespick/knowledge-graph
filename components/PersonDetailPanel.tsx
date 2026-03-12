'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { deleteNode, deleteConnection } from '@/lib/slices/graphSlicePeople';

interface PersonDetailPanelProps {
  personId: string;
  onClose: () => void;
}

export const PersonDetailPanel: React.FC<PersonDetailPanelProps> = ({ personId, onClose }) => {
  const dispatch = useDispatch();
  const { people, skills, connections } = useSelector((state: RootState) => state.graph);

  const person = people.find((p) => p.id === personId);

  if (!person) {
    return null;
  }

  // Get all skills for this person with their proficiency levels
  const personSkills = connections
    .filter((conn) => conn.personId === personId)
    .map((conn) => {
      const skill = skills.find((s) => s.id === conn.skillId);
      return { connection: conn, skill };
    })
    .filter(({ skill }) => skill !== undefined);

  const proficiencyColors = {
    learning: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      badge: 'bg-orange-500',
      label: '🟡 Learning',
    },
    familiar: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-500',
      label: '🔵 Familiar',
    },
    expert: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      badge: 'bg-green-500',
      label: '🟢 Expert',
    },
  };

  const handleDeleteSkill = (connectionId: string) => {
    dispatch(deleteConnection(connectionId));
  };

  const handleDeletePerson = () => {
    if (confirm(`Delete ${person.name} and all their skill connections?`)) {
      dispatch(deleteNode(personId));
      onClose();
    }
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
      <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 z-10 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">👤</span>
              <div>
                <h3 className="text-xl font-bold">{person.name}</h3>
                {person.role && <p className="text-indigo-100 text-xs font-medium">{person.role}</p>}
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
        {/* Skills Section */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 pb-3 border-b border-slate-200">
            <span className="text-xl">⚡</span>
            Skills ({personSkills.length})
          </h4>

          {personSkills.length === 0 ? (
            <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-lg border border-slate-200">
              No skills assigned yet
            </div>
          ) : (
            <div className="space-y-3">
              {personSkills.map(({ connection, skill }) => {
                if (!skill) return null;
                const colors = proficiencyColors[connection.proficiency];
                return (
                  <motion.div
                    key={connection.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${colors.bg} ${colors.border} border rounded-lg p-4 flex items-center justify-between gap-3 group hover:shadow-md transition-shadow`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate text-sm">{skill.name}</p>
                      <p className={`text-xs font-medium ${colors.text} mt-1`}>{colors.label}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(connection.id)}
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
            {personId}
          </code>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDeletePerson}
          className="w-full px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-sm"
        >
          🗑️ Delete Person
        </motion.button>
      </div>
    </motion.div>
  );
};
