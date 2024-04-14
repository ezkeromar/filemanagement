"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Animation({
  children,
  className = "",
  ...restProps
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className={cn("snap-center", className)}
      {...restProps}
    >
      {children}
    </motion.div>
  );
}
