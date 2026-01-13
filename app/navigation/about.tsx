import * as LucideIcons from "lucide-react";
import ImageLogo from "../components/ImageLogo/imageLogo";
import { useEffect, useState } from "react";
import { portfolioService } from "@/services/portfolio.service";
import { about } from "../types/portfolioData";

export default function About() {
  const [data, setData] = useState<about | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  // const highlights: Highlight[] = data?.aboutMeCardData?.highlights ?? highl;

  const loadData = async () => {
    try {
      const result = await portfolioService.getAllData<about>("about");
      if (result) {
        setData(result);
        setError(null);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };
    fetchData();
  }, []);

  const highlights = data?.aboutMeCard?.highlights ?? [];
  return (
    <main className="container !bg-slate-900 mx-auto !px-6 !py-20" id="about">
      <div className="max-w-6xl !mx-auto ">
        <h2 className="text-4xl text-slate-100 !mb-3 text-center">
          {data?.aboutMeData?.heading || "About Me"}
        </h2>
        <div className="w-20 h-1 bg-emerald-500 !mx-auto !mb-12"></div>
        <div className="grid md:grid-cols-2 gap-12 items-center !mb-16">
          <div>
            <div className=" aspect-square bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              {data?.aboutMeData?.image ? (
                <ImageLogo
                  src={data.aboutMeData.image}
                  alt="Workspace"
                  width={1000}
                  height={1000}
                  className=" object-cover opacity-90"
                />
              ) : (
                "null"
              )}
            </div>
          </div>

          <div>
            <h3 className="text-3xl text-slate-100 !mb-6">
              {data?.aboutMeData.title}
            </h3>
            {data?.aboutMeData?.description?.map((item) => (
              <p key={item} className="text-slate-300 !mb-4 text-base">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const IconComponent = LucideIcons[
              item.icon as keyof typeof LucideIcons
            ] as typeof LucideIcons.HelpCircle;
            return (
              <div
                key={index}
                className="!p-6 rounded-xl bg-slate-800/50 border-2 border-slate-700 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <div className="text-emerald-400 !mb-4">
                  {IconComponent ? (
                    <IconComponent size={32} />
                  ) : (
                    <LucideIcons.HelpCircle size={32} />
                  )}{" "}
                </div>
                <h4 className="text-xl text-slate-100 !mb-2">{item.title}</h4>
                <p className="text-slate-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
