import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigatorMapProps {
  robotPosition: { x: number; y: number };
  debrisPosition: { x: number; y: number } | null;
  showPath: boolean;
}

const NavigatorMap: React.FC<NavigatorMapProps> = ({ robotPosition, debrisPosition, showPath }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-black via-blue-950/20 to-black rounded-3xl border border-cyan-500/30 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glowing Center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,122,255,0.15),transparent_70%)]" />

      {/* Path Line */}
      {showPath && debrisPosition && (
        <motion.svg
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.line
            x1={`${robotPosition.x}%`}
            y1={`${robotPosition.y}%`}
            x2={`${debrisPosition.x}%`}
            y2={`${debrisPosition.y}%`}
            stroke="cyan"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </motion.svg>
      )}

      {/* Robot Position */}
      <motion.div
        className="absolute"
        style={{
          left: `${robotPosition.x}%`,
          top: `${robotPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50" />
          <div className="relative w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-cyan-300 shadow-[0_0_30px_rgba(0,255,255,0.6)]">
            <Navigation className="w-6 h-6 text-black" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-cyan-300 font-bold">
            ROBOT
          </div>
        </div>
      </motion.div>

      {/* Debris Position */}
      {debrisPosition && (
        <motion.div
          className="absolute"
          style={{
            left: `${debrisPosition.x}%`,
            top: `${debrisPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: 1
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative w-10 h-10 bg-red-500 rounded-full flex items-center justify-center border-2 border-red-300 shadow-[0_0_30px_rgba(255,0,0,0.6)]">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-red-300 font-bold">
              DEBRIS
            </div>
          </div>
        </motion.div>
      )}

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-500/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-500/50" />

      {/* Coordinates Display */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30">
        <div className="text-xs text-cyan-300 font-mono">
          COORDINATES: {robotPosition.x.toFixed(1)}, {robotPosition.y.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default NavigatorMap;
