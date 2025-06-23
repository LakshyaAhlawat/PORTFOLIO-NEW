import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

// Starfall animation component
function Starfall({ show }) {
  if (!show) return null;
  // Generate 40 stars with random positions and delays
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {[...Array(40)].map((_, i) => {
        const left = Math.random() * 100;
        const duration = 1.5 + Math.random() * 1.5;
        const delay = Math.random() * 1.5;
        const size = 2 + Math.random() * 2;
        return (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size * 6}px`,
              animation: `starfall ${duration}s linear ${delay}s 1`,
              opacity: 0.8,
            }}
          >
            <div
              style={{
                width: `${size}px`,
                height: `${size * 6}px`,
                background: "linear-gradient(180deg, #fff 0%, #38bdf8 100%)",
                borderRadius: "50%",
                filter: "blur(0.5px)",
              }}
            />
          </div>
        );
      })}
      <style>{`
        @keyframes starfall {
          0% { transform: translateY(-10vh) scaleX(0.7) scaleY(1); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) scaleX(0.7) scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Success dialog component
function SuccessDialog({ show, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(10,16,32,0.55)" }}
    >
      <div className={`bg-[#181c24] rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center transition-all duration-500 ${show ? "scale-100" : "scale-90"}`}>
        <svg width="60" height="60" fill="none" className="mb-4">
          <circle cx="30" cy="30" r="28" stroke="#38bdf8" strokeWidth="4" fill="#10131a" />
          <path d="M18 32l8 8 16-16" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-2xl font-bold text-emerald-400 mb-2 font-mono">Message Sent!</h3>
        <p className="text-gray-300 mb-4 text-center font-mono">Thank you for reaching out.<br />We will get back to you soon.</p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-all shadow"
        >
          Close
        </button>
      </div>
    </div>
  );
}

const services = [
  "Web Development",
  "Database Management",
  "SEO",
  "UI/UX Design",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/contact`, form);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500); // Hide after 3.5s
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-2 py-8 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #0a3cff 0%, #0a0c10 70%, #000 100%)",
        backgroundBlendMode: "screen",
      }}
    >
      {/* Blue Glow Arc */}
      <div
        className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vw] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, #1e90ff55 0%, #0a0c1000 80%)",
          filter: "blur(8px)",
        }}
      />
      <Starfall show={showSuccess} />
      <SuccessDialog show={showSuccess} onClose={() => setShowSuccess(false)} />
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="text-center mb-10">
          <div className="uppercase text-blue-400 font-semibold tracking-widest mb-2">Contacts</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get in Touch with Us</h2>
          <p className="text-gray-300 font-mono text-base md:text-lg">
            Please fill out the form below to share your feedback or request information about our services
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#181c24]/90 rounded-2xl shadow-2xl px-6 py-8 md:px-10 md:py-10 flex flex-col gap-6 backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-400 mb-2 font-mono">First name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className="w-full rounded-lg bg-[#23242a] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-400 mb-2 font-mono">Last name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className="w-full rounded-lg bg-[#23242a] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-400 mb-2 font-mono">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full rounded-lg bg-[#23242a] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-400 mb-2 font-mono">Phone no</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full rounded-lg bg-[#23242a] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-400 mb-2 font-mono">Select a service</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-[#23242a] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="">Select Service</option>
                {services.map((srv) => (
                  <option key={srv} value={srv}>{srv}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2 font-mono">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Type your message here..."
              rows={4}
              className="w-full rounded-lg bg-[#23242a] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-all shadow-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          <div className="text-center text-xs text-gray-400 mt-2">
            By contacting with us you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>
          </div>
        </form>
      </div>
    </section>
  );
}