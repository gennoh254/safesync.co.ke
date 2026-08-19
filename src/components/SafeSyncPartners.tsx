import { motion } from 'motion/react';

const partners = [
  {
    image: '/assets/partner1.png',
    alt: 'Kenya Red Cross',
  },
  {
    image: '/assets/council.png',
    alt: 'County Council',
  },
  {
    image: '/assets/images3.png',
    alt: 'Fire & Rescue',
  },
];

export default function SafeSyncPartners() {
  return (
    <section className="bg-background py-24 px-6 md:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-primary mb-6">
            Our Partners
          </h2>

          <p className="max-w-3xl mx-auto text-on-surface-variant text-lg leading-relaxed">
            SafeSync partners with trusted organizations to strengthen
            emergency response, disaster preparedness, and public safety.
          </p>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.img
              key={partner.alt}
              src={partner.image}
              alt={partner.alt}
              className="h-24 w-auto object-contain"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
