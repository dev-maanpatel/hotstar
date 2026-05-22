import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../redux/slices/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { emailVerify, forgotError } = useSelector((state) => state.auth);

  const [otpVerified, setOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "otp" && value.length > 4) return;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter email");
      return;
    }

    dispatch(
      forgotPassword({
        email: formData.email,
      })
    );
  };

  const handleVerifyOtp = () => {
    if (formData.otp.length !== 4) {
      alert("OTP must be 4 digits");
      return;
    }

    setOtpVerified(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Verify OTP first");
      return;
    }

    const res = await dispatch(resetPassword(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#040714]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(4,7,20,.4), rgba(4,7,20,1)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent"></div>

      <div className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        <h1 className="text-3xl md:text-4xl font-black tracking-wide text-white">
          Disney+ Hotstar
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-cyan-500/10">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-white mb-2">
              Reset Access
            </h2>
            <p className="text-gray-300 text-sm">
              Recover your Hotstar streaming account securely.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={emailVerify}
              placeholder="Enter your email"
              className="w-full rounded-2xl bg-[#10172b]/80 border border-white/10 px-5 py-4 text-white outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              name="otp"
              maxLength={4}
              value={formData.otp}
              onChange={handleChange}
              disabled={!emailVerify}
              placeholder="Enter OTP"
              className="w-full rounded-2xl bg-[#10172b]/80 border border-white/10 px-5 py-4 text-white outline-none focus:border-cyan-400 transition disabled:opacity-50"
            />

            {!emailVerify && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold text-lg hover:scale-[1.02] transition"
              >
                Send OTP
              </button>
            )}

            {emailVerify && !otpVerified && (
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition"
              >
                Verify OTP
              </button>
            )}

            {otpVerified && (
              <>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Create new password"
                  className="w-full rounded-2xl bg-[#10172b]/80 border border-white/10 px-5 py-4 text-white outline-none focus:border-cyan-400 transition"
                />

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] transition"
                >
                  Update Password
                </button>
              </>
            )}

            {forgotError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-4 text-sm">
                {forgotError}
              </div>
            )}
          </form>

          <div className="mt-8 text-center text-gray-300 text-sm">
            Already remember your password?
            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-cyan-400 cursor-pointer hover:text-cyan-300"
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
