import * as LucideIcons from "lucide-react";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { skills } from "../types/portfolioData";
import { portfolioService } from "@/services/portfolio.service";

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case "Expert":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    case "Advanced":
      return "bg-teal-500/10 text-teal-400 border-teal-500/30";
    case "Intermediate":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/30";
  }
};
export default function Skills() {
  const [data, setData] = useState<skills | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const result = await portfolioService.getAllData<skills>("skills");
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
      await loadData();
    };
    fetchData();
  }, []);

  const skillCategory = data?.skillCards?.skillCategories ?? [];
  return (
    <main className="container mx-auto !px-6 !py-20" id="skills">
      <div className="max-w-6xl !mx-auto ">
        <h2 className="text-4xl text-slate-100 !mb-3 text-center">
          {data?.skillInfo?.heading || "Skills & Technologies"}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategory.map((category, categoryIndex) => {
            const IconComponent = LucideIcons[
              category.icon as keyof typeof LucideIcons
            ] as typeof LucideIcons.Star;
            return (
              <div
                key={categoryIndex}
                className="bg-slate-900/70 !p-8 rounded-xl shadow-lg border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 !mb-6">
                  <div className="!p-2 bg-emerald-500/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl text-slate-100">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className={`!px-4 !py-2 rounded-lg border ${getProficiencyColor(
                        skill.proficiency
                      )} 
                          transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{skill.name}</span>
                        <Star className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Proficiency Legend */}
        <div className="!mt-12 flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-sm">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <span className="text-slate-400 text-sm">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-slate-400 text-sm">Intermediate</span>
          </div>
        </div>
      </div>
    </main>
  );
}
