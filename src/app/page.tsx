// src/app/page.tsx

"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fade, setFade] = useState<boolean>(false);

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      setFade(false);
      setError("");
      const res = await fetch("https://api.adviceslip.com/advice", { cache: 'no-store' });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAdvice(data.slip.advice);
      setFade(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching advice:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setError("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch one piece of advice on page load
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white bg-opacity-90 p-8 shadow-lg backdrop-blur-md">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-800">
        💡 Random Advice App
      </h1>

      <div className="mb-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="h-8 w-8 animate-spin text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="ml-2 text-lg text-gray-700">Loading...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <p
            className={`text-center text-xl font-medium text-black transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            “{advice}”
          </p>
        )}
      </div>

      <button
        className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={fetchAdvice}
        disabled={loading}
        aria-label="Fetch new piece of advice"
      >
        {loading ? "Fetching..." : "Get New Advice"}
      </button>
    </div>
  );
}
