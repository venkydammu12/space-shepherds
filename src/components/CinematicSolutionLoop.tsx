import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Zap, Search, Cpu, Target, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SolutionStep {
  id: number;
  title: string;
  angle: number;
  icon: React.ComponentType<any>;
  overview: string;
  description: string;
  software: string[];
  hardware: string[];
  demoAnimation: string;
  color: string;
}

const CinematicSolutionLoop = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(0);
  const loopRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const solutionSteps: SolutionStep[] = [
    {
      id: 1,
      title: "Deploy",
      angle: 0,
      icon: Package,
      overview: "Motherstation releases AI-powered swarm robots into strategic orbital positions",
      description: "Advanced deployment mechanisms ensure precise positioning and formation flying capabilities with real-time coordination between multiple autonomous units.",
      software: ["ROS2 Navigation", "Swarm Intelligence", "Formation Control", "Mission Planning AI"],
      hardware: ["Ion Thrusters", "Reaction Wheels", "Solar Panels", "Communication Array"],
      demoAnimation: "deploy",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Detect",
      angle: 72,
      icon: Search,
      overview: "Multi-sensor arrays scan and identify debris objects with precision",
      description: "Comprehensive sensor fusion provides 360° debris detection and classification using advanced AI algorithms for real-time threat assessment.",
      software: ["OpenCV", "TensorFlow", "Point Cloud Processing", "Object Classification"],
      hardware: ["LiDAR Systems", "Radar Arrays", "Optical Cameras", "Magnetic Sensors"],
      demoAnimation: "detect",
      color: "from-green-500 to-emerald-400"
    },
    {
      id: 3,
      title: "Process",
      angle: 144,
      icon: Cpu,
      overview: "AI algorithms calculate optimal collection routes and strategies",
      description: "Advanced pathfinding algorithms optimize collection efficiency, safety, and fuel consumption using multi-objective optimization techniques.",
      software: ["Path Planning", "Machine Learning", "Collision Avoidance", "Route Optimization"],
      hardware: ["Edge Computing", "GPU Processors", "Memory Systems", "Backup Storage"],
      demoAnimation: "process",
      color: "from-purple-500 to-violet-400"
    },
    {
      id: 4,
      title: "Collect",
      angle: 216,
      icon: Target,
      overview: "Specialized robotic systems capture and secure debris safely",
      description: "Precision robotic systems safely capture debris without creating additional fragments, handling various debris types and rotation speeds.",
      software: ["Robotic Control", "Force Feedback", "Grip Optimization", "Safety Protocols"],
      hardware: ["Robotic Arms", "Vacuum Systems", "Magnetic Grippers", "Storage Containers"],
      demoAnimation: "collect",
      color: "from-orange-500 to-amber-400"
    },
    {
      id: 5,
      title: "Return",
      angle: 288,
      icon: RotateCcw,
      overview: "Robots transport collected debris back to motherstation for processing",
      description: "Automated return journey with debris cargo to central processing facility for disposal, recycling, and robot recharging for next mission cycle.",
      software: ["Autonomous Navigation", "Docking Protocols", "Cargo Management", "Fleet Coordination"],
      hardware: ["Propulsion Systems", "Docking Mechanisms", "Cargo Bay", "Navigation Sensors"],
      demoAnimation: "return",
      color: "from-red-500 to-pink-400"
    }
  ];

  // Continuous rotation animation
  useEffect(() => {
    if (isRotating && !selectedStep) {
      const animate = () => {
        setCurrentRotation(prev => (prev + 0.2) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRotating, selectedStep]);

  const handleStepClick = (stepId: number) => {
    setSelectedStep(stepId);
    setIsRotating(false);
  };

  const closePanel = () => {
    setSelectedStep(null);
    setIsRotating(true);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const renderDemoAnimation = (animationType: string, stepColor: string) => {
    const baseClasses = "absolute transition-all duration-1000";
    
    switch (animationType) {
      case 'deploy':
        return (
          <div className="relative w-full h-full overflow-hidden">
            {/* Motherstation */}
            <motion.div
              className={`${baseClasses} top-1/2 left-1/4 w-16 h-16 rounded-lg bg-gradient-to-br ${stepColor} flex items-center justify-center`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Package className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Deploying robots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`${baseClasses} top-1/2 left-1/4 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500`}
                animate={{
                  x: [0, 100 + i * 40],
                  y: [0, -30 + i * 15],
                  opacity: [0, 1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
            
            {/* Orbital paths */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.circle
                cx="50%"
                cy="50%"
                r="120"
                fill="none"
                stroke="url(#deployGradient)"
                strokeWidth="2"
                strokeDasharray="10 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="deployGradient">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
        
      case 'detect':
        return (
          <div className="relative w-full h-full overflow-hidden">
            {/* Robot with scanning beam */}
            <motion.div
              className={`${baseClasses} top-1/2 left-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${stepColor} flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2`}
            >
              <Search className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Scanning beam */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-48 h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-transparent origin-left" />
            </motion.div>
            
            {/* Detected debris */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={`${baseClasses} w-4 h-4 rounded-sm bg-gradient-to-br from-red-500 to-orange-400`}
                style={{
                  top: `${30 + i * 10}%`,
                  right: `${20 + i * 8}%`
                }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.4 
                }}
              />
            ))}
            
            {/* Detection waves */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 3], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-24 h-24 rounded-full border-2 border-green-400" />
            </motion.div>
          </div>
        );
        
      case 'process':
        return (
          <div className="relative w-full h-full overflow-hidden">
            {/* Central processing unit */}
            <motion.div
              className={`${baseClasses} top-1/2 left-1/2 w-16 h-16 rounded-lg bg-gradient-to-br ${stepColor} flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2`}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Data streams */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: i * 90 }}
              >
                <motion.div
                  className="w-32 h-1 bg-gradient-to-r from-purple-500 to-transparent origin-left"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.3 
                  }}
                />
              </motion.div>
            ))}
            
            {/* Processing nodes */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className={`${baseClasses} w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600`}
                style={{
                  top: `${50 + 30 * Math.sin(i * Math.PI / 3)}%`,
                  left: `${50 + 30 * Math.cos(i * Math.PI / 3)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </div>
        );
        
      case 'collect':
        return (
          <div className="relative w-full h-full overflow-hidden">
            {/* Robot approaching debris */}
            <motion.div
              className={`${baseClasses} top-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${stepColor} flex items-center justify-center`}
              animate={{ left: ['20%', '60%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Debris being collected */}
            <motion.div
              className={`${baseClasses} top-1/2 right-1/4 w-8 h-8 rounded-sm bg-gradient-to-br from-red-500 to-orange-400 transform -translate-y-1/2`}
              animate={{ 
                scale: [1, 0.5, 0],
                x: [0, -100, -150],
                opacity: [1, 0.8, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />
            
            {/* Collection beam */}
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2"
              animate={{ left: ['32%', '52%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-transparent" />
            </motion.div>
            
            {/* Success indicator */}
            <motion.div
              className={`${baseClasses} top-1/4 left-1/2 transform -translate-x-1/2`}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 2.5 }}
            >
              <div className="text-green-400 font-bold text-sm">COLLECTED</div>
            </motion.div>
          </div>
        );
        
      case 'return':
        return (
          <div className="relative w-full h-full overflow-hidden">
            {/* Robot returning with cargo */}
            <motion.div
              className={`${baseClasses} top-1/2 w-12 h-12 rounded-full bg-gradient-to-br ${stepColor} flex items-center justify-center`}
              animate={{ left: ['70%', '20%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Motherstation */}
            <motion.div
              className={`${baseClasses} top-1/2 left-1/4 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Package className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Return path */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 70% 50% Q 45% 30% 25% 50%"
                fill="none"
                stroke="url(#returnGradient)"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="returnGradient">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Docking indicator */}
            <motion.div
              className={`${baseClasses} top-3/4 left-1/4 transform -translate-x-1/2`}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 3.5 }}
            >
              <div className="text-cyan-400 font-bold text-sm">DOCKING</div>
            </motion.div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const selectedStepData = selectedStep ? solutionSteps.find(step => step.id === selectedStep) : null;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 230, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 230, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold hero-title mb-6">
            SOLUTION <span className="text-primary">LOOP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Interactive autonomous orbital debris cleanup process
          </p>
          
          {/* Control buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={toggleRotation}
              className="border-primary/30 hover:border-primary"
            >
              {isRotating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRotating ? 'Pause' : 'Play'} Loop
            </Button>
          </div>
        </motion.div>

        {/* Main Loop Container */}
        <div className="relative flex items-center justify-center mb-20">
          <div className="relative w-[600px] h-[600px]">
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(0, 230, 255, 0.3)',
                  '0 0 40px rgba(0, 230, 255, 0.6)',
                  '0 0 20px rgba(0, 230, 255, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Main rotating loop */}
            <motion.div
              ref={loopRef}
              className="absolute inset-8 rounded-full border-4 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm"
              animate={{ rotate: currentRotation }}
              transition={{ type: "tween", ease: "linear" }}
            >
              {/* Inner energy ring */}
              <div className="absolute inset-4 rounded-full border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5" />
              
              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{ rotate: -currentRotation }}
                  transition={{ type: "tween", ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Solution Steps */}
            {solutionSteps.map((step) => {
              const radius = 250;
              const x = Math.cos((step.angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((step.angle - 90) * Math.PI / 180) * radius;
              
              return (
                <motion.div
                  key={step.id}
                  className="absolute top-1/2 left-1/2 cursor-pointer group"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Step node */}
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:border-white/40 transition-all duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: step.id * 0.4 }}
                    />
                  </div>
                  
                  {/* Step label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center">
                    <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </div>
                  </div>
                  
                  {/* Connection line to center */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-r from-primary/50 to-transparent origin-left"
                    style={{
                      height: '2px',
                      width: `${radius - 40}px`,
                      transform: `translate(-50%, -50%) rotate(${step.angle + 180}deg)`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Expanded Panel */}
        <AnimatePresence>
          {selectedStep && selectedStepData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-8"
              onClick={closePanel}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto hologram-box rounded-3xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10"
                  onClick={closePanel}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Panel Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedStepData.color} flex items-center justify-center shadow-lg`}>
                    <selectedStepData.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-primary mb-2">
                      {selectedStepData.title} Phase
                    </h3>
                    <p className="text-xl text-muted-foreground">
                      {selectedStepData.overview}
                    </p>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Demo Animation */}
                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Live Demo Animation
                    </h4>
                    <div className="relative aspect-video bg-background/80 rounded-xl border border-primary/30 overflow-hidden">
                      {renderDemoAnimation(selectedStepData.demoAnimation, selectedStepData.color)}
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="space-y-6">
                    <div className="glass-card p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-accent mb-3">Overview</h4>
                      <p className="text-muted-foreground">{selectedStepData.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card p-4 rounded-xl">
                        <h5 className="font-bold text-primary mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          Software
                        </h5>
                        <div className="space-y-2">
                          {selectedStepData.software.map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span>{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="glass-card p-4 rounded-xl">
                        <h5 className="font-bold text-accent mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Hardware
                        </h5>
                        <div className="space-y-2">
                          {selectedStepData.hardware.map((tech, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span>{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  <Button
                    onClick={closePanel}
                    className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3"
                  >
                    Continue Exploring Loop
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solution Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass-card p-12 rounded-3xl neon-border">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold hero-title mb-6">
                Complete Autonomous Solution
              </h3>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our AI Swarm Robotics system operates as a continuous, self-sustaining loop that addresses the critical challenge of orbital debris cleanup. The solution begins with strategic deployment of intelligent robot swarms from a central motherstation, followed by comprehensive debris detection using advanced sensor arrays and AI-powered classification algorithms.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Once debris is identified, sophisticated processing algorithms calculate optimal collection routes while ensuring collision avoidance and energy efficiency. Specialized robotic systems then safely capture and secure debris without creating additional fragments, before autonomously returning to the motherstation for processing, recycling, and recharging.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This continuous loop operates 24/7, creating a scalable and sustainable approach to maintaining orbital safety while protecting critical satellite infrastructure and enabling future space exploration missions.
                </p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 rounded-xl bg-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Autonomous</h4>
                <p className="text-muted-foreground">Fully self-operating system requiring minimal human intervention</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-accent/10">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-accent mb-2">Continuous</h4>
                <p className="text-muted-foreground">24/7 operation with self-sustaining loop architecture</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-primary/10">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">Scalable</h4>
                <p className="text-muted-foreground">Expandable swarm network for comprehensive orbital coverage</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicSolutionLoop;