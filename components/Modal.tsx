import React, { useEffect, useRef, useState } from 'react';
import { X, Send, AlertTriangle, Loader2 } from 'lucide-react';
import Button from './ui/Button';

declare global {
  interface Window {
    gsap: any;
  }
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scratchesRef = useRef<SVGSVGElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const dripsRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    sector: 'Real Estate',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generar partículas estáticas para no recargar el DOM en cada render
  const dustParticles = Array.from({ length: 40 });
  const dripParticles = Array.from({ length: 15 });

  useEffect(() => {
    if (!window.gsap || !modalRef.current) return;

    const tl = window.gsap.timeline({
      onReverseComplete: () => {
        if (!isOpen) {
           window.gsap.set(modalRef.current, { display: 'none' });
        }
      }
    });

    const paths = scratchesRef.current?.querySelectorAll('path');
    const dust = dustRef.current?.querySelectorAll('.blood-dust');
    const drips = dripsRef.current?.querySelectorAll('.blood-drip');

    if (isOpen) {
      window.gsap.set(modalRef.current, { display: 'flex' });
      window.gsap.set(overlayRef.current, { opacity: 0 });
      window.gsap.set(contentRef.current, { opacity: 0, scale: 0.95, y: 30, rotationX: 10 });
      window.gsap.set(paths, { strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 1 });
      
      // Reset particles
      window.gsap.set(dust, { opacity: 0, scale: 0 });
      window.gsap.set(drips, { height: 0, opacity: 0.8 });

      // 1. Overlay & Content Entrance
      tl.to(overlayRef.current, { duration: 0.2, opacity: 1, ease: 'power2.inOut' })
        .to(contentRef.current, { 
          duration: 0.5, 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          rotationX: 0,
          ease: 'back.out(1.2)' 
        }, "-=0.1")
        
      // 2. Violent Scratches
      if (paths) {
          tl.to(paths, { 
            strokeDashoffset: 0, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: 'power4.inOut' 
          }, "-=0.3");
      }

      // 3. Blood Dust Animation (Atmosphere)
      if (dust) {
          window.gsap.to(dust, {
              opacity: "random(0.3, 0.8)",
              scale: "random(0.5, 1.5)",
              duration: 0.5,
              stagger: 0.02
          });
          
          // Continuous floating
          dust.forEach((d: any) => {
              window.gsap.to(d, {
                  x: "random(-50, 50)",
                  y: "random(-50, 50)",
                  rotation: "random(-180, 180)",
                  duration: "random(3, 6)",
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut"
              });
          });
      }

      // 4. Viscous Drips (Falling blood)
      if (drips) {
          drips.forEach((d: any, i: number) => {
             const delay = Math.random() * 2;
             const duration = 2 + Math.random() * 2;
             
             window.gsap.timeline({ repeat: -1, delay: delay })
                .set(d, { height: 0, opacity: 0.8, y: -10 })
                .to(d, { 
                    height: "random(50, 300)", 
                    duration: duration * 0.3, 
                    ease: "power1.in" 
                })
                .to(d, { 
                    y: "120%", 
                    opacity: 0, 
                    duration: duration * 0.7, 
                    ease: "power1.out" 
                });
          });
      }

    } else {
      // Exit Animation
      tl.to(contentRef.current, { 
        duration: 0.3, 
        opacity: 0, 
        scale: 0.9, 
        y: 50 
      })
      .to(overlayRef.current, { 
        duration: 0.3, 
        opacity: 0 
      }, "-=0.2")
      .set(modalRef.current, { display: 'none' });
    }

  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOVCbUPxlZ2LBO63RNiwcYSk1PAEJwl1_MO3lf3N46aQIhRRQdJa8eaKlavTOuwyYO3w/exec"; 

    try {
        const formData = new FormData();
        formData.append('Nombre', formState.name);
        formData.append('Email', formState.email);
        formData.append('Telefono', formState.phone);
        formData.append('Sector', formState.sector);
        formData.append('Mensaje', formState.message);
        
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });

        alert("DATOS RECIBIDOS. PREPARA TU CARTERA, TE LLAMAMOS EN <2H.");
        setFormState({ name: '', email: '', phone: '', sector: 'Real Estate', message: '' });
        onClose();
    } catch (error) {
        console.error("Error sending data:", error);
        alert("ERROR DE CONEXIÓN. INTÉNTALO DE NUEVO.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* AGGRESSIVE SCRATCHES SVG */}
      <svg 
        ref={scratchesRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[101] mix-blend-screen overflow-visible"
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
      >
        <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <path d="M-100,50 L1200,850" stroke="#DC2626" strokeWidth="8" fill="none" filter="url(#glow)" opacity="0.6" />
        <path d="M-100,250 L1200,1050" stroke="#DC2626" strokeWidth="4" fill="none" filter="url(#glow)" opacity="0.4" />
        <path d="M300,-100 L-50,300" stroke="#DC2626" strokeWidth="15" fill="none" filter="url(#glow)" />
        <path d="M800,-100 L400,1200" stroke="#880000" strokeWidth="2" fill="none" strokeDasharray="10,10" />
      </svg>

      <div 
        ref={contentRef}
        className="relative z-[102] w-full max-w-2xl bg-black border border-blood shadow-[0_0_100px_rgba(220,38,38,0.3)] perspective-1000"
      >
        {/* BLOOD DRIPS CONTAINER (Top Edge) */}
        <div ref={dripsRef} className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            {dripParticles.map((_, i) => (
                <div 
                    key={`drip-${i}`}
                    className="blood-drip absolute top-0 bg-blood rounded-b-full shadow-[0_0_10px_#DC2626]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: '0px',
                        opacity: 0.8
                    }}
                />
            ))}
        </div>

        {/* BLOOD DUST CONTAINER (Atmosphere) */}
        <div ref={dustRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {dustParticles.map((_, i) => (
                <div 
                    key={`dust-${i}`}
                    className="blood-dust absolute rounded-full bg-blood blur-[1px]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 1}px`,
                        height: `${Math.random() * 4 + 1}px`,
                        boxShadow: '0 0 5px #DC2626'
                    }}
                />
            ))}
        </div>

        {/* CORNER ACCENTS */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blood z-50"></div>
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blood z-50"></div>
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blood z-50"></div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blood z-50"></div>

        {/* CONTENT */}
        <div className="bg-charcoal/95 p-6 md:p-10 relative overflow-hidden backdrop-blur-sm">
            
            {/* NOISE TEXTURE OVERLAY */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-blood hover:rotate-90 transition-all duration-300 transform hover:scale-125 z-50"
            >
                <X size={32} strokeWidth={3} />
            </button>

            <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <AlertTriangle className="text-blood w-16 h-16 animate-pulse" />
                        <div className="absolute inset-0 bg-blood blur-xl opacity-40 animate-pulse"></div>
                    </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic transform -skew-x-6 tracking-tight relative">
                    <span className="relative inline-block">
                        CORTA LA
                        <span className="absolute top-0 left-0 -ml-1 text-red-900 opacity-50 mix-blend-multiply animate-glitch">CORTA LA</span>
                    </span> <span className="text-blood text-glow">HEMORRAGIA</span>
                </h2>
                <div className="mt-6 border-l-4 border-blood bg-gradient-to-r from-blood/20 to-transparent p-4 text-left">
                    <p className="text-white font-mono text-sm md:text-base font-bold">
                        &gt; DETECTANDO INEFICIENCIAS...
                    </p>
                    <p className="text-ash font-mono text-xs mt-1">
                        Introduce tus datos. Ejecutamos protocolo de ahorro en &lt;2h.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-xs font-black text-blood mb-2 uppercase tracking-[0.2em] group-focus-within:text-white transition-colors">IDENTIDAD</label>
                        <input 
                            type="text" 
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border-2 border-gray-800 text-white p-3 font-mono focus:border-blood focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 transition-all placeholder-gray-700"
                            placeholder="NOMBRE COMPLETO"
                            value={formState.name}
                            onChange={e => setFormState({...formState, name: e.target.value})}
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-black text-blood mb-2 uppercase tracking-[0.2em] group-focus-within:text-white transition-colors">ENLACE</label>
                        <input 
                            type="email" 
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border-2 border-gray-800 text-white p-3 font-mono focus:border-blood focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 transition-all placeholder-gray-700"
                            placeholder="EMAIL CORPORATIVO"
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-xs font-black text-blood mb-2 uppercase tracking-[0.2em] group-focus-within:text-white transition-colors">CONTACTO</label>
                        <input 
                            type="tel" 
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border-2 border-gray-800 text-white p-3 font-mono focus:border-blood focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 transition-all placeholder-gray-700"
                            placeholder="+34 000 000 000"
                            value={formState.phone}
                            onChange={e => setFormState({...formState, phone: e.target.value})}
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-black text-blood mb-2 uppercase tracking-[0.2em] group-focus-within:text-white transition-colors">TERRITORIO</label>
                        <div className="relative">
                            <select 
                                disabled={isSubmitting}
                                className="w-full bg-black border-2 border-gray-800 text-white p-3 font-mono focus:border-blood focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 transition-all appearance-none cursor-pointer hover:border-gray-600"
                                value={formState.sector}
                                onChange={e => setFormState({...formState, sector: e.target.value})}
                            >
                                <option>Real Estate</option>
                                <option>eCommerce</option>
                                <option>Servicios B2B</option>
                                <option>SaaS</option>
                                <option>Otro (Consultar)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blood">▼</div>
                        </div>
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-black text-blood mb-2 uppercase tracking-[0.2em] group-focus-within:text-white transition-colors">PUNTO DE DOLOR</label>
                    <textarea 
                        rows={3}
                        disabled={isSubmitting}
                        className="w-full bg-black border-2 border-gray-800 text-white p-3 font-mono focus:border-blood focus:outline-none focus:shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 transition-all resize-none placeholder-gray-700"
                        placeholder="DESCRIBE EL PROCESO QUE TE CUESTA DINERO..."
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                </div>

                <div className="pt-6">
                    <Button 
                        type="submit" 
                        fullWidth 
                        disabled={isSubmitting}
                        className={`text-xl py-6 tracking-widest group-hover:animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-3 font-black text-white">
                                <Loader2 className="animate-spin text-white" size={24} /> INYECTANDO...
                            </span>
                        ) : (
                            <span className="flex items-center gap-3 font-black">
                                ENVIAR Y AHORRAR YA <Send size={24} className="transform -rotate-45" />
                            </span>
                        )}
                    </Button>
                    <p className="text-center text-[10px] text-gray-600 mt-4 font-mono uppercase tracking-widest">
                        Al enviar aceptas que destripemos tus ineficiencias. 100% Confidencial.
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;