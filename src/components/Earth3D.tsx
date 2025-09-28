import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three';

interface DebrisObject {
  id: string;
  position: [number, number, number];
  type: 'metallic' | 'plastic' | 'electronic';
  weight: number;
  speed: number;
  rotation: [number, number, number];
}

interface Robot {
  id: string;
  position: [number, number, number];
  target?: string;
  status: 'collecting' | 'returning' | 'standby';
}

const generateDebris = (): DebrisObject[] => {
  const debris: DebrisObject[] = [];
  for (let i = 0; i < 50; i++) {
    const radius = 2.2 + Math.random() * 0.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    debris.push({
      id: `debris-${i}`,
      position: [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ],
      type: ['metallic', 'plastic', 'electronic'][Math.floor(Math.random() * 3)] as any,
      weight: Math.random() * 100 + 10,
      speed: Math.random() * 7 + 3,
      rotation: [Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02]
    });
  }
  return debris;
};

const generateRobots = (): Robot[] => {
  const robots: Robot[] = [];
  for (let i = 0; i < 5; i++) {
    const radius = 2.5;
    const theta = (i / 5) * Math.PI * 2;
    
    robots.push({
      id: `robot-${i}`,
      position: [
        radius * Math.cos(theta),
        0.2,
        radius * Math.sin(theta)
      ],
      status: 'standby'
    });
  }
  return robots;
};

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshPhongMaterial 
        color="#1a5490"
        emissive="#0a2040"
        shininess={100}
      />
    </Sphere>
  );
};

const DebrisField = ({ debris, onDebrisClick }: { debris: DebrisObject[], onDebrisClick: (debris: DebrisObject) => void }) => {
  return (
    <>
      {debris.map((item) => (
        <DebrisItem key={item.id} debris={item} onClick={onDebrisClick} />
      ))}
    </>
  );
};

const DebrisItem = ({ debris, onClick }: { debris: DebrisObject, onClick: (debris: DebrisObject) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += debris.rotation[0];
      meshRef.current.rotation.y += debris.rotation[1];
      meshRef.current.rotation.z += debris.rotation[2];
      
      // Orbital motion
      const time = state.clock.elapsedTime * 0.1;
      const radius = Math.sqrt(debris.position[0] ** 2 + debris.position[2] ** 2);
      const angle = Math.atan2(debris.position[2], debris.position[0]) + time * 0.1;
      
      meshRef.current.position.x = radius * Math.cos(angle);
      meshRef.current.position.z = radius * Math.sin(angle);
    }
  });

  const getColor = () => {
    switch (debris.type) {
      case 'metallic': return '#C0C0C0';
      case 'plastic': return '#FF6B6B';
      case 'electronic': return '#4ECDC4';
      default: return '#FFFFFF';
    }
  };

  const getSize = () => {
    return Math.max(0.02, debris.weight / 2000);
  };

  return (
    <mesh
      ref={meshRef}
      position={debris.position}
      onClick={() => onClick(debris)}
    >
      <boxGeometry args={[getSize(), getSize(), getSize()]} />
      <meshPhongMaterial 
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const RobotSwarm = ({ robots }: { robots: Robot[] }) => {
  return (
    <>
      {robots.map((robot) => (
        <RobotMesh key={robot.id} robot={robot} />
      ))}
    </>
  );
};

const RobotMesh = ({ robot }: { robot: Robot }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = robot.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Slow orbital motion
      const time = state.clock.elapsedTime * 0.05;
      const radius = Math.sqrt(robot.position[0] ** 2 + robot.position[2] ** 2);
      const angle = Math.atan2(robot.position[2], robot.position[0]) + time;
      
      meshRef.current.position.x = radius * Math.cos(angle);
      meshRef.current.position.z = radius * Math.sin(angle);
    }
  });

  const getColor = () => {
    switch (robot.status) {
      case 'collecting': return '#00E6FF';
      case 'returning': return '#FFB86B';
      default: return '#FFFFFF';
    }
  };

  return (
    <group ref={meshRef} position={robot.position}>
      <mesh>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshPhongMaterial 
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Robot glow effect */}
      <Ring args={[0.08, 0.12, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial 
          color={getColor()} 
          transparent 
          opacity={0.3}
        />
      </Ring>
    </group>
  );
};

const OrbitRings = () => {
  return (
    <>
      <Ring args={[2.0, 2.02, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00E6FF" transparent opacity={0.3} />
      </Ring>
      <Ring args={[2.3, 2.32, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#FFB86B" transparent opacity={0.2} />
      </Ring>
      <Ring args={[2.6, 2.62, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00E6FF" transparent opacity={0.1} />
      </Ring>
    </>
  );
};

interface Earth3DProps {
  onDebrisSelect?: (debris: DebrisObject) => void;
  onRobotSelect?: (robot: Robot) => void;
}

const Earth3D = ({ onDebrisSelect, onRobotSelect }: Earth3DProps) => {
  const [debris, setDebris] = useState<DebrisObject[]>([]);
  const [robots, setRobots] = useState<Robot[]>([]);

  useEffect(() => {
    setDebris(generateDebris());
    setRobots(generateRobots());
  }, []);

  const handleDebrisClick = (clickedDebris: DebrisObject) => {
    onDebrisSelect?.(clickedDebris);
  };

  return (
    <div className="w-full h-96 bg-card/20 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [4, 2, 4], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />
        
        <Earth />
        <OrbitRings />
        <DebrisField debris={debris} onDebrisClick={handleDebrisClick} />
        <RobotSwarm robots={robots} />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={8}
          minDistance={2}
        />
        
        {/* Starfield background */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial 
            color="#000011" 
            side={THREE.BackSide}
          />
        </mesh>
      </Canvas>
      
      <div className="absolute top-4 left-4 glass-card p-3 rounded-lg">
        <div className="text-xs text-primary">ORBITAL VIEW</div>
        <div className="text-xs text-muted-foreground">Click and drag to explore</div>
      </div>
    </div>
  );
};

export default Earth3D;