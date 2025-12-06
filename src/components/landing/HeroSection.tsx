import { Rocket, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      {/* Orbit Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
        <div className="orbit-ring w-full h-full" style={{ animationDuration: '30s' }} />
        <div className="orbit-ring w-[80%] h-[80%] absolute top-[10%] left-[10%]" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
        <div className="orbit-ring w-[60%] h-[60%] absolute top-[20%] left-[20%]" style={{ animationDuration: '20s' }} />
      </div>

      {/* 3D Floating Robot Placeholder */}
      <div className="absolute right-10 top-1/3 hidden xl:block animate-float">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <Rocket className="w-full h-full text-primary/40" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-space text-sm text-muted-foreground">Next-Gen Space Technology</span>
          </div>

          {/* Main Title */}
          <h1 className="section-title mb-6 animate-slide-up delay-100">
            <span className="gradient-text">AI SWARM ROBOTICS</span>
          </h1>
          
          <p className="font-orbitron text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-6 tracking-wide animate-slide-up delay-200">
            Reinventing Space Safety with Autonomous Micro-Bots
          </p>

          {/* Subtitle */}
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up delay-300">
            Next-gen swarm robots that detect, track and remove dangerous space debris using 
            <span className="text-primary"> AI vision</span> and 
            <span className="text-accent"> gecko-inspired nano-adhesive</span> technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-500">
            <Link to="/dashboard">
              <Button className="btn-primary-glow text-lg px-10 py-6">
                <Play className="w-5 h-5 mr-2" />
                <span>Launch Demo</span>
              </Button>
            </Link>
            <Link to="/auth">
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10 font-space text-lg px-10 py-6"
              >
                Login / Signup
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;