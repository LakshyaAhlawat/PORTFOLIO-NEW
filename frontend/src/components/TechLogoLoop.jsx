
import { motion } from 'framer-motion';
import { ReactLogo, ViteLogo, TailwindLogo, FramerLogo, NodeLogo, ExpressLogo, JWTLogo, MongoLogo, MongooseLogo, GitHubLogo, RestLogo, AtomicLogo } from './TechLogos.jsx';

const techs = [
  { name: 'React', color: '#61dafb', icon: <ReactLogo /> },
  { name: 'Vite', color: '#646cff', icon: <ViteLogo /> },
  { name: 'Tailwind', color: '#38bdf8', icon: <TailwindLogo /> },
  { name: 'Framer Motion', color: '#e1306c', icon: <FramerLogo /> },
  { name: 'Node.js', color: '#3c873a', icon: <NodeLogo /> },
  { name: 'Express', color: '#000', icon: <ExpressLogo /> },
  { name: 'JWT', color: '#f4b400', icon: <JWTLogo /> },
  { name: 'MongoDB', color: '#10aa50', icon: <MongoLogo /> },
  { name: 'Mongoose', color: '#800000', icon: <MongooseLogo /> },
  { name: 'GitHub', color: '#181717', icon: <GitHubLogo /> },
  { name: 'REST API', color: '#2563eb', icon: <RestLogo /> },
  { name: 'Atomic Design', color: '#f472b6', icon: <AtomicLogo /> },
];

const LOOP_WIDTH = 1200;

export function TechLogoLoop({ className = '' }) {
  // Duplicate the techs array to create a seamless loop
  const loopTechs = [...techs, ...techs];
  return (
    <div
      className={
        'fixed left-0 right-0 bottom-0 z-40 w-full pointer-events-none select-none overflow-hidden bg-gradient-to-t from-gray-950/90 via-gray-950/60 to-transparent py-2 ' +
        className
      }
      style={{ minHeight: 56 }}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-8 px-8"
        style={{ width: LOOP_WIDTH * 2 }}
        initial={{ x: 0 }}
        animate={{ x: -LOOP_WIDTH }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
      >
        {loopTechs.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 shadow-md shadow-blue-400/10 border border-blue-400/10 backdrop-blur-md min-w-[140px] justify-center"
            style={{ color: tech.color, fontWeight: 600, fontSize: 18, letterSpacing: 1 }}
          >
            {tech.icon && <span className="h-7 w-7 flex items-center justify-center">{tech.icon}</span>}
            <span className="ml-1">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
