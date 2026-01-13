import * as LucideIcons from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "../types/portfolioData";
import { portfolioService } from "@/services/portfolio.service";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState<projects | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const result = await portfolioService.getAllData<projects>("projects");
      if (result) {
        setData(result);
        setError(null);
      }
    } catch (error) {
      setError("Sorry, We could not fetch the data!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      loadData();
    };
    fetchData();
  }, []);

  const projects = data?.projectCards.projects ?? [];
  const categories = data?.projectCards.filters ?? [];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <main
      className="container !bg-slate-900 mx-auto !px-6 !py-20 "
      id="projects"
    >
      <div className="max-w-6xl !mx-auto ">
        <h2 className="text-4xl text-slate-100 !mb-3 text-center">
          {data?.projectDetails.heading || "Projects"}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>
        <p className="text-center text-slate-300 !mb-12 max-w-2xl !mx-auto">
          {data?.projectDetails.description}
        </p>

        {/* filtered Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 !mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`!px-6 !py-2 rounded-full transition-all ${
                filter === category.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-slate-700 hover:border-emerald-500"
            >
              <div className="relative overflow-hidden aspect-video">
                {project?.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  "null"
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    <a
                      href={project.gitub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 !px-4 !py-2 bg-slate-800 !text-slate-100 rounded-lg hover:bg-slate-700 transition-colors ${
                        project.category === "ml" ? "hidden" : ""
                      }`}
                    >
                      <LucideIcons.Github size={18} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 !px-4 !py-2 bg-emerald-500 !text-white rounded-lg hover:bg-emerald-600 transition-colors pointer-events-none opacity-50 cursor-not-allowed  ${
                        project.category === "ml" ? "hidden" : ""
                      }`}
                    >
                      <LucideIcons.ExternalLink size={18} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>

              <div className="!p-6">
                <div className="flex items-center gap-2 text-sm text-slate-400 !mb-2">
                  <LucideIcons.Calendar size={16} />
                  {project.date}
                </div>
                <h3 className="text-xl text-slate-100 !mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-300 !mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="!px-3 !py-1 bg-slate-800 text-emerald-400 rounded-full text-sm border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
