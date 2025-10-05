import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Sparkles } from 'lucide-react';

const AIAssistantWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      console.log('ElevenLabs widget loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#000000] flex flex-col items-center justify-center py-16 px-4 overflow-hidden">

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <motion.div
        className="text-center mb-12 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          <h1
            className="text-5xl font-bold text-cyan-400"
            style={{
              letterSpacing: '0.1em',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
            }}
          >
            VIRTUAL AI VOICE ASSISTANT
          </h1>
          <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>

        <p className="text-[#cfcfcf] text-lg max-w-3xl mx-auto leading-relaxed">
          Talk to your AI-powered ElevenLabs Assistant. Ask questions, get guidance,
          and experience the future of interactive voice intelligence.
        </p>
      </motion.div>

      {/* Main Agent Container */}
      <motion.div
        ref={widgetRef}
        className="relative w-[70%] max-w-[800px] z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="relative bg-gradient-to-br from-black/80 via-cyan-950/20 to-black/80 backdrop-blur-xl rounded-[20px] border-2 border-cyan-400/60 p-12 transition-all duration-300"
          style={{
            boxShadow: `
              0 0 60px rgba(0, 255, 183, 0.4),
              inset 0 0 40px rgba(0, 255, 255, 0.1)
            `
          }}
        >
          {/* Top Header Inside Box */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Mic className="w-10 h-10 text-cyan-400 animate-pulse" />
              <span
                className="text-cyan-400 font-bold text-3xl tracking-wider"
                style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}
              >
                VOICE INTERFACE
              </span>
              <Volume2 className="w-10 h-10 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-cyan-300/90 text-base">
              Click the button below to start your conversation
            </p>
          </div>

          {/* ElevenLabs Widget - Large and Centered */}
          <div
            className="flex justify-center items-center min-h-[250px] py-8"
            style={{
              transform: 'scale(2.5)',
              transformOrigin: 'center'
            }}
          >
            <elevenlabs-convai agent-id="agent_3901k6ddjrvqenmbwbevw4xrdv3t"></elevenlabs-convai>
          </div>

          {/* Status Indicator */}
          <div className="mt-20 text-center space-y-3">
            <div className="flex justify-center items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <span className="text-green-400 font-mono text-sm">SYSTEM ONLINE</span>
            </div>
            <p className="text-cyan-500/70 text-sm">
              AI Agent Ready | 2.5x Enlarged for Easy Interaction
            </p>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/70" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/70" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/70" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/70" />
        </div>

        {/* Outer Glow Effect */}
        <div
          className="absolute inset-0 rounded-[20px] opacity-50 blur-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 183, 0.3) 0%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* Bottom Instruction Text */}
      <motion.div
        className="text-center mt-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-cyan-400/80 text-sm">
          Professional AI Voice Technology powered by ElevenLabs
        </p>
      </motion.div>

      {/* Animated Scan Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)'
        }}
        animate={{
          y: [0, 20, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};

export default AIAssistantWidget;
