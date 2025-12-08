import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Chrome as Home, Globe, Leaf, Users, Target, TrendingUp, Heart, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const ImpactPage = () => {
  const navigate = useNavigate();

  const sdgGoals = [
    {
      number: 3,
      title: "Good Health and Well-being",
      description: "Protecting astronauts and space workers from debris collisions",
      icon: Heart,
      color: "text-red-400",
      progress: 85
    },
    {
      number: 7,
      title: "Affordable and Clean Energy",
      description: "Solar-powered autonomous robots for sustainable space operations",
      icon: Zap,
      color: "text-yellow-400",
      progress: 92
    },
    {
      number: 9,
      title: "Industry, Innovation and Infrastructure",
      description: "Advanced AI and robotics technology for space infrastructure protection",
      icon: Target,
      color: "text-orange-400",
      progress: 96
    },
    {
      number: 11,
      title: "Sustainable Cities and Communities",
      description: "Ensuring safe satellite communications for global communities",
      icon: Users,
      color: "text-orange-500",
      progress: 78
    },
    {
      number: 12,
      title: "Responsible Consumption and Production",
      description: "Recycling space debris into useful materials and components",
      icon: Leaf,
      color: "text-green-400",
      progress: 88
    },
    {
      number: 17,
      title: "Partnerships for the Goals",
      description: "Global collaboration between space agencies and organizations",
      icon: Globe,
      color: "text-blue-400",
      progress: 94
    }
  ];

  const impactMetrics = [
    {
      value: "2.5M",
      label: "Lives Protected",
      description: "Astronauts and space workers",
      icon: Shield,
      color: "primary"
    },
    {
      value: "$50B",
      label: "Infrastructure Saved",
      description: "Satellite and space assets",
      icon: TrendingUp,
      color: "accent"
    },
    {
      value: "195",
      label: "Countries Benefited",
      description: "Global satellite coverage",
      icon: Globe,
      color: "primary"
    },
    {
      value: "99.7%",
      label: "Mission Success",
      description: "Debris cleanup efficiency",
      icon: Target,
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-cosmic" />
      <Navbar />
      
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/virtual-prototype')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Virtual Prototype
        </Button>
        <div className="text-sm text-muted-foreground">Global Impact & SDGs</div>
        <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-black">
          Home
          <Home className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold hero-title mb-6">
              GLOBAL <span className="text-accent">IMPACT</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aligning space debris cleanup with UN Sustainable Development Goals 
              for a safer, more sustainable future in space and on Earth
            </p>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-16"
          >
            {impactMetrics.map((metric, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center hover-scale">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-${metric.color}/20`}>
                  <metric.icon className={`w-8 h-8 text-${metric.color}`} />
                </div>
                <div className={`text-3xl font-bold text-${metric.color} mb-2`}>
                  {metric.value}
                </div>
                <div className="text-lg font-medium mb-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </div>
            ))}
          </motion.div>

          {/* SDG Goals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold hero-title mb-4">
                UN Sustainable Development Goals
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our space debris cleanup mission directly contributes to multiple SDGs, 
                creating positive impact both in space and on Earth
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sdgGoals.map((goal, index) => (
                <motion.div
                  key={goal.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hologram-box p-6 rounded-2xl hover-scale"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${goal.color} bg-current/20`}>
                      <goal.icon className={`w-6 h-6 ${goal.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      SDG {goal.number}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3">{goal.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{goal.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className={`text-sm font-bold ${goal.color}`}>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-card h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${goal.color.replace('text-', 'bg-')}`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="glass-card p-12 rounded-3xl neon-border">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold hero-title mb-4">2030 Vision</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  By 2030, our AI swarm robotics system will have created the first 
                  self-sustaining space debris cleanup ecosystem, directly contributing 
                  to global sustainability and space safety goals.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
                  <p className="text-muted-foreground text-sm">
                    Complete orbital debris monitoring and cleanup coverage for all Earth orbits
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sustainable Operations</h3>
                  <p className="text-muted-foreground text-sm">
                    100% renewable energy powered operations with debris recycling capabilities
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Partnership</h3>
                  <p className="text-muted-foreground text-sm">
                    Collaborative network of space agencies, governments, and private organizations
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold hero-title mb-6">
                Join the Mission for Sustainable Space
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Together, we can ensure that space remains accessible and safe for future generations 
                while contributing to global sustainability goals on Earth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/virtual-prototype')}
                  className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 text-lg"
                >
                  Experience the Technology
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                  className="border-accent text-accent hover:bg-accent/10 px-8 py-4 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;