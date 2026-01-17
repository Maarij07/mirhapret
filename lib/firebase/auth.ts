// Firebase Authentication Utilities and Helper Functions

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";

/**
 * Sign up a new user with email and password
 */
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    let message = "Failed to create account";
    if (error.code === "auth/email-already-in-use") {
      message = "This email is already registered";
    } else if (error.code === "auth/invalid-email") {
      message = "Invalid email address";
    } else if (error.code === "auth/weak-password") {
      message = "Password is too weak";
    }
    throw new Error(message);
  }
};

/**
 * Sign in an existing user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    let message = "Failed to sign in";
    if (error.code === "auth/user-not-found") {
      message = "No account found with this email";
    } else if (error.code === "auth/wrong-password") {
      message = "Incorrect password";
    } else if (error.code === "auth/invalid-email") {
      message = "Invalid email address";
    }
    throw new Error(message);
  }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error: any) {
    let message = "Google sign in failed";
    if (error.code === "auth/popup-blocked") {
      message = "Sign-in popup was blocked. Please allow popups and try again.";
    } else if (error.code === "auth/popup-closed-by-user") {
      message = "Sign-in popup was closed";
    }
    throw new Error(message);
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error("Failed to sign out");
  }
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
  });
  return unsubscribe;
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

