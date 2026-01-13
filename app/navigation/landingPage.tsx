"use client";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { scrollToSection } from "../utils/scrollToSection";
import { portfolioService } from "@/services/portfolio.service";
import { useEffect, useState } from "react";
import { homeData, homeData as homePageData } from "../types/portfolioData";

const placeholder: homePageData = {
  fullName: "Shivam Glotra",
  title: ["Software Developer"],
  description: "Short Intro Unavailable",
};

export default function LandingPage() {
  const [data, setData] = useState<homePageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const result = await portfolioService.getAllData<homeData>("homePage");
      if (result) {
        setData(result);
        setError(null);
      }
    } catch (error) {
      // console.error(error);
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const display = data ?? placeholder;
  return (
    <main className="container !mx-auto !px-6 !py-20 " id="landingPage">
      {error && (
        <div className="text-red-400 mb-4">
          {error} —{" "}
          <button
            className="hover:cursor-pointer"
            onClick={() => {
              loadData();
            }}
          >
            Retry
          </button>
        </div>
      )}
      <div className="max-w-4xl !mx-auto ">
        {/* Content */}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <div className="!mb-8 ">
            <div className="flex items-center justify-center">
              <div
                className="flex h-28 w-28 items-center justify-center rounded-full
           bg-slate-900
           text-4xl font-semibold text-white
          "
              >
                &lt;/&gt;
              </div>
            </div>
          </div>

          <h1 className="text-5xl !md:text-7xl text-slate-100 !mb-6">
            Hi, I am{" "}
            <strong className="text-emerald-400"> {display?.fullName}</strong>
          </h1>

          <h2 className="!text-2xl !md:text-2xl !mb-4 !text-white/80">
            {display.title.join(" | ")}
          </h2>

          <p className="text-lg !md:text-2xl !text-white/70  !mb-12 max-w-2xl mx-auto leading-relaxed">
            {display.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 !mb-8">
            <button
              className="px-8 py-3 h-15 w-45 bg-emerald-600 font-bold text-white rounded-lg hover:bg-emerald-500/50 hover:cursor-pointer transition-colors shadow-sm"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </button>
            <button
              className="px-8 py-3 border-2 font-bold bg-slate-900/20 h-15 w-45 border-emerald-500 text-emerald-400 hover:cursor-pointer rounded-lg hover:bg-emerald-500/10 transition-colors"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </button>
            <button className="px-8 h-15 w-45 py-3 border-2 border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Download size={20} />
              Download CV
            </button>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Link
              href="https://github.com/ShivamGlotra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Github size={28} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/shivam-glotra-86a62318b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Linkedin size={28} />
            </Link>
            <a
              href="mailto:sglotra98@gmail.com"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
