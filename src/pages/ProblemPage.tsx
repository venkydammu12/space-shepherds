import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Satellite, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Navbar from '@/components/Navbar';

const ProblemPage = () => {
  const navigate = useNavigate();
  const earthRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!earthRef.current) return;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0);
    earthRef.current.appendChild(renderer.domElement);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Debris field
    const debrisGroup = new THREE.Group();
    const debrisTypes = [
      { color: 0xff6b6b, size: 0.02 }, // Metallic
      { color: 0x4ecdc4, size: 0.015 }, // Plastic  
      { color: 0xffe66d, size: 0.025 }, // Electronic
    ];

    for (let i = 0; i < 200; i++) {
      const type = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];
      const geometry = new THREE.SphereGeometry(type.size, 8, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color: type.color,
        transparent: true,
        opacity: 0.8
      });
      const debris = new THREE.Mesh(geometry, material);
      
      // Position debris around Earth
      const distance = 2.5 + Math.random() * 1.5;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      debris.position.x = distance * Math.sin(theta) * Math.cos(phi);
      debris.position.y = distance * Math.sin(theta) * Math.sin(phi); 
      debris.position.z = distance * Math.cos(theta);
      
      debris.userData = { 
        orbitSpeed: 0.01 + Math.random() * 0.02,
        distance,
        phi,
        theta
      };
      
      debrisGroup.add(debris);
    }
    scene.add(debrisGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      earth.rotation.y += 0.005;
      
      // Animate debris orbits
      debrisGroup.children.forEach((debris, index) => {
        const userData = debris.userData;
        userData.phi += userData.orbitSpeed;
        
        debris.position.x = userData.distance * Math.sin(userData.theta) * Math.cos(userData.phi);
        debris.position.y = userData.distance * Math.sin(userData.theta) * Math.sin(userData.phi);
        debris.position.z = userData.distance * Math.cos(userData.theta);
        
        debris.rotation.x += 0.01;
        debris.rotation.y += 0.01;
      });
      
      renderer.render(scene, camera);
    };

    animate();

    sceneRef.current = scene;
    rendererRef.current = renderer;

    return () => {
      if (earthRef.current && renderer.domElement) {
        earthRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const problemStats = [
    { value: "34,000+", label: "Trackable Objects", icon: AlertTriangle, color: "destructive" },
    { value: "900,000", label: "1-10cm Pieces", icon: Satellite, color: "accent" },
    { value: "130M", label: "Smaller Fragments", icon: Zap, color: "primary" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-cosmic" />
      <Navbar />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="border-primary/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-sm text-muted-foreground">Problem Analysis</div>
        
        <Button
          onClick={() => navigate('/solution')}
          className="bg-primary hover:bg-primary/90 text-black"
        >
          View Solution
          <ArrowRight className="w-4 h-4 ml-2" />
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
              THE SPACE DEBRIS
              <br />
              <span className="text-destructive">CRISIS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our orbital environment is becoming increasingly dangerous, 
              threatening the future of space exploration and satellite communications.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* 3D Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-3xl">
                <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                  Live Debris Field Simulation
                </h2>
                <div 
                  ref={earthRef}
                  className="w-full h-[600px] flex items-center justify-center"
                />
                <div className="mt-4 flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full" />
                    <span>Metallic Debris</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span>Plastic Debris</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <span>Electronic Debris</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Problem Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-accent mb-6">Critical Challenges</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Collision Risk</h4>
                      <p className="text-muted-foreground">
                        Objects travel at 17,500 mph - even tiny fragments can destroy satellites
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Satellite className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Cascading Effect</h4>
                      <p className="text-muted-foreground">
                        Each collision creates thousands of new debris pieces
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Mission Threats</h4>
                      <p className="text-muted-foreground">
                        ISS regularly performs avoidance maneuvers, disrupting operations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {problemStats.map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-${stat.color}/20`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold text-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
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
                The Time to Act is NOW
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Without immediate action, we risk losing access to space entirely. 
                Our AI Swarm Robotics solution offers a path forward.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/solution')}
                className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 text-lg"
              >
                Discover Our Solution
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;