import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <Motion.div
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      />

      {/* Cursor Trail/Glow */}
      <Motion.div
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 2 : 1.2,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 150 }}
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-500/50 rounded-full pointer-events-none z-[9998] mix-blend-screen"
      />

      {/* Outer Ring */}
      <Motion.div
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          opacity: isHovering ? 0.2 : 0.1,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        className="fixed top-0 left-0 w-12 h-12 border border-purple-500/30 rounded-full pointer-events-none z-[9997]"
      />
    </>
  );
}