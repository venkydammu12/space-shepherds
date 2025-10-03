import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bot, Mic, MicOff, Volume2, VolumeX, Camera, CameraOff, MapPin, Radar, Cpu, Battery, Zap, Target, Monitor, Globe, Satellite, Activity, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import RobotVision from '@/components/RobotVision';
import Robot3DModel from '@/components/Robot3DModel';
import AIAssistantWidget from '@/components/AIAssistantWidget';

const VirtualPrototypePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // States
  const [activeSection, setActiveSection] = useState<'dashboard' | 'camera' | 'robot' | 'control'>('dashboard');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [robotStatus, setRobotStatus] = useState<'idle' | 'scanning' | 'moving' | 'collecting'>('idle');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'robot', message: string}[]>([
    { type: 'robot', message: 'Virtual Prototype System Online. All systems ready for demonstration.' }
  ]);
  
  // Refs

  // Mission Control Data
  const [missionData, setMissionData] = useState({
    activeRobots: 8,
    debrisDetected: 1247,
    successRate: 99.7,
    energyLevel: 89,
    gpsCoordinates: { lat: 0, lng: 0 },
    sensorData: {
      lidar: 'Active - 15.2km range',
      radar: 'Scanning - 127 objects',
      optical: 'Recording - 4K HDR',
      magnetic: 'Detecting - Metallic debris'
    }
  });

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionData(prev => ({
        ...prev,
        debrisDetected: prev.debrisDetected + Math.floor(Math.random() * 3),
        energyLevel: Math.max(70, Math.min(prev.energyLevel + (Math.random() - 0.5) * 5, 98)),
        activeRobots: Math.max(5, Math.min(prev.activeRobots + Math.floor(Math.random() * 3) - 1, 12)),
        gpsCoordinates: {
          lat: prev.gpsCoordinates.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.gpsCoordinates.lng + (Math.random() - 0.5) * 0.001
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  // Voice Functions
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.7;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const responses: { [key: string]: { message: string, status?: typeof robotStatus } } = {
      'scan': { 
        message: 'Initiating orbital scan. All sensors active. Detecting debris signatures in real-time.', 
        status: 'scanning' 
      },
      'collect': { 
        message: 'Debris collection sequence activated. Deploying collection arms and magnetic systems.', 
        status: 'collecting' 
      },
      'status': { 
        message: `Virtual prototype operational. ${missionData.activeRobots} robots active. ${missionData.debrisDetected} objects detected. Success rate ${missionData.successRate}%.` 
      },
      'camera': {
        message: 'Activating camera systems for live object detection and analysis.',
      },
      'dashboard': {
        message: 'Mission control dashboard active. All systems monitoring orbital debris cleanup operations.',
      }
    };

    const matchedCommand = Object.keys(responses).find(key => 
      command.toLowerCase().includes(key)
    );

    if (matchedCommand) {
      const response = responses[matchedCommand];
      setChatHistory(prev => [...prev, 
        { type: 'user', message: command },
        { type: 'robot', message: response.message }
      ]);
      speak(response.message);
      if (response.status) {
        setRobotStatus(response.status);
        setTimeout(() => setRobotStatus('idle'), 5000);
      }
    } else {
      const defaultResponse = 'Virtual prototype system ready. Please specify your command for demonstration.';
      setChatHistory(prev => [...prev, 
        { type: 'user', message: command },
        { type: 'robot', message: defaultResponse }
      ]);
      speak(defaultResponse);
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Speech recognition not available in this browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      setIsListening(false);
    } else {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        handleVoiceCommand(command);
      };
      
      recognition.start();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-cosmic" />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/solution')}
          className="border-primary/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Solution
        </Button>
        
        <div className="text-sm text-muted-foreground">Virtual Prototype System</div>
        
        <Button
          onClick={() => navigate('/impact')}
          className="bg-primary hover:bg-primary/90 text-black"
        >
          Global Impact
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold hero-title mb-6">
              VIRTUAL
              <br />
              <span className="text-primary">PROTOTYPE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interactive AI-powered space debris cleanup system with live camera, voice control, and mission monitoring
            </p>
          </motion.div>

          {/* Section Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="glass-card p-2 rounded-2xl flex gap-2">
              {[
                { id: 'dashboard', label: 'Mission Control', icon: Monitor },
                { id: 'camera', label: 'Live Camera', icon: Camera },
                { id: 'robot', label: 'AI Robot', icon: Bot },
                { id: 'control', label: '3D Control', icon: Cpu }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex items-center gap-2 ${
                    activeSection === tab.id ? 'bg-primary text-black' : ''
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {/* Mission Control Dashboard */}
            {activeSection === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Live Stats */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="hologram-box p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                      <Activity className="w-6 h-6" />
                      Live Mission Dashboard
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="glass-card p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-muted-foreground">Active Robots</span>
                          <span className="text-3xl font-bold text-primary">{missionData.activeRobots}</span>
                        </div>
                        <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${(missionData.activeRobots / 12) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="glass-card p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-muted-foreground">Objects Detected</span>
                          <span className="text-3xl font-bold text-accent">{missionData.debrisDetected.toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-primary">+{Math.floor(Math.random() * 5) + 1} in last minute</div>
                      </div>

                      <div className="glass-card p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-muted-foreground">Success Rate</span>
                          <span className="text-3xl font-bold text-primary">{missionData.successRate}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <CheckCircle className="w-4 h-4" />
                          <span>Optimal Performance</span>
                        </div>
                      </div>

                      <div className="glass-card p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-muted-foreground">Energy Level</span>
                          <span className="text-3xl font-bold text-accent">{Math.round(missionData.energyLevel)}%</span>
                        </div>
                        <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: `${missionData.energyLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* GPS & Sensors */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="glass-card p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Live GPS Tracking
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>Latitude: <span className="text-primary font-mono">{missionData.gpsCoordinates.lat.toFixed(6)}</span></div>
                          <div>Longitude: <span className="text-accent font-mono">{missionData.gpsCoordinates.lng.toFixed(6)}</span></div>
                          <div className="text-xs text-muted-foreground">Orbital Position Updated</div>
                        </div>
                      </div>

                      <div className="glass-card p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                          <Radar className="w-5 h-5" />
                          Sensor Array Status
                        </h3>
                        <div className="space-y-2 text-sm">
                          {Object.entries(missionData.sensorData).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="capitalize">{key}:</span>
                              <span className="text-primary text-xs">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-accent mb-4">System Controls</h3>
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-black"
                        onClick={() => handleVoiceCommand('scan area')}
                      >
                        <Radar className="w-4 h-4 mr-2" />
                        Initiate Scan
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-accent text-accent"
                        onClick={() => setActiveSection('camera')}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Activate Camera
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveSection('robot')}
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        AI Assistant
                      </Button>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-primary mb-4">Mission Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                        <span className="text-sm">All Systems Operational</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
                        <span className="text-sm">Live Data Streaming</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                        <span className="text-sm">Prototype Mode Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Live Camera Section */}
            {activeSection === 'camera' && (
              <motion.div
                key="camera"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="h-full"
              >
                <RobotVision />
              </motion.div>
            )}

            {/* AI Robot Section */}
            {activeSection === 'robot' && (
              <motion.div
                key="robot"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="max-w-4xl mx-auto"
              >
                <div className="h-[700px]">
                  <AIAssistantWidget />
                </div>
              </motion.div>
            )}

            {/* 3D Control Section */}
            {activeSection === 'control' && (
              <motion.div
                key="control"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <Robot3DModel 
                  robotStatus={robotStatus} 
                  onStatusChange={setRobotStatus}
                />

                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-accent mb-4">Robot Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Health', value: '98%', icon: Cpu, color: 'primary' },
                        { label: 'Battery', value: '87%', icon: Battery, color: 'accent' },
                        { label: 'Speed', value: '2.4 km/s', icon: Zap, color: 'primary' },
                        { label: 'Status', value: robotStatus.toUpperCase(), icon: Target, color: 'accent' }
                      ].map((spec, index) => (
                        <div key={index} className="glass-card p-4 rounded-xl text-center">
                          <spec.icon className={`w-6 h-6 mx-auto mb-2 text-${spec.color}`} />
                          <div className={`text-lg font-bold text-${spec.color}`}>
                            {spec.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {spec.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-primary mb-4">Control Commands</h3>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <strong>Scan Mode:</strong> Activates all sensors for debris detection
                      </div>
                      <div className="text-sm">
                        <strong>Move Mode:</strong> Engages thrusters for position adjustment
                      </div>
                      <div className="text-sm">
                        <strong>Collect Mode:</strong> Deploys collection arms and systems
                      </div>
                      <div className="text-sm">
                        <strong>Interactive:</strong> Click and drag to rotate 3D model
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VirtualPrototypePage;