"use client"; // Add this line to mark the component as a Client Component

import React, { useState, useEffect } from "react";
import styles from "./ArtemideTemple.module.css";
import Preloader from "./Preloader";

const ArtemideTemple = ({ className = "" }) => {
    const [mode, setMode] = useState("day");
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [gpuAvailable, setGpuAvailable] = useState(false);

    useEffect(() => {
        const setupViewer = async () => {
            // Check for WebGPU support
            if (navigator.gpu) {
                setGpuAvailable(true);
                const adapter = await navigator.gpu.requestAdapter();
                const device = await adapter.requestDevice();
                console.log("WebGPU initialized", device);
            } else {
                console.warn("WebGPU not supported, falling back to WebGL");
            }

            // Initialize WebGI
            const { ViewerApp, addBasePlugins, FileTransferPlugin } = await import('webgi');
            const canvas = document.getElementById('webgi-canvas');
            if (!canvas) {
                console.error('Canvas element not found');
                return;
            }

            const viewer = new ViewerApp({ canvas });

            try {
                await addBasePlugins(viewer);
                await viewer.addPlugin(FileTransferPlugin);
                
                // Load the model and environment map
                await viewer.load("./assets/scene2.glb");
                await viewer.setEnvironmentMap("./assets/day.hdr");

                setIsModelLoaded(true);

                // Removed performance mode setting
                // viewer.setPerformanceMode("high"); // This line has been removed

                window.webgiViewer = viewer;

                window.webgiControls = {
                    changeEnvironment: async (newMode) => {
                        let hdrFile = "";
                        switch (newMode) {
                            case "day":
                                hdrFile = "./assets/day.hdr";
                                break;
                            case "night":
                                hdrFile = "./assets/night.hdr";
                                break;
                            case "warm":
                                hdrFile = "./assets/sunset.hdr";
                                break;
                            default:
                                hdrFile = "./assets/day.hdr";
                        }
                        try {
                            await viewer.setEnvironmentMap(hdrFile);
                        } catch (error) {
                            console.error(`Error loading HDRI: ${hdrFile}`, error);
                        }
                    },
                };
            } catch (error) {
                console.error("Error setting up WebGI viewer:", error);
            }
        };

        setupViewer();
    }, []);

    const handleModeChange = (newMode) => {
        setMode(newMode);
        if (window.webgiControls) {
            window.webgiControls.changeEnvironment(newMode);
        } else {
            console.error("webgiControls is not available.");
        }
    };

    return (
        <section className={[styles.climaticInner, className].join(" ")}>
            {!isModelLoaded && <Preloader />}
            <canvas id="webgi-canvas" style={{ width: "100%", height: "100vh", position: "absolute" }} />
            <div className={styles.comeLavoriamoParent}>
                <h1 className={styles.comeLavoriamo}>Come lavoriamo</h1>
                <div className={styles.themeSelection}>
                    <img className={styles.bgIcon} alt="" src="/bg.svg" />
                    <h2 className={styles.choose}>Choose</h2>

                    <div className={`${styles.day} ${mode === "day" ? styles.active : ""}`} onClick={() => handleModeChange("day")}>
                        <img className={styles.vectorIcon} loading="lazy" alt="" src="/vector-2.svg" />
                        <div className={styles.dayLabelContainerWrapper}>
                            <div className={styles.dayLabelContainer}>
                                <img className={styles.dayIcon} loading="lazy" alt="" src="/day.svg" />
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.night} ${mode === "night" ? styles.active : ""}`} onClick={() => handleModeChange("night")}>
                        <img className={styles.vectorIcon} loading="lazy" alt="" src="/vector-4.svg" />
                        <img className={styles.nightIcon} loading="lazy" alt="" src="/night.svg" />
                    </div>

                    <div className={`${styles.warmbt} ${mode === "warm" ? styles.active : ""}`} onClick={() => handleModeChange("warm")}>
                        <img className={styles.vectorIcon2} loading="lazy" alt="" src="/vector-6.svg" />
                        <img className={styles.warmIcon} loading="lazy" alt="" src="/warm.svg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtemideTemple;
