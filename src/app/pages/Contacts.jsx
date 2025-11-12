"use client";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "../components/Socials";

gsap.registerPlugin(ScrollTrigger);

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending…");

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      reply_to: form.email,
      message: form.message,
      subject: `Portfolio enquiry from ${form.name || "Visitor"}`,
      name: form.name,
      email: form.email
    };

    emailjs
      .send("service_xyzslbc", "template_uduuos4", templateParams, "1MALs8pHBNOO1FLv4")
      .then(() => {
        setStatus("Sent! I’ll reply soon 👍");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error", err);
        setStatus("Could not send via EmailJS. Please verify your connection or try the social links.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const inputBase =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-200 backdrop-blur-lg";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-full py-16 px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-10 right-1/3 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-full mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Get In Touch
        </h2>

        <div className="grid min-h-4xl grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_25px_60px_-30px_rgba(14,116,144,0.8)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-cyan-500/10" />
            <div className="relative z-10 space-y-5">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Let's Connect</h3>
                <p className="text-white/70">
                  I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-purple-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p className="font-medium text-white">lakshyasharma.9.0.1.2.3@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-pink-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Phone</p>
                    <p className="font-medium text-white">+91 8826773747</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Location</p>
                    <p className="font-medium text-white">New Delhi, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_25px_60px_-30px_rgba(14,116,144,0.8)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-amber-500/15" />
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/70">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Jane Doe"
                  className={`${inputBase} ${focusedField === "name" ? "border-cyan-400" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className={`${inputBase} ${focusedField === "email" ? "border-cyan-400" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  required
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  className={`${inputBase} resize-none ${focusedField === "message" ? "border-cyan-400" : ""}`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 py-1.5 font-semibold text-white shadow-[0_12px_35px_-18px_rgba(244,114,182,0.8)] transition-all duration-300 hover:shadow-[0_20px_45px_-20px_rgba(37,99,235,0.75)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>

              {status && (
                <p className="text-center text-sm text-white/80">{status}</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}