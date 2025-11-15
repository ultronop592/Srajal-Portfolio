"use client"

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

const StackingNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const items = [
    { href: "#featured-projects", label: "Projects" },
    { href: "#components", label: "Components" },
    { href: "#about-me", label: "Information" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
  ];

  return (
    <div
      className="fixed top-6 right-6 z-40 flex items-center gap-x-2 md:flex hidden"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Portfolio quick navigation"
    >
      {items.map((item, index) => (
        <StackingNavbarItem
          href={item.href}
          expanded={expanded}
          key={index}
          index={index}
        >
          {item.label}
        </StackingNavbarItem>
      ))}
    </div>
  );
};

const StackingNavbarItem = ({
  href,
  children,
  style,
  expanded,
  index,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  expanded: boolean;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ x: 100 * index }}
      animate={{ x: expanded ? 0 : 100 * index }}
      transition={{
        duration: 0.6,
        ease: "circInOut",
        delay: 0.1 * index,
        type: "spring",
      }}
      style={{ zIndex: 100 - index }}
    >
      <Link
        className="flex items-center text-sm px-5 py-3 rounded-3xl bg-neutral-900/80 border border-neutral-700 no-underline text-neutral-300 hover:text-white hover:border-neutral-500 backdrop-blur-lg hover:bg-neutral-800 transition-all duration-300 ease-in-out"
        href={href}
        style={style}
        aria-label={`Navigate to ${children}`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export { StackingNavbar };
