"use client";
import { ArrowLeft, Eye, Github, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { supabase } from "@/util/supabase";

type Props = {
  project: {
    slug: string; // Added slug
    url?: string;
    title: string;
    description: string;
    repository?: string;
  };

  views: number;
};
export const Header: React.FC<Props> = ({ project, views: initialViews }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const fetchViews = async () => {
      const { data, error } = await supabase
        .from("views")
        .select("count")
        .eq("slug", project.slug)
        .single();

      if (data) {
        setViews(data.count);
      }
    };
    fetchViews();
  }, [project.slug]);

  const links: { label: string; href: string; icon?: React.ReactNode }[] = [];
  if (project.repository) {
    links.push({
      label: "GitHub",
      href: `https://github.com/${project.repository}`,
      icon: <Github className="w-4 h-4" />,
    });
  }
  if (project.url) {
    links.push({
      label: "Live Demo",
      href: project.url,
      icon: <ExternalLink className="w-4 h-4" />,
    });
  }
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/80  border-zinc-800 lg:border-transparent"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <span
              title="View counter for this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${
                isIntersecting
                  ? " text-zinc-400 hover:text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-100"
              } `}
            >
              <Eye className="w-5 h-5" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views
              )}
            </span>
            <Link target="_blank" href="https://linkedin.com/in/akshthakkar">
              <Linkedin
                className={`w-6 h-6 duration-200 hover:font-medium ${
                  isIntersecting
                    ? " text-zinc-400 hover:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100"
                } `}
              />
            </Link>
            <Link target="_blank" href="https://github.com/akshhthakkar">
              <Github
                className={`w-6 h-6 duration-200 hover:font-medium ${
                  isIntersecting
                    ? " text-zinc-400 hover:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100"
                } `}
              />
            </Link>
          </div>

          <Link
            href="/projects"
            className={`duration-200 hover:font-medium ${
              isIntersecting
                ? " text-zinc-400 hover:text-zinc-100"
                : "text-zinc-400 hover:text-zinc-100"
            } `}
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
      <div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {project.description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link
                  target="_blank"
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors duration-200"
                >
                  {link.icon}
                  {link.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
