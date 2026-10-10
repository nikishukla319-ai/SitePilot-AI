import { ArrowLeft, Check, Rocket, Share2, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";

function Dashboard() {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const [deployingId, setDeployingId] = useState(null);

    useEffect(() => {
        const handleGetAllWebsites = async () => {
            setLoading(true);
            setError("");

            try {
                const result = await axios.get(
                    `${serverUrl}/api/website/get-all`,
                    { withCredentials: true }
                );

                setWebsites(Array.isArray(result.data) ? result.data : []);
            } catch (err) {
                console.error("GET ALL WEBSITES ERROR:", err);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load websites. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        handleGetAllWebsites();
    }, []);

    const handleDeploy = async (id) => {
        if (deployingId) return;

        setDeployingId(id);

        try {
            const result = await axios.get(
                `${serverUrl}/api/website/deploy/${id}`,
                { withCredentials: true }
            );

            const deployUrl = result.data?.url;

            if (!deployUrl) {
                throw new Error("The server did not return a website URL.");
            }

            const validUrl = new URL(deployUrl);

            if (!["https:", "http:"].includes(validUrl.protocol)) {
                throw new Error("The server returned an invalid website URL.");
            }

            setWebsites((prev) =>
                prev.map((website) =>
                    website._id === id
                        ? {
                              ...website,
                              deployed: true,
                              deployUrl: validUrl.href,
                          }
                        : website
                )
            );

            window.open(validUrl.href, "_blank", "noopener,noreferrer");
        } catch (err) {
            console.error("DEPLOY ERROR:", err);

            alert(
                err.response?.data?.message ||
                err.message ||
                "Could not deploy the website. Please try again."
            );
        } finally {
            setDeployingId(null);
        }
    };

    const handleCopy = async (website) => {
        if (!website.deployUrl) {
            alert("Website URL not found. Please deploy the website again.");
            return;
        }

        try {
            const url = new URL(website.deployUrl);

            if (!["https:", "http:"].includes(url.protocol)) {
                alert("Invalid website URL.");
                return;
            }

            await navigator.clipboard.writeText(url.href);
            setCopiedId(website._id);

            setTimeout(() => {
                setCopiedId((currentId) =>
                    currentId === website._id ? null : currentId
                );
            }, 2000);
        } catch (err) {
            console.error("SHARE LINK ERROR:", err);

            try {
                const url = new URL(website.deployUrl);
                window.prompt("Copy your website link:", url.href);
            } catch {
                alert("Could not copy the website link. Please deploy again.");
            }
        }
    };

    const handleOpenWebsite = (website) => {
        if (!website.deployUrl) {
            alert("Website URL not found. Please deploy the website again.");
            return;
        }

        try {
            const url = new URL(website.deployUrl);

            if (!["https:", "http:"].includes(url.protocol)) {
                alert("Invalid website URL.");
                return;
            }

            window.open(url.href, "_blank", "noopener,noreferrer");
        } catch (err) {
            console.error("OPEN WEBSITE ERROR:", err);
            alert("Invalid website URL. Please deploy the website again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="p-2 rounded-lg hover:bg-white/10 transition"
                            onClick={() => navigate("/")}
                            aria-label="Go back home"
                        >
                            <ArrowLeft size={16} />
                        </button>

                        <h1 className="text-lg font-semibold">Dashboard</h1>
                    </div>

                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition"
                        onClick={() => navigate("/generate")}
                    >
                        + New Website
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <p className="text-sm text-zinc-400 mb-1">
                        Welcome Back
                    </p>

                    <h1 className="text-3xl font-bold">
                        {userData?.name || "User"}
                    </h1>

                    <p className="text-sm text-zinc-400 mt-2">
                        Manage, deploy, and share your generated websites.
                    </p>
                </motion.div>

                {loading && (
                    <div className="mt-24 text-center text-zinc-400">
                        Loading your websites...
                    </div>
                )}

                {!loading && error && (
                    <div className="mt-24 text-center text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && websites.length === 0 && (
                    <div className="mt-24 text-center">
                        <p className="text-zinc-400 mb-5">
                            You have no websites yet.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/generate")}
                            className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-medium"
                        >
                            Create Your First Website
                        </button>
                    </div>
                )}

                {!loading && !error && websites.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {websites.map((website, index) => {
                            const copied = copiedId === website._id;
                            const deploying = deployingId === website._id;

                            return (
                                <motion.div
                                    key={website._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -6 }}
                                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
                                >
                                    <div
                                        className="relative h-40 bg-black cursor-pointer overflow-hidden"
                                        onClick={() =>
                                            navigate(`/editor/${website._id}`)
                                        }
                                        title="Open website editor"
                                    >
                                        <iframe
                                            srcDoc={website.latestCode || ""}
                                            title={
                                                website.title ||
                                                "Website Preview"
                                            }
                                            className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                                            sandbox=""
                                        />

                                        <div className="absolute inset-0 bg-black/20" />

                                        <div className="absolute bottom-3 right-3 text-xs bg-black/70 px-3 py-1.5 rounded-lg text-white/80">
                                            Open Editor
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col gap-4 flex-1">
                                        <h3 className="text-base font-semibold line-clamp-2">
                                            {website.title || "Untitled Website"}
                                        </h3>

                                        <p className="text-xs text-zinc-400">
                                            Last Updated{" "}
                                            {website.updatedAt
                                                ? new Date(
                                                      website.updatedAt
                                                  ).toLocaleDateString()
                                                : "Recently"}
                                        </p>

                                        {!website.deployed ? (
                                            <button
                                                type="button"
                                                disabled={deploying}
                                                className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() =>
                                                    handleDeploy(website._id)
                                                }
                                            >
                                                <Rocket size={18} />
                                                {deploying
                                                    ? "Deploying..."
                                                    : "Deploy Website"}
                                            </button>
                                        ) : (
                                            <>
                                                <div className="mt-auto grid grid-cols-2 gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleCopy(website)
                                                        }
                                                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                                            copied
                                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                                : "bg-white/10 hover:bg-white/20 border border-white/10"
                                                        }`}
                                                    >
                                                        {copied ? (
                                                            <>
                                                                <Check size={15} />
                                                                Copied
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Share2 size={15} />
                                                                Share Link
                                                            </>
                                                        )}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleOpenWebsite(
                                                                website
                                                            )
                                                        }
                                                        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium bg-indigo-500 hover:bg-indigo-600 transition"
                                                    >
                                                        <ExternalLink size={15} />
                                                        Open Website
                                                    </button>
                                                </div>

                                                <p className="text-xs text-zinc-500 break-all">
                                                    {website.deployUrl ||
                                                        "No deployment URL saved"}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;