import { FiArrowDownRight, FiArrowRight } from "react-icons/fi";

const services = [
  {
    number: "01",
    title: "Frontend-Services",
    description:
      "Create stunning and responsive web applications with modern frontend technologies. Utilize React, Tailwind CSS, and other frameworks to deliver exceptional user experiences across devices.",
  },
  {
    number: "02",
    title: "Backend-Services",
    description:
      "Build robust and scalable backend systems with Node.js and Express. Implement RESTful APIs, manage databases, and ensure secure data handling for seamless application performance.",
  },
  {
    number: "03",
    title: "Machine Learning",
    description:
      "Leverage machine learning algorithms to develop intelligent applications. From data preprocessing to model deployment, create solutions that learn from data and improve over time.",
  },
  {
    number: "04",
    title: "UI/UX Design",
    description:
      "Craft intuitive and aesthetically pleasing user interfaces with a focus on enhancing user experience. Implement user-centric design principles to create engaging digital products.",
  },
];

export default function Services() {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-2 py-8"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #0a0c10 0%, #05060a 80%, #000 100%), radial-gradient(circle at 80% 80%, #10131a 0%, #0a0c10 60%, #000 100%)",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 font-mono text-left">
          My Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, idx) => (
            <div
              key={service.number}
              className="group bg-transparent rounded-2xl p-8 transition-all duration-300 hover:bg-[#1e2e23]/60 border border-transparent hover:border-emerald-400 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl md:text-5xl font-extrabold text-emerald-200 font-mono drop-shadow-lg">
                  {service.number}
                </span>
                <span
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-white transition-all duration-300 group-hover:bg-emerald-400 shadow-lg"
                >
                  <FiArrowDownRight
                    className="text-3xl text-black transition-all duration-300 absolute opacity-100 group-hover:opacity-0"
                  />
                  <FiArrowRight
                    className="text-3xl text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                </span>
              </div>
              <h3 className="mt-6 text-3xl md:text-4xl font-extrabold font-mono text-white transition-all duration-300 group-hover:text-emerald-400 flex items-center gap-3">
                {service.title}
              </h3>
              <p className="mt-6 text-gray-300 font-mono text-lg md:text-xl leading-relaxed">
                {service.description}
              </p>
              <hr className="mt-8 border-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}