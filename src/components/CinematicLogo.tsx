import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import robotImage from '@/assets/ChatGPT Image Oct 1, 2025, 12_40_34 PM.png';

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
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1]
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
        animate={{
          boxShadow: [
            '0 0 60px hsl(180 100% 60% / 0.4)',
            '0 0 120px hsl(180 100% 60% / 0.8)',
            '0 0 60px hsl(180 100% 60% / 0.4)',
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Rotating Light Rings */}
        <div className="absolute inset-[-20px] rounded-full border border-primary/30 animate-spin" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute inset-[-40px] rounded-full border border-accent/20 animate-spin" 
             style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        
        {/* Logo Image */}
        <div className="relative z-10 flex items-center justify-center">
          <motion.div
            className="w-64 h-64 rounded-3xl bg-primary/20 flex items-center justify-center overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img 
              src={robotImage} 
              alt="AI Swarm Robot" 
              className="w-48 h-48 object-contain"
            />
          </motion.div>
        </div>
        
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