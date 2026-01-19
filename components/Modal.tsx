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
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    sector: 'Real Estate',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset GSAP state on mount/unmount logic handled inside useEffect dependence on isOpen
  useEffect(() => {
    if (!window.gsap || !modalRef.current || !overlayRef.current || !contentRef.current || !scratchesRef.current) return;

    const tl = window.gsap.timeline({
      onReverseComplete: () => {
        if (!isOpen) {
           window.gsap.set(modalRef.current, { display: 'none' });
        }
      }
    });

    const paths = scratchesRef.current.querySelectorAll('path');

    if (isOpen) {
      window.gsap.set(modalRef.current, { display: 'flex' });
      window.gsap.set(overlayRef.current, { opacity: 0 });
      window.gsap.set(contentRef.current, { opacity: 0, scale: 0.9, y: 50 });
      window.gsap.set(paths, { strokeDasharray: 1500, strokeDashoffset: 1500, opacity: 1 });

      tl.to(overlayRef.current, { duration: 0.3, opacity: 1, ease: 'power2.inOut' })
        .to(paths, { 
          strokeDashoffset: 0, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: 'power4.out' 
        }, "-=0.1")
        .to(contentRef.current, { 
          duration: 0.4, 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          ease: 'back.out(1.7)' 
        }, "-=0.2")
        .to(paths, {
          opacity: 0.1,
          duration: 0.5
        });

    } else {
      tl.to(contentRef.current, { 
        duration: 0.3, 
        opacity: 0, 
        scale: 0.9, 
        y: 20 
      })
      .to(paths, {
        strokeDashoffset: 1500, 
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in'
      }, "-=0.2")
      .to(overlayRef.current, { 
        duration: 0.3, 
        opacity: 0 
      }, "-=0.1")
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
            mode: 'no-cors' // Crucial para Google Apps Script
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
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <svg 
        ref={scratchesRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-screen"
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
      >
        <path d="M-100,100 L1100,900" stroke="#DC2626" strokeWidth="20" fill="none" />
        <path d="M-100,300 L1100,1100" stroke="#DC2626" strokeWidth="15" fill="none" />
        <path d="M200,-100 L-100,200" stroke="#DC2626" strokeWidth="30" fill="none" />
      </svg>

      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-2xl bg-black border-2 border-blood shadow-[0_0_50px_rgba(220,38,38,0.5)] p-1"
      >
        <div className="absolute top-0 left-0 w-4 h-4 bg-blood"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-blood"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-blood"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-blood"></div>

        <div className="bg-charcoal/90 p-6 md:p-10 relative overflow-hidden">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-blood hover:rotate-90 transition-all duration-300 transform"
            >
                <X size={32} strokeWidth={3} />
            </button>

            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="text-blood w-12 h-12 animate-pulse" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase italic transform -skew-x-6">
                    CORTA TU <span className="text-blood text-glow">HEMORRAGIA</span> AHORA
                </h2>
                <p className="text-ash font-mono mt-4 text-sm md:text-base border-l-2 border-blood pl-4 inline-block text-left bg-black/50 p-2">
                    Introduce tus datos. Te llamo en &lt;2h para <br/> destripar tus procesos manuales.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="group">
                        <label className="block text-xs font-bold text-blood mb-1 uppercase tracking-widest group-focus-within:text-white transition-colors">Nombre Completo</label>
                        <input 
                            type="text" 
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border border-gray-800 text-white p-3 focus:border-blood focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-50 transition-all font-mono"
                            placeholder="Ej. Thomas Anderson"
                            value={formState.name}
                            onChange={e => setFormState({...formState, name: e.target.value})}
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold text-blood mb-1 uppercase tracking-widest group-focus-within:text-white transition-colors">Email Corporativo</label>
                        <input 
                            type="email" 
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border border-gray-800 text-white p-3 focus:border-blood focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-50 transition-all font-mono"
                            placeholder="ceo@tuempresa.com"
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="group">
                        <label className="block text-xs font-bold text-blood mb-1 uppercase tracking-widest group-focus-within:text-white transition-colors">Teléfono</label>
                        <input 
                            type="tel" 
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border border-gray-800 text-white p-3 focus:border-blood focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-50 transition-all font-mono"
                            placeholder="+34 600 000 000"
                            value={formState.phone}
                            onChange={e => setFormState({...formState, phone: e.target.value})}
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold text-blood mb-1 uppercase tracking-widest group-focus-within:text-white transition-colors">Sector</label>
                        <select 
                            disabled={isSubmitting}
                            className="w-full bg-black border border-gray-800 text-white p-3 focus:border-blood focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-50 transition-all font-mono appearance-none"
                            value={formState.sector}
                            onChange={e => setFormState({...formState, sector: e.target.value})}
                        >
                            <option>Real Estate</option>
                            <option>eCommerce</option>
                            <option>Servicios B2B</option>
                            <option>SaaS</option>
                            <option>Otro (Consultar)</option>
                        </select>
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-blood mb-1 uppercase tracking-widest group-focus-within:text-white transition-colors">¿Dónde te duele más?</label>
                    <textarea 
                        rows={3}
                        disabled={isSubmitting}
                        className="w-full bg-black border border-gray-800 text-white p-3 focus:border-blood focus:outline-none focus:shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-50 transition-all font-mono resize-none"
                        placeholder="Describe el proceso manual que te está costando dinero..."
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                    ></textarea>
                </div>

                <div className="pt-4">
                    <Button 
                        type="submit" 
                        fullWidth 
                        disabled={isSubmitting}
                        className={`text-lg py-5 group-hover:animate-pulse ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-3 animate-pulse">
                                INYECTANDO DATOS... <Loader2 className="animate-spin" size={20} />
                            </span>
                        ) : (
                            <span className="flex items-center gap-3">
                                ENVIAR Y AHORRAR YA <Send size={20} />
                            </span>
                        )}
                    </Button>
                    <p className="text-center text-xs text-gray-600 mt-4 font-mono">
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