import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";
import {
  Eye,
  Target,
  ShieldCheck,
  HeartPulse,
  Radio,
  Handshake,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const storyImage = "/assets/about1.jpg";

/* =========================================
   CORE VALUES
========================================= */

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Dependable technology when every second matters.",
  },
  {
    icon: Radio,
    title: "Coordination",
    description: "Connecting people, responders, and organizations.",
  },
  {
    icon: HeartPulse,
    title: "Humanity",
    description: "Putting human lives and safety first.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Building smarter emergency response solutions.",
  },
];

/* =========================================
   ANIMATION VARIANTS
========================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/* =========================================
   ABOUT PAGE
========================================= */

export default function SafeSyncAbout() {
  const containerRef = useRef<HTMLElement | null>(null);
  const storyImageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  // Page scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Subtle image parallax
  const { scrollYProgress: imageProgress } = useScroll({
    target: storyImageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(imageProgress, [0, 1], [15, -15]);
  const viewport = { once: true, amount: 0.2 as const };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-hidden bg-white text-gray-900"
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-[#ED111C]"
        style={{ scaleX }}
      />

      {/* =========================================
          1. ABOUT US
      ========================================= */}

      <section className="relative bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewport}
            className="mb-12 text-center"
          >
            <motion.span
              variants={staggerItem}
              className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#ED111C]"
            >
              Who We Are
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="text-3xl font-extrabold tracking-tight text-[#17221D] md:text-5xl"
            >
              About Us
            </motion.h2>

            <motion.div
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-4 h-1 w-20 origin-center rounded-full bg-[#ED111C]"
            />

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg"
            >
              Discover who we are, what drives us, and our commitment to
              making emergency response faster, simpler, and more accessible.
            </motion.p>
          </motion.div>

          {/* Company story and image */}
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Company story */}
            <motion.div
              variants={fadeLeft}
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={viewport}
              className="text-center md:text-left"
            >
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-6 flex justify-center md:justify-start"
              >
                <motion.div
                  whileHover={
                    prefersReducedMotion ? undefined : { rotate: 8, scale: 1.08 }
                  }
                  transition={{ type: "spring", stiffness: 250 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50"
                >
                  <HeartPulse
                    size={30}
                    strokeWidth={1.8}
                    className="text-[#ED111C]"
                  />
                </motion.div>
              </motion.div>

              <h3 className="mb-5 text-2xl font-bold leading-snug text-[#17221D] md:text-3xl">
                Turning emergencies into coordinated action.
              </h3>

              <p className="mb-5 text-base leading-8 text-gray-600 md:text-lg">
                SafeSync was founded on a simple belief:{" "}
                <span className="font-semibold text-[#ED111C]">
                  every second matters, and every life counts.
                </span>{" "}
                During an emergency, people need more than instructions.
                They need a reliable way to call for help and connect with
                the right responders.
              </p>

              <p className="mb-8 text-base leading-8 text-gray-600 md:text-lg">
                We develop technology that helps individuals, businesses,
                schools, and organizations initiate emergency alerts, share
                their location, and coordinate responses. Our goal is to
                simplify the journey from the moment help is needed to the
                moment action begins.
              </p>

              <motion.a
                href="#our-values"
                whileHover={
                  prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full bg-[#ED111C] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-100 transition-colors duration-300 hover:bg-[#C90D16]"
              >
                Discover Our Values
                <motion.span
                  animate={
                    prefersReducedMotion ? undefined : { x: [0, 4, 0] }
                  }
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={17} />
                </motion.span>
              </motion.a>
            </motion.div>

            {/* =========================================
                STORY IMAGE
                Simplified reveal animation
            ========================================= */}

            <motion.div
              ref={storyImageRef}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-lg"
            >
              {/* Decorative shapes */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -12, 0], x: [0, 5, 0] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-red-50 md:-right-6 md:-top-6"
              />

              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, 12, 0], x: [0, -5, 0] }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-[#FCE7E8]"
              />

              <motion.div
                style={{ y: prefersReducedMotion ? 0 : imageY }}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.015 }
                }
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-[2rem] bg-gray-100 shadow-2xl"
              >
                {!imageError ? (
                  <motion.img
                    src={storyImage}
                    alt="SafeSync emergency response and safety mission"
                    initial={
                      prefersReducedMotion ? false : { scale: 1.06 }
                    }
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    onError={() => setImageError(true)}
                    className="block h-[350px] w-full object-cover md:h-[470px]"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-[350px] w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-red-50 to-gray-100 px-8 text-center md:h-[470px]">
                    <HeartPulse
                      size={56}
                      strokeWidth={1.4}
                      className="text-[#ED111C]"
                    />
                    <p className="text-lg font-bold text-[#17221D]">
                      SafeSync
                    </p>
                    <p className="max-w-xs text-sm leading-6 text-gray-600">
                      Image not found. Check that the file exists at
                      public/assets/about1.jpg.
                    </p>
                  </div>
                )}

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <motion.div
                  variants={staggerContainer}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="pointer-events-none absolute bottom-0 left-0 right-0 p-7 text-white md:p-9"
                >
                  <motion.div
                    variants={staggerItem}
                    className="mb-3 flex items-center gap-2"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    </span>

                    <span className="text-xs font-bold uppercase tracking-[0.18em]">
                      Our Commitment
                    </span>
                  </motion.div>

                  <motion.h3
                    variants={staggerItem}
                    className="max-w-sm text-2xl font-extrabold leading-tight md:text-3xl"
                  >
                    Every Second Matters.
                    <br />
                    Every Life Counts.
                  </motion.h3>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. IDENTITY, VISION, MISSION & VALUES
      ========================================= */}

      <section
        id="our-values"
        className="relative overflow-hidden bg-[#FFF7F3] px-6 py-20 md:px-12 md:py-28"
      >
        {/* Decorative background shapes */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, 25, 0], y: [0, 15, 0] }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-100/40 blur-3xl"
        />

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [0, -20, 0], y: [0, -15, 0] }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Section heading */}
          <motion.div
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewport}
            className="mb-14 text-center"
          >
            <motion.span
              variants={staggerItem}
              className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#ED111C]"
            >
              What Drives Us
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="text-3xl font-extrabold leading-tight text-[#17221D] md:text-5xl"
            >
              Our Identity,
              <br className="md:hidden" /> Vision and Values
            </motion.h2>

            <motion.div
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-5 h-1 w-20 origin-center rounded-full bg-[#ED111C]"
            />

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg"
            >
              Guided by purpose, driven by innovation, and committed to
              making emergency response simpler and more accessible.
            </motion.p>
          </motion.div>

          {/* Core values bar */}
          <motion.div
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 mx-auto mb-[-45px] grid max-w-5xl grid-cols-2 gap-6 rounded-[2rem] bg-[#C90D16] px-5 py-8 text-white shadow-xl shadow-red-200/50 md:grid-cols-4 md:gap-4 md:px-10 md:py-9"
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  whileHover={
                    prefersReducedMotion ? undefined : { y: -6, scale: 1.035 }
                  }
                  className="group flex flex-col items-center rounded-2xl text-center"
                >
                  <motion.div
                    whileHover={
                      prefersReducedMotion ? undefined : { rotate: 8, scale: 1.1 }
                    }
                    transition={{ type: "spring", stiffness: 250 }}
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 transition-colors duration-300 group-hover:bg-white/25"
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </motion.div>

                  <h3 className="mb-1 text-sm font-bold md:text-base">
                    {value.title}
                  </h3>

                  <p className="max-w-[180px] text-xs leading-5 text-red-100 md:text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Vision and mission card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-[2rem] bg-white px-7 pb-9 pt-20 shadow-sm md:px-14 md:pb-14 md:pt-24"
          >
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              {/* Vision */}
              <motion.div
                variants={fadeLeft}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="md:border-r md:border-gray-200 md:pr-12"
              >
                <div className="mb-5 flex items-center gap-3">
                  <motion.div
                    whileHover={
                      prefersReducedMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#ED111C]"
                  >
                    <Eye size={24} />
                  </motion.div>

                  <h3 className="text-2xl font-extrabold text-[#17221D]">
                    Our Vision
                  </h3>
                </div>

                <p className="text-base leading-8 text-gray-600">
                  To create a safer world where individuals and organizations
                  can access timely emergency assistance through connected,
                  reliable, and accessible technology.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                variants={fadeRight}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <motion.div
                    whileHover={
                      prefersReducedMotion ? undefined : { rotate: 8, scale: 1.08 }
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#ED111C]"
                  >
                    <Target size={24} />
                  </motion.div>

                  <h3 className="text-2xl font-extrabold text-[#17221D]">
                    Our Mission
                  </h3>
                </div>

                <p className="text-base leading-8 text-gray-600">
                  To simplify emergency response by connecting people,
                  organizations, and responders through innovative technology
                  that enables faster alerts, location sharing, and coordinated
                  action.
                </p>
              </motion.div>
            </div>

            {/* Identity section — no icon */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mt-10 overflow-hidden border-t border-gray-100 pt-8"
            >
              <motion.div
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute left-0 top-[-1px] h-1 w-24 origin-left rounded-full bg-[#ED111C]"
              />

              <div className="grid gap-5 md:grid-cols-[180px_1fr] md:gap-10">
                <motion.div
                  variants={fadeUp}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#ED111C]">
                    What Defines Us
                  </span>

                  <h4 className="text-2xl font-extrabold leading-tight text-[#17221D] md:text-3xl">
                    Our Identity
                  </h4>
                </motion.div>

                <motion.p
                  variants={fadeRight}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-base leading-8 text-gray-600"
                >
                  SafeSync is an emergency-response technology company
                  committed to helping people act decisively when it matters
                  most. We connect individuals, organizations, and response
                  teams through technology designed to simplify emergency
                  alerts, improve coordination, and support faster responses
                  when every second counts.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          3. CLOSING CALL TO ACTION
      ========================================= */}

      <section className="bg-white px-6 py-16 md:px-12 md:py-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#171D1C] px-7 py-12 text-center text-white md:px-12 md:py-16"
        >
          {/* Animated decorative glow */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { x: [0, 25, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }
            }
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#ED111C]/20 blur-3xl"
          />

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { x: [0, -20, 0], y: [0, 15, 0], scale: [1, 1.15, 1] }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-red-900/20 blur-3xl"
          />

          <motion.div
            variants={staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
          >
            <motion.div
              variants={staggerItem}
              whileHover={
                prefersReducedMotion ? undefined : { rotate: 8, scale: 1.08 }
              }
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ED111C]"
            >
              <Handshake size={28} />
            </motion.div>

            <motion.h3
              variants={staggerItem}
              className="mb-4 text-2xl font-extrabold md:text-4xl"
            >
              Building a Safer Future, Together.
            </motion.h3>

            <motion.p
              variants={staggerItem}
              className="mx-auto max-w-2xl text-sm leading-7 text-gray-300 md:text-base"
            >
              We believe that technology makes a greater difference when
              people work together. SafeSync is committed to creating
              meaningful connections between those who need help and those
              ready to respond.
            </motion.p>

            <motion.a
              variants={staggerItem}
              href="/#contact"
              whileHover={
                prefersReducedMotion ? undefined : { y: -4, scale: 1.03 }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#ED111C] px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#C90D16]"
            >
              Get in Touch
              <motion.span
                animate={
                  prefersReducedMotion ? undefined : { x: [0, 4, 0] }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={17} />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
}
