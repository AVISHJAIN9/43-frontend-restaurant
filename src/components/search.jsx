import { useEffect, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

export default function Search({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-6 backdrop-blur-xl"
          onClick={onClose}
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative mb-12">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights & articles..."
                className="w-full bg-transparent border-b-2 border-white/20 text-5xl md:text-6xl font-black outline-none pb-6 focus:border-cyan-500 transition-all uppercase tracking-tight placeholder-gray-600"
              />
              <Motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: query ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Search Results */}
            <Motion.div className="space-y-4">
              {query ? (
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-400 font-light text-lg"
                >
                  No results found for "{query}"
                </Motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Recent Searches', 'Popular Tags', 'Top Authors', 'Trending Topics'].map((item, i) => (
                    <Motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group"
                    >
                      <p className="text-gray-400 text-sm font-light mb-2">{item}</p>
                      <p className="text-white font-bold group-hover:text-cyan-400 transition-colors">Browse {item.toLowerCase()}</p>
                    </Motion.div>
                  ))}
                </div>
              )}
            </Motion.div>

            {/* Close Button */}
            <Motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className="mt-12 flex items-center gap-2 text-gray-500 hover:text-white uppercase tracking-widest text-sm font-light transition-colors"
            >
              <span>Press</span>
              <span className="px-3 py-1 bg-white/10 rounded border border-white/20 text-xs">ESC</span>
              <span>to close</span>
            </Motion.button>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}