import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import { 
  Bot, 
  Map, 
  Scan, 
  FileText, 
  LogOut,
  Battery,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

// Mock data for demonstration
const mockRobots = [
  { id: 'SR-001', location: 'LEO Sector 7', battery: 87, task: 'Scanning', distance: '2.4 km', threat: 'low' },
  { id: 'SR-002', location: 'LEO Sector 3', battery: 45, task: 'Collecting', distance: '0.8 km', threat: 'medium' },
  { id: 'SR-003', location: 'MEO Sector 1', battery: 92, task: 'Returning', distance: '5.1 km', threat: 'low' },
  { id: 'SR-004', location: 'LEO Sector 12', battery: 23, task: 'Recharging', distance: '0 km', threat: 'none' },
];

const mockDebris = [
  { id: 'D-4521', material: 'Aluminum', size: '12cm', weight: '0.8 kg', method: 'Magnetic' },
  { id: 'D-4522', material: 'Composite', size: '8cm', weight: '0.3 kg', method: 'Gecko Adhesion' },
  { id: 'D-4523', material: 'Unknown', size: '5cm', weight: '0.2 kg', method: 'Vacuum' },
];

const mockLogs = [
  { id: 1, mission: 'Debris Collection Alpha', time: '2h 34m', distance: '12.4 km', mass: '2.1 kg', status: 'completed' },
  { id: 2, mission: 'Sector 7 Scan', time: '45m', distance: '8.2 km', mass: '0 kg', status: 'completed' },
  { id: 3, mission: 'Emergency Intercept', time: '12m', distance: '1.1 km', mass: '0.4 kg', status: 'completed' },
];

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader-orbit" />
      </div>
    );
  }

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'status-danger';
      case 'medium': return 'status-warning';
      case 'low': return 'status-active';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen relative">
      <StarField />
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold gradient-text mb-2">
              Mission Control Center
            </h1>
            <p className="font-inter text-muted-foreground">
              Welcome back, {user?.email}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="robots" className="space-y-6">
          <TabsList className="glass-card p-1 border border-primary/20">
            <TabsTrigger value="robots" className="font-space data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bot className="w-4 h-4 mr-2" />
              Live Robot Status
            </TabsTrigger>
            <TabsTrigger value="map" className="font-space data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Map className="w-4 h-4 mr-2" />
              Space Map
            </TabsTrigger>
            <TabsTrigger value="scanner" className="font-space data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Scan className="w-4 h-4 mr-2" />
              Debris Scanner
            </TabsTrigger>
            <TabsTrigger value="logs" className="font-space data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Logs
            </TabsTrigger>
          </TabsList>

          {/* Live Robot Status */}
          <TabsContent value="robots" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRobots.map((robot) => (
                <div key={robot.id} className="dashboard-panel">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Bot className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-orbitron font-bold text-lg text-foreground">{robot.id}</h3>
                        <p className="font-inter text-sm text-muted-foreground">{robot.location}</p>
                      </div>
                    </div>
                    <div className={`status-dot ${getThreatColor(robot.threat)}`} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Battery className={`w-5 h-5 ${robot.battery > 50 ? 'text-primary' : robot.battery > 20 ? 'text-accent' : 'text-destructive'}`} />
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${robot.battery > 50 ? 'bg-primary' : robot.battery > 20 ? 'bg-accent' : 'bg-destructive'}`}
                            style={{ width: `${robot.battery}%` }}
                          />
                        </div>
                        <p className="font-inter text-xs text-muted-foreground mt-1">{robot.battery}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span className="font-space text-sm text-foreground">{robot.task}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-accent" />
                      <span className="font-inter text-sm text-muted-foreground">{robot.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${robot.threat === 'high' ? 'text-destructive' : robot.threat === 'medium' ? 'text-accent' : 'text-primary'}`} />
                      <span className="font-inter text-sm capitalize text-muted-foreground">{robot.threat} threat</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Space Map */}
          <TabsContent value="map">
            <div className="dashboard-panel min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-8">
                  {/* Earth */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-green-500 shadow-lg">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
                  </div>
                  
                  {/* Orbit Rings */}
                  <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse" />
                  <div className="absolute inset-8 rounded-full border border-primary/20" />
                  <div className="absolute inset-16 rounded-full border border-primary/10" />
                  
                  {/* Orbiting Objects */}
                  <div className="absolute w-3 h-3 bg-primary rounded-full animate-orbit" style={{ animationDuration: '10s' }} />
                  <div className="absolute w-2 h-2 bg-accent rounded-full animate-orbit" style={{ animationDuration: '15s', animationDelay: '-5s' }} />
                  <div className="absolute w-2 h-2 bg-destructive rounded-full animate-orbit" style={{ animationDuration: '8s', animationDelay: '-3s' }} />
                </div>
                <p className="font-orbitron text-lg text-primary mb-2">Real-Time Space Map</p>
                <p className="font-inter text-muted-foreground">Tracking satellites, debris, and robot paths</p>
              </div>
            </div>
          </TabsContent>

          {/* Debris Scanner */}
          <TabsContent value="scanner">
            <div className="dashboard-panel">
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Scan className="w-6 h-6 text-primary" />
                Detected Debris
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="font-space text-left py-3 px-4 text-muted-foreground">ID</th>
                      <th className="font-space text-left py-3 px-4 text-muted-foreground">Material</th>
                      <th className="font-space text-left py-3 px-4 text-muted-foreground">Size</th>
                      <th className="font-space text-left py-3 px-4 text-muted-foreground">Weight</th>
                      <th className="font-space text-left py-3 px-4 text-muted-foreground">Collection Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDebris.map((debris) => (
                      <tr key={debris.id} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                        <td className="font-orbitron py-3 px-4 text-primary">{debris.id}</td>
                        <td className="font-inter py-3 px-4 text-foreground">{debris.material}</td>
                        <td className="font-inter py-3 px-4 text-muted-foreground">{debris.size}</td>
                        <td className="font-inter py-3 px-4 text-muted-foreground">{debris.weight}</td>
                        <td className="font-space py-3 px-4 text-accent">{debris.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Logs */}
          <TabsContent value="logs">
            <div className="dashboard-panel">
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Mission Logs
              </h3>
              <div className="space-y-4">
                {mockLogs.map((log) => (
                  <div key={log.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <div>
                        <h4 className="font-space font-semibold text-foreground">{log.mission}</h4>
                        <p className="font-inter text-sm text-muted-foreground">
                          Duration: {log.time} | Distance: {log.distance} | Collected: {log.mass}
                        </p>
                      </div>
                    </div>
                    <span className="font-space text-sm text-primary capitalize">{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;