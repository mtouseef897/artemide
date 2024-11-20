import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import tunnel from 'tunnel-rat';

const models = [
  '/model/AddobbiFloreali.glb',
  '/model/ComputerCpu.glb',
  '/model/Laptop.glb',
  '/model/Lcd.glb',
  '/model/SpaziEsterni.glb',
  '/model/TavoloRettangolare.glb',
  '/model/TavoloTondo.glb',
  '/model/TensileStructure.glb',
  '/model/Tovaglie.glb',
  '/model/VideoRegister.glb',
];

const status = tunnel();

export default function App() {
  const [index, setIndex] = useState(0); // Track current model index
  const [gpuAvailable, setGpuAvailable] = useState(false);

  useEffect(() => {
    const checkWebGPU = async () => {
      if (navigator.gpu) {
        try {
          const adapter = await navigator.gpu.requestAdapter();
          const device = await adapter.requestDevice();
          setGpuAvailable(true);
          console.log("WebGPU initialized:", device);
        } catch (error) {
          console.error("Failed to initialize WebGPU:", error);
        }
      } else {
        console.warn("WebGPU not supported, falling back to WebGL");
      }
    };

    checkWebGPU();
  }, []);

  const nextModel = () => setIndex((index + 1) % models.length);
  const prevModel = () => setIndex((index - 1 + models.length) % models.length);

  return (
    <div style={{ position: 'relative', width: '50vw', height: '50vh', zIndex: "0" }}>
      <Canvas camera={{ position: [-10, 10, 40], fov: 50 }}>
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" castShadow />
        <Environment background={false} files="./afternoon.hdr" />
        <group position={[0, -10, 0]}>
          <Suspense fallback={<status.In>Loading...</status.In>}>
            <Model url={models[index]} />
          </Suspense>
          <ContactShadows scale={40} blur={5} far={9} />
        </group>
        <OrbitControls />
      </Canvas>

      {/* Left arrow */}
      <button
        onClick={prevModel}
        style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        &lt;
      </button>

      {/* Right arrow */}
      <button
        onClick={nextModel}
        style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        &gt;
      </button>
    </div>
  );
}

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}
