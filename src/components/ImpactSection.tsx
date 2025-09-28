import { useEffect, useState } from 'react';
import { Shield, Recycle, Rocket, Globe, DollarSign } from 'lucide-react';

const ImpactSection = () => {
  const [debrisRemoved, setDebrisRemoved] = useState(0);
  const [missionsSaved, setMissionsSaved] = useState(0);
  const [valueSaved, setValueSaved] = useState(0);

  useEffect(() => {
    const intervals = [
      setInterval(() => {
        setDebrisRemoved(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, 15847));
      }, 150),
      setInterval(() => {
        setMissionsSaved(prev => Math.min(prev + 1, 243));
      }, 500),
      setInterval(() => {
        setValueSaved(prev => Math.min(prev + Math.floor(Math.random() * 50) + 10, 12400));
      }, 200)
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const impacts = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Mission Safety",
      description: "Prevents catastrophic satellite collisions and protects astronaut missions",
      color: "text-primary"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Space Sustainability", 
      description: "Keeps orbital space clean and usable for future generations",
      color: "text-accent"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation Driver",
      description: "Advances robotics, AI, and autonomous space systems technology",
      color: "text-primary"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Collaboration",
      description: "Scalable system for governments, agencies, and space startups worldwide",
      color: "text-accent"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Economic Protection",
      description: "Safeguards billions in satellite infrastructure and space commerce",
      color: "text-primary"
    }
  ];

  return (
    <section id="impact" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 hero-title">
            Transforming Space Safety
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our solution creates lasting positive impact across safety, sustainability, 
            innovation, and economic protection for the global space industry.
          </p>
        </div>

        {/* Real-time Impact Counters */}
        <div className="glass-card p-12 rounded-3xl neon-border mb-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2 animate-pulse-glow">
                {debrisRemoved.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Debris Objects Removed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">
                {missionsSaved}
              </div>
              <div className="text-muted-foreground">Missions Protected</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">
                ${valueSaved.toLocaleString()}M
              </div>
              <div className="text-muted-foreground">Infrastructure Value Saved</div>
            </div>
          </div>
        </div>

        {/* Impact Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {impacts.map((impact, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-2xl hover-scale hover-glow text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${impact.color} mb-6 flex justify-center`}>
                {impact.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{impact.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {impact.description}
              </p>
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <div className="glass-card p-12 rounded-3xl text-center">
          <h3 className="text-4xl font-bold mb-6 hero-title">2030: Clean Space Vision</h3>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            By 2030, our autonomous swarm robotics network will have created the first 
            self-sustaining space debris cleanup ecosystem, ensuring safe passage for 
            humanity's greatest adventures among the stars.
          </p>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;