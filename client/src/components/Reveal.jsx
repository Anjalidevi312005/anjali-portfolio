import { motion } from 'framer-motion';

// Fades & slides children into view when scrolled to.
// `delay` staggers items; `y` controls initial offset.
export default function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
