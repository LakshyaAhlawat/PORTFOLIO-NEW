import { motion } from 'framer-motion';

// ReactBits Logo Loop animation (adapted from https://reactbits.dev/animations/logo-loop)
export function LogoLoop({ className = '', style = {} }) {
  return (
    <motion.svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
    >
      <circle cx="48" cy="48" r="44" stroke="#60a5fa" strokeWidth="4" opacity="0.15" />
      <motion.circle
        cx="48"
        cy="48"
        r="36"
        stroke="#60a5fa"
        strokeWidth="4"
        strokeDasharray="56 56"
        strokeDashoffset="0"
        fill="none"
        animate={{
          strokeDashoffset: [0, 112],
        }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
      />
      <motion.circle
        cx="48"
        cy="48"
        r="28"
        stroke="#a78bfa"
        strokeWidth="4"
        strokeDasharray="44 44"
        strokeDashoffset="0"
        fill="none"
        animate={{
          strokeDashoffset: [44, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', delay: 1.25 }}
      />
      <circle cx="48" cy="48" r="12" fill="#fff" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="48" cy="48" r="6" fill="#60a5fa" />
    </motion.svg>
  );
}
