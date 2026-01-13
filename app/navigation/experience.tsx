import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { experience } from "../types/portfolioData";
import { portfolioService } from "@/services/portfolio.service";

export default function Experience() {
  const [data, setData] = useState<experience | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const response = await portfolioService.getAllData<experience>(
        "experience"
      );
      if (response) {
        setData(response);
        setError(null);
      }
    } catch (err) {
      setError("Failed to load experience data.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const experiences = data?.experienceCard?.experiences ?? [];
  return (
    <main className="container mx-auto !px-6 !py-20" id="experience">
      <div className="max-w-6xl !mx-auto">
        <h2 className="text-4xl text-slate-100 !mb-4 text-center">
          {data?.experienceInfo?.heading || "Work Experience"}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-700"></div>

          <div className="!space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg shadow-emerald-500/50"></div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? "!md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-slate-900/50 !p-6 rounded-xl shadow-lg border-2 border-slate-700 hover:border-emerald-500 transition-all">
                    <div className="flex items-start gap-3 !mb-4">
                      <div className="!p-2 bg-emerald-500/10 rounded-lg">
                        <Briefcase className="text-emerald-400" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl text-slate-100 !mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-emerald-400 !mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={16} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 !mb-4">{exp.description}</p>

                    <div className="!mb-4">
                      <p className="text-sm text-slate-200 !mb-2">
                        Key Achievements:
                      </p>
                      <ul className="!space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 !text-sm !text-slate-300"
                          >
                            <span className="text-emerald-400 !mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="!px-3 !py-1 bg-slate-950 text-slate-300 rounded-full text-sm border border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
