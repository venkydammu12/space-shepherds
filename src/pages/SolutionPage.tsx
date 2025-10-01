import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Target, Cpu, Package, Battery, RotateCcw,
  ArrowLeft, ArrowRight, Bot, Radar, Camera, Magnet, Wind
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionPage = () => {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const solutionStages = [
    {
      id: 1,
      title: "Deploy",
      icon: Bot,
      description: "Motherstation deploys AI-powered swarm robots into orbit",
      overview: "Autonomous deployment system releases optimized robot swarms into strategic orbital positions for maximum coverage and efficiency",
      details: "Advanced deployment mechanisms ensure precise positioning and formation flying capabilities with real-time coordination",
      software: ["ROS2 Navigation", "Swarm Intelligence", "Formation Control", "Mission Planning"],
      hardware: ["Ion Thrusters", "Reaction Wheels", "Solar Panels", "Communication Array"],
      demoSteps: [
        "Motherstation opens deployment bay",
        "Robots activate propulsion systems",
        "Swarm formation establishes",
        "Mission parameters synchronized"
      ]
    },
    {
      id: 2, 
      title: "Detect",
      icon: Search,
      description: "Multi-sensor arrays scan and identify debris objects",
      overview: "Comprehensive sensor fusion provides 360° debris detection and classification with high accuracy",
      details: "Real-time analysis of debris size, composition, velocity, and trajectory patterns using advanced AI algorithms",
      software: ["OpenCV", "TensorFlow", "Point Cloud Processing", "Object Classification"],
      hardware: ["LiDAR Systems", "Radar Arrays", "Optical Cameras", "Magnetic Sensors"],
      demoSteps: [
        "LiDAR scanning activates",
        "Radar detects object signatures",
        "AI classifies debris type",
        "Threat level assessed"
      ]
    },
    {
      id: 3,
      title: "Process", 
      icon: Cpu,
      description: "AI algorithms calculate optimal collection routes",
      overview: "Advanced pathfinding algorithms optimize collection efficiency, safety, and fuel consumption",
      details: "Multi-objective optimization considering collision avoidance, energy efficiency, and mission timeline",
      software: ["Path Planning", "Machine Learning", "Collision Avoidance", "Route Optimization"],
      hardware: ["Edge Computing", "GPU Processors", "Memory Systems", "Backup Storage"],
      demoSteps: [
        "Debris coordinates processed",
        "Optimal path calculated",
        "Collision risks analyzed",
        "Route assigned to robot"
      ]
    },
    {
      id: 4,
      title: "Collect",
      icon: Target,
      description: "Specialized systems capture and secure debris safely",
      overview: "Precision robotic systems safely capture debris without creating additional fragments or hazards",
      details: "Adaptive collection mechanisms handle various debris types, sizes, and rotation speeds with intelligent control",
      software: ["Robotic Control", "Force Feedback", "Grip Optimization", "Safety Protocols"],
      hardware: ["Robotic Arms", "Vacuum Systems", "Magnetic Grippers", "Storage Containers"],
      demoSteps: [
        "Robot approaches target",
        "Gripper system activates",
        "Debris securely captured",
        "Containment verified"
      ]
    },
    {
      id: 5,
      title: "Return",
      icon: Package,
      description: "Robots transport collected debris back to motherstation",
      overview: "Automated return journey with debris cargo to central processing facility for disposal or recycling",
      details: "Optimized flight paths ensure efficient delivery and robot recharging for next mission cycle",
      software: ["Autonomous Navigation", "Docking Protocols", "Cargo Management", "Fleet Coordination"],
      hardware: ["Propulsion Systems", "Docking Mechanisms", "Cargo Bay", "Navigation Sensors"],
      demoSteps: [
        "Return trajectory calculated",
        "Navigation to motherstation",
        "Docking sequence initiated",
        "Debris transferred & robot recharged"
      ]
    }
  ];

  const techStacks = {
    software: [
      { name: "ROS2", description: "Robot Operating System", icon: Bot },
      { name: "TensorFlow", description: "Machine Learning", icon: Cpu },
      { name: "OpenCV", description: "Computer Vision", icon: Camera },
      { name: "React", description: "Web Interface", icon: Target }
    ],
    hardware: [
      { name: "LiDAR", description: "3D Environment Mapping", icon: Radar },
      { name: "Magnetic Sensors", description: "Metal Detection", icon: Magnet },
      { name: "Vacuum Systems", description: "Debris Collection", icon: Wind },
      { name: "Ion Thrusters", description: "Precise Maneuvering", icon: RotateCcw }
    ]
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-cosmic" />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/problem')}
          className="border-primary/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Problem Analysis
        </Button>
        
        <div className="text-sm text-muted-foreground">Solution Loop</div>
        
        <Button
          onClick={() => navigate('/mission-control')}
          className="bg-primary hover:bg-primary/90 text-black"
        >
          Mission Control
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold hero-title mb-6">
              AI SWARM
              <br />
              <span className="text-primary">SOLUTION</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Autonomous orbital debris cleanup using intelligent swarm robotics
            </p>
          </motion.div>

          {/* Interactive Solution Loop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-16"
          >
            <div className="glass-card p-8 md:p-12 rounded-3xl">
              <h2 className="text-3xl font-bold text-center text-primary mb-8">
                Autonomous Solution Loop
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Click on each stage to explore detailed workflows and see demo animations
              </p>
              
              {/* Sequential Flow Visualization */}
              <div className="relative max-w-5xl mx-auto">
                {/* Connection Lines */}
                <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 hidden md:block" />
                
                {/* Stage Cards in Sequential Flow */}
                <div className="grid md:grid-cols-5 gap-4 relative">
                  {solutionStages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="relative"
                    >
                      {/* Stage Card */}
                      <div
                        className={`relative cursor-pointer transition-all duration-300 group ${
                          selectedStage === stage.id
                            ? 'transform scale-105'
                            : 'hover:scale-105'
                        }`}
                        onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                      >
                        {/* Number Badge */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center text-sm z-10 shadow-glow">
                          {index + 1}
                        </div>
                        
                        {/* Icon Circle */}
                        <div className={`w-full aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                          selectedStage === stage.id
                            ? 'border-primary bg-primary/20 shadow-glow'
                            : 'border-primary/50 bg-card/50 hover:border-primary hover:bg-primary/10'
                        }`}>
                          <stage.icon className={`w-10 h-10 mb-2 transition-all duration-300 ${
                            selectedStage === stage.id 
                              ? 'text-primary animate-pulse-glow' 
                              : 'text-primary/70 group-hover:text-primary'
                          }`} />
                          <div className="text-center">
                            <div className={`text-base font-bold transition-colors ${
                              selectedStage === stage.id ? 'text-primary' : 'text-foreground'
                            }`}>
                              {stage.title}
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow Connector */}
                        {index < solutionStages.length - 1 && (
                          <div className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-0">
                            <ArrowRight className="w-10 h-10 text-primary/30" />
                          </div>
                        )}
                        
                        {/* Loop back arrow on last item */}
                        {index === solutionStages.length - 1 && (
                          <div className="hidden md:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center gap-2 text-primary/50">
                              <RotateCcw className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                              <span className="text-xs">Loop Repeats</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Brief Description */}
                      <div className="mt-3 text-center">
                        <p className="text-xs text-muted-foreground px-2">
                          {stage.description.split(' ').slice(0, 6).join(' ')}...
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stage Details with Demo Animation */}
          <AnimatePresence>
            {selectedStage && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mb-16"
              >
                {(() => {
                  const stage = solutionStages.find(s => s.id === selectedStage);
                  if (!stage) return null;
                  
                  return (
                    <div className="hologram-box p-8 rounded-3xl">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                            <stage.icon className="w-8 h-8 text-primary animate-pulse-glow" />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-primary">{stage.title} Stage</h3>
                            <p className="text-muted-foreground">{stage.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStage(null)}
                          className="border-primary/30"
                        >
                          Close
                        </Button>
                      </div>

                      {/* Demo Animation Section */}
                      <div className="mb-8">
                        <div className="glass-card p-6 rounded-2xl bg-background/50">
                          <h4 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                            <Camera className="w-5 h-5" />
                            Live Demo Animation
                          </h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Animation Visualization */}
                            <div className="relative aspect-video bg-background/80 rounded-xl border border-primary/30 overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                {/* Animated Demo Based on Stage */}
                                <div className="relative w-full h-full p-8">
                                  {stage.id === 1 && (
                                    <>
                                      {/* Deploy Animation */}
                                      <motion.div
                                        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      >
                                        <Package className="w-16 h-16 text-accent" />
                                      </motion.div>
                                      {[0, 1, 2].map((i) => (
                                        <motion.div
                                          key={i}
                                          className="absolute top-1/2 left-1/4"
                                          animate={{
                                            x: [0, 150 + i * 30],
                                            y: [0, -50 + i * 20],
                                            opacity: [0, 1, 1]
                                          }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.3
                                          }}
                                        >
                                          <Bot className="w-8 h-8 text-primary" />
                                        </motion.div>
                                      ))}
                                    </>
                                  )}
                                  {stage.id === 2 && (
                                    <>
                                      {/* Detect Animation */}
                                      <motion.div
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                      >
                                        <Bot className="w-12 h-12 text-primary" />
                                      </motion.div>
                                      <motion.div
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      >
                                        <div className="w-24 h-24 rounded-full border-4 border-primary" />
                                      </motion.div>
                                      {[0, 1, 2, 3].map((i) => (
                                        <motion.div
                                          key={i}
                                          className="absolute"
                                          style={{
                                            top: `${30 + i * 15}%`,
                                            right: `${20 + i * 10}%`
                                          }}
                                          animate={{ opacity: [0.3, 1, 0.3] }}
                                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                        >
                                          <Target className="w-6 h-6 text-accent" />
                                        </motion.div>
                                      ))}
                                    </>
                                  )}
                                  {stage.id === 3 && (
                                    <>
                                      {/* Process Animation */}
                                      <motion.div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                                        <Bot className="w-10 h-10 text-primary" />
                                      </motion.div>
                                      <motion.div
                                        className="absolute top-1/2 right-1/4"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                      >
                                        <Target className="w-10 h-10 text-accent" />
                                      </motion.div>
                                      <svg className="absolute top-1/2 left-1/4 right-1/4 h-1" style={{ width: '50%' }}>
                                        <motion.path
                                          d="M 0 0 Q 100 -50 200 0"
                                          stroke="hsl(var(--primary))"
                                          strokeWidth="2"
                                          fill="none"
                                          initial={{ pathLength: 0 }}
                                          animate={{ pathLength: [0, 1] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        />
                                      </svg>
                                      <motion.div
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                      >
                                        <Cpu className="w-8 h-8 text-primary" />
                                      </motion.div>
                                    </>
                                  )}
                                  {stage.id === 4 && (
                                    <>
                                      {/* Collect Animation */}
                                      <motion.div
                                        className="absolute top-1/2 left-1/3"
                                        animate={{ x: [0, 100] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                      >
                                        <Bot className="w-12 h-12 text-primary" />
                                      </motion.div>
                                      <motion.div
                                        className="absolute top-1/2 right-1/3"
                                        animate={{ 
                                          scale: [1, 0.5],
                                          x: [0, -100],
                                          opacity: [1, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                      >
                                        <Target className="w-10 h-10 text-accent" />
                                      </motion.div>
                                    </>
                                  )}
                                  {stage.id === 5 && (
                                    <>
                                      {/* Return Animation */}
                                      <motion.div
                                        className="absolute top-1/2 left-1/4"
                                        animate={{ x: [0, 200] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                      >
                                        <Bot className="w-12 h-12 text-primary" />
                                      </motion.div>
                                      <motion.div
                                        className="absolute top-1/2 right-1/4"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                      >
                                        <Package className="w-16 h-16 text-accent" />
                                      </motion.div>
                                      <motion.div
                                        className="absolute bottom-4 right-1/4 text-xs text-primary"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                      >
                                        <Battery className="w-6 h-6" />
                                      </motion.div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Step-by-Step Process */}
                            <div>
                              <h5 className="font-bold text-accent mb-3">Process Steps:</h5>
                              <div className="space-y-3">
                                {stage.demoSteps.map((step, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                                  >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="text-xs font-bold text-primary">{idx + 1}</span>
                                    </div>
                                    <span className="text-sm">{step}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Technical Details Grid */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 rounded-xl">
                          <h4 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            Overview
                          </h4>
                          <p className="text-muted-foreground text-sm mb-3">{stage.overview}</p>
                          <p className="text-xs text-muted-foreground">{stage.details}</p>
                        </div>
                        
                        <div className="glass-card p-6 rounded-xl">
                          <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                            <Cpu className="w-5 h-5" />
                            Software Stack
                          </h4>
                          <div className="space-y-2">
                            {stage.software.map((tech, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span>{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="glass-card p-6 rounded-xl">
                          <h4 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Hardware Stack
                          </h4>
                          <div className="space-y-2">
                            {stage.hardware.map((tech, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                                <span>{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technology Stacks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 mb-16"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Cpu className="w-6 h-6" />
                Software Technologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {techStacks.software.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
                    <tech.icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{tech.name}</div>
                      <div className="text-xs text-muted-foreground">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                <Target className="w-6 h-6" />
                Hardware Systems
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {techStacks.hardware.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors">
                    <tech.icon className="w-5 h-5 text-accent" />
                    <div>
                      <div className="font-medium">{tech.name}</div>
                      <div className="text-xs text-muted-foreground">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold hero-title mb-6">
                Experience the Solution in Action
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                See our AI swarm robotics system in operation through our live mission control dashboard
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/mission-control')}
                className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 text-lg"
              >
                Launch Mission Control
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;