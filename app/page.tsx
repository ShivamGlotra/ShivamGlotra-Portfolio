"use client";

import { useState, useEffect } from "react";
import "./styles/navigation.css";
import "./styles/Home.css";
import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  Star as StarIcon,
  Folder as FolderIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Contact as ContactIcon,
} from "lucide-react";

// Import individual pages
import About from "./navigation/about";
import Experience from "./navigation/experience";
import Interests from "./navigation/interest";
import Projects from "./navigation/projects";
import LandingPage from "./navigation/landingPage";
import Skills from "./navigation/skills";
import Link from "next/link";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Education from "./navigation/education";
import Contact from "./navigation/contact";

export const navItems = [
  {
    name: "Home",
    icon: <HomeIcon size={20} />,
    key: "landingPage",
  },
  {
    name: "About",
    icon: <UserIcon size={20} />,
    key: "about",
    component: <About />,
  },
  { name: "Skills", icon: <CodeIcon size={20} />, key: "skills" },
  { name: "Projects", icon: <FolderIcon size={20} />, key: "projects" },
  { name: "Experience", icon: <BriefcaseIcon size={20} />, key: "experience" },
  { name: "Education", icon: <SchoolIcon size={20} />, key: "education" },
  { name: "Interests", icon: <StarIcon size={20} />, key: "interests" },
  { name: "Contact", icon: <ContactIcon size={20} />, key: "contact" },
];

export default function Home() {
  // State to control which section is active
  const [activeSection, setActiveSection] = useState("landingPage");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isBlurred, setBlurred] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  // Map the active section to the corresponding component
  const sections: Record<string, React.ReactNode> = {
    LandingPage: <LandingPage />,
    about: <About />,
    experience: <Experience />,
    interests: <Interests />,
    education: <Education />,
    projects: <Projects />,
    Skills: <Skills />,
    contact: <Contact />,
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const item of navItems) {
        const elmnt = document.getElementById(item.key);
        if (!elmnt) continue;

        const top = elmnt.offsetTop;
        const height = elmnt.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(item.key);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="container py-20 !bg-slate-800">
      {/* Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Display the active section */}
      {/* <section className="section">{sections[activeSection]}</section> */}

      <LandingPage />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Interests />
      <Contact />
      <Footer />
    </section>
  );
}
