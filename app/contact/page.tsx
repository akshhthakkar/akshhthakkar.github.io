"use client";
import { Github, Mail, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { useState } from "react";
import Particles from "../components/particles";

// Reordered: LinkedIn -> Github -> Twitter -> Email
const socials = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/akshthakkar",
    label: "LinkedIn",
    handle: "akshthakkar",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/akshhthakkar",
    label: "Github",
    handle: "akshhthakkar",
  },
  {
    icon: <Twitter size={20} />,
    href: "https://twitter.com/akshhthakkar",
    label: "Twitter",
    handle: "@akshhthakkar",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:aksht455@gmail.com",
    label: "Email",
    handle: "aksht455@gmail.com",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Web3Forms Access Key
    formData.append("access_key", "394b8f7d-9f4a-4383-bd20-5e45b0c44e48");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setStatus("Sending...");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen relative overflow-hidden">
      <Navigation />

      {/* Background Particles */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={500}
      />

      {/* Social Cards Section */}
      <div className="container flex items-center justify-center px-4 mx-auto pt-32 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:gap-16"
        >
          {socials.map((s) => (
            <motion.div key={s.label} variants={item}>
              <Card>
                <Link
                  href={s.href}
                  target="_blank"
                  className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:px-10"
                >
                  <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                    {s.icon}
                  </span>{" "}
                  <div className="z-10 flex flex-col items-center w-full">
                    <span
                      // Handle Font Size Logic: Email gets smaller text, others get larger text
                      className={`text-lg font-medium duration-150 text-zinc-200 group-hover:text-white font-display text-center whitespace-nowrap
                                                ${
                                                  s.label === "Email"
                                                    ? "xl:text-2xl"
                                                    : "xl:text-3xl"
                                                } 
                                            `}
                    >
                      {s.handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {s.label}
                    </span>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scrolling Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
        className="container mx-auto px-4 pb-24"
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-full h-px bg-zinc-800 mb-12" /> {/* Divider */}
          <h2 className="text-3xl font-bold text-zinc-100 font-display text-center mb-8">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-md bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-400"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-md bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-600 resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-zinc-100 text-zinc-900 font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
              {status && <p className="text-zinc-400 text-sm">{status}</p>}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
