import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import { HeroSection } from '../organisms/HeroSection.jsx';
import { ProjectsSection } from '../organisms/ProjectsSection.jsx';
import { ResumeSection } from '../organisms/ResumeSection.jsx';
import { ContactSection } from '../organisms/ContactSection.jsx';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import Particles from '../ui/Particles.jsx';
import { motion } from 'framer-motion';

export const HomePage = () => (
  <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Particles
        particleColors={["#ffffff"]}
        particleCount={6000}
        particleSpread={22}
        speed={0.18}
        particleBaseSize={50}
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
        <HeroSection />
      <Section id="about">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-r from-white/6 via-white/4 to-transparent/0 backdrop-blur-md p-8 shadow-2xl"
        >
          <Heading level={2}>
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">About</span>
          </Heading>
          <Text className="mt-3 text-lg leading-relaxed text-white/90">
            I&apos;m a full-stack engineer focused on building clean, maintainable systems with React,
            Node.js, and MongoDB. I care deeply about architecture, performance, and thoughtful
            interaction design.
          </Text>
        </motion.div>
      </Section>
      <Section id="skills">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-transparent/10 via-white/6 to-transparent/0 backdrop-blur-lg p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <Heading level={2}>
              <span className="bg-gradient-to-r from-green-300 via-teal-200 to-cyan-100 bg-clip-text text-transparent">Skills</span>
            </Heading>
            <Text className="text-sm text-white/70">Highlighted technologies I use regularly.</Text>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-wrap gap-2">
              {['React','Vite','React Router','Tailwind CSS','Framer Motion','Node.js','Express'].map((s)=> (
                <span key={s} className="inline-flex items-center px-3 py-1 rounded-full bg-white/6 text-sm text-white/90 border border-white/8">{s}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['MongoDB','Mongoose','JWT Auth','Passport Google OAuth','REST','GraphQL'].map((s)=> (
                <span key={s} className="inline-flex items-center px-3 py-1 rounded-full bg-white/6 text-sm text-white/90 border border-white/8">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
      </main>
      <SiteFooter />
    </div>
  </div>
);
