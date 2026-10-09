import { motion, useReducedMotion } from "motion/react";

const partners = [
  {
    image: "/assets/partner1.png",
    alt: "Kenya Red Cross",
  },
  {
    image: "/assets/council.png",
    alt: "County Council",
  },
  {
    image: "/assets/images3.png",
    alt: "Fire & Rescue",
  },
  {
    image: "/assets/stp1-logo.png",
    alt: "St Pauls Hospital",
  },
];

export default function SafeSyncPartners() {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate the logos for a seamless marquee.
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="overflow-hidden bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
       
        {/* Heading */}
            <div className="mx-auto mb-10 max-w-3xl px-6 sm:mb-14">
              <h2 className="text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">
                Our Partners
              </h2>

              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#800000] sm:w-20" />

              {/* <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-on-surface-variant sm:text-lg sm:leading-8">
                SafeSync partners with trusted organizations to strengthen
                emergency response, disaster preparedness, and public safety.
                Together, we are building safer, more responsive communities.
              </p> */}
            </div>

        {/* Continuous partner logo animation */}
        <div
          className="relative w-full overflow-hidden"
          aria-label="SafeSync partners"
        >
          {/* Soft edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />

          <motion.div
            className="flex w-max items-center"
            animate={
              shouldReduceMotion
                ? { x: "0%" }
                : { x: ["-50%", "0%"] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    x: {
                      duration: 28,
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }
            }
            style={{
              willChange: shouldReduceMotion ? "auto" : "transform",
            }}
          >
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.alt}-${index}`}
                className="flex h-28 w-36 shrink-0 items-center justify-center px-4 sm:h-32 sm:w-48 sm:px-6 md:w-56"
              >
                <img
                  src={partner.image}
                  alt={index < partners.length ? partner.alt : ""}
                  aria-hidden={index >= partners.length}
                  loading="lazy"
                  draggable={false}
                  className="max-h-20 w-full max-w-[150px] object-contain opacity-100 transition-transform duration-300 hover:scale-110 sm:max-h-24 sm:max-w-[180px]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <p className="mt-6 px-6 text-center text-xs font-medium text-on-surface-variant/70 sm:text-sm">
          Working together for faster, safer emergency response.
        </p>
      </div>
    </section>
  );
}
