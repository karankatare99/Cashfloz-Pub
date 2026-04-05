import { Variants } from "framer-motion"

export const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
}

export const containerVariants: Variants = {
  show: { transition: { staggerChildren: 0.1 } }
}

export const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } }
}
