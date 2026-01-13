import React from "react";
import { Heart, ArrowUp } from "lucide-react";

const scrollFuntion = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Footer() {
  const quickLinks = [
    { label: "Home", id: "landingPage" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Interests", id: "interests" },

  ];

  const resources = [
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="!bg-slate-950 text-white border-t border-slate-800">
      <div className="container mx-auto !px-6 !py-12">
        <div className="grid md:grid-cols-4 gap-8 !mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            {/* <h3 className="text-2xl text-emerald-400 !mb-4">{"<CS />"}</h3> */}
            <p className="text-slate-400 !mb-4 max-w-md">
              A passionate Computer Science student dedicated to creating
              innovative solutions and pushing the boundaries of technology.
            </p>
            <p className="text-slate-400">
              Let&apos;s build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg text-slate-100 !mb-4">Quick Links</h4>
            <ul className="!space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button className="text-slate-400 hover:text-emerald-400 transition-colors"
                    onClick={() => scrollFuntion(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg text-slate-100 !mb-4">Resources</h4>
            <ul className="!space-y-2">
              {resources.map((link, index) => (
                <li key={index}>
                  <button className="text-slate-400 hover:text-emerald-400 transition-colors"
                    onClick={() => scrollFuntion(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="!pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 !text-sm">
            © {new Date().getFullYear()} Shivam Glotra. Made with{" "}
            <Heart className="inline text-red-500" size={16} /> and passion.
          </p>

          <button
            className="!p-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-lg shadow-emerald-500/30"
            aria-label="Scroll to top"
            onClick={() => scrollFuntion("landingPage")}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
