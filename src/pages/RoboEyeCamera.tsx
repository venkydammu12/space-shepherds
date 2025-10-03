import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, Chrome as Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoboEyeProps {
  videoStream: MediaStream | null;
  cameraPermission: 'granted' | 'denied' | 'pending';
  mousePosition: { x: number; y: number };
}

const RoboEye = ({ videoStream, cameraPermission, mousePosition }: RoboEyeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (videoStream && cameraPermission === 'granted') {
      const video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.srcObject = videoStream;

      video.play().catch(err => console.log('Video play error:', err));

      videoRef.current = video;
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      setVideoTexture(texture);

      return () => {
        video.pause();
        video.srcObject = null;
      };
    }
  }, [videoStream, cameraPermission]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;

      const targetX = mousePosition.x * 0.3;
      const targetY = -mousePosition.y * 0.3;

      meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.z += (targetX - meshRef.current.rotation.z) * 0.05;
    }

    if (glowRef.current) {
      const pulsate = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulsate * 0.6;
    }
  });

  const eyeMaterial = videoTexture
    ? new THREE.MeshStandardMaterial({
        map: videoTexture,
        emissive: new THREE.Color(0x003366),
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
      })
    : new THREE.MeshStandardMaterial({
        color: 0x001133,
        emissive: new THREE.Color(0x003366),
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
      });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>

      <mesh ref={glowRef} scale={2.15}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={0x00aaff}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={2.3}>
        <ringGeometry args={[0.95, 1, 64]} />
        <meshBasicMaterial
          color={0x00ffff}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {cameraPermission === 'denied' && (
        <mesh position={[0, 0, 2.1]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial color={0xff3333} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
};

const Scene = ({ videoStream, cameraPermission, mousePosition }: RoboEyeProps) => {
  return (
    <>
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={0.3} color={0x222222} />
      <pointLight position={[10, 10, 10]} intensity={1} color={0x00aaff} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color={0x0066ff} />

      <RoboEye
        videoStream={videoStream}
        cameraPermission={cameraPermission}
        mousePosition={mousePosition}
      />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  );
};

const RoboEyeCamera = () => {
  const navigate = useNavigate();
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const requestCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        setVideoStream(stream);
        setCameraPermission('granted');
      } catch (err) {
        console.log('Camera access denied:', err);
        setCameraPermission('denied');
      }
    };

    requestCamera();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const retryCamera = async () => {
    setCameraPermission('pending');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      setVideoStream(stream);
      setCameraPermission('granted');
    } catch (err) {
      console.log('Camera access denied:', err);
      setCameraPermission('denied');
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene
          videoStream={videoStream}
          cameraPermission={cameraPermission}
          mousePosition={mousePosition}
        />
      </Canvas>

      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="bg-black/80 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>

      <div className="absolute top-6 right-6 z-10 flex flex-col gap-4 items-end">
        <div className="bg-black/80 border border-cyan-500 rounded-lg px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {cameraPermission === 'granted' && (
              <>
                <Camera className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-mono text-sm">CAMERA ACTIVE</span>
              </>
            )}
            {cameraPermission === 'denied' && (
              <>
                <CameraOff className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-mono text-sm">EYE OFFLINE</span>
              </>
            )}
            {cameraPermission === 'pending' && (
              <>
                <Camera className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-400 font-mono text-sm">REQUESTING ACCESS...</span>
              </>
            )}
          </div>
        </div>

        {cameraPermission === 'denied' && (
          <Button
            onClick={retryCamera}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold"
          >
            <Camera className="mr-2 h-4 w-4" />
            Retry Camera
          </Button>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/80 border border-cyan-500 rounded-lg px-8 py-4 backdrop-blur-sm">
          <h1 className="text-cyan-400 font-mono text-xl font-bold text-center tracking-wider">
            3D ROBO EYE CAMERA
          </h1>
          <p className="text-cyan-300/70 font-mono text-xs text-center mt-1">
            Drag to rotate • Scroll to zoom • Eye tracks cursor
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
      </div>
    </div>
  );
};

export default RoboEyeCamera;
