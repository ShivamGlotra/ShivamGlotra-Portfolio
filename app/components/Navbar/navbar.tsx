import {
  BriefcaseIcon,
  CodeIcon,
  ContactIcon,
  FolderIcon,
  HomeIcon,
  Menu,
  SchoolIcon,
  StarIcon,
  UserIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import About from "../../navigation/about";
import LandingPage from "@/app/navigation/landingPage";
import Skills from "@/app/navigation/skills";
import Projects from "@/app/navigation/projects";
import Experience from "@/app/navigation/experience";
import Education from "@/app/navigation/education";
import Interests from "@/app/navigation/interest";
import Contact from "@/app/navigation/contact";
import { scrollToSection } from "@/app/utils/scrollToSection";

export const navItems = [
  {
    name: "Home",
    icon: <HomeIcon size={20} />,
    key: "landingPage",
    component: <LandingPage />,
  },
  {
    name: "About",
    icon: <UserIcon size={20} />,
    key: "about",
    component: <About />,
  },
  {
    name: "Skills",
    icon: <CodeIcon size={20} />,
    key: "skills",
    component: <Skills />,
  },
  {
    name: "Projects",
    icon: <FolderIcon size={20} />,
    key: "projects",
    component: <Projects />,
  },
  {
    name: "Experience",
    icon: <BriefcaseIcon size={20} />,
    key: "experience",
    component: <Experience />,
  },
  {
    name: "Education",
    icon: <SchoolIcon size={20} />,
    key: "education",
    component: <Education />,
  },
  {
    name: "Interests",
    icon: <StarIcon size={20} />,
    key: "interests",
    component: <Interests />,
  },
  {
    name: "Contact",
    icon: <ContactIcon size={20} />,
    key: "contact",
    component: <Contact />,
  },
];

interface props {
  activeSection: string;
}

const Navbar = ({ activeSection }: props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="mx-auto !pr-10 !pl-5 navbar backdrop-blur-md  !bg-slate-750 flex items-center justify-between  fixed ">
      <strong className="text-lg">Shivam Glotra</strong>
      {/* Desktop Navbar */}
      <ul className=" desktopNav items-center gap-3">
        {navItems.map((item) => (
          <li
            key={item.key}
            style={{ cursor: "pointer", display: "inline", margin: "0 8px" }}
          >
            <button
              onClick={() => scrollToSection(item.key)}
              className={`icon flex items-center gap-1 
                ${
                  activeSection === item.key
                    ? "font-semibold !text-emerald-400 underline underline-offset-4"
                    : "font-bold !text-blue-200"
                }`}
            >
              {item.icon} {item.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="hidden max-[1150px]:block"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul
          className="absolute top-full left-0 w-full
          bg-slate-800 flex-col 
          md:hidden shadow-md"
        >
          {navItems.map((item) => (
            <li
              key={item.key}
              className="cursor-pointer !h-10"
              onClick={() => {
                scrollToSection(item.key);
                setMenuOpen(false);
              }}
            >
              <button
                className={`flex items-center gap-2 text-md !text-blue-200
                  ${
                    activeSection === item.key
                      ? "font-semibold !text-emerald-400 underline underline-offset-4"
                      : "!text-blue-200"
                  }`}
              >
                {item.icon} {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
