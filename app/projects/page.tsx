"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { supabase } from "@/util/supabase";

export default function ProjectsPage() {
  const [views, setViews] = useState<Record<string, number>>({});

  // Sort projects by date, newest first
  const sorted = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  // Fetch view counts from Supabase
  useEffect(() => {
    const fetchViews = async () => {
      const { data, error } = await supabase
        .from("views")
        .select("slug, count");

      if (error) {
        console.error("Error fetching views:", error);
        return;
      }

      const viewCounts: Record<string, number> = {};
      data?.forEach((view: any) => {
        viewCounts[view.slug] = view.count;
      });

      setViews(viewCounts);
    };

    fetchViews();
  }, [sorted]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

      <Navigation />

      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Projects I've built while learning and exploring different
            technologies.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2"
        >
          {sorted.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <Card>
                <Link href={`/projects/${project.slug}`}>
                  <article className="relative w-full h-full p-4 md:p-8 pb-16 md:pb-20">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-zinc-100">
                        {project.date ? (
                          <time dateTime={new Date(project.date).toISOString()}>
                            {Intl.DateTimeFormat("en-US", {
                              dateStyle: "medium",
                            }).format(new Date(project.date))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-xs flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {Intl.NumberFormat("en-US", {
                            notation: "compact",
                          }).format(views[project.slug] || 0)}
                        </span>
                        <span className="text-zinc-500 text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                          Featured
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                      {project.title}
                    </h2>
                    <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                      {project.description}
                    </p>
                    <div className="absolute bottom-4 md:bottom-8 left-4 right-4 md:left-8 md:right-8 flex justify-between items-center">
                      <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                        Read more <span aria-hidden="true">&rarr;</span>
                      </p>
                      {project.url && (
                        <span
                          className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.url, "_blank");
                          }}
                        >
                          Live Demo ↗
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
