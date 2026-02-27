import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

declare global {
    interface Window {
        gsap: any;
    }
}

type LegalType = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: LegalType;
}

const LEGAL_CONTENT: Record<LegalType, { title: string; sections: { heading?: string; content: string[] }[] }> = {
    privacy: {
        title: 'POLÍTICA DE PRIVACIDAD — IA FEROZ',
        sections: [
            {
                content: [
                    'En IA Feroz tratamos los datos personales con responsabilidad, transparencia y conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).'
                ]
            },
            {
                heading: '1. Responsable del tratamiento',
                content: [
                    'Titular: IA Feroz',
                    'Email: hola@iaferoz.com',
                    'Teléfono: +34 604 879 643',
                    'Web: https://www.iaferoz.com'
                ]
            },
            {
                heading: '2. ¿Qué datos recopilamos?',
                content: [
                    'Podemos recopilar las siguientes categorías de datos:',
                    '• Nombre y apellidos',
                    '• Empresa',
                    '• Cargo',
                    '• Email profesional',
                    '• Teléfono',
                    '• Información incluida en formularios de contacto',
                    '• Datos técnicos de navegación (IP anonimizada, navegador, dispositivo)',
                    'No recopilamos categorías especiales de datos (salud, ideología, religión, etc.).'
                ]
            },
            {
                heading: '3. Finalidad del tratamiento',
                content: [
                    'Tratamos los datos para:',
                    '• Gestionar solicitudes enviadas mediante formularios web',
                    '• Responder consultas comerciales',
                    '• Enviar propuestas y documentación contractual',
                    '• Ejecutar contratos firmados',
                    '• Prestar soporte técnico a clientes',
                    '• Cumplir obligaciones legales',
                    '• Mejorar el rendimiento de la web (analítica)',
                    'No utilizamos los datos para decisiones automatizadas con efectos jurídicos.'
                ]
            },
            {
                heading: '4. Base jurídica',
                content: [
                    'La base legal del tratamiento es:',
                    '• Consentimiento del usuario (formularios y comunicaciones comerciales)',
                    '• Ejecución de contrato (clientes activos)',
                    '• Interés legítimo (mejora del servicio y seguridad web)',
                    '• Cumplimiento de obligaciones legales'
                ]
            },
            {
                heading: '5. Conservación de los datos',
                content: [
                    '• Datos de contacto: mientras exista relación comercial o hasta solicitud de supresión.',
                    '• Datos contractuales: mínimo 6 años (obligación fiscal/mercantil).',
                    '• Datos de facturación: según normativa tributaria vigente.',
                    'Una vez finalizados los plazos legales, los datos serán eliminados o anonimizados.'
                ]
            },
            {
                heading: '6. Destinatarios',
                content: [
                    'Podrán tener acceso a datos personales:',
                    '• Proveedores tecnológicos (hosting, CRM, herramientas de automatización)',
                    '• Servicios de email y almacenamiento en la nube',
                    '• Asesoría contable/fiscal (si aplica)',
                    'Todos actúan como encargados de tratamiento bajo contrato conforme al RGPD.',
                    'No vendemos datos personales a terceros.'
                ]
            },
            {
                heading: '7. Transferencias internacionales',
                content: [
                    'En caso de utilizar proveedores tecnológicos fuera del Espacio Económico Europeo, se garantizará que cumplan con mecanismos legales válidos (cláusulas contractuales tipo u otros instrumentos reconocidos por la Comisión Europea).'
                ]
            },
            {
                heading: '8. Derechos del usuario',
                content: [
                    'Puedes ejercer los siguientes derechos:',
                    '• Acceso',
                    '• Rectificación',
                    '• Supresión',
                    '• Limitación del tratamiento',
                    '• Oposición',
                    '• Portabilidad',
                    'Para ejercerlos, escribe a hola@iaferoz.com indicando el derecho que deseas ejercer y adjuntando copia de tu documento identificativo.',
                    'También puedes presentar reclamación ante la Agencia Española de Protección de Datos (AEPD).'
                ]
            },
            {
                heading: '9. Seguridad',
                content: [
                    'IA Feroz aplica medidas técnicas y organizativas adecuadas para proteger los datos frente a acceso no autorizado, pérdida o alteración.'
                ]
            },
            {
                heading: '10. Actualizaciones',
                content: [
                    'Esta política puede actualizarse para adaptarse a cambios legales o técnicos. La versión vigente estará siempre publicada en https://www.iaferoz.com.'
                ]
            }
        ]
    },
    terms: {
        title: 'TÉRMINOS Y CONDICIONES — IA FEROZ',
        sections: [
            {
                content: [
                    'El presente documento regula el acceso y uso del sitio web https://www.iaferoz.com y la contratación de los sistemas estándar ofrecidos por IA Feroz.',
                    'El acceso y contratación implican la aceptación íntegra de estas condiciones.'
                ]
            },
            {
                heading: '1. Identificación del titular',
                content: [
                    'IA Feroz',
                    'Email: hola@iaferoz.com',
                    'Teléfono: +34 604 879 643',
                    'Sitio web: https://www.iaferoz.com'
                ]
            },
            {
                heading: '2. Objeto',
                content: [
                    'IA Feroz implementa sistemas estándar de automatización operativa en empresas B2B industriales y de servicios técnicos.',
                    'No se ofrecen:',
                    '• Desarrollos a medida fuera de catálogo',
                    '• Consultoría estratégica',
                    '• Servicios creativos',
                    '• Promesas de incremento de facturación',
                    'Se implementan exclusivamente workflows cerrados, replicables y entregables en 7 días.'
                ]
            },
            {
                heading: '3. Proceso de contratación',
                content: [
                    'El proceso es el siguiente:',
                    '1. Aceptación de propuesta formal.',
                    '2. Firma digital de contrato.',
                    '3. Pago íntegro del setup.',
                    '4. Kickoff y entrega de credenciales.',
                    '5. Implementación (≤7 días).',
                    '6. Activación del soporte técnico obligatorio.',
                    'La implementación comienza únicamente tras la recepción del pago y credenciales necesarias.'
                ]
            },
            {
                heading: '4. Precios y pagos',
                content: [
                    'Los precios vigentes son los publicados en la propuesta comercial aceptada.',
                    '• El setup es pago único.',
                    '• El soporte técnico mensual es obligatorio.',
                    '• No existen descuentos fuera de condiciones autorizadas.',
                    '• Los pagos no son fraccionables salvo acuerdo escrito.',
                    '• El impago del soporte puede implicar suspensión del servicio.'
                ]
            },
            {
                heading: '5. Garantía',
                content: [
                    'La garantía de reembolso aplica exclusivamente al paquete STARTER bajo las siguientes condiciones:',
                    '• Uso activo mínimo de 20 días.',
                    '• El workflow no cumple el impacto económico medible prometido.',
                    '• El cliente ha completado el training.',
                    '• No ha rechazado modificaciones técnicas necesarias.',
                    'En caso de cumplimiento de condiciones, se reembolsará el setup + 200€ de compensación.',
                    'No aplica a paquetes combinados (GROWTH, SCALE, ENTERPRISE).'
                ]
            },
            {
                heading: '6. Limitación de responsabilidad',
                content: [
                    'IA Feroz no garantiza:',
                    '• Incrementos de facturación.',
                    '• Cierre de clientes.',
                    '• Generación de leads.',
                    '• Resultados comerciales dependientes del mercado o ejecución del cliente.',
                    'Los sistemas automatizan procesos. No sustituyen la gestión empresarial ni la ejecución comercial del cliente.',
                    'IA Feroz no será responsable por:',
                    '• Fallos derivados de herramientas externas (CRM, ERP, APIs).',
                    '• Interrupciones por cambios técnicos de terceros.',
                    '• Uso incorrecto del sistema por parte del cliente.',
                    '• Retrasos provocados por falta de entrega de credenciales o información.'
                ]
            },
            {
                heading: '7. Obligaciones del cliente',
                content: [
                    'El cliente se compromete a:',
                    '• Facilitar accesos y credenciales necesarias.',
                    '• Utilizar correctamente los workflows implementados.',
                    '• No modificar la arquitectura sin autorización.',
                    '• Mantener activo el soporte técnico mensual.',
                    '• Cumplir la legislación aplicable en el uso de automatizaciones (RGPD, LSSI, etc.).'
                ]
            },
            {
                heading: '8. Propiedad intelectual',
                content: [
                    'Los workflows, estructura técnica, documentación y arquitectura son propiedad de IA Feroz.',
                    'El cliente obtiene un derecho de uso operativo mientras mantenga el soporte activo.',
                    'No está permitido:',
                    '• Reproducir la arquitectura.',
                    '• Revender el sistema.',
                    '• Copiar la estructura técnica.',
                    '• Transferir el acceso a terceros no autorizados.'
                ]
            },
            {
                heading: '9. Soporte técnico',
                content: [
                    'El soporte es obligatorio y se rige por las condiciones del plan contratado (Básico o Premium).',
                    'La cancelación del soporte implica:',
                    '• Pérdida de garantía de operatividad.',
                    '• Ausencia de mantenimiento.',
                    '• Riesgo de caída del sistema por cambios externos.',
                    'La reactivación puede requerir auditoría técnica adicional.'
                ]
            },
            {
                heading: '10. Suspensión o resolución',
                content: [
                    'IA Feroz podrá suspender el servicio si:',
                    '• Existe impago.',
                    '• El cliente incumple obligaciones contractuales.',
                    '• Se detecta uso ilícito del sistema.',
                    'La resolución no da derecho a devolución salvo en los supuestos expresamente contemplados en la garantía STARTER.'
                ]
            },
            {
                heading: '11. Legislación aplicable y jurisdicción',
                content: [
                    'El presente documento se rige por la legislación española.',
                    'Para cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del titular, salvo que la normativa establezca otra competencia obligatoria.'
                ]
            },
            {
                heading: '12. Modificaciones',
                content: [
                    'IA Feroz podrá actualizar estos términos para adaptarlos a cambios legales o técnicos. La versión vigente estará siempre publicada en https://www.iaferoz.com.'
                ]
            }
        ]
    },
    cookies: {
        title: 'AVISO DE COOKIES — IA FEROZ',
        sections: [
            {
                heading: '¿Qué son las cookies?',
                content: [
                    'Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando navegas por https://www.iaferoz.com. Permiten reconocer tu navegador y recopilar determinada información.'
                ]
            },
            {
                heading: 'Tipos de cookies que utilizamos',
                content: [
                    '1. Cookies técnicas (obligatorias)',
                    'Necesarias para el funcionamiento básico del sitio web. Sin ellas, la web no funciona correctamente. No requieren consentimiento.',
                    '',
                    '2. Cookies de análisis (opcionales)',
                    'Nos permiten medir el tráfico, analizar el comportamiento de navegación y optimizar el rendimiento del sitio.',
                    '',
                    '3. Cookies de terceros (si aplica)',
                    'Pueden utilizarse servicios externos como herramientas de analítica o integraciones técnicas. Estos terceros pueden recopilar información conforme a sus propias políticas.'
                ]
            },
            {
                heading: '¿Qué datos se recopilan?',
                content: [
                    '• Dirección IP anonimizada',
                    '• Tipo de dispositivo y navegador',
                    '• Páginas visitadas',
                    '• Tiempo de navegación',
                    'No utilizamos cookies para vender datos ni para publicidad invasiva.'
                ]
            },
            {
                heading: 'Base legal',
                content: [
                    'El uso de cookies técnicas se basa en el interés legítimo para el funcionamiento del sitio.',
                    'Las cookies de análisis se instalan únicamente con el consentimiento expreso del usuario, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley 34/2002 (LSSI-CE).'
                ]
            },
            {
                heading: 'Gestión de cookies',
                content: [
                    'Puedes aceptar, rechazar o configurar las cookies desde el banner de configuración al acceder a la web.',
                    'También puedes eliminar o bloquear cookies desde la configuración de tu navegador.'
                ]
            },
            {
                heading: 'Responsable',
                content: [
                    'IA Feroz',
                    'hola@iaferoz.com',
                    '+34 604 879 643',
                    'https://www.iaferoz.com'
                ]
            }
        ]
    }
};

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && window.gsap) {
            document.body.style.overflow = 'hidden';
            window.gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            window.gsap.fromTo(panelRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        if (window.gsap) {
            window.gsap.to(panelRef.current, { y: 40, opacity: 0, duration: 0.25, ease: 'power2.in' });
            window.gsap.to(overlayRef.current, {
                opacity: 0, duration: 0.3, delay: 0.1,
                onComplete: () => {
                    document.body.style.overflow = '';
                    onClose();
                }
            });
        } else {
            document.body.style.overflow = '';
            onClose();
        }
    };

    if (!isOpen) return null;

    const data = LEGAL_CONTENT[type];

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        >
            <div
                ref={panelRef}
                className="relative w-full max-w-3xl max-h-[85vh] bg-charcoal border border-gray-800 rounded-lg overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 bg-black/60 shrink-0">
                    <h2 className="text-lg md:text-xl font-display font-bold text-white uppercase tracking-wider">{data.title}</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                        aria-label="Cerrar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 custom-legal-scroll">
                    {data.sections.map((section, idx) => (
                        <div key={idx}>
                            {section.heading && (
                                <h3 className="text-blood font-bold text-base md:text-lg mb-3 font-display uppercase tracking-wide">
                                    {section.heading}
                                </h3>
                            )}
                            <div className="space-y-2">
                                {section.content.map((line, lineIdx) => (
                                    <p key={lineIdx} className="text-sm text-gray-300 leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-800 bg-black/40 shrink-0 flex justify-end">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-blood text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-red-700 transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
