import React, { useState, useEffect } from 'react';
import { Search, Bot, Package, Recycle, Zap, RotateCcw, X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoopStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  emoji: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  software: string[];
  hardware: string[];
  technologies: string[];
}

const steps: LoopStep[] = [
  {
    id: 'detect',
    title: 'Detect',
    icon: <Search className="w-6 h-6" />,
    emoji: '🔍',
    description: 'AI sensors identify debris',
    overview: 'Advanced AI-powered detection systems continuously scan orbital space to identify and classify space debris. Using machine learning algorithms and computer vision, our swarm robotics network can detect objects as small as 1cm in diameter across multiple orbital altitudes.',
    problem: 'Space debris detection is challenging due to high orbital velocities, varying object sizes, and the vast area of space that needs monitoring.',
    solution: 'Our AI swarm uses distributed sensor networks with real-time data fusion to provide comprehensive debris mapping and tracking.',
    software: ['Computer Vision AI', 'Machine Learning Models', 'Real-time Data Processing', 'Orbital Mechanics Simulation', 'Pattern Recognition'],
    hardware: ['High-Resolution Cameras', 'LIDAR Sensors', 'Radar Systems', 'Infrared Detectors', 'Quantum Sensors'],
    technologies: ['Deep Learning', 'Edge Computing', 'Sensor Fusion', 'Predictive Analytics', 'Neural Networks']
  },
  {
    id: 'collect',
    title: 'Collect',
    icon: <Bot className="w-6 h-6" />,
    emoji: '🤖',
    description: 'Swarm robots capture materials',
    overview: 'Autonomous swarm robots work collaboratively to safely capture and secure space debris. Each robot is equipped with specialized collection mechanisms and operates using swarm intelligence to optimize collection efficiency while avoiding collisions.',
    problem: 'Capturing debris in zero gravity requires precise maneuvering and coordination to avoid creating more debris through collisions.',
    solution: 'Our swarm robotics system uses coordinated AI to safely approach, capture, and secure debris using multiple collection strategies.',
    software: ['Swarm Intelligence AI', 'Path Planning Algorithms', 'Collision Avoidance', 'Autonomous Navigation', 'Mission Coordination'],
    hardware: ['Robotic Arms', 'Magnetic Collectors', 'Net Deployment Systems', 'Propulsion Thrusters', 'Gripper Mechanisms'],
    technologies: ['Swarm Robotics', 'Autonomous Systems', 'Multi-Agent Coordination', 'Robotic Manipulation', 'Space Robotics']
  },
  {
    id: 'store',
    title: 'Store',
    icon: <Package className="w-6 h-6" />,
    emoji: '📦',
    description: 'Safe containment systems',
    overview: 'Collected debris is safely stored in specialized containment systems designed for the space environment. Our storage solutions prevent debris from escaping while organizing materials for efficient processing and potential reuse.',
    problem: 'Space debris varies greatly in size, material, and potential hazard level, requiring flexible and secure storage solutions.',
    solution: 'Modular containment systems with adaptive storage mechanisms that can handle various debris types while maintaining orbital stability.',
    software: ['Inventory Management AI', 'Material Classification', 'Storage Optimization', 'Safety Monitoring', 'Logistics Planning'],
    hardware: ['Modular Storage Pods', 'Containment Shields', 'Sorting Mechanisms', 'Safety Locks', 'Environmental Seals'],
    technologies: ['Smart Materials', 'Modular Design', 'Safety Systems', 'Space Engineering', 'Material Science']
  },
  {
    id: 'reuse',
    title: 'Reuse',
    icon: <Recycle className="w-6 h-6" />,
    emoji: '♻',
    description: 'Transform into resources',
    overview: 'Space debris is processed and transformed into valuable resources for space missions. Our recycling systems can convert metal debris into construction materials, fuel components, or spare parts for space infrastructure.',
    problem: 'Traditional space missions require expensive material transport from Earth, making space operations costly and unsustainable.',
    solution: 'In-space manufacturing and recycling systems that transform debris into useful resources, reducing dependency on Earth-based supplies.',
    software: ['Material Processing AI', '3D Printing Control', 'Quality Assurance', 'Resource Planning', 'Manufacturing Optimization'],
    hardware: ['3D Printers', 'Material Processors', 'Refinement Systems', 'Quality Scanners', 'Manufacturing Tools'],
    technologies: ['In-Space Manufacturing', 'Additive Manufacturing', 'Material Recycling', 'Resource Utilization', 'Circular Economy']
  },
  {
    id: 'recharge',
    title: 'Recharge',
    icon: <Zap className="w-6 h-6" />,
    emoji: '⚡',
    description: 'Solar-powered renewal',
    overview: 'The entire swarm robotics system is powered by advanced solar energy collection and storage systems. Our robots automatically return to charging stations to maintain operational capacity for continuous debris cleanup operations.',
    problem: 'Space operations require reliable, long-term power sources that can operate in the harsh space environment without regular maintenance.',
    solution: 'Advanced solar panel arrays with high-efficiency energy storage systems provide sustainable power for continuous operations.',
    software: ['Power Management AI', 'Energy Optimization', 'Battery Monitoring', 'Solar Tracking', 'Load Balancing'],
    hardware: ['High-Efficiency Solar Panels', 'Advanced Batteries', 'Power Distribution', 'Charging Stations', 'Energy Storage'],
    technologies: ['Solar Technology', 'Energy Storage', 'Power Electronics', 'Wireless Charging', 'Smart Grid Systems']
  },
  {
    id: 'repeat',
    title: 'Repeat',
    icon: <RotateCcw className="w-6 h-6" />,
    emoji: '🔄',
    description: 'Continuous cleanup cycle',
    overview: 'The system operates in a continuous cycle, constantly improving through machine learning and adapting to new debris patterns. This ensures long-term sustainability and effectiveness of space debris cleanup operations.',
    problem: 'Space debris cleanup requires continuous operation over many years to make a significant impact on orbital safety.',
    solution: 'Self-sustaining robotic systems that operate continuously, learning and adapting to optimize cleanup efficiency over time.',
    software: ['Continuous Learning AI', 'System Optimization', 'Performance Analytics', 'Adaptive Algorithms', 'Mission Planning'],
    hardware: ['Self-Maintenance Systems', 'Diagnostic Sensors', 'Upgrade Modules', 'Communication Arrays', 'Backup Systems'],
    technologies: ['Continuous Improvement', 'Self-Healing Systems', 'Adaptive AI', 'Long-term Operations', 'System Resilience']
  }
];

const CircularSolutionLoop: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isRotating]);

  const handleStepClick = (stepId: string) => {
    setSelectedStep(stepId);
    setIsRotating(false);
  };

  const closeModal = () => {
    setSelectedStep(null);
    setIsRotating(true);
  };

  const navigateToStep = (direction: 'prev' | 'next') => {
    if (!selectedStep) return;
    const currentIndex = steps.findIndex(step => step.id === selectedStep);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? steps.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === steps.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedStep(steps[newIndex].id);
  };

  const selectedStepData = steps.find(step => step.id === selectedStep);

  const getStepPosition = (index: number) => {
    const angle = (index * 60) - 90; // Start from top, 60 degrees apart
    const radius = 180;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    return { x, y };
  };

  const renderStepAnimation = (stepId: string) => {
    switch (stepId) {
      case 'detect':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-2 border-blue-400 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border border-blue-300 rounded-full animate-pulse"></div>
            <div className="absolute inset-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -inset-2 border border-blue-200 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>
        );
      case 'collect':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg transform rotate-12 animate-pulse"></div>
            <div className="absolute inset-2 bg-gray-800 rounded-lg flex items-center justify-center">
              <Bot className="w-12 h-12 text-blue-400 animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
          </div>
        );
      case 'store':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-900 rounded-lg"></div>
            <div className="absolute inset-2 border-2 border-blue-400 rounded-lg animate-pulse"></div>
            <div className="absolute inset-6 bg-blue-500 rounded flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-1 left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        );
      case 'reuse':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Recycle className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
        );
      case 'recharge':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-600 to-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center">
              <Zap className="w-12 h-12 text-yellow-400 animate-bounce" />
            </div>
            <div className="absolute -inset-1 border-2 border-yellow-400 rounded-full animate-ping"></div>
          </div>
        );
      case 'repeat':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-spin"></div>
            <div className="absolute inset-6 bg-blue-600 rounded-full flex items-center justify-center">
              <RotateCcw className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '1s' }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Space Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-blue-900"></div>
        {/* Animated Stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Loop Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-4xl aspect-square">
          
          {/* Page Navigation - Top Left */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button
              onClick={() => navigate('/problem')}
              className="p-3 bg-cyan-500/20 border-2 border-cyan-400 rounded-full backdrop-blur-sm hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              title="Previous Section"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <button
              onClick={() => navigate('/impact')}
              className="p-3 bg-cyan-500/20 border-2 border-cyan-400 rounded-full backdrop-blur-sm hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              title="Next Section"
            >
              <ChevronRight className="w-5 h-5 text-cyan-400" />
            </button>
          </div>

          {/* Control Panel */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="p-3 bg-blue-600/20 border border-blue-400/30 rounded-lg backdrop-blur-sm hover:bg-blue-600/30 transition-all duration-300"
            >
              {isRotating ? <Pause className="w-5 h-5 text-blue-400" /> : <Play className="w-5 h-5 text-blue-400" />}
            </button>
          </div>

          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full border-4 border-blue-400 flex items-center justify-center shadow-2xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Rotating Loop Container */}
          <div 
            className="absolute inset-0 transition-transform duration-100 ease-linear"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <circle
                cx="200"
                cy="200"
                r="180"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
            </svg>

            {/* Step Nodes */}
            {steps.map((step, index) => {
              const position = getStepPosition(index);
              return (
                <div
                  key={step.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `calc(50% + ${position.x}px)`,
                    top: `calc(50% + ${position.y}px)`,
                    transform: `translate(-50%, -50%) rotate(-${rotation}deg)`
                  }}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div className="relative">
                    {/* Node Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 scale-150"></div>
                    
                    {/* Main Node */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full border-2 border-blue-400 flex flex-col items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-blue-300 transition-all duration-300">
                      <div className="text-xs font-bold text-blue-200 mb-1">
                        {index + 1}
                      </div>
                      <div className="text-blue-100 text-lg">
                        {step.emoji}
                      </div>
                    </div>

                    {/* Step Label */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="text-blue-400 font-semibold text-sm tracking-wide">
                        {step.title}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedStep && selectedStepData && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          
          {/* Left Navigation Arrow */}
          <button
            onClick={() => navigateToStep('prev')}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[60] p-4 bg-cyan-500/20 border-2 border-cyan-400 rounded-full backdrop-blur-sm hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            <ChevronLeft className="w-8 h-8 text-cyan-400" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => navigateToStep('next')}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] p-4 bg-cyan-500/20 border-2 border-cyan-400 rounded-full backdrop-blur-sm hover:bg-cyan-500/40 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            <ChevronRight className="w-8 h-8 text-cyan-400" />
          </button>

          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black border border-blue-400/30 rounded-2xl overflow-hidden animate-in zoom-in duration-500">
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-2 bg-red-600/20 border border-red-400/30 rounded-lg backdrop-blur-sm hover:bg-red-600/30 transition-all duration-300"
            >
              <X className="w-6 h-6 text-red-400" />
            </button>

            <div className="p-8 overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className="text-center mb-8">
                {renderStepAnimation(selectedStep)}
                <h2 className="text-4xl font-bold text-blue-400 mb-2">
                  {selectedStepData.title}
                </h2>
                <p className="text-xl text-gray-300">
                  {selectedStepData.description}
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Overview */}
                <div className="space-y-6">
                  <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedStepData.overview}
                    </p>
                  </div>

                  <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-400 mb-3">Problem</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedStepData.problem}
                    </p>
                  </div>

                  <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">Solution</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedStepData.solution}
                    </p>
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div className="space-y-6">
                  <div className="bg-purple-900/20 border border-purple-400/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">Software Tools</h3>
                    <ul className="space-y-2">
                      {selectedStepData.software.map((tool, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-orange-900/20 border border-orange-400/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Hardware Tools</h3>
                    <ul className="space-y-2">
                      {selectedStepData.hardware.map((tool, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Technologies</h3>
                    <ul className="space-y-2">
                      {selectedStepData.technologies.map((tech, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularSolutionLoop;