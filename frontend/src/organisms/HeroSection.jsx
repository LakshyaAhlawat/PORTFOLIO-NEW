import { motion } from 'framer-motion';
import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { Button } from '../atoms/Button.jsx';

export const HeroSection = () => (
  <Section id="hero" className="pt-20">
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <Heading level={1} className="tracking-tight">
          Full-Stack Developer crafting smooth experiences
        </Heading>
        <Text className="max-w-xl">
          I design and build modern, performant web experiences with React, Node.js, and MongoDB,
          focusing on clean architecture, accessibility, and delightful motion.
        </Text>
        <div className="flex gap-3">
          <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
          </Button>
          <Button
            variant="ghost"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative mx-auto h-64 w-full max-w-sm"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gray-900/80 p-5 shadow-xl shadow-blue-500/20 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Portfolio</p>
              <p className="text-sm text-gray-300">Lakshya Ahlawat</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-semibold text-white">
              LA
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-gray-300">
            <p>Stack: React · Node · MongoDB</p>
            <p>Focus: Frontend engineering, API design, system design</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] text-gray-400">
            <span>Currently exploring advanced animations</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">Open to roles</span>
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);
