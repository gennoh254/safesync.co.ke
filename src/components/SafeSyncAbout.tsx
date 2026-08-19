import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

const missionImage = "/assets/about1.jpg";

export default function SafeSyncAbout() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const text = `SafeSync was founded on a simple premise: in an emergency, every second counts. We build technologies that bridge the gap between panic and resolution, empowering organizations with real-time visibility, automated alerts, and seamless coordination.
  
We are dedicated to building a safer future for workplaces, schools, and cities across the globe through relentless innovation and mission-critical reliability.`;
  
  return (
    <section id="about" ref={containerRef} className="py-24 px-6 md:px-32 bg-white relative">
      <motion.div className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left" style={{ scaleX }} />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative mb-6">
              <span className="absolute -top-12 left-0 text-8xl font-black text-gray-100 z-0 select-none">MISSION</span>
              <h2 className="relative z-10 font-display text-4xl text-primary font-bold mb-4">Our Mission</h2>
              <div className="relative z-10 h-1.5 bg-secondary w-20 rounded-full mb-6" />
          </div>
          <p className="text-lg text-on-surface-variant font-medium mb-6">
            {text.split('\n\n')[0]}
          </p>
          <p className="text-lg text-on-surface-variant font-medium">
            {text.split('\n\n')[1]}
          </p>
        </motion.div>
        <div className="rounded-none overflow-hidden shadow-xl">
          <img
            src={missionImage}
            alt="Mission"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
