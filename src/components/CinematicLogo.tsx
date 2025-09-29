import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface CinematicLogoProps {
  onAnimationComplete?: () => void;
}

const CinematicLogo = ({ onAnimationComplete }: CinematicLogoProps) => {
  const [animationPhase, setAnimationPhase] = useState<'entry' | 'corner' | 'complete'>('entry');

  useEffect(() => {
    const entryTimer = setTimeout(() => {
      setAnimationPhase('corner');
    }, 2000);

    const cornerTimer = setTimeout(() => {
      setAnimationPhase('complete');
      onAnimationComplete?.();
    }, 4000);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(cornerTimer);
    };
  }, [onAnimationComplete]);

  const logoVariants = {
    entry: {
      scale: 0,
      rotate: -180,
      opacity: 0,
      x: '-50%',
      y: '-50%',
    },
    center: {
      scale: 1.2,
      rotate: 0,
      opacity: 1,
      x: '-50%',
      y: '-50%',
    },
    corner: {
      scale: 0.4,
      x: '-45vw',
      y: '-45vh',
    }
  };

  const glowVariants = {
    idle: {
      boxShadow: '0 0 60px hsl(180 100% 60% / 0.4)',
    },
    active: {
      boxShadow: [
        '0 0 60px hsl(180 100% 60% / 0.4)',
        '0 0 120px hsl(180 100% 60% / 0.8)',
        '0 0 60px hsl(180 100% 60% / 0.4)',
      ] as any,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  if (animationPhase === 'complete') return null;

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
      initial="entry"
      animate={animationPhase === 'entry' ? 'center' : 'corner'}
      variants={logoVariants}
    >
      <motion.div
        className="relative p-8 rounded-2xl border-2 border-primary bg-background/20 backdrop-blur-md"
        variants={glowVariants}
        animate="active"
      >
        {/* Rotating Light Rings */}
        <div className="absolute inset-[-20px] rounded-full border border-primary/30 animate-spin" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute inset-[-40px] rounded-full border border-accent/20 animate-spin" 
             style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        
        {/* Central Logo */}
        <div className="relative z-10 flex items-center justify-center">
          <Bot className="w-16 h-16 text-primary" />
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow" />
        </div>
        
        {/* Title Text */}
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h1 className="text-2xl font-bold hero-title mb-1">AI SWARM</h1>
          <p className="text-sm text-primary/80 font-medium">ROBOTICS</p>
        </motion.div>
        
        {/* Energy Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * Math.PI / 4) * 60],
              y: [0, Math.sin(i * Math.PI / 4) * 60],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CinematicLogo;