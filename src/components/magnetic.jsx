import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
  const magnetic = useRef(null);

  useEffect(() => {
    const element = magnetic.current; 
    const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouse = (e) => {
      const { clientX, clientY } = e;
      const {height, width, left, top} = element.getBoundingClientRect();
      const x = clientX - (left + width/2);
      const y = clientY - (top + height/2);
      xTo(x); yTo(y);
    };

    const handleLeave = () => {
      xTo(0); yTo(0);
    };

    element.addEventListener("mousemove", handleMouse);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouse);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={magnetic} className="inline-block">
      {children}
    </div>
  );
}