import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, Satellite, Users, DollarSign, Globe, 
  ArrowLeft, ArrowRight, TrendingUp, Radio, Zap, Eye, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import earthDebrisCrisis from '@/assets/earth-debris-crisis.jpg';

const ProblemPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const debrisGrowthData = [
    { year: "1960", count: 50, height: 2 },
    { year: "1970", count: 2000, height: 8 },
    { year: "1980", count: 5000, height: 15 },
    { year: "1990", count: 8000, height: 22 },
    { year: "2000", count: 12000, height: 32 },
    { year: "2010", count: 22000, height: 55 },
    { year: "2020", count: 34000, height: 80 },
    { year: "2024", count: 42000, height: 100 },
  ];

  const riskCategories = [
    {
      icon: Satellite,
      title: "Risk to Satellites",
      description: "Navigation systems like GPS, communication networks, weather satellites, and defense systems face constant collision threats. Modern life depends on safe orbital operations.",
      color: "primary",
      stats: "4,000+ active satellites at risk"
    },
    {
      icon: Users,
      title: "Risk to ISS & Astronauts",
      description: "Spacewalks become increasingly dangerous. ISS performs emergency avoidance maneuvers multiple times per year. Human lives are at stake during every mission.",
      color: "destructive",
      stats: "27+ debris avoidance maneuvers since 1999"
    },
    {
      icon: DollarSign,
      title: "Economic Damage",
      description: "Billions lost yearly in satellite damage, mission delays, and insurance costs. The global space industry valued at $400B+ is under growing threat.",
      color: "accent",
      stats: "$10B+ in potential losses annually"
    },
    {
      icon: Globe,
      title: "Global Safety Issue",
      description: "Space debris affects all nations equally. Debris doesn't respect borders. International cooperation is essential but insufficient without active cleanup.",
      color: "primary",
      stats: "195 countries affected globally"
    },
  ];

  const crisisPoints = [
    {
      icon: AlertTriangle,
      text: "Space is becoming dangerously crowded with tiny + large debris fragments",
      color: "destructive"
    },
    {
      icon: Zap,
      text: "Even a 1 cm object can destroy satellites due to extreme orbital velocity (17,500 mph)",
      color: "accent"
    },
    {
      icon: Users,
      text: "Astronauts on ISS have increasing risk during spacewalks and EVA missions",
      color: "primary"
    },
    {
      icon: Radio,
      text: "Satellites, rockets, GPS, and communication systems are all affected",
      color: "destructive"
    },
    {
      icon: Eye,
      text: "Real-time monitoring is almost impossible with human-only tracking methods",
      color: "accent"
    },
    {
      icon: Shield,
      text: "Collisions create chain reactions → \"Kessler Syndrome\" making space unusable",
      color: "primary"
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/10 via-transparent to-transparent" />
        {/* Floating debris particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-destructive/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
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
            className="w-full h-[120%] object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
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
              <span className="text-destructive drop-shadow-[0_0_40px_hsl(var(--destructive)/0.6)]">CRISIS</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Our orbital environment is becoming dangerously crowded.
              Without immediate action, we risk losing access to space forever.
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
                className="border-border/50 hover:border-primary/50 backdrop-blur-sm"
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
              <motion.div 
                className="w-1.5 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crisis Points Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
              <span className="text-foreground">The </span>
              <span className="text-destructive">Crisis</span>
              <span className="text-foreground"> is Real</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding the dangers of space debris
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crisisPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-6 rounded-2xl border border-border/30 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-${point.color}/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <point.icon className={`w-7 h-7 text-${point.color} drop-shadow-[0_0_10px_hsl(var(--${point.color})/0.5)]`} />
                  </motion.div>
                  <p className="text-foreground text-lg leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Categories with Neon Icons */}
      <section className="relative z-10 py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 font-orbitron"
          >
            <span className="text-foreground">Critical </span>
            <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]">Risk Areas</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {riskCategories.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-8 rounded-3xl border border-border/30 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Neon glow effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-${risk.color}/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div 
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${risk.color}/30 to-${risk.color}/10 flex items-center justify-center border border-${risk.color}/30 shadow-[0_0_30px_hsl(var(--${risk.color})/0.3)]`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <risk.icon className={`w-10 h-10 text-${risk.color} drop-shadow-[0_0_15px_hsl(var(--${risk.color})/0.8)]`} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2 font-orbitron">{risk.title}</h3>
                      <span className={`text-sm text-${risk.color} font-semibold`}>{risk.stats}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">{risk.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Infographic: Debris Count Over Years */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-destructive/20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
                <span className="text-foreground">Debris Count </span>
                <span className="text-destructive drop-shadow-[0_0_20px_hsl(var(--destructive)/0.5)]">Over Years</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                <TrendingUp className="w-5 h-5 inline mr-2 text-destructive" />
                Tracked objects in Earth's orbit growing exponentially
              </p>
            </div>

            {/* Animated Bar Chart */}
            <div className="relative h-80 md:h-96 flex items-end justify-between gap-2 md:gap-4 px-4">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground pr-2">
                <span>42,000</span>
                <span>30,000</span>
                <span>20,000</span>
                <span>10,000</span>
                <span>0</span>
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 ml-12 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-border/20 w-full" />
                ))}
              </div>

              {/* Bars */}
              <div className="flex items-end justify-between gap-2 md:gap-4 w-full ml-12">
                {debrisGrowthData.map((data, index) => (
                  <motion.div
                    key={data.year}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${data.height}%`, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                    className="flex-1 relative group cursor-pointer"
                  >
                    <motion.div
                      className="w-full bg-gradient-to-t from-destructive to-destructive/60 rounded-t-lg relative overflow-hidden"
                      style={{ height: '100%' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-destructive/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                        initial={{ y: '100%' }}
                        whileInView={{ y: '-100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                      />
                    </motion.div>

                    {/* Tooltip on hover */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-card border border-destructive/30 rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                      <div className="text-destructive font-bold text-lg">{data.count.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">objects</div>
                    </div>

                    {/* Year label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-medium">
                      {data.year}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p 
              className="text-center text-muted-foreground mt-16 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            >
              <AlertTriangle className="w-5 h-5 inline mr-2 text-destructive animate-pulse" />
              Debris count has increased <strong className="text-destructive">800x</strong> since the space age began
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why This Project is Needed */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-16 rounded-3xl border border-primary/30 text-center max-w-5xl mx-auto relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_hsl(var(--primary)/0.5)]"
              >
                <Shield className="w-12 h-12 text-primary-foreground" />
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
                <span className="text-foreground">Why This Project </span>
                <span className="text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]">is Needed</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                We need <strong className="text-foreground">immediate, autonomous, continuous cleaning</strong> — 
                not just tracking, but active removal of debris before it's too late.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <motion.div 
                  className="glass-card p-6 rounded-2xl border border-primary/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2 font-orbitron">Immediate</div>
                  <p className="text-muted-foreground">Action needed now before Kessler Syndrome becomes irreversible</p>
                </motion.div>
                <motion.div 
                  className="glass-card p-6 rounded-2xl border border-accent/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-accent mb-2 font-orbitron">Autonomous</div>
                  <p className="text-muted-foreground">AI-powered robots working 24/7 without human risk</p>
                </motion.div>
                <motion.div 
                  className="glass-card p-6 rounded-2xl border border-primary/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-primary mb-2 font-orbitron">Continuous</div>
                  <p className="text-muted-foreground">Non-stop operation for long-term orbital safety</p>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/solution')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-7 shadow-[0_0_50px_hsl(var(--primary)/0.5)] font-orbitron"
                >
                  Discover Our Solution
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </div>
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
