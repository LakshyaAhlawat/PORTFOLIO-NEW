import { TechLogoLoop } from '../components/TechLogoLoop.jsx';
import { LogoLoop } from '../components/LogoLoop.jsx';

import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedParticlesBG } from '../components/AnimatedParticlesBG.jsx';

const skills = {
  'Frontend': ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Express', 'JWT', 'Passport (Google OAuth)'],
  'Database & Infra': ['MongoDB', 'Mongoose', 'MongoDB Atlas'],
  'Tooling & Practices': ['Git & GitHub', 'REST API design', 'Atomic Design', 'Clean Architecture'],
};

const cardVariants = {
  offscreen: { opacity: 0, y: 40, scale: 0.95 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.25,
      duration: 0.7,
      delay: i * 0.15,
    },
  }),
};


export const SkillsPage = () => (
  <div className="relative flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50 w-full overflow-x-hidden">
    {/* Floating ReactBits Logo Loop animation */}
    <div className="fixed top-8 right-8 z-30 opacity-80 pointer-events-none select-none">
      <LogoLoop style={{ filter: 'drop-shadow(0 4px 24px #60a5fa44)' }} />
    </div>
    <AnimatedParticlesBG />
    <SiteHeader />
    <main className="flex-1 z-10 relative">
      <Section>
        <Heading level={1} className="relative z-20">
          <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Skills</span>
        </Heading>
        <Text className="mt-2 max-w-xl relative z-20">
          A snapshot of the technologies and practices I use to build modern web applications.
        </Text>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-20">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              custom={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.04, rotate: (i % 2 === 0 ? -2 : 2) }}
              className="group rounded-3xl border border-blue-400/30 bg-white/60 dark:bg-gray-900/70 backdrop-blur-md shadow-2xl shadow-blue-400/10 transition-all duration-300 hover:shadow-blue-400/30 hover:scale-105 hover:z-30 relative overflow-hidden px-7 py-8"
              style={{ boxShadow: '0 8px 32px 0 rgba(60, 120, 255, 0.10)' }}
            >
              <h2 className="text-base font-bold uppercase tracking-wide text-blue-400 mb-2 drop-shadow">
                {category}
              </h2>
              <ul className="space-y-2 text-sm font-medium">
                {items.map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    className="text-gray-800 dark:text-gray-100 group-hover:text-blue-400 transition-colors duration-200"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
    <TechLogoLoop />
    <SiteFooter />
  </div>
);
