import ParticleField from '@/components/ParticleField';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import ImpactSection from '@/components/ImpactSection';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="relative">
      <ParticleField />
      <Navbar />
      
      {/* Home Section */}
      <section id="home">
        <HeroSection />
      </section>
      
      {/* Problem Section */}
      <section id="problem">
        <ProblemSection />
      </section>
      
      {/* Solution Section */}
      <section id="solution">
        <SolutionSection />
      </section>
      
      {/* Impact Section */}
      <section id="impact">
        <ImpactSection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
