"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseConfig";
export default function CardDemo() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
      setLoading(false);
    });

    return () => unsub(); // Clean up the listener
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-black" />
      </div>
    );
  }
  return (
    <div className="relative w-screen h-screen">
      {/* Background image */}
      <div className="fixed inset-0 z-0 bg-[url('/Alumni_Background.png')] bg-cover bg-center bg-no-repeat bg-fixed" />

      {/* Dark overlay */}
      <div className="fixed inset-0 z-0 bg-black/50" />

      {/* Foreground content */}
      <div className="relative z-10 w-screen h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-sm backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Login to your account</CardTitle>
            <CardDescription className="text-white/80">
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="cursor-pointer text-blue-300 hover:underline"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/80 text-black"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-blue-300 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/80 text-black"
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
