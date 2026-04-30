"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-center">Ashbourne App</h1>

        <p className="mt-2 text-center text-gray-600">
          {mode === "signin" ? "Sign in to continue" : "Create your account"}
        </p>

        <div className="mt-8 space-y-4">
          {mode === "register" && (
            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-black text-white rounded-lg py-3"
            onClick={async () => {
              if (mode === "register") {
                const { error } = await supabase.auth.signUp({
                  email,
                  password,
                  options: {
                    data: {
                      full_name: name,
                    },
                  },
                });

                if (error) {
                  alert(error.message);
                  return;
                }

                alert("Account created. You can now sign in.");
                setMode("signin");
              } else {
                const { error } = await supabase.auth.signInWithPassword({
                  email,
                  password,
                });

                if (error) {
                  alert(error.message);
                  return;
                }

                window.location.href = "/setup";
              }
            }}
          >
            {mode === "signin" ? "Sign In" : "Register"}
          </button>
        </div>

        <button
          className="mt-6 w-full text-sm text-gray-600 underline"
          onClick={() =>
            setMode(mode === "signin" ? "register" : "signin")
          }
        >
          {mode === "signin"
            ? "Need an account? Register"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}