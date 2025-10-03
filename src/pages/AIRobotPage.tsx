import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Chrome as Home, Volume2, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import robotImage from '@/assets/logo-main.png';

const AIRobotPage = () => {
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const hasGreeted = useRef(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';

    script.onload = () => {
      console.log('ElevenLabs widget loaded successfully');
      setScriptLoaded(true);

      if (!hasGreeted.current) {
        setTimeout(() => {
          if ('speechSynthesis' in window) {
            const greeting = new SpeechSynthesisUtterance(
              "Hello, I am ARIA, your AI robot assistant. How can I help you today?"
            );
            greeting.rate = 0.9;
            greeting.pitch = 0.8;
            greeting.volume = 0.8;
            speechSynthesis.speak(greeting);
          }
        }, 1000);
        hasGreeted.current = true;
      }
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
    <section className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-black via-blue-950/30 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
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

      {/* Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-black/80 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>

      {/* Robot Avatar */}
      <motion.div
        className="relative mb-8 z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 30px rgba(0, 255, 255, 0.4)',
              '0 0 60px rgba(0, 255, 255, 0.8)',
              '0 0 30px rgba(0, 255, 255, 0.4)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center border-4 border-cyan-500/60 overflow-hidden">
            <img
              src={robotImage}
              alt="AI Robot Assistant"
              className="w-36 h-36 object-contain"
            />
          </div>

          {/* Orbital Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Second Ring */}
          <motion.div
            className="absolute inset-[-10px] rounded-full border border-cyan-400/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            background: 'linear-gradient(to right, #00ffff, #0088ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0, 255, 255, 0.3)'
          }}
        >
          ARIA AI ASSISTANT
        </h1>
        <p className="text-cyan-400 text-lg md:text-xl mb-2">
          Autonomous Robotics Intelligence Assistant
        </p>
        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,0,0.8)]" />
          <span className="text-green-400 font-bold tracking-wider">ONLINE & READY</span>
        </div>
      </motion.div>

      {/* ElevenLabs Widget Container */}
      <motion.div
        className="w-full max-w-2xl px-6 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div
          className="relative bg-black/70 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/50 p-8 shadow-2xl"
          style={{
            boxShadow: '0 0 50px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-3 mb-3">
              <Mic className="w-6 h-6 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold text-xl">Voice Interface Active</span>
              <Volume2 className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-cyan-500/80 text-sm">
              Click the button below to start your conversation with the AI robot assistant
            </p>
          </div>

          {/* ElevenLabs Widget */}
          <div className="flex justify-center py-4">
            <elevenlabs-convai agent-id="agent_3901k6ddjrvqenmbwbevw4xrdv3t"></elevenlabs-convai>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-cyan-500/30">
            <div className="text-center">
              <Bot className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-cyan-400 text-sm font-bold">AI Powered</div>
              <div className="text-cyan-500/60 text-xs">Advanced Intelligence</div>
            </div>
            <div className="text-center">
              <Volume2 className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-cyan-400 text-sm font-bold">Voice Control</div>
              <div className="text-cyan-500/60 text-xs">Natural Conversation</div>
            </div>
            <div className="text-center">
              <Mic className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-cyan-400 text-sm font-bold">Real-time</div>
              <div className="text-cyan-500/60 text-xs">Instant Response</div>
            </div>
          </div>

          {scriptLoaded && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="text-xs text-green-400/80">
                Widget loaded and ready for interaction
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Info Text */}
      <motion.div
        className="mt-8 text-center px-6 z-10 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-cyan-500/60 text-sm">
          ARIA can help you understand the space debris cleanup mission, robot capabilities,
          sensor systems, and answer questions about our AI-powered solution.
        </p>
      </motion.div>
    </section>
  );
};

export default AIRobotPage;