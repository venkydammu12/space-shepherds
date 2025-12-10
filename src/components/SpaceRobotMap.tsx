import { useState, useEffect, useCallback } from 'react';
import { Rocket, Circle, Target, Home, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Position {
  x: number;
  y: number;
}

interface Debris {
  id: string;
  position: Position;
  collected: boolean;
  material: string;
  size: number;
}

interface Robot {
  id: string;
  position: Position;
  target: Position | null;
  status: 'idle' | 'moving-to-debris' | 'collecting' | 'returning';
  battery: number;
  carryingDebris: Debris | null;
  path: Position[];
}

const MOTHER_STATION: Position = { x: 50, y: 50 };

const initialDebris: Debris[] = [
  { id: 'D-001', position: { x: 15, y: 20 }, collected: false, material: 'Aluminum', size: 8 },
  { id: 'D-002', position: { x: 80, y: 15 }, collected: false, material: 'Composite', size: 6 },
  { id: 'D-003', position: { x: 25, y: 75 }, collected: false, material: 'Metal', size: 10 },
  { id: 'D-004', position: { x: 70, y: 65 }, collected: false, material: 'Unknown', size: 5 },
  { id: 'D-005', position: { x: 85, y: 80 }, collected: false, material: 'Plastic', size: 7 },
  { id: 'D-006', position: { x: 10, y: 50 }, collected: false, material: 'Titanium', size: 9 },
  { id: 'D-007', position: { x: 60, y: 30 }, collected: false, material: 'Carbon', size: 4 },
  { id: 'D-008', position: { x: 35, y: 85 }, collected: false, material: 'Steel', size: 11 },
];

const initialRobots: Robot[] = [
  { id: 'SR-001', position: { ...MOTHER_STATION }, target: null, status: 'idle', battery: 100, carryingDebris: null, path: [] },
  { id: 'SR-002', position: { ...MOTHER_STATION }, target: null, status: 'idle', battery: 100, carryingDebris: null, path: [] },
  { id: 'SR-003', position: { ...MOTHER_STATION }, target: null, status: 'idle', battery: 100, carryingDebris: null, path: [] },
];

const calculateDistance = (a: Position, b: Position): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

const SpaceRobotMap = () => {
  const [robots, setRobots] = useState<Robot[]>(initialRobots);
  const [debris, setDebris] = useState<Debris[]>(initialDebris);
  const [collectedCount, setCollectedCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((message: string) => {
    setLogs(prev => [message, ...prev].slice(0, 10));
  }, []);

  const findNearestDebris = useCallback((robot: Robot, debrisList: Debris[]): Debris | null => {
    const availableDebris = debrisList.filter(d => !d.collected);
    if (availableDebris.length === 0) return null;

    let nearest: Debris | null = null;
    let minDistance = Infinity;

    availableDebris.forEach(d => {
      const distance = calculateDistance(robot.position, d.position);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = d;
      }
    });

    return nearest;
  }, []);

  const moveTowards = (current: Position, target: Position, speed: number): Position => {
    const dx = target.x - current.x;
    const dy = target.y - current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < speed) {
      return { ...target };
    }
    
    return {
      x: current.x + (dx / distance) * speed,
      y: current.y + (dy / distance) * speed,
    };
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRobots(prevRobots => {
        return prevRobots.map(robot => {
          let newRobot = { ...robot };
          const speed = 1.5;

          switch (robot.status) {
            case 'idle': {
              const nearestDebris = findNearestDebris(robot, debris);
              if (nearestDebris) {
                newRobot.status = 'moving-to-debris';
                newRobot.target = nearestDebris.position;
                newRobot.path = [{ ...robot.position }];
                addLog(`🤖 ${robot.id} targeting ${nearestDebris.id}`);
                
                setDebris(prev => prev.map(d => 
                  d.id === nearestDebris.id ? { ...d, collected: true } : d
                ));
                newRobot.carryingDebris = nearestDebris;
              }
              break;
            }

            case 'moving-to-debris': {
              if (robot.target) {
                const newPos = moveTowards(robot.position, robot.target, speed);
                newRobot.position = newPos;
                newRobot.path = [...robot.path, newPos];
                newRobot.battery = Math.max(0, robot.battery - 0.1);

                if (calculateDistance(newPos, robot.target) < 2) {
                  newRobot.status = 'collecting';
                  addLog(`✅ ${robot.id} reached debris`);
                }
              }
              break;
            }

            case 'collecting': {
              setTimeout(() => {
                setRobots(prev => prev.map(r => 
                  r.id === robot.id 
                    ? { ...r, status: 'returning', target: MOTHER_STATION, path: [...r.path] }
                    : r
                ));
                addLog(`📦 ${robot.id} collected, returning`);
              }, 500);
              break;
            }

            case 'returning': {
              const newPos = moveTowards(robot.position, MOTHER_STATION, speed);
              newRobot.position = newPos;
              newRobot.path = [...robot.path, newPos];
              newRobot.battery = Math.max(0, robot.battery - 0.1);

              if (calculateDistance(newPos, MOTHER_STATION) < 2) {
                newRobot.status = 'idle';
                newRobot.target = null;
                newRobot.carryingDebris = null;
                newRobot.path = [];
                newRobot.battery = 100;
                setCollectedCount(prev => prev + 1);
                addLog(`🏠 ${robot.id} delivered to station`);
              }
              break;
            }
          }

          return newRobot;
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, debris, findNearestDebris, addLog]);

  const handleStart = () => {
    setIsRunning(true);
    addLog('🚀 Mission started!');
  };

  const handleReset = () => {
    setIsRunning(false);
    setRobots(initialRobots);
    setDebris(initialDebris);
    setCollectedCount(0);
    setLogs([]);
  };

  const getStatusColor = (status: Robot['status']) => {
    switch (status) {
      case 'idle': return 'text-muted-foreground';
      case 'moving-to-debris': return 'text-primary';
      case 'collecting': return 'text-accent';
      case 'returning': return 'text-green-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleStart} 
            disabled={isRunning}
            className="btn-primary-glow"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Mission
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className="font-space text-sm text-muted-foreground">
              Debris: {debris.filter(d => !d.collected).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="font-space text-sm text-muted-foreground">
              Collected: {collectedCount}
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative aspect-[16/9] glass-card rounded-xl overflow-hidden border border-primary/30">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-primary/50"
              style={{ top: `${(i + 1) * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-primary/50"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>

        {/* Stars Background */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Mother Station */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: `${MOTHER_STATION.x}%`, top: `${MOTHER_STATION.y}%` }}
        >
          <div className="relative">
            <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-primary/30 rounded-full animate-ping" />
            <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-primary/20 rounded-full animate-pulse" />
            <Home className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(0,234,255,0.8)]" />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-orbitron text-[10px] text-primary whitespace-nowrap">
              MOTHER STATION
            </span>
          </div>
        </div>

        {/* Robot Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {robots.map(robot => (
            robot.path.length > 1 && (
              <polyline
                key={`path-${robot.id}`}
                points={robot.path.map(p => `${p.x}%,${p.y}%`).join(' ')}
                fill="none"
                stroke={robot.status === 'returning' ? '#00ff88' : '#00eaff'}
                strokeWidth="1"
                strokeDasharray="4 2"
                opacity="0.6"
                className="animate-pulse"
              />
            )
          ))}
        </svg>

        {/* Debris */}
        {debris.map(d => !d.collected && (
          <div
            key={d.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
            style={{ left: `${d.position.x}%`, top: `${d.position.y}%` }}
          >
            <div className="relative">
              <div 
                className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-destructive/30 rounded-full animate-pulse"
                style={{ width: d.size * 3, height: d.size * 3 }}
              />
              <Target 
                className="text-destructive drop-shadow-[0_0_8px_rgba(255,107,53,0.8)]" 
                style={{ width: d.size * 2, height: d.size * 2 }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-2 py-1 rounded text-[10px] font-space text-foreground whitespace-nowrap border border-primary/30">
                {d.id} • {d.material}
              </div>
            </div>
          </div>
        ))}

        {/* Robots */}
        {robots.map(robot => (
          <div
            key={robot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-75"
            style={{ left: `${robot.position.x}%`, top: `${robot.position.y}%` }}
          >
            <div className="relative group">
              <div className="absolute inset-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-primary/20 rounded-full animate-pulse" />
              <Rocket 
                className={`w-6 h-6 transition-all duration-200 drop-shadow-[0_0_10px_rgba(0,234,255,0.8)] ${
                  robot.status === 'returning' ? 'rotate-180 text-green-400' : 
                  robot.status === 'collecting' ? 'text-accent animate-bounce' : 
                  'text-primary'
                }`}
              />
              {robot.carryingDebris && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              )}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-2 py-1 rounded border border-primary/30">
                <div className="font-orbitron text-[10px] text-primary whitespace-nowrap">{robot.id}</div>
                <div className={`font-space text-[8px] capitalize ${getStatusColor(robot.status)}`}>
                  {robot.status.replace('-', ' ')}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3 space-y-2 z-40">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            <span className="font-space text-xs text-muted-foreground">Mother Station</span>
          </div>
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="font-space text-xs text-muted-foreground">Swarm Robot</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-destructive" />
            <span className="font-space text-xs text-muted-foreground">Space Debris</span>
          </div>
        </div>
      </div>

      {/* Live Logs */}
      <div className="glass-card rounded-lg p-4">
        <h4 className="font-orbitron text-sm text-primary mb-3 flex items-center gap-2">
          <Circle className="w-3 h-3 fill-primary animate-pulse" />
          MISSION LOG
        </h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="font-inter text-xs text-muted-foreground">Waiting for mission start...</p>
          ) : (
            logs.map((log, i) => (
              <p 
                key={i} 
                className="font-space text-xs text-foreground animate-fade-in"
                style={{ opacity: 1 - (i * 0.1) }}
              >
                {log}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Robot Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        {robots.map(robot => (
          <div key={robot.id} className="glass-card rounded-lg p-3 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-orbitron text-sm text-primary">{robot.id}</span>
              <span className={`font-space text-xs capitalize ${getStatusColor(robot.status)}`}>
                {robot.status.replace('-', ' ')}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  robot.battery > 50 ? 'bg-primary' : robot.battery > 20 ? 'bg-accent' : 'bg-destructive'
                }`}
                style={{ width: `${robot.battery}%` }}
              />
            </div>
            <span className="font-inter text-[10px] text-muted-foreground">{Math.round(robot.battery)}% Battery</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceRobotMap;