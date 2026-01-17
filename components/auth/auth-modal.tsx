"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Loader } from "lucide-react";
import Link from "next/link";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "@/lib/firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useUser } from "@/lib/context/user-context";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, initialTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useUser();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await signInWithEmail(loginData.email, loginData.password);
      
      // Set user context
      setUser({
        uid: user?.uid || "",
        email: user?.email || "",
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || null,
      });
      
      setSuccess(`Welcome back, ${user?.email}!`);
      setTimeout(() => {
        onClose();
        setLoginData({ email: "", password: "" });
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (signupData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const user = await signUpWithEmail(signupData.email, signupData.password);
      
      // Set user context with signup data
      setUser({
        uid: user?.uid || "",
        email: user?.email || "",
        displayName: `${signupData.firstName} ${signupData.lastName}`.trim(),
        photoURL: null,
      });
      
      setSuccess(`Account created successfully! Welcome, ${signupData.firstName}!`);
      setTimeout(() => {
        onClose();
        setSignupData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Set user context
      setUser({
        uid: result.user.uid,
        email: result.user.email || "",
        displayName: result.user.displayName || "",
        photoURL: result.user.photoURL,
      });
      
      setSuccess(`Welcome, ${result.user.displayName || result.user.email}!`);
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Google sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-base font-semibold text-black uppercase tracking-widest">
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded text-xs text-green-700">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-gray-200 rounded-full text-sm font-semibold text-black hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400">or</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeTab === "login"
                  ? "text-black border-b-2 border-black -mb-px"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeTab === "signup"
                  ? "text-black border-b-2 border-black -mb-px"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-black mb-3">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Signing in
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center pt-2">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="font-semibold text-black hover:text-gray-600"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-black mb-3">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      placeholder="First"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Last"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-3">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-black mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Creating account
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center pt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="font-semibold text-black hover:text-gray-600"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
