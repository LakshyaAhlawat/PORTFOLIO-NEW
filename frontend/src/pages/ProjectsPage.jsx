import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import { ProjectsSection } from '../organisms/ProjectsSection.jsx';
import Particles from '../ui/Particles.jsx';

export const ProjectsPage = () => (
  <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 w-full overflow-x-hidden">
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Particles
        particleColors={["#ffffff"]}
        particleCount={2500}
        particleSpread={14}
        speed={0.18}
        particleBaseSize={36}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio || 2) : 2}
        className="w-full h-full"
      />
    </div>

    <div className="relative z-10 w-full">
      <SiteHeader />
      <main className="flex-1">
        <ProjectsSection />
      </main>
      <SiteFooter />
    </div>
  </div>
);
