import { useState, useEffect } from 'react';
import { Radar, Activity, Zap, Target, Home, AlertTriangle, Eye, Users, Globe, Monitor, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Earth3D from './Earth3D';
import VoiceAssistant from './VoiceAssistant';
import CameraFeed from './CameraFeed';
import { useToast } from '@/hooks/use-toast';

interface DebrisObject {
  id: string;
  position: [number, number, number];
  type: 'metallic' | 'plastic' | 'electronic';
  weight: number;
  speed: number;
  rotation: [number, number, number];
}

interface MissionData {
  activeRobots: number;
  debrisCollected: number;
  missionSuccess: number;
  energyLevel: number;
  currentMission: string;
}

const MissionControl = () => {
  const navigate = useNavigate();
  const [selectedDebris, setSelectedDebris] = useState<DebrisObject | null>(null);
  const [robotStatus, setRobotStatus] = useState<'standby' | 'collecting' | 'returning' | 'docked'>('standby');
  const [missionData, setMissionData] = useState<MissionData>({
    activeRobots: 5,
    debrisCollected: 247,
    missionSuccess: 99.7,
    energyLevel: 87,
    currentMission: 'Orbital Scan Active'
  });
  const { toast } = useToast();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'problem', label: 'Problem', icon: AlertTriangle, path: '/problem' },
    { id: 'solution', label: 'Solution', icon: Zap, path: '/solution' },
    { id: 'virtual-robot', label: 'Virtual Robot', icon: Users, path: '/virtual-prototype' },
    { id: 'robot-eye', label: 'Robot Eye', icon: Eye, path: '/robo-eye-camera' },
    { id: 'dashboard', label: 'Dashboard', icon: Monitor, path: '/mission-control', active: true },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Rocket, path: '/ai-robot' },
    { id: 'impact', label: 'Impact', icon: Globe, path: '/impact' }
  ];

  // Simulate live mission data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionData(prev => ({
        ...prev,
        debrisCollected: prev.debrisCollected + Math.floor(Math.random() * 2),
        energyLevel: Math.max(65, Math.min(prev.energyLevel + (Math.random() - 0.5) * 5, 98)),
        activeRobots: Math.max(3, Math.min(prev.activeRobots + Math.floor(Math.random() * 3) - 1, 8))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDebrisSelect = (debris: DebrisObject) => {
    setSelectedDebris(debris);
    setRobotStatus('collecting');
    setMissionData(prev => ({
      ...prev,
      currentMission: `Collecting ${debris.type} debris (${debris.weight.toFixed(1)}kg)`
    }));
    
    toast({
      title: "Target Acquired",
      description: `Robot assigned to collect ${debris.type} debris object`,
    });

    // Simulate collection sequence
    setTimeout(() => {
      setRobotStatus('returning');
      setMissionData(prev => ({
        ...prev,
        currentMission: 'Returning to motherstation'
      }));
    }, 3000);

    setTimeout(() => {
      setRobotStatus('docked');
      setMissionData(prev => ({
        ...prev,
        currentMission: 'Debris processed successfully',
        debrisCollected: prev.debrisCollected + 1
      }));
      setSelectedDebris(null);
    }, 6000);

    setTimeout(() => {
      setRobotStatus('standby');
      setMissionData(prev => ({
        ...prev,
        currentMission: 'Orbital Scan Active'
      }));
    }, 9000);
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('deploy') || command.includes('launch')) {
      setRobotStatus('collecting');
      setMissionData(prev => ({
        ...prev,
        currentMission: 'Deploying robot swarm'
      }));
    } else if (command.includes('status') || command.includes('report')) {
      toast({
        title: "Mission Status",
        description: `${missionData.activeRobots} robots active, ${missionData.debrisCollected} objects collected`,
      });
    }
  };

  const deployEmergencyProtocol = () => {
    setRobotStatus('returning');
    setMissionData(prev => ({
      ...prev,
      currentMission: 'EMERGENCY: All robots returning to safe positions'
    }));
    
    toast({
      title: "Emergency Protocol Activated",
      description: "All robots returning to motherstation immediately",
      variant: "destructive"
    });
  };

  const sensors = [
    { name: 'LiDAR', status: 'active', value: '127 objects detected' },
    { name: 'Radar', status: 'active', value: '15.2km range' },
    { name: 'Magnetic', status: 'active', value: 'Metallic debris identified' },
    { name: 'Optical', status: 'active', value: 'High resolution imaging' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Glass Navigation Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B1426]/80 border-b border-[#00F5FF]/20">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between py-4">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00F5FF]/20 border border-[#00F5FF]/40 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <span className="text-lg font-bold text-[#00F5FF] hidden sm:block">Mission Control</span>
            </div>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                    item.active
                      ? 'bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/40'
                      : 'text-[#00F5FF]/70 hover:text-[#00F5FF] hover:bg-[#00F5FF]/10'
                  }`}
                  style={{
                    boxShadow: item.active ? '0 0 20px rgba(0, 245, 255, 0.3)' : 'none'
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.active && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00F5FF] rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#00F5FF] hover:bg-[#00F5FF]/20"
                onClick={() => {
                  const mobileNav = document.getElementById('mobile-nav');
                  if (mobileNav) {
                    mobileNav.classList.toggle('hidden');
                  }
                }}
              >
                <Target className="w-5 h-5" />
              </Button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div id="mobile-nav" className="hidden lg:hidden pb-4">
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    item.active
                      ? 'bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/40'
                      : 'text-[#00F5FF]/70 hover:text-[#00F5FF] hover:bg-[#00F5FF]/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold hero-title mb-4">
            Mission Control Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time orbital debris cleanup operations
          </p>
        </div>

        {/* Main Control Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* 3D Earth View */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 rounded-3xl">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                <Target className="w-6 h-6" />
                Orbital Reality Map
              </h2>
              <Earth3D onDebrisSelect={handleDebrisSelect} />
              
              {selectedDebris && (
                <div className="mt-4 glass-card p-4 rounded-xl neon-border">
                  <h3 className="font-bold text-accent mb-2">Target Debris Analysis</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Type: <span className="text-primary">{selectedDebris.type}</span></div>
                    <div>Weight: <span className="text-accent">{selectedDebris.weight.toFixed(1)}kg</span></div>
                    <div>Speed: <span className="text-primary">{selectedDebris.speed.toFixed(1)}km/s</span></div>
                    <div>Status: <span className="text-accent">Target Locked</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mission Status Panel */}
          <div className="space-y-6">
            <div className="dashboard-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Mission Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Robots</span>
                  <span className="text-2xl font-bold text-primary">{missionData.activeRobots}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Objects Collected</span>
                  <span className="text-2xl font-bold text-accent">{missionData.debrisCollected}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="text-2xl font-bold text-primary">{missionData.missionSuccess}%</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Energy Level</span>
                    <span className="text-lg font-bold text-accent">{Math.round(missionData.energyLevel)}%</span>
                  </div>
                  <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${missionData.energyLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-accent mb-4">Current Mission</h3>
              <p className="text-muted-foreground text-sm">{missionData.currentMission}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  robotStatus === 'collecting' ? 'bg-primary animate-pulse-glow' :
                  robotStatus === 'returning' ? 'bg-accent' :
                  robotStatus === 'docked' ? 'bg-green-500' : 'bg-muted'
                }`} />
                <span className="text-sm capitalize font-medium">{robotStatus}</span>
              </div>
            </div>

            <div className="dashboard-panel p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Radar className="w-5 h-5" />
                Sensor Array
              </h3>
              <div className="space-y-3">
                {sensors.map((sensor, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{sensor.name}</div>
                      <div className="text-xs text-muted-foreground">{sensor.value}</div>
                    </div>
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Control Panels Row */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <VoiceAssistant onCommand={handleVoiceCommand} robotStatus={robotStatus} />
          <CameraFeed />
          
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-destructive mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Controls
            </h3>
            <div className="space-y-4">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={deployEmergencyProtocol}
              >
                <Home className="w-4 h-4 mr-2" />
                Emergency Return
              </Button>
              <Button variant="outline" className="w-full border-accent text-accent">
                <Zap className="w-4 h-4 mr-2" />
                Boost Power
              </Button>
              <div className="text-xs text-muted-foreground">
                Emergency protocols available for immediate deployment
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Operational</div>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-accent">15.2km</div>
            <div className="text-sm text-muted-foreground">Detection Range</div>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-primary">127</div>
            <div className="text-sm text-muted-foreground">Objects Tracked</div>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-accent">0.3s</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;