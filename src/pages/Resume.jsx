import { useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaLock } from "react-icons/fa";
import { SiRedux, SiTailwindcss, SiBootstrap, SiShadcnui, SiMongodb, SiFirebase, SiExpress, SiPostgresql } from "react-icons/si";
import { DiPython } from "react-icons/di";
import { SiCplusplus } from "react-icons/si";
import { SiC } from "react-icons/si";

const skillsList = [
  { name: "HTML5", icon: <FaHtml5 className="text-5xl text-white" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-5xl text-white" /> },
  { name: "JavaScript", icon: <FaJs className="text-5xl text-white" /> },
  { name: "React.js", icon: <FaReact className="text-5xl text-white" /> },
  { name: "Redux Toolkit", icon: <SiRedux className="text-5xl text-white" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-5xl text-white" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-5xl text-white" /> },
  { name: "ShadCN", icon: <SiShadcnui className="text-5xl text-white" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-5xl text-white" /> },
  { name: "Express.js", icon: <SiExpress className="text-5xl text-white" /> },
  { name: "Firebase", icon: <SiFirebase className="text-5xl text-white" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-5xl text-green-400" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-5xl text-white" /> },
  { name: "JWT Tokens", icon: <FaLock className="text-5xl text-white" /> },
  { name: "C++", icon: <SiCplusplus className="text-5xl text-white" /> },
  { name: "C", icon: <SiC className="text-5xl text-white" /> },
  { name: "Python", icon: <DiPython className="text-5xl text-white" /> },
];

const education = [
  {
    period: "2023-2027",
    degree: "B-TECH (ECE)",
    school: "NSUT",
  },
  {
    period: "2008-2023",
    degree: "Primary and Secondary Schooling",
    school: "Bal Bhavan Public School",
  },
];

const aboutMeIntro = `I am a passionate software developer with a keen interest in crafting elegant digital solutions. I specialize in various programming languages and technologies.`;

const aboutMeDetails = [
  { label: "Name", value: "Lakshya Ahlawat" },
  { label: "Phone", value: "+91 7982159112" },
  { label: "Experience", value: "1+ Years" },
  { label: "Nationality", value: "Indian" },
  { label: "Freelance", value: "NA" },
  { label: "Email", value: "ahlawat.lakshya.2004@gmail.com" },
  { label: "Languages", value: "English, Hindi,French(beginner)" },
];

const tabs = [
  { label: "Skills", value: "skills" },
  { label: "Education", value: "education" },
  { label: "About Me", value: "about" },
];

export default function Resume() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-2 py-8"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #0a0c10 0%, #05060a 80%, #000 100%), radial-gradient(circle at 80% 80%, #10131a 0%, #0a0c10 60%, #000 100%)",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Left Tabs */}
        <div className="flex flex-row md:flex-col gap-4 md:w-1/3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`w-full px-6 py-4 rounded-lg font-mono text-lg font-semibold transition
                ${activeTab === tab.value
                  ? "bg-emerald-400 text-black shadow-lg"
                  : "bg-[#181c24] text-white hover:bg-[#23272f]"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Right Content */}
        <div className="flex-1">
          {activeTab === "skills" && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">My Skills</h2>
              <p className="text-gray-400 mb-8 font-mono text-base md:text-lg">
                I am proficient in a wide range of technologies and frameworks that empower me to deliver robust and scalable solutions. Some of my key skills include:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {skillsList.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center bg-[#363d4d] rounded-2xl p-6 md:p-8 shadow-md min-h-[100px] min-w-[100px] md:min-h-[120px] md:min-w-[120px] transition-all duration-300 group hover:bg-emerald-400/10"
                  >
                    <div className="transition-all duration-300 group-hover:opacity-30">
                      {skill.icon}
                    </div>
                    <span className="text-white font-mono mt-3 text-base text-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-emerald-400">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "education" && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">My Education</h2>
              <p className="text-gray-400 mb-8 font-mono text-base md:text-lg">
                I have pursued education in Electronics and Communication Engineering,
                fostering a strong foundation in problem-solving and
                innovation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-[#23242a] rounded-2xl p-6 shadow-md flex flex-col min-h-[160px] justify-between"
                  >
                    <div>
                      <div className="text-emerald-400 font-bold mb-1 font-mono text-lg">{edu.period}</div>
                      <div className="text-xl md:text-2xl font-semibold text-white font-mono mb-2">{edu.degree}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block"></span>
                      <span className="text-gray-300 font-mono text-base">{edu.school}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "about" && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">About Me</h2>
              <p className="text-gray-400 mb-8 font-mono text-base md:text-lg">
                {aboutMeIntro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 font-mono text-base md:text-lg">
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-gray-400">Name</span>
                    <span className="ml-3 font-bold text-white">Lakshya Ahlawat</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Experience</span>
                    <span className="ml-3 font-bold text-white">1+ Years</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Freelance</span>
                    <span className="ml-3 font-bold text-white">NA</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Languages</span>
                    <span className="ml-3 font-bold text-white">English, Hindi, French(beginner)</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-gray-400">Phone</span>
                    <span className="ml-3 font-bold text-white">+91 7982159112</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Nationality</span>
                    <span className="ml-3 font-bold text-white">Indian</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email</span>
                    <span className="ml-3 text-[20px] font-semibold text-white break-all">ahlawat.lakshya.2004@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}