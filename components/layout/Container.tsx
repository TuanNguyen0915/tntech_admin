'use client'
import { motion } from 'framer-motion'
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}

export default Container
