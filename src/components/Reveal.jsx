import { motion, useReducedMotion } from 'framer-motion'

// Scroll-reveal wrapper for FRAMING content (landing, project intros, cards).
//
// Deliberately NOT used on case-study body text — that copy is static and
// instantly readable by design. Use this only where a little motion adds
// polish without delaying reading.
//
// When the user prefers reduced motion, it renders a plain element with no
// transform/opacity animation at all.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
