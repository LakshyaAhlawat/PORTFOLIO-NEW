import { useState, useCallback } from "react";
import ProjectCard from "../components/ProjectCard";
import StudyNotion from "../assets/StudyNotion.jpg";
import Weather from "../assets/Weather.jpg";
import Trip from "../assets/Trip.jpg";

// Example projects array (replace with your real data)
const projects = [
  {
    title: "Course Builder Platform- StudyNotion",
    description: "A FullStack Application for creating and managing courses with user authentication.",
    techStack: ["React", "Redux", "Tailwind CSS"," Node.js", "Express", "MongoDB"],
    github: "https://github.com/LakshyaAhlawat/StudyNotion-Hosting.git",
    demo: "https://study-notion-frontend-two-mu.vercel.app/",
    image:StudyNotion,
  },
  {
    title: "Weather App",
    description: "A simple weather application that fetches real-time weather data using OpenWeatherMap API integrated with login signup features and an integrated weather dashboard.",
    techStack: ["Node.js", "Express", "MongoDB", "React", "Redux", "Tailwind CSS"],
    github: "https://github.com/LakshyaAhlawat/WeatherApp-Private.git",
    demo: "https://weather-app-private-nu.vercel.app/",
    image: Weather,
  },
  {
    title: "AI Trip Planner",
    description: "An AI-powered trip planning web application that helps users plan their trips efficiently using AI.",
    techStack: ["Firebase", "Tailwind CSS","React","Gemini API"],
    github: "https://github.com/LakshyaAhlawat/ai-trip-planner-web.git",
    demo: "https://ai-trip-planner-web-blush.vercel.app/",
    image: Trip,
  },
];

export default function Work() {
  const [current, setCurrent] = useState(0);

  // For auto-play
  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % projects.length);
  }, []);
  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center px-2 py-8"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #0a0c10 0%, #05060a 80%, #000 100%), radial-gradient(circle at 80% 80%, #10131a 0%, #0a0c10 60%, #000 100%)",
        backgroundBlendMode: "screen",
      }}
      id="work"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-mono text-center">
        My Work
      </h2>
      <div className="w-full max-w-5xl flex-1 flex items-center justify-center">
        <div className="w-full">
          <ProjectCard
            project={projects[current]}
            index={current}
            total={projects.length}
            onPrev={handlePrev}
            onNext={handleNext}
            autoPlay={true}
            autoPlayDelay={5000}
          />
        </div>
      </div>
      {/* Carousel Dots */}
      <div className="flex gap-2 mt-8 justify-center">
        {projects.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition border-2 ${
              idx === current
                ? "bg-emerald-400 border-emerald-400"
                : "bg-gray-700 border-gray-600"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}