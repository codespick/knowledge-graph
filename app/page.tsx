'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { GraphView } from '@/components/GraphViewPeople';
import { ControlPanelPeople } from '@/components/ControlPanelPeople';
import { PersonDetailPanel } from '@/components/PersonDetailPanel';
import { SkillDetailPanel } from '@/components/SkillDetailPanel';
import { initializeWithSeed } from '@/lib/slices/graphSlicePeople';

export default function Home() {
  const dispatch = useDispatch();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeType, setSelectedNodeType] = useState<'person' | 'skill' | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize the graph on mount
    dispatch(initializeWithSeed());
  }, [dispatch]);

  const handleNodeSelect = (nodeId: string | null, type: 'person' | 'skill') => {
    setSelectedNodeId(nodeId);
    setSelectedNodeType(type);
  };

  const handleClosePanel = () => {
    setSelectedNodeId(null);
    setSelectedNodeType(null);
  };

  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-500 mb-6"
          ></motion.div>
          <p className="text-gray-600 text-lg font-semibold">Loading People & Skills Graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white">
      {/* Left Control Panel */}
      <ControlPanelPeople />

      {/* Center Graph View */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
        <GraphView onNodeSelect={handleNodeSelect} />
      </div>

      {/* Right Detail Panels */}
      <AnimatePresence>
        {selectedNodeId && (
          <>
            {selectedNodeType === 'person' && (
              <PersonDetailPanel personId={selectedNodeId} onClose={handleClosePanel} />
            )}
            {selectedNodeType === 'skill' && (
              <SkillDetailPanel skillId={selectedNodeId} onClose={handleClosePanel} />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
