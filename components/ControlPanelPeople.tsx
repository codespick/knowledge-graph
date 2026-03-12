'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { PersonNode, SkillNode } from '@/lib/types';
import {
  addPerson,
  addSkill,
  addConnection,
} from '@/lib/slices/graphSlicePeople';
import { nanoid } from 'nanoid';

export const ControlPanelPeople: React.FC = () => {
  const dispatch = useDispatch();
  const { people, skills } = useSelector((state: RootState) => state.graph);
  const [activeTab, setActiveTab] = useState<'add-person' | 'add-skill' | 'add-connection'>('add-person');

  // Person state
  const [personName, setPersonName] = useState('');
  const [personRole, setPersonRole] = useState('');

  // Skill state
  const [skillName, setSkillName] = useState('');
  const [skillCategory, setSkillCategory] = useState('Frontend');

  // Connection state
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [proficiency, setProficiency] = useState<'learning' | 'familiar' | 'expert'>('familiar');

  const handleAddPerson = () => {
    if (personName.trim()) {
      const newPerson: PersonNode = {
        id: `p${nanoid(4)}`,
        type: 'person',
        name: personName,
        role: personRole || undefined,
      };
      dispatch(addPerson(newPerson));
      setPersonName('');
      setPersonRole('');
    }
  };

  const handleAddSkill = () => {
    if (skillName.trim()) {
      const newSkill: SkillNode = {
        id: `s${nanoid(4)}`,
        type: 'skill',
        name: skillName,
        category: skillCategory || undefined,
      };
      dispatch(addSkill(newSkill));
      setSkillName('');
      setSkillCategory('Frontend');
    }
  };

  const handleAddConnection = () => {
    if (selectedPerson && selectedSkill) {
      dispatch(
        addConnection({
          id: nanoid(),
          personId: selectedPerson,
          skillId: selectedSkill,
          proficiency,
        })
      );
      setSelectedPerson('');
      setSelectedSkill('');
      setProficiency('familiar');
    }
  };

  return (
    <div className="w-96 bg-white border-r border-slate-200 shadow-sm overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 z-10 shadow-md">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">🎯</span>
          <h2 className="text-xl font-bold">Skill Graph</h2>
        </div>
        <p className="text-indigo-100 text-sm">Add people, skills & connections</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1.5">
          <button
            onClick={() => setActiveTab('add-person')}
            className={`flex-1 px-3 py-2.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'add-person'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👤
          </button>
          <button
            onClick={() => setActiveTab('add-skill')}
            className={`flex-1 px-3 py-2.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'add-skill' ? 'bg-white text-purple-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡
          </button>
          <button
            onClick={() => setActiveTab('add-connection')}
            className={`flex-1 px-3 py-2.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'add-connection'
                ? 'bg-white text-pink-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔗
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* Add Person */}
          {activeTab === 'add-person' && (
            <motion.div
              key="person"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <span className="text-xl">👤</span>
                <h3 className="font-semibold text-slate-900">Add New Person</h3>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Alice Johnson"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Role (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Frontend Engineer"
                  value={personRole}
                  onChange={(e) => setPersonRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 placeholder-slate-400"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddPerson}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                + Add Person
              </motion.button>
            </motion.div>
          )}

          {/* Add Skill */}
          {activeTab === 'add-skill' && (
            <motion.div
              key="skill"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <span className="text-xl">⚡</span>
                <h3 className="font-semibold text-slate-900">Add New Skill</h3>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g., React.js"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="Frontend">🎨 Frontend</option>
                  <option value="Backend">⚙️ Backend</option>
                  <option value="DevOps">🚀 DevOps</option>
                  <option value="Design">🎭 Design</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddSkill}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                + Add Skill
              </motion.button>
            </motion.div>
          )}

          {/* Add Connection */}
          {activeTab === 'add-connection' && (
            <motion.div
              key="connection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <span className="text-xl">🔗</span>
                <h3 className="font-semibold text-slate-900">Create Connection</h3>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Select Person</label>
                <select
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 bg-white text-slate-900"
                >
                  <option value="">Choose a person...</option>
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Select Skill</label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 bg-white text-slate-900"
                >
                  <option value="">Choose a skill...</option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-3">Proficiency Level</label>
                <div className="flex gap-2">
                  {(['learning', 'familiar', 'expert'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setProficiency(level)}
                      className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                        proficiency === level
                          ? level === 'learning'
                            ? 'bg-orange-500 text-white shadow-md'
                            : level === 'familiar'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-green-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {level === 'learning' ? '🟡' : level === 'familiar' ? '🔵' : '🟢'}
                    </button>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddConnection}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                + Create Connection
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 mt-4"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
            <p className="text-xs text-indigo-700 font-semibold mb-1">People</p>
            <p className="text-3xl font-bold text-indigo-600">{people.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <p className="text-xs text-purple-700 font-semibold mb-1">Skills</p>
            <p className="text-3xl font-bold text-purple-600">{skills.length}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
