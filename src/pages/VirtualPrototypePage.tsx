import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bot, Mic, MicOff, Volume2, VolumeX, Camera, CameraOff, MapPin, Radar, Cpu, Battery, Zap, Target, Monitor, Globe, Satellite, Activity, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import * as THREE from 'three';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

  // 3D Robot Setup
  useEffect(() => {
    if (!robotRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    robotRef.current.appendChild(renderer.domElement);

    // Robot Group
    const robotGroup = new THREE.Group();
    
    // Main Body
    const bodyGeometry = new THREE.CylinderGeometry(0.8, 1, 2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a90e2, 
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);

    // Head/Sensor Array
    const headGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00e6ff,
      transparent: true,
      opacity: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    robotGroup.add(head);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.15, 1.5, 6);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x00e6ff });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-1.2, 0, 0);
    leftArm.rotation.z = Math.PI / 6;
    robotGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(1.2, 0, 0);
    rightArm.rotation.z = -Math.PI / 6;
    robotGroup.add(rightArm);

    scene.add(robotGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (robotStatus === 'idle') {
        robotGroup.rotation.y += 0.005;
        head.rotation.x = Math.sin(Date.now() * 0.002) * 0.1;
      } else if (robotStatus === 'scanning') {
        head.rotation.y = Math.sin(Date.now() * 0.01) * 0.5;
        leftArm.rotation.z = Math.PI / 6 + Math.sin(Date.now() * 0.008) * 0.2;
        rightArm.rotation.z = -Math.PI / 6 - Math.sin(Date.now() * 0.008) * 0.2;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (robotRef.current && renderer.domElement) {
        robotRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [robotStatus]);

  // Camera Functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      streamRef.current = stream;
      setCameraActive(true);
      
      toast({
        title: "Camera Active",
        description: "Live camera feed established for object detection.",
      });
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraActive(false);
    
    toast({
      title: "Camera Stopped",
      description: "Camera feed disconnected.",
    });
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      
      // Simulate object detection
      setTimeout(() => {
        toast({
          title: "Object Detected",
          description: "Debris object identified and catalogued.",
        });
      }, 1000);
    }
  };

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
                className="grid lg:grid-cols-2 gap-8"
              >
                <div className="hologram-box p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <Camera className="w-6 h-6" />
                      Live Camera Feed
                    </h2>
                    <Button
                      variant={cameraActive ? "destructive" : "default"}
                      onClick={cameraActive ? stopCamera : startCamera}
                      className={!cameraActive ? "bg-accent hover:bg-accent/90" : ""}
                    >
                      {cameraActive ? (
                        <>
                          <CameraOff className="w-4 h-4 mr-2" />
                          Stop Camera
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          Start Camera
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="relative aspect-video bg-card/50 rounded-lg overflow-hidden mb-6">
                    {cameraActive ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                        {/* HUD Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-primary rounded-full opacity-60">
                              <div className="w-full h-full border-2 border-accent rounded-full animate-pulse-glow" />
                            </div>
                          </div>
                          
                          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary opacity-80" />
                          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary opacity-80" />
                          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary opacity-80" />
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary opacity-80" />
                          
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded">
                            <div className="text-xs text-primary font-mono">OBJECT DETECTION ACTIVE</div>
                          </div>
                          
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded">
                            <div className="text-xs text-accent font-mono">SCANNING FOR DEBRIS</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Click 'Start Camera' to begin live object detection</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {cameraActive && (
                    <div className="flex justify-center">
                      <Button
                        onClick={captureImage}
                        className="bg-primary hover:bg-primary/90 text-black"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Capture & Analyze
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-accent mb-4">Detection Results</h3>
                    <div className="space-y-4">
                      <div className="glass-card p-4 rounded-xl bg-primary/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Objects Detected</span>
                          <span className="text-lg font-bold text-primary">
                            {cameraActive ? Math.floor(Math.random() * 5) + 1 : 0}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {cameraActive ? 'Real-time analysis active' : 'Camera inactive'}
                        </div>
                      </div>

                      <div className="glass-card p-4 rounded-xl bg-accent/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Classification</span>
                          <span className="text-sm text-accent">
                            {cameraActive ? 'Processing...' : 'Standby'}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          AI-powered object recognition
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-primary mb-4">Camera Settings</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="glass-card p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Resolution</div>
                        <div className="text-sm font-bold text-primary">640x480</div>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Frame Rate</div>
                        <div className="text-sm font-bold text-accent">30 FPS</div>
                      </div>
                      <div className="glass-card p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Mode</div>
                        <div className="text-sm font-bold text-primary">DETECT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Robot Section */}
            {activeSection === 'robot' && (
              <motion.div
                key="robot"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div className="hologram-box p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <Bot className="w-6 h-6" />
                      AI Assistant
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      robotStatus === 'idle' ? 'bg-muted text-muted-foreground' :
                      robotStatus === 'scanning' ? 'bg-primary/20 text-primary' :
                      'bg-accent/20 text-accent'
                    }`}>
                      {robotStatus.toUpperCase()}
                    </div>
                  </div>

                  {/* Voice Controls */}
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      <Button
                        variant={isListening ? "default" : "outline"}
                        onClick={toggleListening}
                        className={`flex-1 ${isListening ? 'bg-primary animate-pulse-glow' : ''}`}
                      >
                        {isListening ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                        {isListening ? 'Listening...' : 'Voice Command'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => speechSynthesis.cancel()}
                        disabled={!isSpeaking}
                      >
                        {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground text-center">
                      Try: "scan area", "camera status", "dashboard report", "system status"
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="glass-card p-4 rounded-xl max-h-64 overflow-y-auto mb-4">
                    <div className="space-y-3">
                      {chatHistory.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            message.type === 'robot' 
                              ? 'bg-primary/10 border-l-2 border-primary' 
                              : 'bg-accent/10 border-l-2 border-accent'
                          }`}
                        >
                          <div className={`text-xs font-bold mb-1 ${
                            message.type === 'robot' ? 'text-primary' : 'text-accent'
                          }`}>
                            {message.type === 'robot' ? 'AI Assistant' : 'User'}
                          </div>
                          <div className="text-sm">{message.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Commands */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Scan', command: 'scan area' },
                      { label: 'Status', command: 'system status' },
                      { label: 'Camera', command: 'camera status' },
                      { label: 'Dashboard', command: 'dashboard report' }
                    ].map((cmd, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleVoiceCommand(cmd.command)}
                        className="text-xs"
                      >
                        {cmd.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-accent mb-4">AI Capabilities</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                        <span className="text-sm">Natural Language Processing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
                        <span className="text-sm">Voice Recognition & Synthesis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                        <span className="text-sm">Real-time System Control</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
                        <span className="text-sm">Mission Status Reporting</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-primary mb-4">System Health</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">AI Processing</span>
                        <span className="text-primary font-bold">98%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Voice Recognition</span>
                        <span className="text-accent font-bold">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Response Time</span>
                        <span className="text-primary font-bold">0.3s</span>
                      </div>
                    </div>
                  </div>
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
                <div className="hologram-box p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <Cpu className="w-6 h-6" />
                      3D Robot Control
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      robotStatus === 'idle' ? 'bg-muted text-muted-foreground' :
                      robotStatus === 'scanning' ? 'bg-primary/20 text-primary' :
                      'bg-accent/20 text-accent'
                    }`}>
                      {robotStatus.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div 
                      ref={robotRef}
                      className="w-[400px] h-[400px] border border-primary/30 rounded-xl bg-background/20"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      onClick={() => {
                        setRobotStatus('scanning');
                        setTimeout(() => setRobotStatus('idle'), 5000);
                      }}
                      className="bg-primary hover:bg-primary/90 text-black"
                    >
                      <Radar className="w-4 h-4 mr-2" />
                      Scan
                    </Button>
                    <Button
                      onClick={() => {
                        setRobotStatus('moving');
                        setTimeout(() => setRobotStatus('idle'), 3000);
                      }}
                      variant="outline"
                      className="border-accent text-accent"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Move
                    </Button>
                    <Button
                      onClick={() => {
                        setRobotStatus('collecting');
                        setTimeout(() => setRobotStatus('idle'), 4000);
                      }}
                      variant="outline"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Collect
                    </Button>
                  </div>
                </div>

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