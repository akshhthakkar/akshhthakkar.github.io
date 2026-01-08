"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [particleCount, setParticleCount] = useState(50);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Dynamically adjust particles based on window width for performance
    const updateParticles = () => {
      if (window.innerWidth < 768) {
        setParticleCount(200); // Increased mobile count
      } else {
        setParticleCount(1000); // Increased desktop count
      }
    };

    updateParticles();
    window.addEventListener("resize", updateParticles);
    return () => window.removeEventListener("resize", updateParticles);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black duration-1000">
      {/* Background Particles */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={particleCount}
      />

      {/* Navigation - Fades in after intro */}
      <nav
        className={`my-8 w-full z-20 transition-opacity duration-1000 ${
          introFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium duration-500 text-zinc-400 hover:text-zinc-100"
            >
              {item.name}
            </Link>
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
              transition={{ duration: 1.5, ease: "easeOut" }}
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
                duration: 3,
                ease: "easeOut",
              }}
              onAnimationComplete={() => setIntroFinished(true)}
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
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent mt-4"
            />
          </div>

          {/* Tagline - Appears after spacing out */}
          <AnimatePresence>
            {introFinished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }} // Slight delay after shift
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
              transition={{ duration: 1, delay: 1.0 }} // Slower reveal (1.0s delay)
              className="w-full md:w-1/2 flex justify-center md:justify-end h-[400px] md:h-[500px] items-end pb-8"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  {/* 1. Circle Container (Clips the body) */}
                  <div className="absolute inset-0 rounded-full bg-zinc-800 overflow-hidden shadow-2xl z-0">
                    <img
                      src="/images/profile.png"
                      alt="Aksh Thakkar Body"
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
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>

                {/* Quote below photo */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
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
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 text-center md:text-left"
          >
            <div className="max-w-3xl mx-auto space-y-8 text-zinc-400 leading-relaxed text-lg">
              <h3 className="text-2xl font-display text-zinc-100 mb-8 text-center">
                About Me
              </h3>

              <p>
                I’m a 3rd year Computer Science Engineering student with
                hands-on experience in Python and web development, and a growing
                interest in cloud and AI-driven systems.
              </p>

              <p>
                I’ve built full-stack projects like an ERP system and a
                centralized appointment booking platform, focusing on backend
                logic, authentication, and real user workflows rather than a
                single technology.
              </p>

              <p>
                I’ve completed AWS Cloud Foundations and apply cloud concepts
                while deploying and improving my projects. Alongside this, I’m
                exploring AI with the goal of integrating intelligent features
                into practical applications.
              </p>

              <p>
                Outside development, I enjoy music and visual design, which led
                me to build{" "}
                <Link
                  target="_blank"
                  href="https://akshthakkar.me/wallpapers/"
                  className="text-zinc-100 underline decoration-zinc-500 underline-offset-4 hover:decoration-zinc-100 transition-colors"
                >
                  WallpaperVerse
                </Link>
                , a curated wallpaper platform that blends creativity with clean
                UI and functionality.
              </p>
            </div>
          </motion.section>
        </>
      )}

      {/* Footer / Spacer */}
      <div className="h-16" />
    </div>
  );
}
