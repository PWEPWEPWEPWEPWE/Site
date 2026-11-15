"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

const defaultTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

interface MotionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInUp({ children, className = "", delay = 0, ...props }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", delay = 0, ...props }: MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", ...props }: MotionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          transition: defaultTransition
        }
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
