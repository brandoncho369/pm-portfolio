import { motion, useReducedMotion } from 'framer-motion'

// Snappy, mechanical page swap. Fast enough to never delay reading; reduced
// motion users get an instant, non-animated swap.
export default function PageTransition({ children, className }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
