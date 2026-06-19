"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "lakshyasharma.9.0.1.2@gmail.com",
    href: "mailto:lakshyasharma.9.0.1.2@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 88267 73747",
    href: "tel:+918826773747",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Delhi, India",
    href: null,
  },
];

const socials = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/LAKSHYA9941",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/lakshya-sharma-35817926a",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:lakshyasharma.9.0.1.2@gmail.com",
  },
];

const cardReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Contacts() {
  return (
    <footer
      id="contact"
      className="w-full max-w-[1200px] mx-auto px-6 pb-12 pt-[var(--spacing-section)]"
    >
      {/* Section Label */}
      <p className="section-label">// 04 Contact</p>

      {/* Availability */}
      <motion.p
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-base md:text-lg text-primary max-w-[600px] leading-relaxed"
      >
        Open to full-stack, React Native, and AI developer roles — remote or
        Delhi NCR.
        <br />
        <span className="text-muted">
          Response within 24 hours.
        </span>
      </motion.p>

      {/* Contact Cards */}
      <motion.div
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
      >
        {contactInfo.map((item) => {
          const Icon = item.icon;
          const inner = (
            <div className="glass-card flex items-center gap-4 p-5 transition-all duration-200 cursor-default">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 bg-surface-hover text-primary">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider mb-0.5 text-muted font-mono">
                  {item.label}
                </p>
                <p className="text-sm font-medium truncate text-primary">
                  {item.value}
                </p>
              </div>
            </div>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              className="block hover:opacity-90 transition-opacity"
            >
              {inner}
            </a>
          ) : (
            <div key={item.label}>{inner}</div>
          );
        })}
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12"
      >
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 hover:opacity-80 bg-surface border border-glass-border text-primary"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </motion.div>

      {/* Footer Line */}
      <hr className="section-divider mb-6 border-t border-glass-border border-l-0 border-r-0 border-b-0" />
      <p className="text-xs text-muted font-mono">
        {new Date().getFullYear()} Lakshya Sharma
      </p>
    </footer>
  );
}