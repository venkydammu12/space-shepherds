import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { RotateCcw, Zap, Target, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import robotImage from '@/assets/logo-main.png';

interface Robot3DProps {
  robotStatus: 'idle' | 'scanning' | 'moving' | 'collecting';
  onStatusChange: (status: 'idle' | 'scanning' | 'moving' | 'collecting') => void;
}

const RobotMesh = ({ robotStatus }: { robotStatus: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const chestRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Base rotation
    if (robotStatus === 'idle') {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      
      // Gentle breathing effect
      if (chestRef.current) {
        chestRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
      }
    }

    // Head movements
    if (headRef.current) {
      if (robotStatus === 'scanning') {
        headRef.current.rotation.y = Math.sin(time * 2) * 0.5;
        headRef.current.rotation.x = Math.sin(time * 1.5) * 0.2;
      } else {
        headRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
        headRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
      }
    }

    // Arm movements
    if (leftArmRef.current && rightArmRef.current) {
      if (robotStatus === 'collecting') {
        leftArmRef.current.rotation.z = Math.PI / 4 + Math.sin(time * 3) * 0.3;
        rightArmRef.current.rotation.z = -Math.PI / 4 - Math.sin(time * 3) * 0.3;
      } else if (robotStatus === 'moving') {
        leftArmRef.current.rotation.x = Math.sin(time * 4) * 0.3;
        rightArmRef.current.rotation.x = -Math.sin(time * 4) * 0.3;
      } else {
        leftArmRef.current.rotation.z = Math.sin(time * 0.8) * 0.1;
        rightArmRef.current.rotation.z = -Math.sin(time * 0.8) * 0.1;
      }
    }
  });

  useEffect(() => {
    if (!groupRef.current) return;

    // Create robot geometry
    const group = groupRef.current;

    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xc0c0c0,
      shininess: 100,
      emissive: 0x001122,
      emissiveIntensity: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.8;
    headRef.current = head;

    // Eyes (glowing blue)
    const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 0.1, 0.35);
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 0.1, 0.35);
    head.add(rightEye);

    // Chest/Torso
    const chestGeometry = new THREE.CylinderGeometry(0.6, 0.7, 1.2, 8);
    const chestMaterial = new THREE.MeshPhongMaterial({
      color: 0xa0a0a0,
      shininess: 80,
      emissive: 0x001144,
      emissiveIntensity: 0.05
    });
    const chest = new THREE.Mesh(chestGeometry, chestMaterial);
    chest.position.y = 0.8;
    chestRef.current = chest;

    // Chest Core (glowing blue)
    const coreGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x00aaff,
      emissive: 0x00aaff,
      emissiveIntensity: 0.6
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(0, 0.2, 0.5);
    chest.add(core);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.18, 1, 8);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0x909090,
      shininess: 60,
      emissive: 0x002244,
      emissiveIntensity: 0.03
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 0.8, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArmRef.current = leftArm;

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 0.8, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArmRef.current = rightArm;

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.18, 0.2, 1.4, 8);
    const legMaterial = new THREE.MeshPhongMaterial({
      color: 0x808080,
      shininess: 70,
      emissive: 0x001133,
      emissiveIntensity: 0.04
    });

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.3, -0.5, 0);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.3, -0.5, 0);

    // Add all parts to group
    group.add(head);
    group.add(chest);
    group.add(leftArm);
    group.add(rightArm);
    group.add(leftLeg);
    group.add(rightLeg);

    return () => {
      // Cleanup
      group.clear();
    };
  }, []);

  return <group ref={groupRef} />;
};

const Robot3DModel = ({ robotStatus, onStatusChange }: Robot3DProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (newStatus: 'idle' | 'scanning' | 'moving' | 'collecting') => {
    onStatusChange(newStatus);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-black via-blue-950/20 to-black rounded-3xl border border-cyan-500/30 overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border-2 border-cyan-500/30 animate-pulse">
            <img 
              src={robotImage} 
              alt="AI Robot" 
              className="w-24 h-24 object-contain opacity-60"
            />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-cyan-400">Initializing Robot Model</h3>
            <p className="text-cyan-500/60">Loading 3D holographic projection...</p>
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 3D Robot Canvas */}
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#00aaff" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066cc" />
              <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#00ffff"
                castShadow
              />

              <RobotMesh robotStatus={robotStatus} />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxDistance={10}
                minDistance={2}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 6}
              />

              {/* Environment */}
              <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshPhongMaterial 
                  color="#001122" 
                  transparent 
                  opacity={0.3}
                  emissive="#001122"
                  emissiveIntensity={0.1}
                />
              </mesh>
            </Canvas>
          </div>

          {/* Control Panel */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30">
            <div className="grid grid-cols-4 gap-2">
              <Button
                onClick={() => handleStatusChange('idle')}
                variant={robotStatus === 'idle' ? 'default' : 'outline'}
                size="sm"
                className={`${
                  robotStatus === 'idle' 
                    ? 'bg-cyan-500 text-black' 
                    : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => handleStatusChange('scanning')}
                variant={robotStatus === 'scanning' ? 'default' : 'outline'}
                size="sm"
                className={`${
                  robotStatus === 'scanning' 
                    ? 'bg-cyan-500 text-black' 
                    : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <Target className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => handleStatusChange('moving')}
                variant={robotStatus === 'moving' ? 'default' : 'outline'}
                size="sm"
                className={`${
                  robotStatus === 'moving' 
                    ? 'bg-cyan-500 text-black' 
                    : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <Zap className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => handleStatusChange('collecting')}
                variant={robotStatus === 'collecting' ? 'default' : 'outline'}
                size="sm"
                className={`${
                  robotStatus === 'collecting' 
                    ? 'bg-cyan-500 text-black' 
                    : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                }`}
              >
                <Cpu className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center mt-2">
              <div className="text-cyan-400 text-xs">Click and drag to rotate • Scroll to zoom</div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
            <div className="text-cyan-400 text-sm font-bold flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                robotStatus === 'idle' ? 'bg-green-400' :
                robotStatus === 'scanning' ? 'bg-blue-400 animate-pulse' :
                robotStatus === 'moving' ? 'bg-yellow-400 animate-pulse' :
                'bg-red-400 animate-pulse'
              }`} />
              STATUS: {robotStatus.toUpperCase()}
            </div>
          </div>

          {/* Robot Info Panel */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30 space-y-2">
            <div className="text-cyan-400 text-xs font-mono">MODEL: SW-ROBO-2.0</div>
            <div className="text-cyan-400 text-xs font-mono">POWER: 98%</div>
            <div className="text-cyan-400 text-xs font-mono">SYSTEMS: ONLINE</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Robot3DModel;