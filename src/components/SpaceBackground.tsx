import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Earth texture (using gradient for realistic look)
    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 2048;
    earthCanvas.height = 1024;
    const ctx = earthCanvas.getContext('2d')!;
    
    // Create Earth-like gradient
    const gradient = ctx.createLinearGradient(0, 0, 2048, 1024);
    gradient.addColorStop(0, '#0a1628');
    gradient.addColorStop(0.3, '#1e3a5f');
    gradient.addColorStop(0.5, '#2563eb');
    gradient.addColorStop(0.7, '#1e3a5f');
    gradient.addColorStop(1, '#0a1628');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 1024);
    
    // Add continents pattern
    ctx.fillStyle = '#1a4d2e';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const radius = Math.random() * 100 + 50;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color('#333333'),
      shininess: 10
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0) * intensity;
        }
      `
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Create starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      // Random positions in a sphere
      const radius = 50 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      // Random star colors (white to cyan)
      const colorChoice = Math.random();
      if (colorChoice > 0.9) {
        starColors[i] = 0.3;
        starColors[i + 1] = 0.9;
        starColors[i + 2] = 1.0;
      } else {
        starColors[i] = 1.0;
        starColors[i + 1] = 1.0;
        starColors[i + 2] = 1.0;
      }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate Earth
      earth.rotation.y += 0.001;
      atmosphere.rotation.y += 0.001;

      // Rotate starfield slowly
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #0a0e27 0%, #000000 100%)' }}
    />
  );
};

export default SpaceBackground;
