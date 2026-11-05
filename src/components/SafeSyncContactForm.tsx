
import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle,
  ArrowUpRight,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Linkedin,
  Music2,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const whatsappContacts = [
  {
    label: '0720 889 352',
    number: '254720889352',
  },
  {
    label: '0746 129 446',
    number: '254746129446',
  },
];

// Replace these with your official SafeSync profile URLs.
const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@YOUR_TIKTOK_USERNAME',
    icon: Music2,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/YOUR_LINKEDIN_PAGE/',
    icon: Linkedin,
  },
];

export default function SafeSyncContactForm() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Enquiry',
    whatsapp: '254720889352',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.subject.trim() &&
    formData.message.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    const selectedContact = whatsappContacts.find(
      (contact) => contact.number === formData.whatsapp
    );

    if (!selectedContact) return;

    const whatsappMessage = `
Hello SafeSync Team,

I would like to make an enquiry.

Name: ${formData.name}
Email: ${formData.email}
Enquiry Type: ${formData.category}
Subject: ${formData.subject}

Message:
${formData.message}

I look forward to hearing from your team.
    `.trim();

    const whatsappURL = `https://wa.me/${selectedContact.number}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'General Enquiry',
      whatsapp: '254720889352',
      message: '',
    });
    setIsSubmitted(false);
  };

  const inputStyle = `
    w-full rounded-xl border px-4 py-3.5 text-sm outline-none
    transition-all duration-300
    focus:border-[#ED111C] focus:ring-2 focus:ring-[#ED111C]/10
    ${
      isDark
        ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
        : 'bg-slate-50 border-slate-200 text-[#0B1F3A] placeholder:text-slate-400'
    }
  `;

  const cardStyle = isDark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-100';

  return (
    <section
      id="contact"
      className={`relative overflow-hidden px-5 py-20 sm:px-8 md:py-28 lg:px-12 ${
        isDark ? 'bg-slate-950' : 'bg-[#F7F9FC]'
      }`}
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ED111C]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#0B1F3A]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ED111C]/20 bg-[#ED111C]/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ED111C]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#ED111C]">
              Contact SafeSync
            </span>
          </div>

          <h2
            className={`mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-[#0B1F3A]'
            }`}
          >
            Let's Start a
            <span className="text-[#ED111C]"> Conversation.</span>
          </h2>

          <p
            className={`max-w-2xl text-base leading-8 sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Whether you are looking for emergency response solutions,
            exploring a partnership, or need assistance, our team is
            ready to connect with you.
          </p>
        </motion.div>

        {/* Main Contact Layout */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">

          {/* LEFT: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >

            {/* Contact Information Card */}
            <div
              className={`rounded-3xl border p-7 shadow-sm sm:p-9 ${cardStyle}`}
            >
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ED111C]/10">
                  <ShieldCheck className="h-6 w-6 text-[#ED111C]" />
                </div>

                <div>
                  <h3
                    className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-[#0B1F3A]'
                    }`}
                  >
                    Get in Touch
                  </h3>
                  <p className="text-sm text-slate-500">
                    Connect with our team
                  </p>
                </div>
              </div>

              <div className="space-y-6">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ED111C]/10">
                    <Phone className="h-5 w-5 text-[#ED111C]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`mb-2 text-sm font-bold ${
                      isDark ? 'text-white' : 'text-[#0B1F3A]'
                    }`}>
                      Call Our Team
                    </p>

                    {whatsappContacts.map((contact) => (
                      <a
                        key={contact.number}
                        href={`tel:+${contact.number}`}
                        className={`mb-1 block text-sm transition-colors hover:text-[#ED111C] ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {contact.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`mb-2 text-sm font-bold ${
                      isDark ? 'text-white' : 'text-[#0B1F3A]'
                    }`}>
                      WhatsApp
                    </p>

                    {whatsappContacts.map((contact) => (
                      <a
                        key={contact.number}
                        href={`https://wa.me/${contact.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mb-1 flex items-center gap-2 text-sm transition-colors hover:text-green-500 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {contact.label}
                        <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ED111C]/10">
                    <Mail className="h-5 w-5 text-[#ED111C]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`mb-1 text-sm font-bold ${
                      isDark ? 'text-white' : 'text-[#0B1F3A]'
                    }`}>
                      Email Enquiries
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Use our enquiry form to reach our team directly through WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`my-8 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`} />

              {/* Social Media */}
              <div>
                <p className={`mb-4 text-sm font-bold ${
                  isDark ? 'text-white' : 'text-[#0B1F3A]'
                }`}>
                  Follow SafeSync
                </p>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`SafeSync on ${social.name}`}
                        title={social.name}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:border-[#ED111C] hover:bg-[#ED111C] hover:text-white ${
                          isDark
                            ? 'border-slate-700 text-slate-300'
                            : 'border-slate-200 text-[#0B1F3A]'
                        }`}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Brand Message Card */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0B1F3A] p-8 text-white sm:p-9">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[25px] border-white/5" />

              <div className="relative">
                <span className="mb-4 inline-block rounded-full bg-[#ED111C] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                  SafeSync Technologies
                </span>

                <h3 className="mb-4 text-2xl font-extrabold leading-snug sm:text-3xl">
                  Protect. Alert.
                  <span className="block text-[#ED111C]">Respond.</span>
                </h3>

                <p className="max-w-sm text-sm leading-7 text-slate-300">
                  Building smarter emergency response solutions
                  that connect people, organizations and responders
                  when every second matters.
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <div className="h-1 w-12 rounded-full bg-[#ED111C]" />
                  <span className="text-xs font-semibold tracking-wide text-slate-300">
                    Every Second Matters. Every Life Counts.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className={`h-full rounded-3xl border p-6 shadow-sm sm:p-9 md:p-10 ${cardStyle}`}>

              <div className="mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ED111C]">
                  Send Us a Message
                </p>

                <h3 className={`text-2xl font-extrabold sm:text-3xl ${
                  isDark ? 'text-white' : 'text-[#0B1F3A]'
                }`}>
                  How Can We Help?
                </h3>

                <p className={`mt-3 text-sm leading-7 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Share your enquiry with us. Complete the form and
                  continue to WhatsApp to send your message.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex min-h-[380px] flex-col items-center justify-center rounded-2xl p-8 text-center ${
                      isDark ? 'bg-slate-800' : 'bg-green-50'
                    }`}
                  >
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>

                    <h4 className={`mb-3 text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-[#0B1F3A]'
                    }`}>
                      Your Message Is Ready!
                    </h4>

                    <p className={`mb-7 max-w-sm text-sm leading-7 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      WhatsApp has been opened with your enquiry.
                      Please press Send in WhatsApp to deliver your message
                      to the SafeSync team.
                    </p>

                    <button
                      onClick={resetForm}
                      className="rounded-xl bg-[#ED111C] px-7 py-3 font-bold text-white transition-colors hover:bg-[#C90D16]"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name and Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={`mb-2 block text-sm font-semibold ${
                          isDark ? 'text-slate-200' : 'text-[#0B1F3A]'
                        }`}>
                          Full Name *
                        </label>

                        <input
                          required
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={inputStyle}
                        />
                      </div>

                      <div>
                        <label className={`mb-2 block text-sm font-semibold ${
                          isDark ? 'text-slate-200' : 'text-[#0B1F3A]'
                        }`}>
                          Email Address *
                        </label>

                        <input
                          required
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Enquiry Category */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={`mb-2 block text-sm font-semibold ${
                          isDark ? 'text-slate-200' : 'text-[#0B1F3A]'
                        }`}>
                          Enquiry Type *
                        </label>

                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className={inputStyle}
                        >
                          <option>General Enquiry</option>
                          <option>Business Partnership</option>
                          <option>Emergency Response Solutions</option>
                          <option>Organization Registration</option>
                          <option>Technical Support</option>
                          <option>Media & Collaboration</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className={`mb-2 block text-sm font-semibold ${
                          isDark ? 'text-slate-200' : 'text-[#0B1F3A]'
                        }`}>
                          WhatsApp Recipient *
                        </label>

                        <select
                          value={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({ ...formData, whatsapp: e.target.value })
                          }
                          className={inputStyle}
                        >
                          {whatsappContacts.map((contact) => (
                            <option key={contact.number} value={contact.number}>
                              {contact.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className={`mb-2 block text-sm font-semibold ${
                        isDark ? 'text-slate-200' : 'text-[#0B1F3A]'
                      }`}>
                        Subject *
                      </label>

                      <input
                        required
                        type="text"
                        placeholder="What would you like to discuss?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className={inputStyle}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`mb-2 block text-sm font-semibold ${
                        isDark ? 'text-slate-200' : 'text-[#0B1F3A]'
                      }`}>
                        Your Message *
                      </label>

                      <textarea
                        required
                        rows={6}
                        minLength={10}
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className={`${inputStyle} min-h-[150px] resize-y`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={!isFormValid}
                      whileTap={{ scale: 0.98 }}
                      className="
                        flex min-h-[54px] w-full items-center justify-center gap-3
                        rounded-xl bg-[#ED111C] px-6 py-4
                        font-bold text-white shadow-lg shadow-[#ED111C]/15
                        transition-all duration-300
                        hover:bg-[#C90D16] hover:shadow-xl
                        disabled:cursor-not-allowed disabled:opacity-40
                      "
                    >
                      <MessageCircle size={19} />
                      Continue to WhatsApp
                      <ArrowUpRight size={18} />
                    </motion.button>

                    <p className={`flex items-center justify-center gap-2 text-center text-xs ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <ShieldCheck size={14} />
                      Your enquiry will be prepared for WhatsApp.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-[#ED111C]" />

          <p className={`text-sm font-semibold tracking-wide ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            SafeSync Technologies Ltd. — Protect. Alert. Respond.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
