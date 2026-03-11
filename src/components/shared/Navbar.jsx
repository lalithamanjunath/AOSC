import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'Projects', page: 'Projects' },
  { name: 'Team', page: 'Team' },
  { name: 'Events', page: 'Events' },
  { name: 'Articles', page: 'Articles' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (pageName) => {
    const pageUrl = createPageUrl(pageName);
    return location.pathname === pageUrl || location.pathname === pageUrl + '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3 cursor-hover">
            <motion.svg
              viewBox="0 0 40 40"
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="none"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <path
                d="M8 20C8 12 14 8 20 8C26 8 32 12 32 20C32 28 26 32 20 32"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M16 20C16 16 18 14 20 14C22 14 24 16 24 20C24 24 22 26 20 26"
                stroke="url(#gradient2)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F172A" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
              </defs>
            </motion.svg>
            <span className="aosc-logo text-base sm:text-xl text-slate-900">
              AOSC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`text-sm sm:text-base lg:text-lg font-medium transition-all duration-200 cursor-hover relative ${
                  isActive(link.page)
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive(link.page) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-hover p-2.5 h-11 w-11 sm:h-10 sm:w-10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.page}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={createPageUrl(link.page)}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 rounded-lg text-sm sm:text-base font-medium transition-colors cursor-hover ${
                      isActive(link.page)
                        ? 'bg-cyan-50 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}