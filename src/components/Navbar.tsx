import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, LogIn, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import logoMain from '@/assets/logo-main.png';

const navLinks = [
  { href: '/', label: 'Home', scrollId: 'home' },
  { href: '/problem', label: 'Problem', scrollId: 'problem' },
  { href: '/solution', label: 'Solution', scrollId: 'solution' },
  { href: '/impact', label: 'Impact', scrollId: 'impact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [logoPreviewOpen, setLogoPreviewOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavClick = (href: string, scrollId?: string) => {
    setIsOpen(false);
    // If on home page and there's a scrollId, scroll to section
    if (location.pathname === '/' && scrollId) {
      const element = document.getElementById(scrollId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <Link to="/" className="relative">
            <Rocket className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </Link>
          
          <Dialog open={logoPreviewOpen} onOpenChange={setLogoPreviewOpen}>
            <DialogTrigger asChild>
              <button className="focus:outline-none cursor-pointer">
                <img 
                  src={logoMain} 
                  alt="AI Swarm Robotics" 
                  className="h-12 w-auto transition-transform duration-300 hover:scale-105"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-background/95 backdrop-blur-xl border border-primary/30 p-0 overflow-hidden">
              <div className="relative">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
                
                {/* Logo container */}
                <div className="relative p-8 flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150 animate-pulse" />
                    <img 
                      src={logoMain} 
                      alt="AI Swarm Robotics Logo" 
                      className="relative w-64 h-auto drop-shadow-[0_0_30px_rgba(0,234,255,0.5)] animate-scale-in"
                    />
                  </div>
                  
                  {/* Info section */}
                  <div className="text-center space-y-3">
                    <h3 className="font-orbitron text-xl text-primary tracking-wider">
                      AI SWARM ROBOTICS
                    </h3>
                    <p className="font-space text-sm text-muted-foreground max-w-xs">
                      Autonomous Space Debris Cleanup Mission
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-inter text-xs text-primary/80">Mission Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={location.pathname === '/' && link.scrollId ? '#' : link.href}
              onClick={(e) => {
                if (location.pathname === '/' && link.scrollId) {
                  e.preventDefault();
                  handleNavClick(link.href, link.scrollId);
                }
              }}
              className="font-space text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button className="btn-primary-glow">
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-space">
                <LogIn className="w-4 h-4 mr-2" />
                Login / Signup
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass-card mt-2 mx-4 rounded-xl p-6 animate-slide-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={location.pathname === '/' && link.scrollId ? '#' : link.href}
                onClick={(e) => {
                  if (location.pathname === '/' && link.scrollId) {
                    e.preventDefault();
                    handleNavClick(link.href, link.scrollId);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="font-space text-lg text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4 mt-2">
              {user ? (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full btn-primary-glow">
                    <span>Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button className="w-full border-primary/50 text-primary hover:bg-primary/10">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login / Signup
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;