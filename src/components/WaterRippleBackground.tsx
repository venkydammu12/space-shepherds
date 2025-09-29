import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WaterRippleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Torch light particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      type: 'torch' | 'energy';
    }> = [];

    // Create particles
    const createParticle = () => {
      const isEnergy = Math.random() > 0.7;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 300 + Math.random() * 200,
        size: isEnergy ? 1 + Math.random() * 2 : 2 + Math.random() * 3,
        type: isEnergy ? 'energy' : 'torch'
      });
    };

    // Create ripples
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }> = [];

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 100 + Math.random() * 150,
        alpha: 0.6
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'hsl(230, 35%, 7%)');
      gradient.addColorStop(0.5, 'hsl(240, 50%, 10%)');
      gradient.addColorStop(1, 'hsl(260, 40%, 15%)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 2;
        ripple.alpha *= 0.98;

        if (ripple.alpha < 0.01 || ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(180, 100%, 60%, ${ripple.alpha * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner glow
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(25, 100%, 60%, ${ripple.alpha * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Animate particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = 1 - (p.life / p.maxLife);
        const size = p.size * (1 - p.life / p.maxLife * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        
        if (p.type === 'torch') {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
          gradient.addColorStop(0, `hsla(25, 100%, 60%, ${alpha})`);
          gradient.addColorStop(0.5, `hsla(35, 100%, 70%, ${alpha * 0.6})`);
          gradient.addColorStop(1, `hsla(45, 100%, 80%, 0)`);
          ctx.fillStyle = gradient;
        } else {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
          gradient.addColorStop(0, `hsla(180, 100%, 60%, ${alpha})`);
          gradient.addColorStop(0.7, `hsla(200, 100%, 70%, ${alpha * 0.4})`);
          gradient.addColorStop(1, `hsla(220, 100%, 80%, 0)`);
          ctx.fillStyle = gradient;
        }
        
        ctx.fill();
      }

      // Create new particles
      if (particles.length < 200 && Math.random() < 0.3) {
        createParticle();
      }

      // Random ripples
      if (Math.random() < 0.02) {
        createRipple(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.1) {
        createRipple(e.clientX, e.clientY);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Additional overlay effects */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Floating energy orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/30 rounded-full blur-sm"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 120, 0],
              opacity: [0.3, 0.8, 0.5, 0.3],
              scale: [0.5, 1.2, 0.8, 0.5],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
        
        {/* Torch light effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`torch-${i}`}
            className="absolute w-6 h-6 bg-accent/20 rounded-full blur-md"
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 90, -70, 0],
              opacity: [0.2, 0.6, 0.4, 0.2],
              scale: [0.8, 1.5, 1, 0.8],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
            style={{
              right: `${15 + i * 20}%`,
              bottom: `${25 + i * 15}%`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default WaterRippleBackground;