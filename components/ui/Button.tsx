import React, { useRef } from 'react';

declare global {
  interface Window {
    gsap: any;
  }
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = "",
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const clawsRef = useRef<SVGSVGElement>(null);
  
  const baseClasses = "relative overflow-hidden font-display font-bold uppercase tracking-wider py-4 px-8 transition-none clip-claw group cta-button";
  
  const variants = {
    primary: "bg-blood text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]",
    secondary: "bg-transparent border-2 border-blood text-white"
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";

  const handleMouseEnter = () => {
    if (!window.gsap || !buttonRef.current || !clawsRef.current) return;

    const tl = window.gsap.timeline();
    const paths = clawsRef.current.querySelectorAll('path');

    // Estado agresivo inmediato
    tl.to(buttonRef.current, {
      scale: 1.05,
      rotation: -2,
      boxShadow: "0 0 30px rgba(220, 38, 38, 0.8)",
      duration: 0.1,
      ease: "power2.out"
    })
    // El desgarro
    .fromTo(paths, 
      { strokeDasharray: 200, strokeDashoffset: 200, opacity: 1 },
      { 
        strokeDashoffset: 0, 
        duration: 0.2, 
        stagger: 0.05, 
        ease: "power4.in",
      }, 
      "<"
    )
    // Shake effect
    .to(buttonRef.current, {
      x: -2,
      y: 2,
      duration: 0.05,
      yoyo: true,
      repeat: 3
    }, "<0.1");
  };

  const handleMouseLeave = () => {
    if (!window.gsap || !buttonRef.current || !clawsRef.current) return;
    
    const paths = clawsRef.current.querySelectorAll('path');

    window.gsap.to(buttonRef.current, {
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      boxShadow: variant === 'primary' ? "0 0 20px rgba(220, 38, 38, 0.4)" : "none",
      duration: 0.3,
      ease: "power2.inOut"
    });

    window.gsap.to(paths, {
      opacity: 0,
      duration: 0.2
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Claw Marks SVG Overlay */}
      <svg 
        ref={clawsRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 mix-blend-overlay"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <path d="M-10,0 L60,100" stroke="white" strokeWidth="12" strokeLinecap="square" fill="none" opacity="0" />
        <path d="M40,-10 L110,100" stroke="white" strokeWidth="8" strokeLinecap="square" fill="none" opacity="0" />
        <path d="M100,-10 L180,100" stroke="white" strokeWidth="15" strokeLinecap="square" fill="none" opacity="0" />
      </svg>

      {/* Blood drip effect overlay background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};

export default Button;