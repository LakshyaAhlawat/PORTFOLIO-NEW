import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import signup from "../assets/signup.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = e => setTouched({ ...touched, [e.target.name]: true });

  const validate = () => {
    const errors = {};
    if (!form.email) errors.email = "Email is required";
    if (!form.password) errors.password = "Password is required";
    if (!form.confirm) errors.confirm = "Confirm password is required";
    if (form.password && form.confirm && form.password !== form.confirm)
      errors.confirm = "Passwords do not match";
    return errors;
  };
  const errors = validate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields correctly.");
      setTouched({ email: true, password: true, confirm: true });
      return;
    }
    const result = await dispatch(
      signupUser({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirm, // <-- add this line
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Account created successfully!");
      navigate("/login");
    } else {
      toast.error(result.payload || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background:
          "linear-gradient(135deg, #10131a 0%, #181c24 40%, #23272f 100%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-[#232136]/95 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden scale-105 border border-[#23272f]/60 backdrop-blur-md">
        {/* Image: above on mobile, left on desktop */}
        <div className="w-full md:w-1/2 flex-shrink-0 flex flex-col">
          <img
            src={signup}
            alt=""
            className="object-cover w-full h-56 md:h-full"
            style={{
              filter: "brightness(0.85) saturate(1.1) blur(0.5px)",
              borderRight: "1px solid #23272f",
            }}
          />
        </div>
        {/* Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-[#232136] via-[#181c24] to-[#23272f]">
          <h2 className="text-4xl font-bold text-white mb-2 text-center md:text-left drop-shadow-lg">Create an account</h2>
          <p className="text-gray-400 mb-8 text-center md:text-left">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:underline">Log in</Link>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`bg-[#181c24]/90 border ${errors.email && touched.email ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-4 text-white w-full focus:outline-none focus:border-green-400 text-lg shadow-inner`}
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`bg-[#181c24]/90 border ${errors.password && touched.password ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-4 text-white w-full focus:outline-none focus:border-green-400 text-lg shadow-inner`}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-green-400"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
              {errors.password && touched.password && (
                <span className="text-red-400 text-sm mt-1 block">{errors.password}</span>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="Confirm password"
                className={`bg-[#181c24]/90 border ${errors.confirm && touched.confirm ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-4 text-white w-full focus:outline-none focus:border-green-400 text-lg shadow-inner`}
                value={form.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-green-400"
                tabIndex={-1}
                onClick={() => setShowConfirm(v => !v)}
              >
                {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
              {errors.confirm && touched.confirm && (
                <span className="text-red-400 text-sm mt-1 block">{errors.confirm}</span>
              )}
            </div>
            <button
              type="submit"
              className="mt-2 bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-lg transition text-lg shadow-lg"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}