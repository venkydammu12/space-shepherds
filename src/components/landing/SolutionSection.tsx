import { Scan, Hand, RefreshCw, Battery, Repeat } from 'lucide-react';

const cycleSteps = [
  {
    icon: Scan,
    title: 'DETECT',
    description: 'AI vision scans orbit and identifies objects',
    color: 'primary',
  },
  {
    icon: Hand,
    title: 'COLLECT',
    description: 'Nano-robots attach using gecko-based adhesion',
    color: 'accent',
  },
  {
    icon: RefreshCw,
    title: 'REUSE',
    description: 'Robots detach safely and reset',
    color: 'primary',
  },
  {
    icon: Battery,
    title: 'RECHARGE',
    description: 'Return to base station for solar charging',
    color: 'accent',
  },
  {
    icon: Repeat,
    title: 'REPEAT',
    description: 'Infinite loop, fully autonomous',
    color: 'primary',
  },
];

export const SolutionSection = () => {
  return (
    <section id="solution" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            <span className="gradient-text">Our Solution</span>
          </h2>
          <p className="font-orbitron text-xl text-foreground/90">
            AI Swarm Robots Cycle
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left - Cycle Visualization */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96 animate-oscillate">
              {/* Glow Ring Behind */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-2xl" />
              
              {/* Main Circle */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full border border-primary/20" />
              
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-orbitron text-2xl font-bold text-primary">SWARM</p>
                  <p className="font-space text-sm text-muted-foreground">Autonomous Cycle</p>
                </div>
              </div>

              {/* Orbiting Steps */}
              {cycleSteps.map((step, index) => {
                const angle = (index * 360) / cycleSteps.length - 90;
                const radian = (angle * Math.PI) / 180;
                const radius = 140;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <div
                    key={step.title}
                    className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    <div className={`w-full h-full rounded-xl glass-card border-2 ${step.color === 'primary' ? 'border-primary' : 'border-accent'} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                      <step.icon className={`w-7 h-7 ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      <span className={`font-orbitron text-xs ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Step Details */}
          <div className="space-y-6">
            {cycleSteps.map((step, index) => (
              <div
                key={step.title}
                className="glass-card-hover rounded-xl p-6 flex items-start gap-4 group"
              >
                <div className={`p-3 rounded-lg ${step.color === 'primary' ? 'bg-primary/20 border-primary/30' : 'bg-accent/20 border-accent/30'} border`}>
                  <step.icon className={`w-6 h-6 ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className={`font-orbitron text-lg font-bold mb-1 ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                    {step.title}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;