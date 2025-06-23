import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ResumeDownloadButton from "../components/ResumeDownloadButton";
import Stats from "../components/Stats";
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL, LEETCODE_URL, GFG_URL } from "../config";
import { FaGithub, FaLinkedinIn, FaArrowUpRightFromSquare, FaTwitter } from "react-icons/fa6";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import ProfileImage from "../assets/profile.jpg"; 

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8
      bg-gradient-to-br from-[#181c24] via-[#10131a] to-[#23272f]
      md:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] 
      md:from-[#23272f] md:via-[#10131a] md:to-[#181c24] 
      "
    >
      {/* Responsive layout: mobile (column), desktop (row) */}
      <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-6xl mt-8 md:mt-16">
        {/* Left: Text Content (on desktop) */}
        <div className="flex-1 flex flex-col gap-6 items-center md:items-start">
          <span className="text-green-300 font-mono text-base md:text-lg mb-2">
            Software Developer
          </span>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-mono font-bold text-white text-center md:text-left leading-tight">
            Hello I&apos;m <br />
            <span className="text-green-400 block">Lakshya Ahlawat</span>
          </h1>
          <p className="text-gray-300 font-mono text-center md:text-left max-w-xl mt-4 text-base md:text-lg">
            I excel at crafting elegant digital experiences and I am proficient in
            various programming languages and technologies.
          </p>
          {/* Download CV Button & Socials */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <ResumeDownloadButton />
            <div className="flex gap-4 mt-2 md:mt-0">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition text-xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={LEETCODE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition text-xl"
                aria-label="LeetCode"
              >
                <SiLeetcode />
              </a>
              <a
                href={GFG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition text-xl"
                aria-label="GeeksforGeeks"
              >
                <SiGeeksforgeeks />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition text-xl"
                aria-label="Portfolio"
              >
                <FaArrowUpRightFromSquare />
              </a>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        {/* Right: Profile Image (on desktop) */}
        <div className="flex-1 flex justify-center items-center mb-10 md:mb-0">
          <div className="relative">
            <img
              src={ProfileImage}
              alt="Profile"
              className="rounded-full w-40 h-40 md:w-[400px] md:h-[400px] object-cover border-4 border-green-400 shadow-lg"
            />
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-400 animate-spin-slow"></div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="w-full mt-10">
        <Stats />
      </div>
    </div>
  );
}