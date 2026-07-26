import { motion } from 'motion/react';

const partners = [
  {
    name: 'Red Cross',
    industry: 'Health',
    image: '/assets/partner1.png',
  },
  {
    name: 'Safety Council',
    industry: 'Safety',
    image: '/assets/council.png',
  },
  {
    name: 'Fire & Rescue',
    industry: 'Safety',
    image: '/assets/images3.png',
  },
];

export default function SafeSyncPartners() {
  return (
    <section className="bg-background py-24 px-6 md:px-32">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold text-primary mb-6">
          Our Partners
        </h2>

        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg">
          SafeSync collaborates with leading organizations to provide
          comprehensive emergency response and safety solutions across various
          industries.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-4"
            >
              <motion.img
                src={partner.image}
                alt={`${partner.name} logo`}
                className="h-auto w-full max-w-[150px] object-contain"
                initial={{ filter: 'grayscale(100%)' }}
                whileHover={{
                  scale: 1.05,
                  filter: 'grayscale(0%)',
                }}
                transition={{ duration: 0.3 }}
              />

              <h3 className="mt-4 text-lg font-semibold text-primary">
                {partner.name}
              </h3>

              <p className="text-sm text-on-surface-variant">
                {partner.industry}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}