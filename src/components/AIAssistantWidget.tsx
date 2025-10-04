import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Mic, Volume2 } from 'lucide-react';
import robotImage from '@/assets/logo-main.png';

const AIAssistantWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load ElevenLabs script with pinned version and error handling
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
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-black via-blue-950/20 to-black rounded-3xl border border-cyan-500/30 overflow-visible flex flex-col items-center justify-center p-8">
      {/* Robot Avatar - Smaller and at top */}
      <div className="mb-6 z-0">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 20px rgba(0, 255, 255, 0.3)',
              '0 0 40px rgba(0, 255, 255, 0.6)',
              '0 0 20px rgba(0, 255, 255, 0.3)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border-2 border-cyan-500/50 overflow-hidden">
            <img
              src={robotImage}
              alt="AI Assistant Robot"
              className="w-20 h-20 object-contain"
            />
          </div>

          {/* Scanning Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      {/* AI Status */}
      <div className="text-center mb-6 z-0">
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">ARIA - AI Assistant</h3>
        <p className="text-cyan-500/80 text-sm mb-3">Autonomous Robotics Intelligence Assistant</p>

        <div className="flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-mono">ONLINE</span>
        </div>
      </div>

      {/* LARGE ElevenLabs Widget Container */}
      <div className="w-full max-w-2xl z-50" ref={widgetRef}>
        <div
          className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md rounded-3xl border-2 border-cyan-500/50 p-8 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-3">
              <Mic className="w-8 h-8 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold text-2xl">VOICE INTERFACE</span>
              <Volume2 className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-cyan-400/90 text-lg font-medium">Click the large button below to talk with AI Assistant</p>
          </div>

          {/* EXPANDED ElevenLabs Widget */}
          <div
            className="flex justify-center items-center min-h-[200px] relative z-50"
            style={{ transform: 'scale(2)', transformOrigin: 'center' }}
          >
            <elevenlabs-convai agent-id="agent_3901k6ddjrvqenmbwbevw4xrdv3t"></elevenlabs-convai>
          </div>

          {/* Instructions */}
          <div className="mt-16 text-center space-y-2">
            <div className="text-sm text-cyan-400 font-bold">
              Ready to Connect
            </div>
            <div className="text-xs text-cyan-500/80">
              The voice button is now 2x larger for easy interaction
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects - Lower z-index */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,255,255,0.02)_20px,rgba(0,255,255,0.02)_22px)]"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

export default AIAssistantWidget;