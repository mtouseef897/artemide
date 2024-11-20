import React from 'react'
import { AnimatePresence, motion } from "framer-motion";


const AnimatedContainer = ({
    children,
    trigger,
    animation={},
    className=''
}) => {
  return (
    <AnimatePresence>
    {trigger &&
      <motion.div
        {...animation}
        className={`${className}`}
      >
          {children}
      </motion.div>
      }

      </AnimatePresence>
  )
}

export default AnimatedContainer