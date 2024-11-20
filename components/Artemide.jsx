"use client"; // Marking this component as a client component

import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import styles from "./Artemide.module.css";
import Preloader from './Preloader';
import animationData from '../public/Animation.json';

const Artemide = ({ className = "" }) => {
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
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

      const { ViewerApp, addBasePlugins, FileTransferPlugin, InteractionPromptPlugin } = await import('webgi');
      const canvas = document.getElementById('webgi-canvas-form');
      if (!canvas) {
        console.error("Canvas element not found!");
        return;
      }

      // Initialize the viewer
      const viewer = new ViewerApp({
        canvas,
        renderer: {
          type: gpuAvailable ? 'webgpu' : 'webgl', // Use WebGPU if available, otherwise WebGL
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance', // Prefer high-performance mode
          ssr: true, // Enable Screen Space Reflections if needed
        }
      });

      try {
        await addBasePlugins(viewer);
        await viewer.addPlugin(FileTransferPlugin);

        // Only add the InteractionPromptPlugin if it doesn't already exist
        if (!viewer.getPlugin(InteractionPromptPlugin)) {
          const interactionPrompt = await viewer.addPlugin(InteractionPromptPlugin);
          interactionPrompt.enabled = true;
          interactionPrompt.autoStop = false;
          interactionPrompt.onlyOnOrbitControls = false;
          interactionPrompt.disable();
        }

        // Load the GLB model
        await viewer.load("/assets/artemis.glb");

        setLoading(false); // Hide loading state
      } catch (error) {
        console.error("Error setting up viewer:", error);
        setLoading(false); // Hide loading state in case of error
      }
    };

    setupViewer();
  }, [gpuAvailable]);

  const handleGetStartedClick = () => {
    setShowOverlay(false); // Hide overlay when user clicks "Got it!"
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      {loading && <Preloader />}
      <div className={`${styles.overlay} ${!showOverlay && styles.fadeOut}`}>
        <div className={styles.overlayContent}>
          <Lottie options={defaultOptions} height={200} width={200} className={styles.lottieAnimation} />
          <img className={styles.logo} src="/logo.png" alt="Logo" style={{ width: "200px", marginBottom: "20px", alignContent: "center" }} />
          <h1 className={styles.artemidetext}>ARTEMIDE CONGRESS</h1>
          <h3 className={styles.explain}>Ruota ed esplora l'esperienza trascinando il mouse!</h3>
          <button className={styles.getStartedButton} onClick={handleGetStartedClick}>
          FATTO!
          </button>
        </div>
      </div>
      <section className={[styles.formContainer, className].join(" ")}>
        <div className={styles.frameParent}>
          <div className={styles.frameGroup}>
            <img className={styles.logo64Icon} src="/logo.png" alt="Logo" />
            <h1 className={styles.benvenutoNel}>Benvenuto nel</h1>
            <h1 className={styles.tuoEventoInterattivo}>TUO EVENTO INTERATTIVO</h1>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <a href="/Event" target="_blank" rel="noopener noreferrer" className={styles.vectorParent}>
            <img className={styles.vectorIcon} src="/vector.svg" alt="Vector" />
            <img className={styles.iniziaIcon} src="/inizia.svg" alt="Inizia" />
          </a>
        </div>
        <canvas id="webgi-canvas-form" style={{ width: "100%", height: "100vh", position: "absolute" }} />
      </section>
    </>
  );
};

export default Artemide;
