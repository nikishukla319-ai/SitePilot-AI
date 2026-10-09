import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import axios from "axios";
import { serverUrl } from "../App";
import { ArrowLeft } from "lucide-react";

const PHASES = [
  "Analyzing your idea...",
  "Designing layout & structure...",
  "Writing HTML & CSS...",
  "Adding animations & interactions...",
  "Final quality checks...",
];

function Generate() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [error, setError] = useState("");

  const handleGenerateWebsite = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/website/generate`,
        { prompt },
        {
          withCredentials: true,
        }
      );

      console.log(result);

      setProgress(100);
      setLoading(false);

      navigate(`/editor/${result.data.websiteId}`);
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message || "Something went wrong"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      setPhaseIndex(0);
      setProgress(0);
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      const increment =
        value < 20
          ? Math.random() * 1.5
          : value < 60
          ? Math.random() * 1.2
          : Math.random() * 0.6;

      value += increment;

      if (value >= 93) value = 93;

      const phase = Math.min(
        Math.floor((value / 100) * PHASES.length),
        PHASES.length - 1
      );

      setProgress(Math.floor(value));
      setPhaseIndex(phase);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Navbar */}
      <div className="w-full border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            <span className="font-semibold">SitePilot-AI</span>
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex justify-center px-6">

        <div className="w-full max-w-5xl pt-16 md:pt-20">

          {/* Heading */}
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Build Websites with
              <br />
              Real AI Power
            </h1>

            <p className="text-gray-500 mt-6 text-sm md:text-base">
              This process may take several minutes. SitePilot-AI focuses on
              quality, not shortcuts.
            </p>

          </div>

          {/* Input section */}
          <div className="w-full">

            <label className="block text-white font-medium mb-3">
              Describe your website
            </label>

            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setError("");
              }}
              placeholder="Describe your website in detail..."
              className="w-full h-44 md:h-48 bg-black border border-white/20 rounded-2xl px-5 py-5 text-white placeholder:text-gray-600 outline-none resize-none focus:border-white/40 transition"
            />

            {/* Error */}
            {error && (
              <div className="mt-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Button */}
            <div className="flex justify-center mt-12">

              <motion.button
                whileHover={{
                  scale: prompt.trim() && !loading ? 1.03 : 1,
                }}
                whileTap={{
                  scale: prompt.trim() && !loading ? 0.97 : 1,
                }}
                onClick={handleGenerateWebsite}
                disabled={!prompt.trim() || loading}
                className={`px-12 py-4 rounded-xl font-semibold transition ${
                  prompt.trim() && !loading
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/20 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Generating..." : "Generate Website"}
              </motion.button>

            </div>

          </div>

          {/* Progress */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto mt-12"
            >

              <div className="flex justify-between mb-2 text-xs text-gray-400">
                <span>{PHASES[phaseIndex]}</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">

                <motion.div
                  className="h-full bg-white"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    ease: "easeOut",
                    duration: 0.8,
                  }}
                />

              </div>

              <div className="text-center text-xs text-gray-500 mt-4">
                Estimated time remaining:{" "}
                <span className="text-white">
                  ~8-12 minutes
                </span>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Generate;