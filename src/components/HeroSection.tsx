import { Button } from '@/components/ui/button';
import earthDebrisImage from '@/assets/earth-debris.jpg';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${earthDebrisImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
      
      {/* Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="orbit-ring w-96 h-96 absolute animate-rotate" style={{ animationDuration: '30s' }} />
        <div className="orbit-ring w-80 h-80 absolute animate-rotate" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
        <div className="orbit-ring w-64 h-64 absolute animate-rotate" style={{ animationDuration: '20s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 hero-title animate-fade-in-up">
          AI Swarm Robotics
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          for Space Debris Cleanup
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          A future-ready solution for safe space exploration using autonomous swarm robotics and AI
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 animate-pulse-glow"
            onClick={() => scrollToSection('mission-control')}
          >
            Launch Mission Control
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4"
            onClick={() => scrollToSection('solution')}
          >
            View Solution Loop
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-floating opacity-60" />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full animate-floating opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-primary rounded-full animate-floating opacity-70" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default HeroSection;