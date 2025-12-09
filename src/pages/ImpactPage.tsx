import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Rocket, Shield, DollarSign, Microscope, Globe,
  Settings, Recycle, Cloud, Handshake, Leaf, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import impactCleanSpace from '@/assets/impact-clean-space.jpg';

const ImpactPage = () => {
  const navigate = useNavigate();

  const impactPoints = [
    {
      icon: Rocket,
      title: "Space Becomes Safer",
      description: "Satellites, ISS, and all space missions operate with significantly lower collision risk. Orbital highways stay clear for exploration.",
      color: "primary"
    },
    {
      icon: Shield,
      title: "Protects Astronauts",
      description: "Reduces fatal risk during EVA (spacewalk) missions. Astronauts can work in a cleaner orbital environment with greater confidence.",
      color: "accent"
    },
    {
      icon: DollarSign,
      title: "Saves Billions",
      description: "Avoids catastrophic damage to satellites, rockets, and telescopes worth billions. Insurance costs drop dramatically.",
      color: "primary"
    },
    {
      icon: Microscope,
      title: "Supports Scientific Missions",
      description: "Improves accuracy of space observations and deep space research. Hubble, JWST, and future telescopes operate safely.",
      color: "accent"
    },
    {
      icon: Globe,
      title: "Strengthens Global Space Security",
      description: "Helps all countries protect their orbital assets. International cooperation in maintaining safe space operations.",
      color: "primary"
    },
  ];

  const sdgGoals = [
    {
      number: 9,
      title: "Industry, Innovation & Infrastructure",
      description: "Advanced robotics + AI improves global space infrastructure. Pioneering autonomous systems for orbital operations.",
      icon: Settings,
      color: "from-orange-500 to-orange-600"
    },
    {
      number: 12,
      title: "Responsible Consumption & Production",
      description: "Space waste management through better recycling & reuse. Turning debris into valuable resources.",
      icon: Recycle,
      color: "from-amber-500 to-amber-600"
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Space debris affects climate satellites. Protecting them helps climate monitoring and environmental research.",
      icon: Cloud,
      color: "from-green-500 to-green-600"
    },
    {
      number: 17,
      title: "Partnerships for the Goals",
      description: "This project can be used by NASA, ISRO, ESA, JAXA — enabling global cooperation for space sustainability.",
      icon: Handshake,
      color: "from-blue-500 to-blue-600"
    },
  ];

  const mdgGoals = [
    {
      number: 7,
      title: "Environmental Sustainability",
      description: "Orbital environment is also an ecosystem — cleaning it is environmental sustainability in space.",
      icon: Leaf,
      color: "accent"
    },
    {
      number: 8,
      title: "Global Partnership",
      description: "International collaboration for safe space operations. All nations benefit from clean orbits.",
      icon: Users,
      color: "primary"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        {/* Floating success particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={impactCleanSpace} 
            alt="Clean space with swarm robots" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>

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
              <span className="text-foreground">GLOBAL </span>
              <span className="text-accent drop-shadow-[0_0_30px_hsl(var(--accent)/0.5)]">IMPACT</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              How AI Swarm Robotics transforms space safety and contributes 
              to global sustainability goals.
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
                onClick={() => navigate('/solution')}
                className="border-border/50 hover:border-accent/50"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                View Solution
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_30px_hsl(var(--accent)/0.4)]"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Points Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 font-orbitron"
          >
            <span className="text-foreground">Impact of </span>
            <span className="text-primary">AI Swarm Robotics</span>
          </motion.h2>

          <div className="space-y-8">
            {impactPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: index % 2 === 0 ? 10 : -10 }}
                className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 flex items-start gap-6"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${point.color}/20 flex items-center justify-center flex-shrink-0`}>
                  <point.icon className={`w-8 h-8 text-${point.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-orbitron flex items-center gap-3">
                    <Rocket className={`w-6 h-6 text-${point.color}`} />
                    {point.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Goals Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
              <span className="text-foreground">Impact on </span>
              <span className="text-primary">SDG</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              UN Sustainable Development Goals supported by our space debris cleanup mission
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-8 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden relative group"
              >
                {/* Gradient badge */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${goal.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-lg`}>
                      <goal.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-primary font-bold">SDG {goal.number}</div>
                      <h3 className="text-xl font-bold text-foreground font-orbitron">{goal.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MDG Goals Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4">
              <span className="text-foreground">Impact on </span>
              <span className="text-accent">MDG</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Millennium Development Goals (even though ended in 2015, the project indirectly supports)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mdgGoals.map((goal, index) => (
              <motion.div
                key={goal.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-${goal.color}/20 flex items-center justify-center`}>
                    <goal.icon className={`w-7 h-7 text-${goal.color}`} />
                  </div>
                  <div>
                    <div className="text-sm text-accent font-bold">MDG {goal.number}</div>
                    <h3 className="text-lg font-bold text-foreground font-orbitron">{goal.title}</h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-orbitron">
              <span className="text-foreground">Projected </span>
              <span className="text-primary">Impact by 2030</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "90%", label: "Debris Reduction", suffix: "" },
                { value: "$50B", label: "Assets Protected", suffix: "+" },
                { value: "195", label: "Countries Benefited", suffix: "" },
                { value: "99.7%", label: "Mission Success Rate", suffix: "" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-orbitron">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
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
            className="glass-card p-12 rounded-3xl border border-accent/30 text-center max-w-4xl mx-auto bg-gradient-to-br from-accent/5 to-primary/5"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-orbitron">
              <span className="text-foreground">Join the </span>
              <span className="text-accent">Mission</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of the solution. Sign up to explore our virtual prototype 
              and experience the future of space debris cleanup.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => navigate('/auth')}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 shadow-[0_0_40px_hsl(var(--accent)/0.4)]"
                >
                  Get Started Now
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  className="border-primary/50 hover:border-primary text-lg px-10 py-6"
                >
                  Learn More
                </Button>
              </motion.div>
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

export default ImpactPage;
