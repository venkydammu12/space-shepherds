import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create cinematic starfield with varying sizes
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 2000;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 2000;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 2000;
      starSizes[i] = Math.random() * 3;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create cyan accent stars
    const accentStarsGeometry = new THREE.BufferGeometry();
    const accentCount = 500;
    const accentPositions = new Float32Array(accentCount * 3);
    const accentSizes = new Float32Array(accentCount);

    for (let i = 0; i < accentCount; i++) {
      const i3 = i * 3;
      accentPositions[i3] = (Math.random() - 0.5) * 1500;
      accentPositions[i3 + 1] = (Math.random() - 0.5) * 1500;
      accentPositions[i3 + 2] = (Math.random() - 0.5) * 1500;
      accentSizes[i] = Math.random() * 4 + 2;
    }

    accentStarsGeometry.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));
    accentStarsGeometry.setAttribute('size', new THREE.BufferAttribute(accentSizes, 1));

    const accentStarsMaterial = new THREE.PointsMaterial({
      color: 0x00e6ff,
      size: 3,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    const accentStars = new THREE.Points(accentStarsGeometry, accentStarsMaterial);
    scene.add(accentStars);

    // Create nebula clouds
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = 2000;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaSizes = new Float32Array(nebulaCount);

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      const radius = 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      nebulaPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      nebulaPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nebulaPositions[i3 + 2] = radius * Math.cos(phi);
      nebulaSizes[i] = Math.random() * 20 + 10;
    }

    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));

    const nebulaMaterial = new THREE.PointsMaterial({
      color: 0x4488ff,
      size: 15,
      transparent: true,
      opacity: 0.15,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Create energy particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 500;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 500;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 500;
      
      particleVelocities.push(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Cinematic lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x4488ff, 2);
    keyLight.position.set(50, 50, 50);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff6600, 0.5);
    fillLight.position.set(-50, 0, -50);
    scene.add(fillLight);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera follow
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      
      camera.position.x = targetX * 10;
      camera.position.y = -targetY * 10;
      camera.lookAt(0, 0, 0);

      // Rotate star fields
      stars.rotation.y = elapsedTime * 0.01;
      stars.rotation.x = elapsedTime * 0.005;

      accentStars.rotation.y = -elapsedTime * 0.015;
      accentStars.rotation.z = elapsedTime * 0.01;

      nebula.rotation.y = elapsedTime * 0.005;

      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += particleVelocities[i3];
        positions[i3 + 1] += particleVelocities[i3 + 1];
        positions[i3 + 2] += particleVelocities[i3 + 2];

        // Reset if too far
        if (Math.abs(positions[i3]) > 250 || 
            Math.abs(positions[i3 + 1]) > 250 || 
            Math.abs(positions[i3 + 2]) > 250) {
          positions[i3] = (Math.random() - 0.5) * 100;
          positions[i3 + 1] = (Math.random() - 0.5) * 100;
          positions[i3 + 2] = (Math.random() - 0.5) * 100;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

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
      starsGeometry.dispose();
      starsMaterial.dispose();
      accentStarsGeometry.dispose();
      accentStarsMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'radial-gradient(ellipse at center, #0f1729 0%, #000000 70%, #000000 100%)' 
      }}
    />
  );
};

export default SpaceBackground;
