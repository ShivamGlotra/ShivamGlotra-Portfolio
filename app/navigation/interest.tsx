// import {
//   Heart,
//   Target,
//   Rocket,
//   Book,
//   Code,
//   Users,
//   TrendingUp,
//   Award,
// } from "lucide-react";

import * as LucideIcons from "lucide-react";
import { useEffect, useState } from "react";
import { interests } from "../types/portfolioData";
import { portfolioService } from "@/services/portfolio.service";

const Interests = () => {
  const [data, setData] = useState<interests | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const result = await portfolioService.getAllData<interests>("interests");
      setData(result);
    } catch (err) {
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const interests = data?.interestCards?.interests ?? [];
  const goals = data?.goalCards?.goals ?? [];

  return (
    <main className="container mx-auto !px-6 !py-20" id="interests">
      <div className="max-w-6xl !mx-auto">
        <h2 className="text-4xl text-slate-100 !mb-4 text-center">
          Interests & Goals
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>

        {/* Interests Section */}
        <div className="!mb-8">
          <div className="flex items-center gap-3 mb-8">
            <LucideIcons.Heart size={24} className="w-8 h-8 text-emerald-400" />
            <h3 className="text-3xl text-slate-100">My Interests</h3>
          </div>
        </div>

        {/* Interests */}
        <div className="grid md:grid-cols-2 gap-6 !mb-16">
          {interests.map((interest, index) => {
            const IconComp = LucideIcons[
              interest.icon as keyof typeof LucideIcons
            ] as typeof LucideIcons.CircleQuestionMark;
            return (
              <div
                key={index}
                className="bg-slate-900 !p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="!p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    <IconComp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl text-slate-100 !mb-2">
                      {interest.title}
                    </h4>
                    <p className="text-slate-400 !mb-2">
                      {interest.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Goals Section */}
        <div>
          <div className="flex items-center gap-3 !mb-8">
            <LucideIcons.Target
              size={24}
              className="w-8 h-8 text-emerald-400"
            />
            <h3 className="text-3xl text-slate-100">My Goals</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {goals.map((goal, index) => {
              const IconComp = LucideIcons[
                goal.icon as keyof typeof LucideIcons
              ] as typeof LucideIcons.CircleQuestionMark;
              return (
                <div
                  key={index}
                  className="bg-slate-900 !p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3 !mb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-l">
                      <IconComp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-xl text-slate-100">{goal.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {goal.details.map((detail, idx) => (
                      <li className="flex items-start gap-2" key={idx}>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 !mt-2 flex-shrink-0">
                          .
                        </div>
                        <span className="text-slate-400"> {detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interests;
