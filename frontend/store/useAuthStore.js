import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance('/auth/check');
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth : ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("auth/login", formData)
            set({ authUser: res.data});
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data });
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("Error in Update Profile : ", error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    }
}));