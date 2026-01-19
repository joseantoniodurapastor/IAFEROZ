import React, { useEffect, useRef } from 'react';

const BloodParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configurar tamaño
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // --- CONFIGURACIÓN DE LA CARNICERÍA ---
    const DUST_COUNT = 150; // Partículas en suspensión
    const DRIPS_COUNT = 80; // Gotas cayendo
    
    // Arrays de partículas
    const dustArray: Dust[] = [];
    const dripsArray: Drip[] = [];

    // --- CLASE POLVO (SUSPENSIÓN) ---
    class Dust {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.1; // Muy pequeñas
        this.speedX = Math.random() * 0.4 - 0.2; // Movimiento errático lento
        this.speedY = Math.random() * 0.4 - 0.2;
        // Mezcla de rojos y grises oscuros
        this.color = Math.random() > 0.5 ? '#DC2626' : '#7F1D1D'; 
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote suave en bordes (atmósfera contenida)
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
        
        // Turbulence noise
        this.x += (Math.random() - 0.5) * 0.2;
        this.y += (Math.random() - 0.5) * 0.2;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
      }
    }

    // --- CLASE GOTAS (LLUVIA DE SANGRE) ---
    class Drip {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height; // Empiezan arriba fuera de pantalla
        this.width = Math.random() * 1.5 + 0.5;
        this.height = Math.random() * 15 + 5; // Alargadas por velocidad
        this.speed = Math.random() * 8 + 4; // Rápidas
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.y += this.speed;
        
        // Reset al llegar abajo
        if (this.y > height) {
          this.y = -this.height;
          this.x = Math.random() * width;
          this.speed = Math.random() * 8 + 4;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        // Gradiente para efecto de movimiento
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, "rgba(220, 38, 38, 0)");
        gradient.addColorStop(1, `rgba(220, 38, 38, ${this.opacity})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Inicializar
    const init = () => {
      for (let i = 0; i < DUST_COUNT; i++) {
        dustArray.push(new Dust());
      }
      for (let i = 0; i < DRIPS_COUNT; i++) {
        dripsArray.push(new Drip());
      }
    };

    // Loop de animación
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Fondo negro base (aunque ya está en CSS, asegura limpieza)
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      // Dibujar Polvo
      dustArray.forEach(dust => {
        dust.update();
        dust.draw();
      });

      // Dibujar Gotas
      dripsArray.forEach(drip => {
        drip.update();
        drip.draw();
      });

      // Efecto Vignette Rojo sutil en los bordes para opresión
      const gradient = ctx.createRadialGradient(width/2, height/2, height/3, width/2, height/2, height);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(50, 0, 0, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      style={{ background: '#000000' }} 
    />
  );
};

export default BloodParticles;