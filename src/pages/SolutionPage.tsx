import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SustainableLoop from '@/components/SustainableLoop';

const SolutionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-cosmic" />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/problem')}
          className="border-primary/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Problem Analysis
        </Button>
        
        <div className="text-sm text-muted-foreground">Solution Loop</div>
        
        <Button
          onClick={() => navigate('/mission-control')}
          className="bg-primary hover:bg-primary/90 text-black"
        >
          Mission Control
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
              AI SWARM
              <br />
              <span className="text-primary">SOLUTION</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Autonomous orbital debris cleanup using intelligent swarm robotics
            </p>
          </motion.div>

          {/* Sustainable Loop */}
          <SustainableLoop />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold hero-title mb-6">
                Experience the Solution in Action
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                See our AI swarm robotics system in operation through our live mission control dashboard
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/mission-control')}
                className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 text-lg"
              >
                Launch Mission Control
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;