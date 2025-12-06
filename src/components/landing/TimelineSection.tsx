import { useEffect, useRef, useState } from 'react';

const milestones = [
  {
    year: '2200',
    title: 'Debris-Free Orbit',
    description: 'Autonomous cleanup achieves pristine Earth orbit',
  },
  {
    year: '2600',
    title: 'Space Recycling',
    description: 'Debris recycled into new spacecraft parts',
  },
  {
    year: '3000',
    title: 'Zero Human Risk',
    description: 'Complete safety for all space missions',
  },
  {
    year: '3500',
    title: 'Asteroid Mining',
    description: 'Swarm robots deployed for resource extraction',
  },
];

export const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress through section
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      const newIndex = Math.min(Math.floor(progress * milestones.length), milestones.length - 1);
      
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            <span className="gradient-text">1000-Year Future Impact</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            The long-term vision for autonomous space debris management
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full" />
            
            {/* Active Line */}
            <div 
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-primary via-primary to-accent rounded-full transition-all duration-700 neon-glow"
              style={{ width: `${((activeIndex + 1) / milestones.length) * 100}%` }}
            />

            {/* Milestone Points */}
            <div className="relative flex justify-between">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    index <= activeIndex ? 'opacity-100' : 'opacity-40'
                  }`}
                  style={{
                    transform: index <= activeIndex ? 'translateY(0)' : 'translateY(10px)',
                  }}
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index <= activeIndex 
                      ? 'bg-primary text-primary-foreground neon-glow' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <span className="font-orbitron text-xs font-bold">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-6 text-center max-w-[150px] md:max-w-[200px]">
                    <p className={`font-orbitron text-lg font-bold mb-1 transition-colors duration-500 ${
                      index <= activeIndex ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {milestone.year}
                    </p>
                    <h3 className="font-space text-sm md:text-base font-semibold text-foreground mb-1">
                      {milestone.title}
                    </h3>
                    <p className="font-inter text-xs md:text-sm text-muted-foreground hidden sm:block">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;