
import { SiteHeader } from '../organisms/SiteHeader.jsx';
import { SiteFooter } from '../organisms/SiteFooter.jsx';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { motion } from 'framer-motion';
import LightPillar from '../components/LightPillar.jsx';

export const AboutPage = () => (
  <div className="relative flex min-h-screen flex-col bg-gray-950 text-gray-50 overflow-x-hidden">
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
    </div>
    <SiteHeader />
    <main className="flex-1 z-10 relative">
      <Section>
        <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.18 }}
            whileHover={{ scale: 1.015, boxShadow: '0 8px 32px 0 #a78bfa44' }}
            className="space-y-5 rounded-3xl border border-purple-400/20 bg-white/60 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-purple-400/10 transition-all duration-300 hover:shadow-purple-400/30 hover:scale-105 hover:z-30 px-8 py-10"
            style={{ boxShadow: '0 8px 32px 0 rgba(168,139,250,0.10)' }}
          >
            <Heading level={1} className="mb-2 text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              About
            </Heading>
            <Text className="text-lg">
              I&apos;m a full-stack engineer who enjoys designing robust architectures and crafting
              interfaces that feel fast, clear, and intentional. My focus is on React, Node.js, and
              MongoDB, with attention to performance, accessibility, and clean separation of concerns.
            </Text>
            <Text className="text-base">
              This portfolio showcases selected work, along with a structured resume that I can
              update from an admin dashboard without redeploying the frontend.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.1, type: 'spring', bounce: 0.22 }}
            whileHover={{ scale: 1.025, rotate: 1 }}
            className="relative h-72 w-full max-w-sm justify-self-center group"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 blur-2xl group-hover:opacity-90 transition-opacity duration-300" />
            <div className="relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gray-900/90 p-7 text-xs text-gray-200 shadow-xl shadow-blue-500/25 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300">Snapshot</p>
              <ul className="mt-3 space-y-1 text-base font-medium">
                <li>• Location: India</li>
                <li>• Strengths: JS/TS, React, Node, MongoDB</li>
                <li>• Interests: system design, UI motion, DX</li>
              </ul>
              <div className="mt-4 rounded-2xl bg-black/30 p-4">
                <p className="text-[10px] text-gray-400">Currently looking for</p>
                <p className="text-[13px] font-semibold text-blue-200">
                  SDE / frontend roles where I can ship production features end‑to‑end.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
    <SiteFooter />
  </div>
);
