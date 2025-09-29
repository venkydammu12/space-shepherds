import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MissionControl from '@/components/MissionControl';

const MissionControlPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <div className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/solution')}
          className="border-primary/30 bg-background/20 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Solution Loop
        </Button>
        
        <div className="text-sm text-muted-foreground bg-background/20 backdrop-blur-md px-4 py-2 rounded-full">
          Mission Control Dashboard
        </div>
        
        <Button
          onClick={() => navigate('/robot-prototype')}
          className="bg-primary hover:bg-primary/90 text-black"
        >
          Robot Prototype
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Mission Control Component */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <MissionControl />
      </motion.div>
    </div>
  );
};

export default MissionControlPage;