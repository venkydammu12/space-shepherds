import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star particles
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      twinkleSpeed: number;
    }> = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Deep space gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, '#0a0e1a');
      gradient.addColorStop(0.5, '#050810');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        // Update position
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Add glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 230, 255, ${star.opacity * 0.2})`;
          ctx.fill();
        }
      });

      // Add ambient light beams
      for (let i = 0; i < 3; i++) {
        const angle = time + i * (Math.PI * 2 / 3);
        const x = canvas.width / 2 + Math.cos(angle) * 300;
        const y = canvas.height / 2 + Math.sin(angle) * 300;

        const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
        lightGradient.addColorStop(0, 'rgba(0, 230, 255, 0.03)');
        lightGradient.addColorStop(1, 'rgba(0, 230, 255, 0)');
        
        ctx.fillStyle = lightGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: '#000000' }}
    />
  );
};

export default SpaceBackground;
