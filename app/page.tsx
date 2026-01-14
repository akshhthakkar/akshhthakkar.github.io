"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
];

// Global variable to track intro state across SPA navigation (resets on refresh)
let isIntroShown = false;

export default function Home() {
  const [introFinished, setIntroFinished] = useState(isIntroShown);
  // Capture the initial state to determine if we should use shortened animations
  // consistently throughout the component's lifecycle
  const [shouldSkipAnimation] = useState(isIntroShown);

  useEffect(() => {
    if (isIntroShown) {
      setIntroFinished(true);
    } else {
      // Use a small timeout to avoid React Strict Mode (Dev) double-mount causing instant skip
      // This ensures we only set the flag if the component stays mounted for at least 100ms
      const timer = setTimeout(() => {
        isIntroShown = true;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black duration-1000">
      {/* Navigation - Fades in after intro */}
      <nav
        className={`my-8 w-full z-20 transition-opacity duration-1000 ${
          introFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium duration-500 text-zinc-400 hover:text-zinc-100"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* REMOVED GLOBAL TOP DIVIDER LINE HERE */}

      {/* Main Layout Container */}
      <main
        className={`flex-1 flex w-full max-w-7xl mx-auto z-10 py-12 px-6 md:px-12 transition-all duration-1000 ease-in-out
        ${
          introFinished
            ? "flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16" // Hero State
            : "flex-col items-center justify-center gap-0" // Intro State (Centered)
        }`}
      >
        {/* Left Column: Text */}
        <motion.div
          layout // Allows smooth movement from center to left
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`flex flex-col items-center ${
            introFinished ? "md:items-start md:text-left" : ""
          } text-center space-y-6 w-full ${
            introFinished ? "md:w-1/2" : "md:w-auto"
          }`}
        >
          <div className="cursor-default font-display relative flex flex-col items-center">
            {/* Top Line: Slides in from Right (Chronark style) */}
            <motion.div
              initial={{ x: "50%", opacity: 0, scaleX: 0.5 }}
              animate={{
                x: !introFinished ? 0 : "50%",
                opacity: !introFinished ? 1 : 0,
                scaleX: !introFinished ? 1 : 0.5,
              }}
              transition={{
                duration: shouldSkipAnimation ? 0.8 : 1.5,
                ease: "easeOut",
              }}
              className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent mb-4"
            />

            {/* Name Animation */}
            <motion.h1
              layoutId="hero-title"
              initial={{
                opacity: 0,
                lineHeight: "0em",
                letterSpacing: "0.25em",
              }}
              animate={{
                opacity: 1,
                lineHeight: "1em",
                letterSpacing: "0em",
              }}
              transition={{
                duration: shouldSkipAnimation ? 0.8 : 3,
                ease: "easeOut",
              }}
              onAnimationComplete={() => {
                setIntroFinished(true);
              }}
              className="py-2 text-4xl text-transparent bg-white text-edge-outline sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap bg-clip-text leading-tight z-20"
            >
              aksh thakkar
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: introFinished ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="text-white inline-block"
              >
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0,
                    ease: "easeInOut",
                  }}
                >
                  .
                </motion.span>
              </motion.span>
            </motion.h1>

            {/* Bottom Line: Slides in from Left (Chronark style) */}
            <motion.div
              initial={{ x: "-50%", opacity: 0, scaleX: 0.5 }}
              animate={{
                x: !introFinished ? 0 : "-50%",
                opacity: !introFinished ? 1 : 0,
                scaleX: !introFinished ? 1 : 0.5,
              }}
              transition={{
                duration: shouldSkipAnimation ? 0.8 : 1.5,
                ease: "easeOut",
              }}
              className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent mt-4"
            />
          </div>

          {/* Tagline - Appears after spacing out */}
          <AnimatePresence>
            {introFinished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldSkipAnimation ? 0.8 : 1.5,
                  delay: shouldSkipAnimation ? 0 : 0.5,
                  ease: "easeOut",
                }} // Slight delay after shift
                className="text-sm md:text-base text-zinc-400 max-w-md md:max-w-xl leading-relaxed"
              >
                <h2 className="break-words">
                  3rd Year Computer Science Engineering Student
                  <br className="hidden md:block" />
                  <span className="mt-2 inline-block">
                    MERN stack dev by choice • AWS certified by effort • AI
                    enthusiast by curiosity
                  </span>
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Column: Photo (Only appears in Hero State) */}
        <AnimatePresence>
          {introFinished && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: shouldSkipAnimation ? 0 : 1.0 }} // Slower reveal (1.0s delay)
              className="w-full md:w-1/2 flex justify-center md:justify-end h-[400px] md:h-[500px] items-end pb-8"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  {/* 1. Circle Container (Clips the body) */}
                  <div className="absolute inset-0 rounded-full bg-zinc-800 overflow-hidden shadow-2xl z-0">
                    <img
                      src="/images/profile.png"
                      alt="Aksh Thakkar Body"
                      width={500}
                      height={500}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-cover"
                    />
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)] pointer-events-none" />
                  </div>

                  {/* 2. Pop-out Layer (Head only, masked) */}
                  <motion.div
                    initial={{ opacity: 0, y: 0, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    className="absolute bottom-0 left-1/2 w-[115%] max-w-none z-10 pointer-events-none"
                    style={{
                      maskImage:
                        "linear-gradient(to top, transparent 45%, black 55%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, transparent 45%, black 55%)",
                    }}
                  >
                    <img
                      src="/images/profile.png"
                      alt="Aksh Thakkar Head"
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>

                {/* Quote below photo */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: shouldSkipAnimation ? 0 : 2.2,
                  }}
                  className="text-zinc-500 italic text-sm text-center max-w-xs"
                >
                  “If I don’t have to do it, I won’t. If I have to, I’ll make it
                  quick.”
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* REMOVED GLOBAL BOTTOM DIVIDER LINE HERE */}

      {/* Content Sections (Only visible after Intro) */}
      {introFinished && (
        <>
          {/* About Section */}
          <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-8 text-center md:text-left">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="max-w-3xl mx-auto space-y-8 text-zinc-400 leading-relaxed text-lg"
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="text-2xl font-display text-zinc-100 mb-8 text-center"
              >
                About Me
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                I’m a 3rd year Computer Science Engineering student with
                hands-on experience in Python and web development, and a growing
                interest in cloud and AI-driven systems.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                I’ve built full-stack projects like an ERP system and a
                centralized appointment booking platform, focusing on backend
                logic, authentication, and real user workflows rather than a
                single technology.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                I’ve completed AWS Cloud Foundations and apply cloud concepts
                while deploying and improving my projects. Alongside this, I’m
                exploring AI with the goal of integrating intelligent features
                into practical applications.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                Outside development, I enjoy music and visual design, which led
                me to build{" "}
                <Link
                  target="_blank"
                  href="https://wallpaperverse.akshthakkar.me"
                  className="text-zinc-100 underline decoration-zinc-500 underline-offset-4 hover:decoration-zinc-100 transition-colors"
                >
                  WallpaperVerse
                </Link>
                , a curated wallpaper platform that blends creativity with clean
                UI and functionality.
              </motion.p>
            </motion.div>
          </section>

          {/* Download Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full flex justify-center py-8"
          >
            <Link
              href="/images/Resume_F.pdf"
              target="_blank"
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-lg transition-all duration-300 flex items-center gap-3 border border-zinc-700 hover:border-zinc-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </Link>
          </motion.div>
        </>
      )}

      {/* Footer */}
      {introFinished && (
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full border-t border-zinc-800 py-12"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Aksh Thakkar. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {/* LinkedIn */}
              <Link
                href="https://linkedin.com/in/akshthakkar"
                target="_blank"
                className="text-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              {/* GitHub */}
              <Link
                href="https://github.com/akshhthakkar"
                target="_blank"
                className="text-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
              {/* LeetCode */}
              <Link
                href="https://leetcode.com/u/akshthakkar/"
                target="_blank"
                className="text-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                aria-label="LeetCode"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                </svg>
              </Link>
              {/* HackerRank */}
              <Link
                href="https://www.hackerrank.com/profile/akshthakkar"
                target="_blank"
                className="text-zinc-500 hover:text-zinc-100 transition-colors duration-200"
                aria-label="HackerRank"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0v24h24V0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95c-.061 0-.111-.05-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.061 0 .111.05.111.11v7.767a.11.11 0 01-.11.112h-5.78a.11.11 0 01-.11-.11V8.111c0-.06.05-.11.11-.11z" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.footer>
      )}
    </div>
  );
}
