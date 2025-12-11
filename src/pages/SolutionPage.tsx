import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, Hand, Recycle, Sun, Repeat, ArrowRight, ArrowLeft,
  Check, Zap, Shield, Thermometer, RefreshCw, Activity,
  ChevronDown, Sparkles, CircleDot, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import geckoMicrostructure from '@/assets/gecko-microstructure.jpg';
import robotGeckoPads from '@/assets/robot-gecko-pads-clean.jpg';

const SolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeLoopStep, setActiveLoopStep] = useState(0);
  const [loopRotation, setLoopRotation] = useState(0);

  const loopSteps = [
    { icon: Eye, title: 'DETECT', description: 'AI vision scans orbit and identifies debris objects', color: 'primary' },
    { icon: Hand, title: 'COLLECT', description: 'Nano-robots attach using gecko-based adhesion', color: 'accent' },
    { icon: Recycle, title: 'REUSE', description: 'Robots detach safely and reset for next target', color: 'primary' },
    { icon: Sun, title: 'RECHARGE', description: 'Return to base station for solar charging', color: 'accent' },
    { icon: Repeat, title: 'REPEAT', description: 'Infinite autonomous loop, 24/7 operation', color: 'primary' },
  ];

  // Auto-rotate loop
  useEffect(() => {
    const interval = setInterval(() => {
      setLoopRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance loop steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveLoopStep(prev => (prev + 1) % loopSteps.length);
    }, 3000);
    return () => clearInterval(stepInterval);
  }, []);

  const howItWorksSteps = [
    { icon: Layers, title: 'Micro-Scale Hairs', desc: 'Adhesive contains millions of microscopic hair-like structures' },
    { icon: CircleDot, title: 'Surface Contact', desc: 'When touching a surface, hairs create Van der Waals forces' },
    { icon: Zap, title: 'No Glue Needed', desc: 'Sticks securely without any chemical adhesives' },
    { icon: Shield, title: 'Space-Proof', desc: 'Works perfectly in vacuum, extreme heat, cold, and radiation' },
  ];

  const spaceAdvantages = [
    { icon: Check, text: 'No chemical glue required' },
    { icon: Check, text: 'No drying or curing problems' },
    { icon: RefreshCw, text: 'Attach and detach thousands of times' },
    { icon: Shield, text: 'Functions in total vacuum' },
    { icon: Layers, text: 'Grips any debris material type' },
  ];

  const performanceStats = [
    { value: '19-39N', label: 'Force per small pad', detail: 'Tested on ISS' },
    { value: '100+', label: 'Cycle durability', detail: 'No strength loss' },
    { value: '-150°C to +150°C', label: 'Temperature range', detail: 'Space conditions' },
    { value: '10⁻⁶ Pa', label: 'Vacuum tolerance', detail: 'Deep space ready' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated Star Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-space text-sm">Revolutionary Space Technology</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-8xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-foreground">THE </span>
              <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]">SOLUTION</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-primary font-orbitron mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              GECKO-INSPIRED AI SWARM ROBOTICS
            </motion.p>

            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Nature's most advanced grip technology, engineered for the harshest environment in existence — space.
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

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </section>

      {/* Section 1: Gecko-Inspired Adhesion */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-4">
              <span className="text-foreground">Gecko-Inspired </span>
              <span className="text-primary">Adhesion</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The secret behind our revolutionary space grip technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_hsl(var(--primary)/0.3)]">
                <img 
                  src={geckoMicrostructure} 
                  alt="Gecko foot microstructure" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card p-4 rounded-xl">
                    <p className="text-primary font-orbitron text-sm">Nano-Scale Setae Structure</p>
                    <p className="text-muted-foreground text-xs">Billions of microscopic hairs create molecular bonds</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { title: 'The Problem with Regular Glue', text: 'Traditional adhesives fail in space. They dry out, freeze, or evaporate in the vacuum. We needed something different.' },
                { title: 'Nature\'s Perfect Grip', text: 'Geckos can climb any surface because their feet have millions of tiny hair-like structures called setae. These create molecular forces — no sticky chemicals needed.' },
                { title: 'From Nature to Space', text: 'Scientists replicated this structure using advanced nanomaterials. The result: dry adhesive pads that grip in zero gravity, extreme temperatures, and total vacuum.' },
                { title: 'Perfect for Robots', text: 'Our swarm robots use gecko-inspired pads to grab space debris of any material — metal, plastic, insulation, or composites — without damage.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-primary font-orbitron mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="relative z-10 py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-4">
              <span className="text-foreground">How It </span>
              <span className="text-primary">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple science, extraordinary results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground font-orbitron shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                  {index + 1}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground font-orbitron mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Perfect for Space */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6">
                <span className="text-foreground">Why It's </span>
                <span className="text-primary">Perfect</span>
                <br />
                <span className="text-foreground">for Space</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Designed specifically for the unforgiving conditions of orbital debris cleanup.
              </p>

              <div className="space-y-4">
                {spaceAdvantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <advantage.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{advantage.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-accent/30 shadow-[0_0_60px_hsl(var(--accent)/0.3)]">
                <img 
                  src={robotGeckoPads} 
                  alt="Space robot with gecko pads" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              
              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl border border-primary/30"
              >
                <p className="text-2xl font-bold text-primary font-orbitron">100%</p>
                <p className="text-xs text-muted-foreground">Debris Compatible</p>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-card p-4 rounded-xl border border-accent/30"
              >
                <p className="text-2xl font-bold text-accent font-orbitron">0g</p>
                <p className="text-xs text-muted-foreground">Zero Gravity Ready</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Performance in Space */}
      <section className="relative z-10 py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-4">
              <span className="text-foreground">Proven </span>
              <span className="text-primary">Performance</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real data from International Space Station experiments
            </p>
          </motion.div>

          {/* Performance Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {performanceStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-primary/20 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.p 
                  className="text-3xl md:text-4xl font-bold text-primary font-orbitron mb-2"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-foreground font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Holographic Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-primary/30 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-center font-orbitron mb-8">
              <span className="text-foreground">Adhesion Strength </span>
              <span className="text-primary">Over Time</span>
            </h3>

            <div className="relative h-64">
              {/* Chart bars */}
              <div className="absolute inset-0 flex items-end justify-around gap-4 px-8">
                {[85, 92, 88, 95, 90, 93, 91].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="relative w-full max-w-16 rounded-t-lg bg-gradient-to-t from-primary/50 to-primary group cursor-pointer"
                    style={{ boxShadow: '0 0 20px hsl(var(--primary)/0.3)' }}
                  >
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-primary font-bold text-sm">{value}%</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                <span>100%</span>
                <span>50%</span>
                <span>0%</span>
              </div>
            </div>

            <div className="flex justify-around mt-4 text-xs text-muted-foreground">
              {['Day 1', 'Week 1', 'Week 2', 'Month 1', 'Month 2', 'Month 3', 'Month 6'].map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-6">
              Gecko adhesive maintains over 85% effectiveness even after 6 months of continuous space exposure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Swarm Robotics Loop */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-4">
              <span className="text-foreground">The Cleanup </span>
              <span className="text-primary">Cycle</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fully autonomous, infinitely repeatable, zero human risk
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            {/* Rotating Loop Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px] flex-shrink-0"
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-2xl" />
              
              {/* Animated ring */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <motion.circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="url(#ringGradient)"
                  strokeWidth="4"
                  strokeDasharray="15,10"
                  style={{ rotate: loopRotation, transformOrigin: 'center' }}
                />
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
              </svg>

              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent flex flex-col items-center justify-center shadow-[0_0_50px_hsl(var(--primary)/0.5)]"
                  animate={{ rotate: loopRotation * 0.5 }}
                >
                  <span className="text-primary-foreground font-orbitron font-bold text-sm">SWARM</span>
                  <span className="text-primary-foreground/70 text-xs">LOOP</span>
                </motion.div>
              </div>

              {/* Step nodes */}
              {loopSteps.map((step, index) => {
                const angle = (index * (360 / loopSteps.length)) - 90;
                const radius = 150;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                const isActive = activeLoopStep === index;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => setActiveLoopStep(index)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? 'bg-primary shadow-[0_0_30px_hsl(var(--primary)/0.8)] scale-110' 
                          : 'bg-card border-2 border-primary/40'
                      }`}
                      animate={isActive ? { 
                        boxShadow: ['0 0 20px hsl(var(--primary)/0.4)', '0 0 40px hsl(var(--primary)/0.7)', '0 0 20px hsl(var(--primary)/0.4)']
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Icon className={`w-7 h-7 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Step Details */}
            <div className="flex-1 max-w-xl">
              <div className="space-y-4">
                {loopSteps.map((step, index) => {
                  const isActive = activeLoopStep === index;
                  const Icon = step.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setActiveLoopStep(index)}
                      className={`glass-card p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? 'border-primary/50 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]' 
                          : 'border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-primary' : 'bg-primary/20'
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                        </div>
                        <div>
                          <h3 className={`font-bold font-orbitron transition-colors ${
                            isActive ? 'text-primary' : 'text-foreground'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-24 pb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl border border-primary/30 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
                <span className="text-foreground">Ready to See </span>
                <span className="text-primary">the Impact?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how our gecko-powered swarm robots contribute to global sustainability and the UN Sustainable Development Goals.
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
            </div>
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
