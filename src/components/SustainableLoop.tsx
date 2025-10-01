import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Bot, Package, Recycle, Sun, RotateCcw, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoopStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  angle: number;
  description: string;
  details: string[];
  color: string;
  glowColor: string;
}

const SustainableLoop = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [rotation, setRotation] = useState(0);
  const loopRef = useRef<HTMLDivElement>(null);

  const loopSteps: LoopStep[] = [
    {
      id: 1,
      title: "Detect",
      subtitle: "AI-Powered Debris Detection",
      icon: Search,
      angle: 0,
      description: "Advanced sensor arrays scan orbital space using AI algorithms to identify and classify debris objects in real-time.",
      details: [
        "LiDAR and radar sensor fusion",
        "Machine learning object classification",
        "Real-time threat assessment",
        "360° orbital scanning capability"
      ],
      color: "#00E6FF",
      glowColor: "0, 230, 255"
    },
    {
      id: 2,
      title: "Collect",
      subtitle: "Autonomous Debris Capture",
      icon: Bot,
      angle: 60,
      description: "Specialized robotic systems safely capture and secure debris without creating additional fragments.",
      details: [
        "Precision robotic arms",
        "Magnetic and vacuum capture systems",
        "Collision avoidance algorithms",
        "Safe debris handling protocols"
      ],
      color: "#00E6FF",
      glowColor: "0, 230, 255"
    },
    {
      id: 3,
      title: "Store",
      subtitle: "Secure Debris Storage",
      icon: Package,
      angle: 120,
      description: "Collected debris is securely stored in specialized containment systems for transport to processing facilities.",
      details: [
        "Modular storage containers",
        "Debris categorization system",
        "Secure containment protocols",
        "Inventory tracking system"
      ],
      color: "#00E6FF",
      glowColor: "0, 230, 255"
    },
    {
      id: 4,
      title: "Reuse",
      subtitle: "Material Recovery & Recycling",
      icon: Recycle,
      angle: 180,
      description: "Debris materials are processed and recycled into useful components for future space missions.",
      details: [
        "Material separation technology",
        "Metal recovery systems",
        "Component refurbishment",
        "Resource optimization"
      ],
      color: "#00E6FF",
      glowColor: "0, 230, 255"
    },
    {
      id: 5,
      title: "Recharge",
      subtitle: "Solar-Powered Energy System",
      icon: Sun,
      angle: 240,
      description: "Robots recharge using advanced solar panel arrays, ensuring continuous autonomous operation.",
      details: [
        "High-efficiency solar panels",
        "Energy storage systems",
        "Power management algorithms",
        "Autonomous charging protocols"
      ],
      color: "#00E6FF",
      glowColor: "0, 230, 255"
    },
    {
      id: 6,
      title: "Repeat",
      subtitle: "Continuous Operation Cycle",
      icon: RotateCcw,
      angle: 300,
      description: "The system continuously repeats the cycle, creating a self-sustaining orbital cleanup operation.",
      details: [
        "24/7 autonomous operation",
        "Self-optimizing algorithms",
        "Predictive maintenance",
        "Scalable swarm coordination"
      ],
      color: "#00E6FF",
      glowColor: "0, 230, 255"
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating && !selectedStep) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, selectedStep]);

  // Auto-step progression
  useEffect(() => {
    if (isAutoRotating && !selectedStep) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % loopSteps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, selectedStep, loopSteps.length]);

  const handleStepClick = (stepId: number) => {
    setSelectedStep(stepId);
    setIsAutoRotating(false);
  };

  const closePanel = () => {
    setSelectedStep(null);
    setIsAutoRotating(true);
  };

  const navigateStep = (direction: 'prev' | 'next') => {
    const currentIndex = loopSteps.findIndex(step => step.id === selectedStep);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % loopSteps.length
      : (currentIndex - 1 + loopSteps.length) % loopSteps.length;
    
    setSelectedStep(loopSteps[newIndex].id);
  };

  const selectedStepData = selectedStep ? loopSteps.find(step => step.id === selectedStep) : null;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Space Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        
        {/* Animated Stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-accent/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 120, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 15 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold hero-title mb-6">
            SUSTAINABLE <span className="text-primary">LOOP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous autonomous orbital debris cleanup cycle powered by AI and renewable energy
          </p>
        </motion.div>

        {/* Main Loop Container */}
        <div className="relative flex items-center justify-center mb-20">
          <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, 
                  rgba(0, 230, 255, 0.3) 0deg,
                  rgba(255, 107, 53, 0.3) 60deg,
                  rgba(0, 230, 255, 0.3) 120deg,
                  rgba(255, 107, 53, 0.3) 180deg,
                  rgba(0, 230, 255, 0.3) 240deg,
                  rgba(255, 107, 53, 0.3) 300deg,
                  rgba(0, 230, 255, 0.3) 360deg)`,
                filter: 'blur(20px)',
              }}
              animate={{ rotate: rotation }}
              transition={{ type: "tween", ease: "linear" }}
            />

            {/* Main Loop Ring */}
            <motion.div
              ref={loopRef}
              className="absolute inset-8 rounded-full border-4 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm"
              animate={{ rotate: rotation * 0.5 }}
              transition={{ type: "tween", ease: "linear" }}
              style={{
                boxShadow: `
                  0 0 50px rgba(0, 230, 255, 0.3),
                  inset 0 0 50px rgba(0, 230, 255, 0.1)
                `
              }}
            >
              {/* Inner Energy Ring */}
              <div className="absolute inset-4 rounded-full border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5" />
              
              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{ rotate: -rotation }}
                  transition={{ type: "tween", ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Loop Steps */}
            {loopSteps.map((step, index) => {
              const radius = 220;
              const x = Math.cos((step.angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((step.angle - 90) * Math.PI / 180) * radius;
              const isActive = currentStep === index;
              
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
                  {/* Step Node */}
                  <motion.div
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:border-white/40 transition-all duration-300`}
                    style={{
                      background: `linear-gradient(135deg, ${step.color}CC, ${step.color}88)`,
                      boxShadow: isActive 
                        ? `0 0 30px rgba(${step.glowColor}, 0.8), 0 0 60px rgba(${step.glowColor}, 0.4)`
                        : `0 0 20px rgba(${step.glowColor}, 0.4)`
                    }}
                    animate={isActive ? {
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        `0 0 20px rgba(${step.glowColor}, 0.4)`,
                        `0 0 40px rgba(${step.glowColor}, 0.8)`,
                        `0 0 20px rgba(${step.glowColor}, 0.4)`
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {step.id}
                    </div>

                    {/* Pulse Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                  
                  {/* Step Label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 text-center">
                    <div className="text-sm md:text-base font-bold group-hover:text-primary transition-colors" style={{ color: step.color }}>
                      {step.title}
                    </div>
                  </div>
                  
                  {/* Connection Line */}
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

            {/* Energy Flow Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.circle
                cx="50%"
                cy="50%"
                r="220"
                fill="none"
                stroke="url(#energyGradient)"
                strokeWidth="3"
                strokeDasharray="20 10"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E6FF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00E6FF" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Expanded Panel */}
        <AnimatePresence>
          {selectedStep && selectedStepData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
              onClick={closePanel}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto hologram-box rounded-3xl p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 hover:bg-destructive/20"
                  onClick={closePanel}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hover:bg-primary/20"
                  onClick={() => navigateStep('prev')}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hover:bg-primary/20"
                  onClick={() => navigateStep('next')}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* Panel Header */}
                <div className="text-center mb-8">
                  <motion.div
                    className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}
                    style={{
                      background: `linear-gradient(135deg, ${selectedStepData.color}CC, ${selectedStepData.color}88)`,
                      boxShadow: `0 0 40px rgba(${selectedStepData.glowColor}, 0.6)`
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <selectedStepData.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <motion.h3
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: selectedStepData.color }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedStepData.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedStepData.subtitle}
                  </motion.p>
                </div>

                {/* Panel Content */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-primary mb-4">Overview</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedStepData.description}
                    </p>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-accent mb-4">Key Technologies</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedStepData.details.map((detail, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: selectedStepData.color }}
                          />
                          <span className="text-sm">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Step Indicator */}
                <div className="flex justify-center mt-8 space-x-2">
                  {loopSteps.map((step) => (
                    <button
                      key={step.id}
                      className={`w-3 h-3 rounded-full transition-all ${
                        step.id === selectedStep 
                          ? 'bg-primary scale-125' 
                          : 'bg-muted hover:bg-primary/50'
                      }`}
                      onClick={() => setSelectedStep(step.id)}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solution Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-12 rounded-3xl neon-border">
            <motion.h3
              className="text-4xl md:text-6xl font-bold hero-title mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              OUR SOLUTION <span className="text-primary">IMPACT</span>
            </motion.h3>
            
            <motion.p
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              This sustainable loop creates a self-perpetuating system that not only cleans orbital space 
              but also generates valuable resources for future space missions, establishing a circular 
              economy in space that benefits all of humanity.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { value: "99.7%", label: "Efficiency Rate", icon: Zap },
                { value: "24/7", label: "Continuous Operation", icon: RotateCcw },
                { value: "∞", label: "Sustainable Cycle", icon: Recycle }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainableLoop;