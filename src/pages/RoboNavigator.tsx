import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Target, Navigation, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import NavigatorMap from '@/components/NavigatorMap';
import RobotVision from '@/components/RobotVision';
import { motion, AnimatePresence } from 'framer-motion';

type WorkflowState = 'idle' | 'scanning' | 'path-found' | 'collecting' | 'returning' | 'completed';

const RoboNavigator = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [workflowState, setWorkflowState] = useState<WorkflowState>('idle');
  const [robotPosition, setRobotPosition] = useState({ x: 20, y: 80 });
  const [debrisPosition, setDebrisPosition] = useState<{ x: number; y: number } | null>(null);
  const [showPath, setShowPath] = useState(false);
  const synth = useRef(window.speechSynthesis);

  const sections = ['Camera Vision', '3D Robot Model', 'Navigation Map'];

  const speak = (text: string) => {
    if (synth.current) {
      synth.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      synth.current.speak(utterance);
    }
  };

  const handleIdentifyWastage = () => {
    setWorkflowState('scanning');
    speak('Scanning environment for debris. Please wait.');
    
    setTimeout(() => {
      const debris = {
        x: Math.random() * 60 + 20,
        y: Math.random() * 60 + 20
      };
      setDebrisPosition(debris);
      setWorkflowState('path-found');
      speak('Debris identified at marked location. Analyzing safest route.');
      
      setTimeout(() => {
        setShowPath(true);
        speak('Safest and shortest path is now displayed.');
      }, 2000);
    }, 3000);
  };

  const handleCollect = () => {
    if (!debrisPosition) return;
    
    setWorkflowState('collecting');
    speak('Moving to debris location.');
    
    const steps = 30;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setRobotPosition({
        x: robotPosition.x + (debrisPosition.x - robotPosition.x) * progress,
        y: robotPosition.y + (debrisPosition.y - robotPosition.y) * progress
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setDebrisPosition(null);
        setShowPath(false);
        setWorkflowState('completed');
        speak('Wastage collected successfully.');
        toast({
          title: "Success",
          description: "Debris collected successfully!",
        });
      }
    }, 100);
  };

  const handleReturn = () => {
    setWorkflowState('returning');
    speak('Returning to base location.');
    
    const startPos = { ...robotPosition };
    const targetPos = { x: 20, y: 80 };
    const steps = 30;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setRobotPosition({
        x: startPos.x + (targetPos.x - startPos.x) * progress,
        y: startPos.y + (targetPos.y - startPos.y) * progress
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setWorkflowState('idle');
        speak('Returned to base. Ready for next mission.');
      }
    }, 100);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,122,255,0.1),transparent_50%)]" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSection}
        disabled={currentSection === 0}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-cyan-500/20 border border-cyan-500 hover:bg-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-8 h-8 text-cyan-400" />
      </button>
      
      <button
        onClick={nextSection}
        disabled={currentSection === sections.length - 1}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-cyan-500/20 border border-cyan-500 hover:bg-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-8 h-8 text-cyan-400" />
      </button>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-cyan-500/30">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          AI SWARM ROBO NAVIGATOR
        </h1>
        <p className="text-center text-cyan-300/70 mt-2">Section: {sections[currentSection]}</p>
      </div>

      {/* Content */}
      <div className="relative z-10 h-[calc(100vh-180px)]">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="h-full p-6"
            >
              <RobotVision />
            </motion.div>
          )}
          
          {currentSection === 1 && (
            <motion.div
              key="robot"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="h-full p-6 flex items-center justify-center"
            >
              <div className="w-full max-w-2xl aspect-square bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl border border-cyan-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-4 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full flex items-center justify-center border-4 border-cyan-500/50 shadow-[0_0_50px_rgba(0,255,255,0.3)]">
                    <div className="text-6xl animate-pulse">🤖</div>
                  </div>
                  <p className="text-cyan-300 text-lg">3D Robot Model Loading...</p>
                  <p className="text-cyan-500/60 text-sm mt-2">Upload custom robo image to activate</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {currentSection === 2 && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="h-full p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-2">
                  <NavigatorMap
                    robotPosition={robotPosition}
                    debrisPosition={debrisPosition}
                    showPath={showPath}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 p-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Mission Control</h3>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={handleIdentifyWastage}
                        disabled={workflowState !== 'idle' && workflowState !== 'completed'}
                        className="w-full bg-cyan-500/20 border border-cyan-500 hover:bg-cyan-500/40 text-cyan-300"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Identify Wastage
                      </Button>
                      
                      <Button
                        onClick={handleCollect}
                        disabled={workflowState !== 'path-found'}
                        className="w-full bg-blue-500/20 border border-blue-500 hover:bg-blue-500/40 text-blue-300"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Go & Collect
                      </Button>
                      
                      <Button
                        onClick={handleReturn}
                        disabled={workflowState !== 'completed'}
                        className="w-full bg-purple-500/20 border border-purple-500 hover:bg-purple-500/40 text-purple-300"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Return to Base
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 p-6">
                    <h3 className="text-lg font-bold text-cyan-400 mb-3">Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${workflowState === 'idle' ? 'bg-green-400' : 'bg-gray-600'}`} />
                        <span className="text-cyan-300">System: Ready</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${debrisPosition ? 'bg-red-400' : 'bg-gray-600'}`} />
                        <span className="text-cyan-300">Debris: {debrisPosition ? 'Detected' : 'None'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${showPath ? 'bg-blue-400' : 'bg-gray-600'}`} />
                        <span className="text-cyan-300">Path: {showPath ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSection
                ? 'bg-cyan-400 w-8 shadow-[0_0_15px_rgba(0,255,255,0.6)]'
                : 'bg-cyan-500/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RoboNavigator;
