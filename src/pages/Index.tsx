import ParticleField from '@/components/ParticleField';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import ImpactSection from '@/components/ImpactSection';
import MonitoringSection from '@/components/MonitoringSection';
import CallToActionSection from '@/components/CallToActionSection';
import MissionControl from '@/components/MissionControl';

const Index = () => {
  return (
    <div className="relative">
      <ParticleField />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ImpactSection />
      <div id="mission-control">
        <MissionControl />
      </div>
      <CallToActionSection />
    </div>
  );
};

export default Index;
