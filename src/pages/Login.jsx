import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = e => setTouched({ ...touched, [e.target.name]: true });

  const validate = () => {
    const errors = {};
    if (!form.email) errors.email = "Email is required";
    if (!form.password) errors.password = "Password is required";
    return errors;
  };
  const errors = validate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields.");
      setTouched({ email: true, password: true });
      return;
    }
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: `
          radial-gradient(circle at 0% 0%, #23272f 0%, #181c24 60%, #10131a 100%),
          radial-gradient(circle at 100% 100%, #23272f 0%, #181c24 60%, #10131a 100%)
        `,
        backgroundBlendMode: "screen",
      }}
    >
      <div className="bg-[#232136]/95 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden scale-105">
        {/* Image: above on mobile, left on desktop */}
        <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col">
          <img
            src={login}
            alt=""
            className="object-cover w-full h-56 md:h-full"
          />
        </div>
        {/* Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-2 text-center md:text-left">Log in</h2>
          <p className="text-gray-400 mb-8 text-center md:text-left">
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-400 hover:underline">Sign up</Link>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`bg-[#181c24] border ${errors.email && touched.email ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-4 text-white w-full focus:outline-none focus:border-green-400 text-lg`}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span className="text-red-400 text-sm mt-1 block">{errors.email}</span>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`bg-[#181c24] border ${errors.password && touched.password ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-4 text-white w-full focus:outline-none focus:border-green-400 text-lg`}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="current-password"
              />
              {errors.password && touched.password && (
                <span className="text-red-400 text-sm mt-1 block">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="mt-2 bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-lg transition text-lg"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}