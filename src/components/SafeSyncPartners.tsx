
import { motion, useReducedMotion } from "motion/react";

const partners = [
  {
    image: "/assets/redcross.png",
    alt: "Kenya Red Cross",
  },
  {
    image: "/assets/council.png",
    alt: "County Council",
  },
  {
    image: "/assets/images3.png",
    alt: "Fire and Rescue",
  },
  {
    image: "/assets/stp1-logo.png",
    alt: "St Paul's Hospital",
  },
  {
    image: "/assets/lifecare-logio.png",
    alt: "Lifecare Hospital",
  },
  {
    image: "/assets/katani.png",
    alt: "Katani Hospital",
  },
  {
    image: "/assets/vitalseal.png",
    alt: "Vital Seal",
  },
   {
    image: "/assets/sinai.jpg",
    alt: "Sinai Hospital",
  },
   {
    image: "/assets/missioncare.jpg",
    alt: "mission care",
  },
];

export default function SafeSyncPartners() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 flex items-center gap-6 sm:mb-12"
        >
          <div className="shrink-0">
            <h2 className="text-2xl font-extrabold uppercase tracking-[0.15em] text-[#0B1F3A] sm:text-3xl md:text-4xl lg:text-[42px]">
              Our Partners
            </h2>

            {/* Red Accent */}
            <div className="mt-3 h-1 w-16 rounded-full bg-[#ED111C] sm:w-20" />
          </div>

          {/* Horizontal Divider */}
          <div className="h-px flex-1 bg-[#0B1F3A]/25" />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 md:mb-20"
        >
          <p className="text-sm leading-7 text-[#0B1F3A]/75 sm:text-base sm:leading-8">
            We work alongside trusted organizations and service providers
            to strengthen emergency response, improve safety, and build
            more resilient communities. Together, we are making every
            second count.
          </p>
        </motion.div>

        {/* Partners Logo Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          aria-label="SafeSync partners"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.alt}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : (index % 4) * 0.1,
                ease: "easeOut",
              }}
              className="
                group flex min-h-[130px] items-center justify-center
                border-b border-[#0B1F3A]/10
                px-5 py-8
                sm:min-h-[150px] sm:px-8 sm:py-10
                md:min-h-[165px]
              "
            >
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={partner.image}
                  alt={partner.alt}
                  loading="lazy"
                  draggable={false}
                  className="
                    max-h-[65px]
                    w-full
                    max-w-[150px]
                    object-contain
                    opacity-100
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-105
                    sm:max-h-[80px]
                    sm:max-w-[175px]
                    md:max-w-[190px]
                  "
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-center sm:mt-14"
        >
          <p className="text-xs font-semibold tracking-wide text-[#0B1F3A]/65 sm:text-sm">
            Building safer communities through collaboration.
          </p>

          <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-[#ED111C]" />
        </motion.div>

      </div>
    </section>
  );
}
