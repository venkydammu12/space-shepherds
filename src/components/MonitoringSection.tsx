import { useEffect, useState } from 'react';
import { Activity, Cpu, Zap, AlertCircle, CheckCircle, Radio } from 'lucide-react';

const MonitoringSection = () => {
  const [activeRobots, setActiveRobots] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [successfulDockings, setSuccessfulDockings] = useState(0);
  const [alertLevel, setAlertLevel] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setActiveRobots(prev => {
          const change = Math.floor(Math.random() * 3) - 1;
          return Math.max(12, Math.min(prev + change, 24));
        });
      }, 2000),
      setInterval(() => {
        setEnergyLevel(prev => {
          const change = (Math.random() - 0.5) * 5;
          return Math.max(65, Math.min(prev + change, 98));
        });
      }, 1500),
      setInterval(() => {
        setSuccessfulDockings(prev => prev + 1);
      }, 3000),
      setInterval(() => {
        const levels: ('low' | 'medium' | 'high')[] = ['low', 'low', 'medium', 'low', 'high'];
        setAlertLevel(levels[Math.floor(Math.random() * levels.length)]);
      }, 5000)
    ];

    // Initial values
    setActiveRobots(18);
    setEnergyLevel(87);
    setSuccessfulDockings(1247);

    return () => intervals.forEach(clearInterval);
  }, []);

  const getAlertColor = () => {
    switch (alertLevel) {
      case 'low': return 'text-primary';
      case 'medium': return 'text-accent'; 
      case 'high': return 'text-destructive';
    }
  };

  const getAlertBg = () => {
    switch (alertLevel) {
      case 'low': return 'bg-primary/10';
      case 'medium': return 'bg-accent/10';
      case 'high': return 'bg-destructive/10';
    }
  };

  return (
    <section id="monitoring" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 hero-title">
            Mission Control Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time monitoring and control of our autonomous swarm robotics network 
            with AI-powered analytics and predictive maintenance systems.
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Live Robot Feed */}
          <div className="lg:col-span-2 dashboard-panel p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
              <Radio className="w-6 h-6" />
              Live Robot Feed
            </h3>
            <div className="aspect-video bg-card/50 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
                  <p className="text-muted-foreground">Robot-eye camera view active</p>
                  <p className="text-sm text-muted-foreground mt-2">Debris collection in progress...</p>
                </div>
              </div>
              {/* Simulated UI overlay */}
              <div className="absolute top-4 left-4 glass-card p-3 rounded-lg">
                <div className="text-xs text-primary">Robot SW-07</div>
                <div className="text-xs text-muted-foreground">Sector: LEO-A4</div>
              </div>
              <div className="absolute bottom-4 right-4 glass-card p-3 rounded-lg">
                <div className="text-xs text-accent">Target Acquired</div>
                <div className="text-xs text-muted-foreground">Distance: 127m</div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="dashboard-panel p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-3">
              <Cpu className="w-6 h-6" />
              Control Panel
            </h3>
            
            <div className="space-y-6">
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Active Robots</span>
                  <span className="text-2xl font-bold text-primary">{activeRobots}</span>
                </div>
                <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${(activeRobots / 24) * 100}%` }}
                  />
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Energy Level</span>
                  <span className="text-2xl font-bold text-accent">{Math.round(energyLevel)}%</span>
                </div>
                <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${energyLevel}%` }}
                  />
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Successful Dockings</span>
                  <span className="text-2xl font-bold text-primary">{successfulDockings.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  <span>99.7% success rate</span>
                </div>
              </div>

              <div className={`glass-card p-4 rounded-xl ${getAlertBg()}`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className={`w-4 h-4 ${getAlertColor()}`} />
                  <span className="text-sm font-medium">Alert Level</span>
                </div>
                <div className={`text-lg font-bold ${getAlertColor()} capitalize`}>
                  {alertLevel} Density Zone
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="dashboard-panel p-6 rounded-2xl text-center">
            <Activity className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          
          <div className="dashboard-panel p-6 rounded-2xl text-center">
            <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-accent mb-1">127</div>
            <div className="text-sm text-muted-foreground">Operations Today</div>
          </div>
          
          <div className="dashboard-panel p-6 rounded-2xl text-center">
            <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary mb-1">99.7%</div>
            <div className="text-sm text-muted-foreground">Mission Success</div>
          </div>
          
          <div className="dashboard-panel p-6 rounded-2xl text-center">
            <Radio className="w-8 h-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-accent mb-1">5.2TB</div>
            <div className="text-sm text-muted-foreground">Data Processed</div>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="mt-12 glass-card p-8 rounded-3xl neon-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary">ARIA - AI Assistant</h4>
              <p className="text-sm text-muted-foreground">Autonomous Robotics Intelligence Assistant</p>
            </div>
          </div>
          <p className="text-muted-foreground italic">
            "Robot Swarm deployed successfully. Current mission: Debris collection in LEO-A4 sector. 
            All systems operating within normal parameters. Next maintenance cycle in 72 hours."
          </p>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;