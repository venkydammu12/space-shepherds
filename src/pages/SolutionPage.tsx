import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bot, Recycle, Zap, RotateCcw, ArrowLeft, ArrowRight, 
  Eye, Hand, Sun, Repeat, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import swarmRobotsSolution from '@/assets/swarm-robots-solution.jpg';

interface SolutionStep {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  details: string;
  color: string;
}

const SolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<string>('detect');
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const steps: SolutionStep[] = [
    {
      id: 'detect',
      title: 'DETECT',
      icon: Eye,
      description: 'AI-based computer vision scans space in real time',
      details: 'Advanced neural networks analyze sensor data from LiDAR, radar, and optical systems. Machine learning identifies and classifies debris by size, material, and trajectory with 99.7% accuracy.',
      color: 'primary'
    },
    {
      id: 'collect',
      title: 'COLLECT',
      icon: Hand,
      description: 'Gecko-adhesion nano-tech grips debris without glue',
      details: 'Inspired by gecko feet, our nano-adhesive pads grip debris securely in zero gravity without chemical adhesives. Works on all materials — metal, plastic, and composites.',
      color: 'accent'
    },
    {
      id: 'reuse',
      title: 'REUSE',
      icon: Recycle,
      description: 'Categorizes material using vision AI for recycling',
      details: 'AI vision classifies collected debris: metal, plastic, or unknown materials. Valuable components are separated for in-space manufacturing. Nothing is wasted.',
      color: 'primary'
    },
    {
      id: 'recharge',
      title: 'RECHARGE',
      icon: Sun,
      description: 'Solar panels recharge automatically',
      details: 'High-efficiency gallium arsenide solar cells provide continuous power. Advanced battery systems store energy for operations in Earth\'s shadow. Zero external fuel needed.',
      color: 'accent'
    },
    {
      id: 'repeat',
      title: 'REPEAT',
      icon: Repeat,
      description: 'Fully autonomous loop — 24/7 operation with no human risk',
      details: 'Self-healing AI systems learn and adapt with each mission. Continuous improvement through machine learning. Swarm coordination optimizes efficiency across thousands of robots.',
      color: 'primary'
    },
  ];

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  useEffect(() => {
    if (!isAutoRotating) return;
    const stepInterval = setInterval(() => {
      const currentIndex = steps.findIndex(s => s.id === activeStep);
      const nextIndex = (currentIndex + 1) % steps.length;
      setActiveStep(steps[nextIndex].id);
    }, 4000);
    return () => clearInterval(stepInterval);
  }, [isAutoRotating, activeStep]);

  const getStepPosition = (index: number, total: number) => {
    const angle = (index * (360 / total)) - 90;
    const radius = 160;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    return { x, y, angle };
  };

  const activeStepData = steps.find(s => s.id === activeStep);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        {/* Orbiting particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              left: `${50 + Math.cos(i * 0.5) * 30}%`,
              top: `${50 + Math.sin(i * 0.5) * 30}%`,
            }}
            animate={{
              x: [0, Math.cos(i) * 50, 0],
              y: [0, Math.sin(i) * 50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={swarmRobotsSolution} 
            alt="AI Swarm Robots in space" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-foreground">OUR </span>
              <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">SOLUTION</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-primary font-orbitron mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              AI SWARM MICRO-ROBOTS
            </motion.p>

            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Autonomous space debris cleanup powered by advanced AI, 
              gecko-adhesion technology, and solar energy.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/problem')}
                className="border-border/50 hover:border-primary/50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                View Problem
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/impact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              >
                See Impact
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </section>

      {/* Circular Loop Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 font-orbitron"
          >
            <span className="text-foreground">The </span>
            <span className="text-primary">Cleanup Cycle</span>
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Rotating Loop Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-[400px] h-[400px] flex-shrink-0"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
            >
              {/* Central hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 0.05, ease: "linear" }}
                >
                  <Bot className="w-12 h-12 text-primary-foreground" />
                </motion.div>
              </div>

              {/* Connection circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="200"
                  cy="200"
                  r="160"
                  fill="none"
                  stroke="url(#loopGradient)"
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  animate={{ rotate: rotation }}
                  style={{ transformOrigin: 'center' }}
                />
              </svg>

              {/* Step nodes */}
              {steps.map((step, index) => {
                const position = getStepPosition(index, steps.length);
                const isActive = activeStep === step.id;
                const Icon = step.icon;
                
                return (
                  <motion.div
                    key={step.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStep(step.id);
                      setIsAutoRotating(false);
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary shadow-[0_0_30px_hsl(var(--primary)/0.6)] scale-110' 
                          : 'bg-card border-2 border-primary/30 hover:border-primary/60'
                      }`}
                      animate={isActive ? { 
                        boxShadow: ['0 0 20px hsl(var(--primary)/0.4)', '0 0 40px hsl(var(--primary)/0.6)', '0 0 20px hsl(var(--primary)/0.4)']
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Icon className={`w-7 h-7 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    </motion.div>
                    <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                  </motion.div>
                );
              })}

              {/* Rotating arrows */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: 0.05, ease: "linear" }}
              >
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${Math.cos((angle - 60) * Math.PI / 180) * 120}px)`,
                      top: `calc(50% + ${Math.sin((angle - 60) * Math.PI / 180) * 120}px)`,
                      transform: `rotate(${angle + 30}deg)`,
                    }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary/40" />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Step Details */}
            <div className="flex-1 max-w-xl">
              <AnimatePresence mode="wait">
                {activeStepData && (
                  <motion.div
                    key={activeStepData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-3xl border border-primary/20"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-${activeStepData.color}/20 flex items-center justify-center`}>
                        <activeStepData.icon className={`w-8 h-8 text-${activeStepData.color}`} />
                      </div>
                      <div>
                        <h3 className={`text-3xl font-bold font-orbitron text-${activeStepData.color}`}>
                          {activeStepData.title}
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-2" />
                      </div>
                    </div>
                    
                    <p className="text-xl text-foreground mb-4">
                      {activeStepData.description}
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {activeStepData.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      setIsAutoRotating(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeStep === step.id 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Steps Grid */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4 font-orbitron"
          >
            <span className="text-foreground">How It </span>
            <span className="text-primary">Works</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Each step in our cleanup cycle uses cutting-edge technology to ensure 
            safe, efficient, and sustainable space debris removal.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  setActiveStep(step.id);
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-${step.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-7 h-7 text-${step.color}`} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3 font-orbitron group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {step.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Technologies */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-accent/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-orbitron">
              <span className="text-foreground">Key </span>
              <span className="text-accent">Technologies</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-card/50 border border-primary/20"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">AI Vision</h3>
                <p className="text-muted-foreground text-sm">
                  Deep learning neural networks for real-time debris detection and classification
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-card/50 border border-accent/20"
              >
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Hand className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Gecko Adhesion</h3>
                <p className="text-muted-foreground text-sm">
                  Bio-inspired nano-adhesive technology for secure grip in zero gravity
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-card/50 border border-primary/20"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Swarm Intelligence</h3>
                <p className="text-muted-foreground text-sm">
                  Coordinated autonomous operation of thousands of micro-robots
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 pb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl border border-primary/30 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
              <span className="text-foreground">Ready to See </span>
              <span className="text-primary">the Impact?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how our AI Swarm Robotics technology contributes to 
              global sustainability and the UN Sustainable Development Goals.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/impact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                View Global Impact
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 AI Swarm Robotics — Securing the Future of Space Exploration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SolutionPage;
