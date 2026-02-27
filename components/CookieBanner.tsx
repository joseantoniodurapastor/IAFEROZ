import React, { useState, useEffect, useRef } from 'react';
import { X, Cookie } from 'lucide-react';

declare global {
    interface Window {
        gsap: any;
    }
}

interface CookieBannerProps {
    onOpenCookiesPolicy: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenCookiesPolicy }) => {
    const [isVisible, setIsVisible] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const consent = localStorage.getItem('iaferoz_cookie_consent');
        if (!consent) {
            // Small delay so the page loads first
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isVisible && bannerRef.current && window.gsap) {
            window.gsap.fromTo(
                bannerRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
        }
    }, [isVisible]);

    const handleAccept = () => {
        localStorage.setItem('iaferoz_cookie_consent', 'accepted');
        animateOut();
    };

    const handleReject = () => {
        localStorage.setItem('iaferoz_cookie_consent', 'rejected');
        animateOut();
    };

    const animateOut = () => {
        if (window.gsap && bannerRef.current) {
            window.gsap.to(bannerRef.current, {
                y: 100, opacity: 0, duration: 0.3, ease: 'power2.in',
                onComplete: () => setIsVisible(false)
            });
        } else {
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            ref={bannerRef}
            className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
            style={{ opacity: 0 }}
        >
            <div className="max-w-4xl mx-auto bg-charcoal border border-gray-800 rounded-lg p-5 md:p-6 shadow-2xl shadow-black/50">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Icon + Text */}
                    <div className="flex items-start gap-3 flex-1">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-blood/20 flex items-center justify-center mt-0.5">
                            <Cookie className="w-5 h-5 text-blood" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                En IA Feroz utilizamos cookies propias y de terceros para garantizar el funcionamiento técnico de la web, analizar el tráfico y mejorar la experiencia de usuario.
                            </p>
                            <button
                                onClick={onOpenCookiesPolicy}
                                className="text-xs text-blood hover:underline mt-1 font-mono uppercase tracking-wider"
                            >
                                Más información
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 shrink-0 w-full md:w-auto">
                        <button
                            onClick={handleReject}
                            className="flex-1 md:flex-none px-5 py-2.5 border border-gray-700 text-gray-400 text-sm font-bold uppercase tracking-wider rounded hover:border-white hover:text-white transition-colors"
                        >
                            Rechazar
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-5 py-2.5 bg-blood text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
