"use client";

import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

// Certifications in chronological order (Newest -> Oldest)
const certifications: {
  title: string;
  issuer: string;
  description: string;
  link: string;
  date: string;
  verifyUrl?: string;
}[] = [
  {
    title: "AWS Cloud Foundations",
    issuer: "AWS",
    description:
      "AWS Cloud Foundations certification covering core cloud concepts and services.",
    link: "/images/AWS_Academy_Graduate_Cloud_Foundations.pdf",
    date: "2025",
    verifyUrl:
      "https://www.credly.com/badges/5ed2f142-4ae8-46dd-9ac2-c9b13962cf1d",
  },
  {
    title: "Diploma in Computer Engineering",
    issuer: "Silver Oak University",
    description: "Completed Diploma with 10 CGPA.",
    link: "/images/Diploma Certificate .pdf",
    date: "2024",
  },
  {
    title: "Smart Coder (DSA)",
    issuer: "Smart Interviews",
    description:
      "Data Structures and Algorithms training in 40 Day Impact course.",
    link: "/images/Smart Interviews Certificate.pdf",
    date: "2024",
  },
  {
    title: "Listening Skills Finalist",
    issuer: "Global Fun Fest",
    description: "Finalist in Listening Skills Event.",
    link: "/images/Listening.pdf",
    date: "2024",
  },
  {
    title: "MERN Stack Internship",
    issuer: "One Technologies",
    description: "6-month internship delivering a full-stack web application.",
    link: "/images/OneTechnologies.pdf",
    date: "2024",
  },
  {
    title: "Python Programming",
    issuer: "C-DAC",
    description: "Completed 100+ hours training with A+ grade.",
    link: "/images/Python - A.pdf",
    date: "2023",
  },
  {
    title: "Ideathon Winner",
    issuer: "Startups 2023",
    description: "Secured 1st place in Ideathon competition leading a team.",
    link: "/images/Ideathon.pdf",
    date: "2023",
  },
  {
    title: "Startup Incubation",
    issuer: "Ignite",
    description: "Startup idea incubated at Ignite, secured ₹2L funding.",
    link: "/images/Startup Incubation.jpg",
    date: "2023",
  },
  {
    title: "Ignite Internship",
    issuer: "Ignite Incubation Centre",
    description: "15-day internship working on startup idea validation.",
    link: "/images/Ignite Internship Certificate .pdf",
    date: "2023",
  },
  {
    title: "Computer Networks Workshop",
    issuer: "Workshop",
    description: "Hands-on experience in Computer Networks.",
    link: "/images/CN Workshop.pdf",
    date: "2023",
  },
  {
    title: "Multilingual Programming",
    issuer: "C-DAC",
    description:
      "C, C++, Java, JS, HTML, CSS course (144+ hours) with A grade.",
    link: "/images/Multilingual.pdf",
    date: "2022",
  },
];

export default function CertificationsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative pb-16 min-h-screen overflow-hidden">
      <Navigation />

      {/* Background Particles */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={500}
      />

      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Certifications
          </h2>
          <p className="mt-4 text-zinc-400">
            A timeline of my learning journey, achievements, and recognitions.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={item}>
              <Card>
                <Link href={cert.link} target="_blank">
                  <article className="relative w-full h-full p-4 md:p-8 pb-16 md:pb-20">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-zinc-100">
                        <time dateTime={cert.date}>{cert.date}</time>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-xs flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-zinc-100 group-hover:text-white lg:text-2xl font-display">
                      {cert.title}
                    </h2>
                    <p className="mt-4 leading-7 duration-150 text-zinc-400 group-hover:text-zinc-300 text-sm">
                      {cert.description}
                    </p>
                    <div className="absolute bottom-4 md:bottom-8 left-4 right-4 md:left-8 md:right-8 flex justify-between items-center">
                      <p className="text-zinc-200 hover:text-zinc-50 text-sm flex items-center gap-2">
                        View Certificate <span aria-hidden="true">&rarr;</span>
                      </p>
                      {cert.verifyUrl && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/20">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verify
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
