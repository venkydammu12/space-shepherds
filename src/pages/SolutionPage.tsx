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
      position: { top: '10%', left: '50%' },
      description: "Motherstation deploys AI-powered swarm robots",
      overview: "Autonomous deployment system releases optimized robot swarms into strategic orbital positions",
      details: "Advanced deployment mechanisms ensure precise positioning and formation flying capabilities",
      software: ["ROS2 Navigation", "Swarm Intelligence", "Formation Control", "Mission Planning"],
      hardware: ["Ion Thrusters", "Reaction Wheels", "Solar Panels", "Communication Array"]
    },
    {
      id: 2, 
      title: "Detect",
      icon: Search,
      position: { top: '25%', right: '20%' },
      description: "Multi-sensor arrays scan for debris objects",
      overview: "Comprehensive sensor fusion provides 360° debris detection and classification",
      details: "Real-time analysis of debris size, composition, velocity, and trajectory patterns",
      software: ["OpenCV", "TensorFlow", "Point Cloud Processing", "Object Classification"],
      hardware: ["LiDAR Systems", "Radar Arrays", "Optical Cameras", "Magnetic Sensors"]
    },
    {
      id: 3,
      title: "Process", 
      icon: Cpu,
      position: { bottom: '25%', right: '20%' },
      description: "AI algorithms plan optimal collection routes",
      overview: "Advanced pathfinding algorithms optimize collection efficiency and safety",
      details: "Multi-objective optimization considering fuel consumption, time, and collision avoidance",
      software: ["Path Planning", "Machine Learning", "Collision Avoidance", "Route Optimization"],
      hardware: ["Edge Computing", "GPU Processors", "Memory Systems", "Backup Storage"]
    },
    {
      id: 4,
      title: "Collect",
      icon: Target,
      position: { bottom: '10%', left: '50%' },
      description: "Specialized arms capture and secure debris",
      overview: "Precision robotic systems safely capture debris without creating additional fragments",
      details: "Adaptive collection mechanisms handle various debris types and sizes",
      software: ["Robotic Control", "Force Feedback", "Grip Optimization", "Safety Protocols"],
      hardware: ["Robotic Arms", "Vacuum Systems", "Magnetic Grippers", "Storage Containers"]
    },
    {
      id: 5,
      title: "Return",
      icon: Package,
      position: { top: '25%', left: '20%' },
      description: "Robots transport debris to motherstation",
      overview: "Automated return journey with debris cargo to central processing facility",
      details: "Optimized flight paths ensure efficient delivery and preparation for next mission",
      software: ["Autonomous Navigation", "Docking Protocols", "Cargo Management", "Fleet Coordination"],
      hardware: ["Propulsion Systems", "Docking Mechanisms", "Cargo Bay", "Navigation Sensors"]
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-16"
          >
            <div className="glass-card p-16 rounded-3xl">
              <h2 className="text-3xl font-bold text-center text-primary mb-12">
                Autonomous Solution Loop
              </h2>
              
              {/* Central Circle */}
              <div className="relative w-[600px] h-[600px] mx-auto">
                {/* Orbit Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow" />
                <div className="absolute inset-4 rounded-full border border-accent/20 animate-spin" 
                     style={{ animationDuration: '20s' }} />
                
                {/* Center Logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-12 h-12 text-primary animate-pulse-glow" />
                </div>

                {/* Solution Stages */}
                {solutionStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={stage.position}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                  >
                    <div className={`relative w-24 h-24 rounded-full border-2 transition-all duration-300 ${
                      selectedStage === stage.id 
                        ? 'border-primary bg-primary/20 shadow-glow' 
                        : 'border-primary/50 bg-card/50 hover:border-primary hover:bg-primary/10'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <stage.icon className={`w-8 h-8 ${
                          selectedStage === stage.id ? 'text-primary' : 'text-primary/70'
                        }`} />
                      </div>
                      
                      {/* Connecting Lines */}
                      {index < solutionStages.length - 1 && (
                        <svg className="absolute top-full left-1/2 transform -translate-x-1/2" width="2" height="50">
                          <line x1="1" y1="0" x2="1" y2="50" className="path-line" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center">
                      <div className="text-sm font-bold text-primary">{stage.title}</div>
                      <div className="text-xs text-muted-foreground max-w-32">
                        {stage.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stage Details */}
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
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <stage.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-primary">{stage.title}</h3>
                          <p className="text-muted-foreground">{stage.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-card p-6 rounded-xl">
                          <h4 className="text-xl font-bold text-accent mb-4">Overview</h4>
                          <p className="text-muted-foreground mb-4">{stage.overview}</p>
                          <p className="text-sm text-muted-foreground">{stage.details}</p>
                        </div>
                        
                        <div className="glass-card p-6 rounded-xl">
                          <h4 className="text-xl font-bold text-primary mb-4">Software Stack</h4>
                          <div className="space-y-2">
                            {stage.software.map((tech, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-sm">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="glass-card p-6 rounded-xl">
                          <h4 className="text-xl font-bold text-accent mb-4">Hardware Stack</h4>
                          <div className="space-y-2">
                            {stage.hardware.map((tech, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full" />
                                <span className="text-sm">{tech}</span>
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