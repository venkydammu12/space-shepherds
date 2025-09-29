import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OptimizationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-cosmic" />
      
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/robot-prototype')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Robot Prototype
        </Button>
        <div className="text-sm text-muted-foreground">Robot Optimization</div>
        <Button onClick={() => navigate('/impact')} className="bg-primary hover:bg-primary/90 text-black">
          Impact Analysis
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold hero-title mb-6">
              ROBOT <span className="text-primary">OPTIMIZATION</span>
            </h1>
            <p className="text-xl text-muted-foreground">Advanced robot monitoring and optimization systems</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationPage;