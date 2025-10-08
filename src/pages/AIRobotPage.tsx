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
    <section className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#0B1426] via-[#0B1426]/95 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0B1426] to-black" />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00F5FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(0, 245, 255, 0.8)'
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00F5FF 1px, transparent 1px), linear-gradient(90deg, #00F5FF 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Home Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-[#0B1426]/80 border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/20 transition-all duration-300"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>

      {/* Robot Avatar */}
      <motion.div
        className="relative mb-10 z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-[#00F5FF]/30 animate-pulse"></div>

          <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-[#00F5FF]/20 via-[#0B1426]/80 to-[#00F5FF]/20 flex items-center justify-center border-4 border-[#00F5FF]/60 overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.6)]">
            <img
              src={robotImage}
              alt="AI Robot Assistant"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Orbital Ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#00F5FF]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#00F5FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,245,255,0.8)]"></div>
          </motion.div>

          {/* Orbital Ring 2 */}
          <motion.div
            className="absolute inset-[-12px] rounded-full border border-[#00F5FF]/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#00FF88] rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_12px_rgba(0,255,136,0.8)]"></div>
          </motion.div>

          {/* Orbital Ring 3 */}
          <motion.div
            className="absolute inset-[-24px] rounded-full border border-[#00F5FF]/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
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
          className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #00F5FF 0%, #0088ff 50%, #00F5FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(0, 245, 255, 0.4)',
            filter: 'drop-shadow(0 0 20px rgba(0, 245, 255, 0.3))'
          }}
        >
          AI Voice Assistant
        </h1>
        <p className="text-[#00F5FF]/90 text-lg md:text-xl mb-2 tracking-wide">
          Interact with ARIA using voice commands to control robots, monitor missions, and analyze space debris in real-time
        </p>
        <div className="flex justify-center items-center gap-3 mt-6">
          <div className="w-3 h-3 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_20px_rgba(0,255,136,0.8)]" />
          <span className="text-[#00FF88] font-bold tracking-wider text-sm uppercase">System Online</span>
          <div className="w-3 h-3 bg-[#00FF88] rounded-full animate-pulse shadow-[0_0_20px_rgba(0,255,136,0.8)]" />
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
          className="relative bg-[#0B1426]/90 backdrop-blur-xl rounded-3xl border-2 border-[#00F5FF]/40 p-8 shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 0 60px rgba(0, 245, 255, 0.25), inset 0 0 40px rgba(0, 245, 255, 0.08)'
          }}
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00F5FF]/60 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#00F5FF]/60 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#00F5FF]/60 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#00F5FF]/60 rounded-br-3xl"></div>

          {/* Header */}
          <div className="text-center mb-6 relative z-10">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Mic className="w-7 h-7 text-[#00F5FF] animate-pulse" />
              <span className="text-[#00F5FF] font-bold text-2xl tracking-wide uppercase" style={{
                textShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
              }}>Voice Interface</span>
              <Volume2 className="w-7 h-7 text-[#00F5FF] animate-pulse" />
            </div>
            <p className="text-[#00F5FF]/70 text-sm max-w-md mx-auto leading-relaxed">
              Talk to your AI-powered ElevenLabs Assistant. Ask questions, get guidance, and experience the future of interactive voice intelligence.
            </p>
          </div>

          {/* ElevenLabs Widget */}
          <div className="flex justify-center py-6 relative z-10">
            <div className="w-full max-w-md bg-[#0B1426]/50 rounded-2xl p-6 border border-[#00F5FF]/20">
              <elevenlabs-convai agent-id="agent_3901k6ddjrvqenmbwbevw4xrdv3t"></elevenlabs-convai>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#00F5FF]/20 relative z-10">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-[#00F5FF]/10 w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-[#00F5FF]/20 transition-all">
                <Bot className="w-8 h-8 text-[#00F5FF]" />
              </div>
              <div className="text-[#00F5FF] text-sm font-bold tracking-wide">AI Powered</div>
              <div className="text-[#00F5FF]/50 text-xs mt-1">Advanced Intelligence</div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-[#00F5FF]/10 w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-[#00F5FF]/20 transition-all">
                <Volume2 className="w-8 h-8 text-[#00F5FF]" />
              </div>
              <div className="text-[#00F5FF] text-sm font-bold tracking-wide">Voice Control</div>
              <div className="text-[#00F5FF]/50 text-xs mt-1">Natural Conversation</div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-[#00F5FF]/10 w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-[#00F5FF]/20 transition-all">
                <Mic className="w-8 h-8 text-[#00F5FF]" />
              </div>
              <div className="text-[#00F5FF] text-sm font-bold tracking-wide">Real-time</div>
              <div className="text-[#00F5FF]/50 text-xs mt-1">Instant Response</div>
            </div>
          </div>

          {scriptLoaded && (
            <motion.div
              className="mt-6 text-center relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30">
                <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#00FF88] font-medium tracking-wide">AI Agent Ready | 2.5x Enhanced for Easy Interaction</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Info Text */}
      <motion.div
        className="mt-10 text-center px-6 z-10 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="bg-[#0B1426]/60 backdrop-blur-sm border border-[#00F5FF]/20 rounded-xl p-6">
          <p className="text-[#00F5FF]/70 text-sm leading-relaxed">
            <span className="text-[#00F5FF] font-bold">ARIA</span> can help you understand the space debris cleanup mission, robot capabilities,
            sensor systems, and answer questions about our AI-powered solution. Experience the future of space mission control through natural voice interaction.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AIRobotPage;