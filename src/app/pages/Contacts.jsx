"use client";
import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Socials";

export default function Contacts() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "lakshyasharma.9.0.1.2.3@gmail.com",
      href: "mailto:lakshyasharma.9.0.1.2.3@gmail.com",
      color: "text-cyan-400"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8826773747",
      href: "tel:+918826773747",
      color: "text-emerald-400"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Delhi, India",
      href: null,
      color: "text-purple-400"
    }
  ];

  return (
    <footer
      id="contact"
      className="relative py-12 px-6 border-t border-white/10 bg-black/40 backdrop-blur-md"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Let's Connect
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            Open to new opportunities, collaborations, and interesting conversations
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm md:text-base font-medium text-white truncate">{item.value}</p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                className="block transform hover:scale-[1.02] transition-transform duration-300"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <Button />
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-white/5 text-center"
        >
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Lakshya Sharma. Built with passion and lots of coffee ☕
          </p>
        </motion.div>
      </div>
    </footer>
  );
}