import { Rocket } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="font-orbitron font-bold text-lg gradient-text">AI SWARM ROBOTICS</span>
          </div>

          {/* Copyright */}
          <p className="font-inter text-sm text-muted-foreground text-center">
            © 2025 AI Swarm Robotics – Protecting Earth's Orbit.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;