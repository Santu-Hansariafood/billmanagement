export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}