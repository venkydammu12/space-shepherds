import { Button } from '@/components/ui/button';
import { Rocket, Users, Mail } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="glass-card p-16 rounded-3xl neon-border text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 hero-title">
            Join the Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            Be part of the solution that secures humanity's future in space. Together, we can clean 
            the cosmos and ensure safe passage for the next generation of space explorers.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-8 rounded-2xl hover-scale">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Space Agencies</h3>
              <p className="text-muted-foreground mb-4">
                Partner with us to protect your satellite infrastructure and missions.
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn More
              </Button>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-scale">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Investors</h3>
              <p className="text-muted-foreground mb-4">
                Invest in the future of space sustainability and safety technology.
              </p>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                View Deck
              </Button>
            </div>

            <div className="glass-card p-8 rounded-2xl hover-scale">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Get Updates</h3>
              <p className="text-muted-foreground mb-4">
                Stay informed about our progress and upcoming mission milestones.
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-4 animate-pulse-glow"
            >
              Schedule Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-12 py-4"
            >
              Download Whitepaper
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="text-sm text-muted-foreground">
              Together, we're building a cleaner, safer future among the stars.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;