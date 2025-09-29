import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Bot, Mic, MicOff, Volume2, VolumeX,
  Cpu, Battery, Zap, Target, Camera, Radar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

const RobotPrototypePage = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [robotStatus, setRobotStatus] = useState<'idle' | 'scanning' | 'moving' | 'collecting'>('idle');
  const [chatHistory, setChatHistory] = useState<{type: 'user' | 'robot', message: string}[]>([
    { type: 'robot', message: 'Robot SW-07 online. Ready for mission briefing.' }
  ]);
  const robotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!robotRef.current) return;

    // Three.js robot visualization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    robotRef.current.appendChild(renderer.domElement);

    // Robot body components
    const robotGroup = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.CylinderGeometry(0.8, 1, 2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a90e2, 
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);

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

    // Head/Sensor array
    const headGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00e6ff,
      transparent: true,
      opacity: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    robotGroup.add(head);

    // Thrusters
    const thrusterGeometry = new THREE.ConeGeometry(0.2, 0.8, 8);
    const thrusterMaterial = new THREE.MeshPhongMaterial({ color: 0xffb86b });
    
    for (let i = 0; i < 4; i++) {
      const thruster = new THREE.Mesh(thrusterGeometry, thrusterMaterial);
      const angle = (i / 4) * Math.PI * 2;
      thruster.position.set(
        Math.cos(angle) * 1.2,
        -1.2,
        Math.sin(angle) * 1.2
      );
      thruster.rotation.x = Math.PI;
      robotGroup.add(thruster);
    }

    scene.add(robotGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Holographic effect lights
    const pointLight1 = new THREE.PointLight(0x00e6ff, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffb86b, 0.5, 8);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Robot idle animation
      if (robotStatus === 'idle') {
        robotGroup.rotation.y += 0.005;
        head.rotation.x = Math.sin(Date.now() * 0.002) * 0.1;
      }
      
      // Scanning animation
      if (robotStatus === 'scanning') {
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

  const handleRobotCommand = (command: string) => {
    const responses: { [key: string]: { message: string, status?: typeof robotStatus } } = {
      'scan': { 
        message: 'Initiating orbital scan. LiDAR and radar arrays active. Detecting debris signatures.', 
        status: 'scanning' 
      },
      'collect': { 
        message: 'Debris collection sequence activated. Deploying collection arms and magnetic grippers.', 
        status: 'collecting' 
      },
      'status': { 
        message: 'Robot SW-07 operational. All systems green. Battery at 87%. Ready for debris cleanup mission.' 
      },
      'move': { 
        message: 'Engaging ion thrusters. Moving to target coordinates. ETA 2 minutes.', 
        status: 'moving' 
      },
      'hello': { 
        message: 'Greetings, Mission Control. Robot SW-07 reporting for duty. Awaiting instructions.' 
      },
      'mission': { 
        message: 'Current mission: Orbital debris cleanup. 247 objects collected. Success rate 99.7%.' 
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
      const defaultResponse = 'Command received. Processing request. Please specify mission parameters.';
      setChatHistory(prev => [...prev, 
        { type: 'user', message: command },
        { type: 'robot', message: defaultResponse }
      ]);
      speak(defaultResponse);
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    
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
        handleRobotCommand(command);
      };
      
      recognition.start();
    }
  };

  const robotSpecs = [
    { label: 'Health Status', value: '98%', icon: Cpu, color: 'primary' },
    { label: 'Battery Level', value: '87%', icon: Battery, color: 'accent' },
    { label: 'Speed', value: '2.4 km/s', icon: Zap, color: 'primary' },
    { label: 'Mission Status', value: robotStatus.toUpperCase(), icon: Target, color: 'accent' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-cosmic" />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/mission-control')}
          className="border-primary/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Mission Control
        </Button>
        
        <div className="text-sm text-muted-foreground">Virtual Robot Prototype</div>
        
        <Button
          onClick={() => navigate('/optimization')}
          className="bg-primary hover:bg-primary/90 text-black"
        >
          Optimization
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
              ROBOT SW-07
              <br />
              <span className="text-primary">PROTOTYPE</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Interactive AI-powered debris cleanup robot with voice control and real-time communication
            </p>
          </motion.div>

          {/* Main Interface */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* 3D Robot Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="hologram-box p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                    <Bot className="w-6 h-6" />
                    3D Robot Model
                  </h2>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    robotStatus === 'idle' ? 'bg-muted text-muted-foreground' :
                    robotStatus === 'scanning' ? 'bg-primary/20 text-primary' :
                    robotStatus === 'moving' ? 'bg-accent/20 text-accent' :
                    'bg-destructive/20 text-destructive'
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

                {/* Robot Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {robotSpecs.map((spec, index) => (
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
            </motion.div>

            {/* Voice Control & Chat */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Voice Controls */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice Control
                </h3>
                
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={isListening ? "default" : "outline"}
                    onClick={toggleListening}
                    className={`flex-1 ${isListening ? 'bg-primary animate-pulse-glow' : ''}`}
                  >
                    {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    {isListening ? 'Listening...' : 'Start Voice'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => speechSynthesis.cancel()}
                    disabled={!isSpeaking}
                  >
                    {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Try: "scan area", "collect debris", "status report", "move to target"
                </div>
              </div>

              {/* Chat History */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-primary mb-4">Mission Communication</h3>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
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
                        {message.type === 'robot' ? 'SW-07' : 'Mission Control'}
                      </div>
                      <div className="text-sm">{message.message}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Commands */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-accent mb-4">Quick Commands</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Scan', command: 'scan area' },
                    { label: 'Status', command: 'status report' },
                    { label: 'Collect', command: 'collect debris' },
                    { label: 'Mission', command: 'mission report' }
                  ].map((cmd, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleRobotCommand(cmd.command)}
                      className="text-xs"
                    >
                      {cmd.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sensor Array */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { name: 'LiDAR Array', status: 'Active', range: '15.2km', icon: Radar },
              { name: 'Optical Camera', status: 'Recording', res: '4K HDR', icon: Camera },
              { name: 'Magnetic Sensor', status: 'Scanning', sensitivity: '99.7%', icon: Target },
              { name: 'Ion Thrusters', status: 'Ready', power: '2.4kW', icon: Zap }
            ].map((sensor, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <sensor.icon className="w-6 h-6 text-primary" />
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                </div>
                <h4 className="font-bold mb-2">{sensor.name}</h4>
                <div className="text-sm text-muted-foreground">
                  Status: <span className="text-primary">{sensor.status}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {sensor.range && `Range: ${sensor.range}`}
                  {sensor.res && `Quality: ${sensor.res}`}
                  {sensor.sensitivity && `Accuracy: ${sensor.sensitivity}`}
                  {sensor.power && `Power: ${sensor.power}`}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RobotPrototypePage;