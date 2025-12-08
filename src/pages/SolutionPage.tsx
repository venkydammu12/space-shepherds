import React from 'react';
import CircularSolutionLoop from '../components/CircularSolutionLoop';
import Navbar from '@/components/Navbar';

const SolutionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <CircularSolutionLoop />
    </div>
  );
};

export default SolutionPage;