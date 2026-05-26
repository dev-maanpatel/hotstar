import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://backend-auth-gdiz.onrender.com/api";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/register`,
                userData
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.msg || "Registration failed"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/login`,
                userData
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.msg || "Invalid email or password"
            );
        }
    }
);

export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.put(
                `${API_URL}/auth/change-password`,
                {
                    oldPassword: userData.oldPassword,
                    newPassword: userData.newPassword,
                },
                {
                    headers: {
                        Authorization: userData.token,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.msg || "Password change failed"
            );
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/forgot-password`,
                userData
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.msg || "Email not found"
            );
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/reset-password`,
                userData
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.msg || "Invalid OTP"
            );
        }
    }
);

export const existingLogin = createAsyncThunk(
    "auth/existingLogin",
    async (_, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            if (!token) {
                return rejectWithValue("No token");
            }

            const res = await axios.get(
                `${API_URL}/user`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.msg || "Unauthorized"
            );
        }
    }
);

const initialState = {
    isLoading: false,
    isRegister: false,
    user: null,
    error: null,
    emailVerify: false,
    forgotError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegister = true;
                state.user = action.payload;
                state.error = null;

                localStorage.setItem(
                    "token",
                    JSON.stringify(action.payload.token)
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;

                localStorage.setItem(
                    "token",
                    JSON.stringify(action.payload.token)
                );
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(forgotPassword.fulfilled, (state) => {
                state.emailVerify = true;
                state.forgotError = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.emailVerify = false;
                state.forgotError = action.payload;
            })

            .addCase(resetPassword.fulfilled, (state) => {
                state.emailVerify = false;
                state.forgotError = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.forgotError = action.payload;
            })

            .addCase(existingLogin.fulfilled, (state, action) => {
                state.user = {
                    ...action.payload.user,
                    token: JSON.parse(localStorage.getItem("token")),
                };
            })

            .addCase(existingLogin.rejected, (state) => {
                state.user = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;