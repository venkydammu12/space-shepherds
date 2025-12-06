import { AlertTriangle, Zap, Satellite } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: '10,000+',
    subtitle: 'inactive satellites orbiting Earth',
    description: 'Growing threat to space infrastructure',
  },
  {
    icon: Zap,
    title: 'High Collision Risk',
    subtitle: 'for ISS & spacecraft',
    description: 'Kessler syndrome becoming reality',
  },
  {
    icon: Satellite,
    title: 'Even 1cm debris',
    subtitle: 'can destroy a satellite',
    description: 'Traveling at 28,000 km/h',
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            <span className="text-destructive">The Space Debris Crisis</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Millions of debris fragments orbit Earth, threatening satellites, the ISS, and future space exploration
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="glass-card-hover rounded-2xl p-8 text-center group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full transition-all duration-500 group-hover:bg-destructive/40" />
                <div className="relative p-4 rounded-2xl bg-destructive/10 border border-destructive/30">
                  <problem.icon className="w-10 h-10 text-destructive" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-orbitron text-2xl font-bold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="font-space text-lg text-primary mb-3">
                {problem.subtitle}
              </p>
              <p className="font-inter text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;