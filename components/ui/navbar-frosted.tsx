"use client"

import React from "react"
import { Menu } from "lucide-react"

const NavbarFrosted = () => {
  const navLinks = [
    { label: "About", href: "#about-me" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-neutral-950/50 border-b border-neutral-800/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>ST</span>
          </div>
          <span className="text-orange-400 font-semibold hidden sm:inline-block" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
            Srajal Tiwari
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative group text-neutral-300 hover:text-orange-300 transition-colors text-sm"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              {link.label}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-orange-400 hover:text-orange-300 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  )
}

export default NavbarFrosted
