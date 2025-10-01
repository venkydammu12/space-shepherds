import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Target, Globe, X, Menu, Users, Cog, Rocket, Chrome as Home, Eye, Monitor, Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CinematicLogo from '@/components/CinematicLogo';
import SpaceBackground from '@/components/SpaceBackground';
import logoImage from '@/assets/logo.png';

const Landing = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [logoComplete, setLogoComplete] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);
  const [showLogoDetail, setShowLogoDetail] = useState(false);
  const navigate = useNavigate();

  const handleLogoComplete = () => {
    setLogoComplete(true);
    setTimeout(() => setShowIntro(false), 500);
  };

  const handleLetsGetIn = () => {
    setShowMainNav(!showMainNav);
  };

  const handleLogoClick = () => {
    setShowLogoDetail(true);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to specific pages if section doesn't exist on current page
        switch (sectionId) {
          case 'problem':
            navigate('/problem');
            break;
          case 'solution':
            navigate('/solution');
            break;
          case 'virtual-robot':
            navigate('/virtual-prototype');
            break;
          case 'dashboard':
            navigate('/mission-control');
            break;
          case 'impact':
            navigate('/impact');
            break;
          default:
            break;
        }
      }
    }
    setShowMainNav(false);
  };

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'problem', label: 'Problem', icon: Target },
    { id: 'solution', label: 'Solution Loop', icon: Zap },
    { id: 'virtual-robot', label: 'Virtual Robot', icon: Users },
    { id: 'robot-eye', label: 'Robot Eye', icon: Eye },
    { id: 'dashboard', label: 'Dashboard', icon: Monitor },
    { id: 'robo-scan', label: 'Robo Scan & Control', icon: Radar },
    { id: 'impact', label: 'Impact', icon: Globe }
  ];
  const navigationCards = [
    {
      title: "Problem",
      description: "Space debris crisis threatening our orbital future",
      icon: Target,
      path: "/problem",
      color: "destructive"
    },
    {
      title: "Solution",  
      description: "AI Swarm Robotics for autonomous cleanup",
      icon: Zap,
      path: "/solution",
      color: "primary"
    },
    {
      title: "Loop",
      description: "Interactive solution process visualization",
      icon: Cog,
      path: "/solution",
      color: "accent"
    },
    {
      title: "Impact",
      description: "SDGs alignment and sustainability goals",
      icon: Globe,
      path: "/impact",
      color: "primary"
    },
    {
      title: "Team",
      description: "Meet our expert development team",
      icon: Users,
      path: "/team",
      color: "accent"
    },
    {
      title: "Prototype",
      description: "Interactive AI robot and mission control",
      icon: Target,
      path: "/virtual-prototype", 
      color: "accent"
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

      {/* Top Navigation Bar */}
      <AnimatePresence>
        {logoComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center"
          >
            {/* Logo in Corner */}
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

            {/* Let's Get In Button */}
            <Button
              onClick={handleLetsGetIn}
              className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 rounded-xl text-lg shadow-glow"
            >
              <Rocket className="w-5 h-5 mr-3" />
              🚀 Let's Get In
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Professional Navigation Bar */}
      <AnimatePresence>
        {showMainNav && logoComplete && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/30"
            style={{ backdropFilter: 'blur(24px)', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)' }}
          >
            <div className="container mx-auto px-6">
              <nav className="flex items-center justify-between py-2 gap-4">
                {/* Navigation Items */}
                <div className="hidden lg:flex items-center gap-2 flex-1 justify-center flex-wrap">
                  {mainNavItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className="group relative flex items-center gap-1.5 text-white hover:text-primary transition-all duration-300 py-1.5 px-3 rounded-lg hover:bg-primary/20 font-semibold whitespace-nowrap text-sm"
                      style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      
                      {/* Hover underline animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNavigation(!showNavigation)}
                    className="text-white hover:text-primary"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMainNav(false)}
                  className="text-white/70 hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navigation Menu */}
      <AnimatePresence>
        {showNavigation && logoComplete && showMainNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-8 right-8 z-40 md:hidden"
          >
            <div className="hologram-box rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {mainNavItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl hover-scale cursor-pointer text-center"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold">{item.label}</h3>
                  </motion.div>
                ))}
              </div>
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
                      setShowNavigation(true);
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
        {!showIntro && !showMainNav && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-500`}
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

      {/* Overlay when navigation is open */}
      <AnimatePresence>
        {showMainNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30"
            onClick={() => setShowMainNav(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Landing;