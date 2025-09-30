import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Target, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CinematicLogo from '@/components/CinematicLogo';
import SpaceBackground from '@/components/SpaceBackground';
import logoImage from '@/assets/logo.png';

const Landing = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [logoComplete, setLogoComplete] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showLogoDetail, setShowLogoDetail] = useState(false);
  const navigate = useNavigate();

  const handleLogoComplete = () => {
    setLogoComplete(true);
    setTimeout(() => setShowIntro(false), 500);
  };

  const handleGetIn = () => {
    setShowOverview(true);
  };

  const handleLogoClick = () => {
    setShowLogoDetail(true);
  };

  const navigationCards = [
    {
      title: "The Problem",
      description: "Space debris crisis threatening our orbital future",
      icon: Target,
      path: "/problem",
      color: "destructive"
    },
    {
      title: "Our Solution",  
      description: "AI Swarm Robotics for autonomous cleanup",
      icon: Zap,
      path: "/solution",
      color: "primary"
    },
    {
      title: "Virtual Prototype",
      description: "Interactive AI robot and mission control",
      icon: Globe,
      path: "/virtual-prototype", 
      color: "accent"
    },
    {
      title: "Global Impact",
      description: "SDGs alignment and sustainability goals",
      icon: Target,
      path: "/impact",
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Realistic Space Background with Earth */}
      <SpaceBackground />
      
      {/* Cinematic Logo Animation */}
      <AnimatePresence>
        {showIntro && (
          <CinematicLogo onAnimationComplete={handleLogoComplete} />
        )}
      </AnimatePresence>

      {/* Logo in Corner (after animation) */}
      <AnimatePresence>
        {logoComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-8 left-8 z-40"
          >
            <div 
              className="flex items-center gap-3 p-3 rounded-xl glass-card border border-primary/30 cursor-pointer hover:border-primary hover:shadow-glow transition-all"
              onClick={handleLogoClick}
            >
              <img 
                src={logoImage}
                alt="AI Swarm Robotics"
                className="w-12 h-12 object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Detail Modal */}
      <AnimatePresence>
        {showLogoDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setShowLogoDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-2xl w-full hologram-box rounded-3xl p-12 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setShowLogoDetail(false)}
              >
                <X className="w-4 h-4" />
              </Button>
              
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 60px hsl(180 100% 60% / 0.4)',
                    '0 0 120px hsl(180 100% 60% / 0.8)',
                    '0 0 60px hsl(180 100% 60% / 0.4)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-48 mx-auto mb-8 rounded-2xl border-2 border-primary bg-background/20 backdrop-blur-md flex items-center justify-center overflow-hidden"
              >
                <img 
                  src={logoImage}
                  alt="AI Swarm Robotics"
                  className="w-full h-full object-contain p-4"
                />
              </motion.div>
              
              <h2 className="text-4xl font-bold hero-title mb-4">AI SWARM ROBOTICS</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Advanced autonomous space debris cleanup system powered by artificial intelligence and swarm robotics technology.
              </p>
              
              <div className="text-center mb-6">
                <p className="text-primary font-medium mb-4">Do you want to explore our project in detail?</p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      setShowLogoDetail(false);
                      setShowOverview(true);
                    }}
                    className="bg-primary hover:bg-primary/90 text-black"
                  >
                    Yes, Let's Explore
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowLogoDetail(false)}
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8"
          >
            {/* Hero Section */}
            <div className="text-center max-w-6xl mx-auto mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold hero-title mb-6"
              >
                AI SWARM
                <br />
                <span className="text-primary glow-text">ROBOTICS</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              >
                Autonomous Orbital Debris Cleanup
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex justify-center"
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/mission-control')}
                  className="bg-primary hover:bg-primary/90 text-black font-bold px-12 py-6 text-xl rounded-xl shadow-glow"
                >
                  Launch Mission Control
                  <Zap className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mb-16"
            >
              {[
                { value: "34,000+", label: "Debris Objects", color: "destructive" },
                { value: "99.7%", label: "Success Rate", color: "primary" },
                { value: "24/7", label: "Autonomous", color: "accent" }
              ].map((stat, index) => (
                <div key={index} className="text-center glass-card p-6 rounded-xl">
                  <div className={`text-3xl font-bold text-${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Overview Modal */}
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setShowOverview(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full hologram-box rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold hero-title mb-4">
                  Project Overview
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore our revolutionary AI swarm robotics solution for space debris cleanup
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {navigationCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-xl hover-scale cursor-pointer"
                    onClick={() => navigate(card.path)}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${card.color}/20 flex items-center justify-center mb-4`}>
                      <card.icon className={`w-6 h-6 text-${card.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground text-sm">{card.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate('/problem')}
                  className="bg-primary hover:bg-primary/90 text-black"
                >
                  Start Exploration
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowOverview(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;