import * as LucideIcons from "lucide-react";
import { education } from "../types/portfolioData";
import { useEffect, useState } from "react";
import { portfolioService } from "@/services/portfolio.service";

export default function Education() {
  const [data, setData] = useState<education | null>(null);

  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const response = await portfolioService.getAllData<education>(
        "education"
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

  const educationInfo = data?.educationCards?.education ?? [];
  const certifications = data?.educationCards?.certifications ?? [];
  return (
    <main
      className="container !bg-slate-900 mx-auto !px-6 !py-20 "
      id="education"
    >
      <div className="max-w-6xl !mx-auto ">
        <h2 className="text-4xl text-slate-100 !mb-3 text-center">
          {data?.educationDetails?.heading || "Education & Certifications"}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>

        {/* Education Grids */}
        <div className="!mb-12">
          {educationInfo.map((edu, index) => (
            <div
              key={index}
              className="bg-slate-800/50 !p-8 rounded-xl shadow-lg border-2 border-slate-700 !mb-10"
            >
              <div className="flex items-start gap-4 !mb-4">
                <div className="!p-3 bg-emerald-400/70 rounded-lg">
                  <LucideIcons.GraduationCap className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-slate-100 !mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-xl text-emerald-400 !mb-2">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap gap-4 text-slate-300 !mb-2">
                    <span className="flex items-center gap-1">
                      <LucideIcons.Calendar size={18} />
                      {edu.period}
                    </span>
                    <span>•</span>
                    <span>{edu.location}</span>
                    <span>•</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>
                  <p className="text-slate-300 !mb-4">{edu.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 !mt-6  !ml-17">
                <div>
                  <h4 className="flex items-center gap-2 text-lg text-slate-100 !mb-3">
                    <LucideIcons.BookOpen
                      size={20}
                      className="text-emerald-400"
                    />
                    Relevant Coursework
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {edu.coursework &&
                      edu.coursework.map((course, courseIndex) => (
                        <li
                          key={courseIndex}
                          className="flex items-start gap-2 text-slate-300"
                        >
                          <span className="text-emerald-400">•</span>
                          <span>{course}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="!mb-12">
          <h3 className="text-2xl text-slate-100 !mb-6">
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = LucideIcons[
                cert.icon as keyof typeof LucideIcons
              ] as typeof LucideIcons.CircleQuestionMark;
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 !p-6 rounded-xl border-2 border-slate-700 hover:border-emerald-500 transition-all shadow-sm hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="!p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <IconComponent size={25} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg text-slate-100 !mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-emerald-400 !mb-2">{cert.issuer}</p>
                      <p className="text-sm text-slate-400">{cert.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
