import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Position {
  x: number;
  y: number;
}

interface Debris {
  id: string;
  position: Position;
  collected: boolean;
  material: string;
  size: number;
}

interface Robot {
  id: string;
  position: Position;
  target: Position | null;
  status: 'idle' | 'moving-to-debris' | 'collecting' | 'returning';
  battery: number;
  carryingDebris: Debris | null;
  path: Position[];
}

interface SpaceRobotMap3DProps {
  robots: Robot[];
  debris: Debris[];
  motherStation: Position;
}

// Convert 2D percentage to 3D coordinates
const to3D = (pos: Position): [number, number, number] => {
  return [(pos.x - 50) * 0.3, 0, (pos.y - 50) * 0.3];
};

const MotherStation = ({ position }: { position: Position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = to3D(position);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={pos}>
      {/* Base platform */}
      <mesh ref={meshRef} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[1.5, 2, 0.4, 8]} />
        <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Central tower */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
        <meshStandardMaterial color="#0a1f33" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rotating ring */}
      <mesh ref={ringRef} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.1, 8, 32]} />
        <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Beacon light */}
      <pointLight position={[0, 2.5, 0]} color="#00eaff" intensity={2} distance={10} />
      
      {/* Label */}
      <Html position={[0, 3, 0]} center>
        <div className="font-orbitron text-xs text-primary whitespace-nowrap bg-background/80 px-2 py-1 rounded border border-primary/30">
          MOTHER STATION
        </div>
      </Html>
    </group>
  );
};

const RobotMesh = ({ robot }: { robot: Robot }) => {
  const meshRef = useRef<THREE.Group>(null);
  const pos = to3D(robot.position);
  
  const color = robot.status === 'returning' ? '#00ff88' : 
                robot.status === 'collecting' ? '#ff6b35' : '#00eaff';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      if (robot.target) {
        const targetPos = to3D(robot.target);
        const angle = Math.atan2(targetPos[2] - pos[2], targetPos[0] - pos[0]);
        meshRef.current.rotation.y = -angle + Math.PI / 2;
      }
    }
  });

  return (
    <group ref={meshRef} position={[pos[0], 0.5, pos[2]]}>
      {/* Robot body */}
      <mesh>
        <coneGeometry args={[0.3, 0.8, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Engine glow */}
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={1} transparent opacity={0.8} />
      </mesh>
      
      {/* Carrying indicator */}
      {robot.carryingDebris && (
        <mesh position={[0, -0.7, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.6} />
        </mesh>
      )}
      
      {/* Point light */}
      <pointLight color={color} intensity={1} distance={5} />
      
      {/* Label */}
      <Html position={[0, 1, 0]} center>
        <div className="font-orbitron text-[10px] text-primary whitespace-nowrap bg-background/80 px-1.5 py-0.5 rounded border border-primary/30">
          {robot.id}
        </div>
      </Html>
    </group>
  );
};

const DebrisMesh = ({ debris }: { debris: Debris }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pos = to3D(debris.position);
  const scale = debris.size * 0.05;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={[pos[0], 0.5, pos[2]]}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[scale, 0]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.3} metalness={0.5} roughness={0.5} />
      </mesh>
      <pointLight color="#ff6b35" intensity={0.5} distance={3} />
    </group>
  );
};

const RobotPath = ({ robot }: { robot: Robot }) => {
  const points = useMemo(() => {
    if (robot.path.length < 2) return null;
    return robot.path.map(p => {
      const pos = to3D(p);
      return new THREE.Vector3(pos[0], 0.1, pos[2]);
    });
  }, [robot.path]);

  if (!points) return null;

  return (
    <Line
      points={points}
      color={robot.status === 'returning' ? '#00ff88' : '#00eaff'}
      lineWidth={1}
      dashed
      dashSize={0.3}
      gapSize={0.1}
      opacity={0.6}
      transparent
    />
  );
};

const GridFloor = () => {
  return (
    <group>
      {/* Grid lines */}
      <gridHelper args={[30, 30, '#00eaff', '#0a1f33']} position={[0, -0.01, 0]} />
      
      {/* Floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#02030a" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const SpaceRobotMap3D = ({ robots, debris, motherStation }: SpaceRobotMap3DProps) => {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-primary/30">
      <Canvas
        camera={{ position: [15, 15, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#02030a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00eaff" />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Grid floor */}
        <GridFloor />
        
        {/* Mother Station */}
        <MotherStation position={motherStation} />
        
        {/* Robot paths */}
        {robots.map(robot => (
          <RobotPath key={`path-${robot.id}`} robot={robot} />
        ))}
        
        {/* Debris */}
        {debris.filter(d => !d.collected).map(d => (
          <DebrisMesh key={d.id} debris={d} />
        ))}
        
        {/* Robots */}
        {robots.map(robot => (
          <RobotMesh key={robot.id} robot={robot} />
        ))}
        
        {/* Camera controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={40}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
      
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3 space-y-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="font-space text-xs text-muted-foreground">Mother Station</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="font-space text-xs text-muted-foreground">Swarm Robot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="font-space text-xs text-muted-foreground">Space Debris</span>
        </div>
      </div>
      
      {/* Controls hint */}
      <div className="absolute top-4 right-4 glass-card rounded-lg px-3 py-2 z-10">
        <span className="font-space text-xs text-muted-foreground">
          Drag to rotate • Scroll to zoom
        </span>
      </div>
    </div>
  );
};

export default SpaceRobotMap3D;
