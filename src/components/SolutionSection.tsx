import { useState } from 'react';
import { Search, Package, Repeat, Home, Zap } from 'lucide-react';
import swarmRobotsImage from '@/assets/swarm-robots.jpg';
import motherstationImage from '@/assets/motherstation.jpg';

const SolutionSection = () => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const stages = [
    {
      id: 1,
      title: "Deploy",
      icon: <Home className="w-8 h-8" />,
      description: "Motherstation deploys autonomous swarm robots into orbital space",
      details: "Advanced motherstation with multiple docking bays releases coordinated robot swarms"
    },
    {
      id: 2,
      title: "Detect",
      icon: <Search className="w-8 h-8" />,
      description: "AI-powered sensors and GPS mapping locate debris objects",
      details: "Machine learning algorithms process real-time sensor data to identify and track debris"
    },
    {
      id: 3,
      title: "Collect",
      icon: <Package className="w-8 h-8" />,
      description: "Robots safely capture and secure debris using docking systems",
      details: "Precision robotic arms and magnetic capture systems safely handle various debris types"
    },
    {
      id: 4,
      title: "Return",
      icon: <Repeat className="w-8 h-8" />,
      description: "Loaded robots return to motherstation for processing",
      details: "Autonomous navigation systems guide robots back to motherstation for debris processing"
    },
    {
      id: 5,
      title: "Process",
      icon: <Zap className="w-8 h-8" />,
      description: "Debris is recycled or stored, robots are recharged and redeployed",
      details: "Automated sorting, recycling, and robot maintenance for continuous operation"
    }
  ];

  return (
    <section id="solution" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 hero-title">
            Autonomous Solution Loop
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered swarm robotics system creates a continuous, scalable cleanup process 
            that operates 24/7 to keep orbital space safe and accessible.
          </p>
        </div>

        {/* Solution Loop Visual */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="relative w-96 h-96 mx-auto">
            {/* Central Hub */}
            <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 glass-card rounded-full flex items-center justify-center neon-border">
              <Zap className="w-8 h-8 text-primary animate-pulse-glow" />
            </div>

            {/* Solution Stages */}
            {stages.map((stage, index) => {
              const angle = (360 / stages.length) * index - 90;
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * 160;
              const y = Math.sin(radian) * 160;

              return (
                <div
                  key={stage.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`
                  }}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                >
                  <div className={`solution-stage glass-card p-6 rounded-2xl w-32 h-32 flex flex-col items-center justify-center text-center ${
                    hoveredStage === stage.id ? 'neon-border' : ''
                  }`}>
                    <div className="text-primary mb-2">{stage.icon}</div>
                    <div className="text-sm font-bold">{stage.title}</div>
                  </div>

                  {/* Connecting Lines */}
                  <div 
                    className="absolute w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle + 180}deg)`,
                      transformOrigin: '0 50%'
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Stage Description */}
          {hoveredStage && (
            <div className="mt-8 glass-card p-6 rounded-2xl text-center animate-fade-in-up">
              <h3 className="text-xl font-bold mb-2 text-primary">
                {stages[hoveredStage - 1].title} Phase
              </h3>
              <p className="text-muted-foreground">
                {stages[hoveredStage - 1].details}
              </p>
            </div>
          )}
        </div>

        {/* Visual Assets */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-card p-8 rounded-3xl hover-scale">
            <img 
              src={swarmRobotsImage} 
              alt="AI Swarm Robots in Space" 
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
            <h3 className="text-2xl font-bold mb-4 text-primary">Swarm Intelligence</h3>
            <p className="text-muted-foreground">
              Coordinated AI robots work together using advanced sensor networks 
              and machine learning to efficiently locate and capture space debris.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl hover-scale">
            <img 
              src={motherstationImage} 
              alt="Orbital Motherstation" 
              className="w-full h-64 object-cover rounded-2xl mb-6"
            />
            <h3 className="text-2xl font-bold mb-4 text-accent">Motherstation Hub</h3>
            <p className="text-muted-foreground">
              Central processing facility with automated docking bays, debris recycling 
              systems, and robot maintenance capabilities for continuous operation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;