import { Section } from '../atoms/Section.jsx';
import { Heading } from '../atoms/Heading.jsx';
import { Text } from '../atoms/Text.jsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { sendContactForm } from '../services/contactService.js';


export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await sendContactForm(form);
      setStatus('Message sent! I will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      const serverMsg = err?.response?.message || err?.response?.data?.message || err.message;
      setStatus(serverMsg || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Section id="contact">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row relative z-30">
        <motion.form
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.18 }}
          whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 #a78bfa44' }}
          className="flex-1 rounded-3xl border border-purple-400/20 bg-white/60 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-purple-400/10 transition-all duration-300 hover:shadow-purple-400/30 hover:scale-105 z-40 px-8 py-10"
          style={{ boxShadow: '0 8px 32px 0 rgba(168,139,250,0.10)' }}
          onSubmit={handleSubmit}
        >
          <Heading level={2} className="mb-2 text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Contact
          </Heading>
          <Text className="mt-2 text-base">
            Ready to collaborate or have a question? Reach out and I&apos;ll get back to you.
          </Text>
          <div className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="rounded-xl border border-purple-300/30 bg-white/80 dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-gray-100 shadow-inner shadow-purple-200/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40 transition-all outline-none"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="rounded-xl border border-purple-300/30 bg-white/80 dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-gray-100 shadow-inner shadow-purple-200/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40 transition-all outline-none"
            />
            <textarea
              name="message"
              required
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="rounded-xl border border-purple-300/30 bg-white/80 dark:bg-gray-900/70 px-4 py-3 text-gray-900 dark:text-gray-100 shadow-inner shadow-purple-200/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40 transition-all outline-none resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-400/20 hover:scale-105 hover:shadow-purple-400/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          <div className="mt-4 min-h-[24px] text-center text-sm font-medium">
            {status && (
              <span className={status.startsWith('Message') ? 'text-green-600' : 'text-red-500'}>{status}</span>
            )}
          </div>
          <div className="mt-6 text-xs text-gray-700 dark:text-gray-300 text-center">
            Or email me directly at{' '}
            <a
              href="mailto:lakshya.ahlawat2001@gmail.com"
              className="font-medium text-blue-600 hover:underline"
            >
              ahlawat.lakshya.2004@gmail.com
            </a>
          </div>
        </motion.form>

      <motion.div
        initial={{ opacity: 0, x: 48, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.8, delay: 0.1, type: 'spring', bounce: 0.22 }}
        whileHover={{ scale: 1.04, rotate: 1 }}
        className="relative h-44 w-full max-w-xs group"
      >
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 blur-2xl group-hover:opacity-90 transition-opacity duration-300" />
        <div className="relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gray-900/90 p-7 text-xs text-gray-200 shadow-xl shadow-blue-500/25 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300">Status</p>
          <p className="mt-3 text-[13px] font-semibold text-blue-200">Open to SDE / frontend roles</p>
          <p className="mt-2 text-[12px] text-white/80">
            Prefer roles where I can work across the stack and own features from idea to production.
          </p>
        </div>
      </motion.div>
    </div>
  </Section>
  );
}
