'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { PersonNodeComponent, SkillNodeComponent } from './NodeComponents';
import { motion } from 'framer-motion';
import {
  initializeWithSeed,
  setSelectedNode,
  updateNodePosition,
} from '@/lib/slices/graphSlicePeople';

const nodeTypes = {
  person: PersonNodeComponent,
  skill: SkillNodeComponent,
};

interface GraphViewProps {
  onNodeSelect: (nodeId: string | null, type: 'person' | 'skill') => void;
}

export const GraphView: React.FC<GraphViewProps> = ({ onNodeSelect }) => {
  const dispatch = useDispatch();
  const { people, skills, connections, selectedNodeId } = useSelector((state: RootState) => state.graph);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize from seed data
  useEffect(() => {
    if (!initialized) {
      dispatch(initializeWithSeed());
      setInitialized(true);
    }
  }, [initialized, dispatch]);

  // Build React Flow nodes and edges
  useEffect(() => {
    // Create person nodes
    const personNodes: Node[] = people.map((person) => ({
      id: person.id,
      type: 'person',
      data: {
        label: person.name,
        role: person.role,
        id: person.id,
        onSelect: (id: string) => {
          dispatch(setSelectedNode(id));
          onNodeSelect(id, 'person');
        },
      },
      position: { x: person.x || 0, y: person.y || 0 },
    }));

    // Create skill nodes
    const skillNodes: Node[] = skills.map((skill) => ({
      id: skill.id,
      type: 'skill',
      data: {
        label: skill.name,
        category: skill.category,
        id: skill.id,
        onSelect: (id: string) => {
          dispatch(setSelectedNode(id));
          onNodeSelect(id, 'skill');
        },
      },
      position: { x: skill.x || 0, y: skill.y || 0 },
    }));

    // Create edges with proficiency-based styling
    const flowEdges: Edge[] = connections.map((conn) => {
      const isRelated =
        selectedNodeId === conn.personId || selectedNodeId === conn.skillId;

      // Color code by proficiency
      const proficiencyColors: Record<string, { stroke: string; label: string; glow: string }> = {
        learning: {
          stroke: '#f97316',
          label: '🟡 Learning',
          glow: 'rgba(249, 115, 22, 0.5)',
        },
        familiar: {
          stroke: '#3b82f6',
          label: '🔵 Familiar',
          glow: 'rgba(59, 130, 246, 0.5)',
        },
        expert: {
          stroke: '#10b981',
          label: '🟢 Expert',
          glow: 'rgba(16, 185, 129, 0.5)',
        },
      };

      const proficiencyStyle = proficiencyColors[conn.proficiency];

      return {
        id: conn.id,
        source: conn.personId,
        target: conn.skillId,
        label: conn.proficiency.charAt(0).toUpperCase() + conn.proficiency.slice(1),
        animated: isRelated,
        style: {
          stroke: isRelated ? proficiencyStyle.stroke : proficiencyStyle.stroke,
          strokeWidth: isRelated ? 3.5 : 2.5,
          filter: isRelated ? `drop-shadow(0 0 12px ${proficiencyStyle.glow})` : 'none',
          opacity: isRelated ? 1 : 0.6,
        },
        labelStyle: {
          fill: proficiencyStyle.stroke,
          fontWeight: 'bold',
          fontSize: 11,
          backgroundColor: 'white',
          padding: '2px 6px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      };
    });

    setNodes([...personNodes, ...skillNodes]);
    setEdges(flowEdges);
  }, [people, skills, connections, selectedNodeId, dispatch, onNodeSelect]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      // Save position changes to Redux store
      changes.forEach((change) => {
        if (change.type === 'position' && change.dragging === false && change.position) {
          dispatch(
            updateNodePosition({
              id: change.id,
              x: change.position.x,
              y: change.position.y,
            })
          );
        }
      });
    },
    [onNodesChange, dispatch]
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#e0e7ff" gap={16} size={1} />
        <Controls />
      </ReactFlow>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-6 bg-white rounded-xl shadow-xl p-5 border border-slate-200 max-w-xs"
      >
        <p className="text-xs font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">Proficiency Levels</p>
        <div className="space-y-2.5 mb-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
            <span className="text-slate-700 font-medium">Learning - Just Starting</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-slate-700 font-medium">Familiar - Comfortable</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
            <span className="text-slate-700 font-medium">Expert - Mastered</span>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-xs font-bold text-slate-900 mb-3 pb-3 border-b border-slate-200">Node Types</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-xl">👤</span>
            <span className="text-slate-700 font-medium">Person / Team Member</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <span className="text-slate-700 font-medium">Skill / Capability</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
