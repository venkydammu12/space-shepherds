import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, MapPin, Radar, Cpu, Battery, Zap, Target, Monitor, Activity, CircleCheck as CheckCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIWasteDetector from '@/components/AIWasteDetector';
import Robot3DModel from '@/components/Robot3DModel';
import AIAssistantWidget from '@/components/AIAssistantWidget';

const VirtualPrototypePage = () => {
  const navigate = useNavigate();

  // States
  const [activeSection, setActiveSection] = useState<'dashboard' | 'camera' | 'control' | 'assistant'>('dashboard');
  const [robotStatus, setRobotStatus] = useState<'idle' | 'scanning' | 'moving' | 'collecting'>('idle');

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

  const handleScanCommand = () => {
    setRobotStatus('scanning');
    setTimeout(() => setRobotStatus('idle'), 5000);
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
                { id: 'control', label: '3D Control', icon: Cpu },
                { id: 'assistant', label: 'AI Assistant', icon: Bot }
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
                        onClick={handleScanCommand}
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
                        onClick={() => setActiveSection('control')}
                      >
                        <Cpu className="w-4 h-4 mr-2" />
                        3D Control
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
                <AIWasteDetector />
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

            {/* AI Assistant Section - Centered */}
            {activeSection === 'assistant' && (
              <motion.div
                key="assistant"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-center items-center"
              >
                <div className="w-full max-w-4xl">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                  >
                    <h2 className="text-4xl font-bold text-primary mb-4">
                      AI Voice Assistant
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Interact with ARIA using voice commands to control robots, monitor missions, and analyze space debris in real-time
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-[700px]"
                  >
                    <AIAssistantWidget />
                  </motion.div>
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