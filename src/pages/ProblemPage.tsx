import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, Satellite, Zap, ArrowLeft, ArrowRight, 
  Radio, Users, DollarSign, Globe, TrendingUp, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import earthDebrisCrisis from '@/assets/earth-debris-crisis.jpg';

const ProblemPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const problemStats = [
    { value: "34,000+", label: "Tracked Objects", description: "Large debris in orbit" },
    { value: "900,000", label: "1-10cm Pieces", description: "Untracked fragments" },
    { value: "130M+", label: "Tiny Fragments", description: "Microscopic debris" },
    { value: "17,500", label: "MPH Speed", description: "Average debris velocity" },
  ];

  const debrisGrowthData = [
    { year: "1960", count: 50 },
    { year: "1980", count: 5000 },
    { year: "2000", count: 12000 },
    { year: "2010", count: 22000 },
    { year: "2020", count: 34000 },
    { year: "2024", count: 42000 },
  ];

  const riskCategories = [
    {
      icon: Satellite,
      title: "Risk to Satellites",
      description: "Navigation, communication, weather, and defense satellites face constant collision threats. GPS, internet, and military systems depend on safe orbital operations.",
      color: "primary"
    },
    {
      icon: Users,
      title: "Risk to ISS & Astronauts",
      description: "Spacewalks become increasingly dangerous. ISS performs emergency maneuvers multiple times per year. Human lives are at stake during every mission.",
      color: "destructive"
    },
    {
      icon: DollarSign,
      title: "Economic Damage",
      description: "Billions lost yearly in satellite damage, mission delays, and insurance costs. Space industry valued at $400B+ is under threat.",
      color: "accent"
    },
    {
      icon: Globe,
      title: "Global Safety Issue",
      description: "Affects all nations. Debris doesn't respect borders. International cooperation essential but insufficient without active cleanup.",
      color: "primary"
    },
  ];

  const kesslerFacts = [
    "A single collision creates thousands of new debris pieces",
    "Chain reactions can make orbits unusable for centuries",
    "Low Earth Orbit most at risk - where most satellites operate",
    "Current tracking cannot detect objects smaller than 10cm",
    "Debris travels 10x faster than a bullet",
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/10 via-transparent to-transparent" />
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-destructive/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Hero Section with Parallax Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: parallaxY }}
        >
          <img 
            src={earthDebrisCrisis} 
            alt="Earth surrounded by space debris" 
            className="w-full h-[120%] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-bold mb-6 font-orbitron"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-foreground">THE SPACE DEBRIS</span>
              <br />
              <span className="text-destructive drop-shadow-[0_0_30px_hsl(var(--destructive)/0.5)]">CRISIS</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Space is becoming dangerously crowded. Without immediate action, 
              we risk losing access to orbit forever.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
                className="border-border/50 hover:border-primary/50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/solution')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              >
                View Our Solution
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {problemStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 rounded-2xl text-center border border-destructive/20 hover:border-destructive/40 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-destructive mb-2 font-orbitron">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Crisis Explanation */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-orbitron">
                <span className="text-foreground">The </span>
                <span className="text-destructive">Danger</span>
                <span className="text-foreground"> is Real</span>
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <span>Even a <strong className="text-foreground">1cm object</strong> can destroy satellites due to extreme orbital velocity — traveling faster than a speeding bullet.</span>
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>Astronauts on the ISS face <strong className="text-foreground">increasing risk</strong> during spacewalks. The station performs emergency avoidance maneuvers multiple times per year.</span>
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <Radio className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span><strong className="text-foreground">GPS, satellites, rockets, and communication systems</strong> are all affected. Modern life depends on safe orbital operations.</span>
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <Zap className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <span>Collisions create chain reactions — the <strong className="text-foreground">"Kessler Syndrome"</strong> — making space unusable for generations.</span>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk Categories Grid */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 font-orbitron"
          >
            <span className="text-foreground">Critical </span>
            <span className="text-primary">Risk Areas</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {riskCategories.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card p-8 rounded-2xl border border-border/30 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${risk.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <risk.icon className={`w-8 h-8 text-${risk.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-orbitron">{risk.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{risk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Debris Growth Infographic */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-destructive/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-orbitron">
              <span className="text-foreground">Debris Count </span>
              <span className="text-destructive">Over Years</span>
            </h2>

            <div className="flex items-end justify-between gap-4 h-64 mb-8">
              {debrisGrowthData.map((data, index) => (
                <motion.div
                  key={data.year}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(data.count / 42000) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                  className="flex-1 bg-gradient-to-t from-destructive/80 to-destructive/40 rounded-t-lg relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.count.toLocaleString()}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                    {data.year}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-12">
              <TrendingUp className="w-5 h-5 inline mr-2 text-destructive" />
              Debris count has increased <strong className="text-foreground">800x</strong> since the space age began
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kessler Syndrome Warning */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-destructive/30 bg-destructive/5"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-12 h-12 text-destructive" />
              <h2 className="text-3xl md:text-4xl font-bold font-orbitron">
                <span className="text-destructive">Kessler Syndrome</span>
              </h2>
            </div>

            <p className="text-center text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The nightmare scenario: a cascading chain reaction of collisions that could make space 
              <strong className="text-foreground"> unusable for centuries</strong>.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kesslerFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-destructive/20"
                >
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">{fact}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 pb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl border border-primary/30 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
              <span className="text-foreground">Why This Project </span>
              <span className="text-primary">is Needed</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We need <strong className="text-foreground">immediate, autonomous, continuous cleaning</strong> — 
              not just tracking, but active removal of debris before it's too late.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/solution')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                Discover Our Solution
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 AI Swarm Robotics — Securing the Future of Space Exploration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProblemPage;
