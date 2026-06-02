import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { FirebaseError } from "firebase/app";

export function CmsLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  // If already logged in and admin, go to dashboard
  if (!loading && user && isAdmin) {
    return <Navigate to="/cms/dashboard" replace />;
  }

  const checkAndCreateUserDoc = async (uid: string) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // Create a default user document with role "user"
      // The site owner must manually change this to "admin" in Firebase Console
      await setDoc(userDocRef, {
        role: "user",
        createdAt: new Date().toISOString(),
      });
      setError("Account created. Please ask the administrator to grant you admin rights.");
      return false;
    }
    if (userDoc.data().role !== "admin") {
      setError("You do not have admin permissions.");
      return false;
    }
    return true;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAdminCheck = await checkAndCreateUserDoc(result.user.uid);
      if (isAdminCheck) {
        navigate("/cms/dashboard");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isAdminCheck = await checkAndCreateUserDoc(result.user.uid);
      if (isAdminCheck) {
        navigate("/cms/dashboard");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-navy dark:text-foreground">NE Times CMS</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage news articles</p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-breaking"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-breaking"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy text-white hover:bg-navy-deep font-medium py-2 rounded-md transition-colors disabled:opacity-70"
          >
            {isLoading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white text-navy border border-border hover:bg-gray-50 font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
