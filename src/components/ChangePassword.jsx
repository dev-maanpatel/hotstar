import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/slices/authSlice";

const ChangePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        if (formData.oldPassword === formData.newPassword) {
            setError("New password must be different from old password");
            return;
        }

        const res = await dispatch(changePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            token: user.token
        }));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/");
        }

        if (res.meta.requestStatus === "rejected") {
            setError(res.payload || "Old password is incorrect");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#040406] relative overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-cyan-500/30 blur-[140px] rounded-full top-[-120px] left-[-120px] animate-pulse" />
            <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[140px] rounded-full bottom-[-150px] right-[-120px] animate-pulse" />
            <div className="absolute w-[400px] h-[400px] bg-pink-500/30 blur-[120px] rounded-full top-[40%] left-[60%] animate-pulse" />

            <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                <div className="rounded-2xl bg-[#0b0b0f]/95 backdrop-blur-2xl border border-white/10 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Change Password
                        </h2>
                        <p className="text-white/50 text-sm mt-1">
                            Update your password 🔐
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative group">
                            <input
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                                placeholder="Old Password"
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                            />
                            <label className="absolute left-4 top-2 text-xs text-white/60 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-300">
                                Old Password
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                placeholder="New Password"
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                            />
                            <label className="absolute left-4 top-2 text-xs text-white/60 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-300">
                                New Password
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm Password"
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                            />
                            <label className="absolute left-4 top-2 text-xs text-white/60 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan-300">
                                Confirm Password
                            </label>
                        </div>

                        {error && (
                            <div className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                                <p className="text-sm text-red-400 text-center font-medium">
                                    {error}
                                </p>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white font-semibold tracking-wide shadow-lg shadow-purple-500/40 hover:scale-[1.03] active:scale-[0.97] transition"
                        >
                            Update Password 🔐
                        </button>
                    </form>

                    <p className="text-center text-sm text-white/50 mt-6">
                        Want to go back?
                        <span
                            onClick={() => navigate("/")}
                            className="text-cyan-300 font-medium cursor-pointer hover:underline ms-1"
                        >
                            Dashboard
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default ChangePassword;