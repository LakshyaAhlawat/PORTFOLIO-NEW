import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { GITHUB_URL } from "../config";
import { FaArrowUpRightFromSquare, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ProjectCard({
  project,
  index,
  total,
  onPrev,
  onNext,
  autoPlay = false,
  autoPlayDelay = 4000,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const autoPlayRef = useRef();

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay) return;
    autoPlayRef.current = setInterval(() => {
      onNext();
    }, autoPlayDelay);
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, autoPlayDelay, onNext]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-transparent">
      {/* Left: Project Info */}
      <div className="flex-1 flex flex-col gap-4 max-w-xl">
        <div className="text-[3rem] md:text-[4rem] font-mono font-bold text-gray-200 leading-none">
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-3xl md:text-4xl font-mono font-bold text-white">{project.title}</h3>
        <p className="text-gray-300 font-mono">{project.description}</p>
        <div className="text-green-400 font-mono text-lg mt-2">
          {project.techStack && project.techStack.join(", ")}
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="flex gap-4 mt-2">
          {isAuthenticated && (
            <>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 hover:bg-green-400 group transition"
                title="Live Demo"
              >
                <FaArrowUpRightFromSquare className="text-2xl text-green-400 group-hover:text-gray-900 transition" />
              </a>
              <a
                href={project.github || GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 hover:bg-green-400 group transition"
                title="GitHub"
              >
                <FaGithub className="text-2xl text-green-400 group-hover:text-gray-900 transition" />
              </a>
            </>
          )}
        </div>
      </div>
      {/* Right: Project Image */}
      <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
        <div className="relative w-[350px] h-[220px] md:w-[480px] md:h-[300px] rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top scale-95 hover:scale-100 transition-transform duration-700 animate-fadein"
            style={{ animation: "fadein 1.2s" }}
          />
          {/* Carousel Arrows */}
          <button
            onClick={onPrev}
            className="absolute left-4 bottom-4 w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-gray-900 hover:bg-green-300 transition"
            aria-label="Previous Project"
          >
            <FaChevronLeft size={22} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-gray-900 hover:bg-green-300 transition"
            aria-label="Next Project"
          >
            <FaChevronRight size={22} />
          </button>
        </div>
      </div>
      {/* Carousel Index (optional) */}
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: scale(0.97);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );
}
