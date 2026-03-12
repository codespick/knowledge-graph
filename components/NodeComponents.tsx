'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface PersonNodeProps {
  data: {
    label: string;
    role?: string;
    id: string;
    onSelect: (id: string) => void;
  };
}

export const PersonNodeComponent: React.FC<PersonNodeProps> = ({ data }) => {
  const selectedNodeId = useSelector((state: RootState) => state.graph.selectedNodeId);
  const isSelected = selectedNodeId === data.id;
  const connections = useSelector((state: RootState) => state.graph.connections);
  const skillCount = connections.filter((c) => c.personId === data.id).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Glow effect */}
      {isSelected && (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-blue-400/25 blur-xl"
        />
      )}

      {/* Main node circle */}
      <div
        className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl ${
          isSelected
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 shadow-2xl scale-110'
            : 'bg-gradient-to-br from-purple-400 to-blue-500 border-purple-400 hover:scale-105'
        }`}
        onClick={() => data.onSelect(data.id)}
      >
        {/* Person icon */}
        <div className="text-2xl mb-1">👤</div>
        <div className="text-xs font-bold text-white text-center truncate px-2">{data.label}</div>
        {data.role && <div className="text-xs text-white/80 text-center truncate px-2">{data.role}</div>}
      </div>

      {/* Skill count badge */}
      {skillCount > 0 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.6 }}
          className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg z-20 font-bold text-white text-xs"
        >
          {skillCount}
        </motion.div>
      )}
    </motion.div>
  );
};

interface SkillNodeProps {
  data: {
    label: string;
    category?: string;
    id: string;
    onSelect: (id: string) => void;
  };
}

export const SkillNodeComponent: React.FC<SkillNodeProps> = ({ data }) => {
  const selectedNodeId = useSelector((state: RootState) => state.graph.selectedNodeId);
  const isSelected = selectedNodeId === data.id;
  const connections = useSelector((state: RootState) => state.graph.connections);
  const personCount = connections.filter((c) => c.skillId === data.id).length;

  // Color by category
  const categoryColors: Record<string, { from: string; to: string; border: string }> = {
    Frontend: {
      from: 'from-pink-400',
      to: 'to-red-500',
      border: 'border-pink-400',
    },
    Backend: {
      from: 'from-green-400',
      to: 'to-emerald-500',
      border: 'border-green-400',
    },
    DevOps: {
      from: 'from-cyan-400',
      to: 'to-blue-500',
      border: 'border-cyan-400',
    },
    Design: {
      from: 'from-violet-400',
      to: 'to-purple-500',
      border: 'border-violet-400',
    },
  };

  const colors = data.category && categoryColors[data.category] ? categoryColors[data.category] : categoryColors.Frontend;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Glow effect */}
      {isSelected && (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inset-0 rounded-lg bg-gradient-to-br ${colors.from} ${colors.to}/25 blur-xl`}
        />
      )}

      {/* Main node rectangle */}
      <div
        className={`relative z-10 px-4 py-3 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 shadow-lg hover:shadow-xl min-w-20 ${
          isSelected
            ? `bg-gradient-to-br ${colors.from} ${colors.to} ${colors.border} shadow-2xl scale-110`
            : `bg-gradient-to-br ${colors.from} ${colors.to} ${colors.border} hover:scale-105`
        }`}
        onClick={() => data.onSelect(data.id)}
      >
        {/* Skill icon */}
        <div className="text-2xl mb-1">⚡</div>
        <div className="text-xs font-bold text-white text-center truncate">{data.label}</div>
        {data.category && (
          <div className="text-xs text-white/80 text-center Font-semibold">{data.category}</div>
        )}
      </div>

      {/* Person count badge */}
      {personCount > 0 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.6 }}
          className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg z-20 font-bold text-white text-xs"
        >
          {personCount}
        </motion.div>
      )}
    </motion.div>
  );
};
