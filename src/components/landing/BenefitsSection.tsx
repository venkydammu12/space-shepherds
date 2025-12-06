import { Rocket, RefreshCw, Search, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Rocket,
    title: 'Works in Vacuum & Microgravity',
    description: 'Designed specifically for the harsh conditions of outer space with no atmosphere dependency',
  },
  {
    icon: RefreshCw,
    title: 'Dry Gecko Adhesion',
    description: 'No liquids or glue needed - inspired by gecko feet for reusable attachment and release',
  },
  {
    icon: Search,
    title: 'Instant Material Detection',
    description: 'AI-powered sensors identify debris material composition in milliseconds',
  },
  {
    icon: Shield,
    title: 'Collision Prevention',
    description: 'Actively protects ISS, satellites and future astronauts from orbital hazards',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            <span className="text-foreground">Why AI Swarm Robotics</span>
          </h2>
          <p className="font-orbitron text-xl text-primary">
            Changes Space Forever
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-card-hover rounded-2xl p-8 group cursor-pointer animate-tilt"
              style={{ 
                animationDelay: `${index * 0.5}s`,
                animationDuration: '8s',
              }}
            >
              {/* Neon Border Overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 neon-border pointer-events-none" />

              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full transition-all duration-500 group-hover:bg-primary/50" />
                <div className="relative p-4 rounded-2xl bg-primary/10 border border-primary/30 group-hover:border-primary transition-colors duration-300">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;