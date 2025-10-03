import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Mic, Volume2 } from 'lucide-react';
import robotImage from '@/assets/robo2.0.jpg';

const AIAssistantWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load ElevenLabs script with pinned version and error handling
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed@1.0.0';
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
    <div className="relative w-full h-full bg-gradient-to-br from-black via-blue-950/20 to-black rounded-3xl border border-cyan-500/30 overflow-hidden">
      {/* Robot Avatar */}
      <div className="absolute top-8 left-8 right-8 flex justify-center">
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
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border-2 border-cyan-500/50 overflow-hidden">
            <img 
              src={robotImage} 
              alt="AI Assistant Robot" 
              className="w-28 h-28 object-contain"
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
      <div className="absolute top-48 left-8 right-8 text-center">
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">ARIA - AI Assistant</h3>
        <p className="text-cyan-500/80 text-sm">Autonomous Robotics Intelligence Assistant</p>
        
        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-mono">ONLINE</span>
        </div>
      </div>

      {/* ElevenLabs Widget Container */}
      <div className="absolute bottom-8 left-8 right-8" ref={widgetRef}>
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-3 mb-2">
              <Mic className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-bold">Voice Interface</span>
              <Volume2 className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-cyan-500/70 text-xs">Click below to start conversation with AI Assistant</p>
          </div>
          
          {/* ElevenLabs Widget */}
          <div className="flex justify-center">
            <elevenlabs-convai agent-id="agent_3901k6ddjrvqenmbwbevw4xrdv3t"></elevenlabs-convai>
          </div>
          
          {/* Fallback UI */}
          <div className="mt-4 text-center">
            <div className="text-xs text-cyan-500/60">
              AI Assistant ready for voice commands and conversation
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
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