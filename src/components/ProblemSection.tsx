import { AlertTriangle, Satellite, Zap } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Collision Crisis",
      description: "Over 34,000 tracked debris objects threaten active satellites and spacecraft daily."
    },
    {
      icon: <Satellite className="w-8 h-8" />,
      title: "Mission Risk",
      description: "Each debris collision can destroy billion-dollar satellites and jeopardize future missions."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cascade Effect", 
      description: "Without cleanup, collisions create more debris, making space exploration impossible."
    }
  ];

  return (
    <section id="problem" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 hero-title">
            The Hidden Threat Above Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Space debris poses an existential threat to humanity's future in space. 
            Without immediate action, we risk losing access to the final frontier forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-2xl hover-scale hover-glow"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-destructive mb-6 flex justify-center">
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{problem.title}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="glass-card p-12 rounded-3xl neon-border">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">34,000+</div>
              <div className="text-muted-foreground">Tracked Debris Objects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">130M+</div>
              <div className="text-muted-foreground">Smaller Fragments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">17,500</div>
              <div className="text-muted-foreground">mph Average Speed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-destructive mb-2">$Billions</div>
              <div className="text-muted-foreground">At Risk Daily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;