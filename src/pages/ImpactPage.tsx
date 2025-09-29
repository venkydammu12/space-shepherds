import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImpactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-cosmic" />
      
      <div className="fixed top-8 left-8 right-8 z-40 flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/optimization')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Optimization
        </Button>
        <div className="text-sm text-muted-foreground">Impact Analysis</div>
        <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-black">
          Home
          <Home className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold hero-title mb-6">
              GLOBAL <span className="text-accent">IMPACT</span>
            </h1>
            <p className="text-xl text-muted-foreground">Sustainable Development Goals and mission outcomes</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;