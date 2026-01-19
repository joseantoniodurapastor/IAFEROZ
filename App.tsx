import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Terminal, Cpu, Shield, ArrowRight, Check, X, Menu, Lock } from 'lucide-react';
import BloodParticles from './components/BloodParticles';
import Section from './components/ui/Section';
import Button from './components/ui/Button';
import Calculator from './components/Calculator';
import Comparison from './components/Comparison';
import Modal from './components/Modal';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smooth scroll handler dealing with fixed header offset
  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blood selection:text-white">
      <BloodParticles />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* HEADER / NAV */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-blood clip-claw flex items-center justify-center">
               {/* Minimalist Wolf Icon representation */}
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5"><path d="M19.07 4.93L17 9h-4l1 5-6 6-4-3 1-5H2L4.93 4.93z"></path><path d="M14.5 9.5L19 14l-4 6H7"></path></svg>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">IA <span className="text-blood">FEROZ</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-ash">
            <button onClick={() => scrollToSection('calculator')} className="hover:text-blood transition-colors">Calculadora</button>
            <button onClick={() => scrollToSection('oferta')} className="hover:text-blood transition-colors">Oferta</button>
            <button onClick={() => scrollToSection('casos')} className="hover:text-blood transition-colors">Casos</button>
          </div>
          <Button className="hidden md:flex text-xs py-2 px-4" onClick={openModal}>Auditoría Gratis</Button>
          <button className="md:hidden text-white" onClick={() => setIsNavOpen(!isNavOpen)}>
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {isNavOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden">
            <button onClick={() => scrollToSection('calculator')} className="text-2xl font-bold uppercase hover:text-blood">Calculadora</button>
            <button onClick={() => scrollToSection('oferta')} className="text-2xl font-bold uppercase hover:text-blood">Oferta</button>
            <button onClick={() => scrollToSection('casos')} className="text-2xl font-bold uppercase hover:text-blood">Casos</button>
            <Button onClick={openModal}>AGENDAR AUDITORÍA</Button>
            <button onClick={() => setIsNavOpen(false)} className="absolute top-6 right-6 p-2"><X /></button>
        </div>
      )}

      <main className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
           {/* Scratch Reveal Animation Overlay */}
           <motion.div 
            initial={{ x: '0%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, ease: 'easeIn', delay: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-overlay"
           />
           
           <div className="max-w-5xl mx-auto text-center relative z-20">
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-tight uppercase mb-6"
             >
               DEJA DE PERDER <br/>
               <span className="text-blood text-glow relative inline-block">
                 DINERO
                 <svg className="absolute w-full h-full top-0 left-0 text-blood opacity-30 -z-10" viewBox="0 0 100 100">
                    <path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="currentColor" strokeWidth="10" />
                 </svg>
               </span><br/>
               EN PROCESOS MANUALES
             </motion.h1>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="max-w-2xl mx-auto text-ash text-lg md:text-xl mb-10 border-l-4 border-blood pl-6 text-left bg-black/50 p-4"
             >
               <p className="mb-2">Tu empresa sangra dinero cada día que sigue funcionando a mano.</p>
               <p className="font-bold text-white">Automatización IA que te ahorra costes en 7 días.</p>
               <p className="text-blood font-mono uppercase tracking-widest mt-2">600€. Sin riesgos. Sin excusas.</p>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col md:flex-row gap-4 justify-center items-center"
             >
               <Button onClick={() => scrollToSection('calculator')}>CALCULA TU HEMORRAGIA →</Button>
               <Button variant="secondary" onClick={openModal}>AUDITORÍA GRATUITA</Button>
             </motion.div>

             <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs md:text-sm font-mono text-gray-500 uppercase">
                <span className="flex items-center gap-2"><Check className="text-blood w-4 h-4"/> Implementación 7 días</span>
                <span className="flex items-center gap-2"><Check className="text-blood w-4 h-4"/> Garantía total + 200€</span>
                <span className="flex items-center gap-2"><Shield className="text-blood w-4 h-4"/> Self-hosted seguro</span>
             </div>
           </div>
        </section>

        {/* CALCULATOR SECTION */}
        <Section id="calculator" className="bg-gradient-to-b from-black to-gray-900">
            {/* Pass openModal to Calculator to trigger from inner button */}
            <Calculator onOpenModal={openModal} />
        </Section>

        {/* OFFER SECTION */}
        <Section id="oferta">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase">
                 600€ O TE DEVOLVEMOS <span className="text-blood line-through decoration-white">600€</span> 800€
               </h2>
               <div className="max-w-2xl mx-auto text-ash">
                 <p className="mb-4">No vendemos promesas. Vendemos ahorro medible.</p>
                 <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg text-left inline-block">
                   <h3 className="text-blood font-bold text-xl mb-2">SISTEMA FEROZ 7D</h3>
                   <ul className="space-y-2 font-mono text-sm text-gray-300">
                     <li>▸ Precio: 600€ pago único</li>
                     <li>▸ Entrega: 7 días máximo</li>
                     <li>▸ Garantía: Si no reduces costes en 30 días, te devolvemos 600€ + 200€ por las molestias.</li>
                   </ul>
                 </div>
                 <p className="mt-6 text-sm italic opacity-70">
                   ¿Por qué podemos garantizar esto? Porque sabemos que funciona. Porque lo hemos hecho 47 veces.
                 </p>
               </div>
             </div>

             <div className="grid md:grid-cols-3 gap-8">
               {/* COL 1 */}
               <div className="bg-charcoal p-8 border-t-4 border-blood hover:bg-gray-900 transition-colors">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-xl uppercase">Auditoría Express</h3>
                   <span className="text-blood font-mono text-xs border border-blood px-2 py-1 rounded">24 HORAS</span>
                 </div>
                 <ul className="space-y-3 text-gray-400 text-sm">
                   <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-blood shrink-0"/> Mapa completo de tus procesos</li>
                   <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-blood shrink-0"/> Detección fugas tiempo/dinero</li>
                   <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-blood shrink-0"/> 3 quick wins inmediatos</li>
                   <li className="flex gap-2"><ArrowRight className="w-4 h-4 text-blood shrink-0"/> Priorización por ROI</li>
                 </ul>
               </div>

               {/* COL 2 */}
               <div className="bg-charcoal p-8 border-t-4 border-white transform scale-105 shadow-[0_0_30px_rgba(220,38,38,0.15)] z-10 relative">
                 <div className="absolute top-0 right-0 bg-blood text-white text-xs font-bold px-3 py-1">POPULAR</div>
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-xl uppercase">Automatización Crítica</h3>
                   <span className="text-white font-mono text-xs border border-white px-2 py-1 rounded">1 WORKFLOW</span>
                 </div>
                 <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">Tú eliges uno:</p>
                 <ul className="space-y-3 text-white text-sm mb-6">
                   <li className="flex gap-2"><Cpu className="w-4 h-4 text-blood shrink-0"/> Lead Capture + Calificación</li>
                   <li className="flex gap-2"><Cpu className="w-4 h-4 text-blood shrink-0"/> RAG FAQ Bot (20 docs)</li>
                   <li className="flex gap-2"><Cpu className="w-4 h-4 text-blood shrink-0"/> Doc Auto (Facturas/PDF)</li>
                 </ul>
                 <div className="bg-black/50 p-3 rounded border border-gray-700">
                    <span className="text-xs text-gray-500 block mb-1">Stack Real:</span>
                    <span className="text-xs text-white block">n8n self-hosted • Claude/GPT-4 • Integrado CRM/Email</span>
                 </div>
                 <div className="mt-6">
                    <Button fullWidth onClick={() => window.open('https://buy.stripe.com/00w7sKazu7Qr1KT7H47Re02', '_blank')}>ME INTERESA</Button>
                 </div>
               </div>

               {/* COL 3 */}
               <div className="bg-charcoal p-8 border-t-4 border-blood hover:bg-gray-900 transition-colors">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-xl uppercase">Soporte Post</h3>
                   <span className="text-blood font-mono text-xs border border-blood px-2 py-1 rounded">14 DÍAS</span>
                 </div>
                 <ul className="space-y-3 text-gray-400 text-sm">
                   <li className="flex gap-2"><Check className="w-4 h-4 text-blood shrink-0"/> Telegram directo conmigo</li>
                   <li className="flex gap-2"><Check className="w-4 h-4 text-blood shrink-0"/> 1 llamada ajustes (30min)</li>
                   <li className="flex gap-2"><Check className="w-4 h-4 text-blood shrink-0"/> Video tutorial 10min</li>
                   <li className="flex gap-2"><Check className="w-4 h-4 text-blood shrink-0"/> SOPs modificación</li>
                 </ul>
               </div>
             </div>

             <div className="mt-16 grid md:grid-cols-2 gap-8 bg-black/40 p-8 border border-gray-800">
                <div>
                   <h4 className="text-red-500 font-bold mb-4 flex items-center gap-2"><X /> LO QUE NO ES</h4>
                   <ul className="space-y-2 text-gray-500 text-sm">
                      <li>❌ NO es un curso</li>
                      <li>❌ NO es un template genérico</li>
                      <li>❌ NO depende de plataformas SaaS caras</li>
                      <li>❌ NO requiere equipo técnico</li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-green-500 font-bold mb-4 flex items-center gap-2"><Check /> LO QUE ES</h4>
                   <ul className="space-y-2 text-white text-sm">
                      <li>✅ ES implementación hecha para ti</li>
                      <li>✅ ES sistema funcionando en tu negocio</li>
                      <li>✅ ES ahorro medible en 7 días</li>
                   </ul>
                </div>
             </div>
          </div>
        </Section>

        {/* COMPARISON SECTION */}
        <Section className="bg-charcoal/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-10">
              POR QUÉ LAMBDA AUTOMATIONS <span className="text-blood">NO PUEDE COMPETIR</span>
            </h2>
            <Comparison />
          </div>
        </Section>

        {/* CASE STUDIES */}
        <Section id="casos">
          <div className="max-w-6xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">CASOS DE ESTUDIO</h2>
             <div className="grid md:grid-cols-3 gap-6">
                
                {[
                  {
                    title: "AGENCIA REAL ESTATE",
                    problem: "40% tiempo en seguimientos. 60% leads perdidos.",
                    bleed: "2.400€/mes",
                    solution: "Lead capture LinkedIn + Scoring + Secuencia 5 emails + Calendly.",
                    results: ["0h seguimientos manuales", "78% leads cualificados", "23% más citas"],
                    roi: "3.200€",
                    payback: "5 días",
                    btn: "QUIERO RESULTADOS ASÍ"
                  },
                  {
                    title: "ECOMMERCE B2C",
                    problem: "Atención cliente 15h/sem. FAQs repetitivas 70%.",
                    bleed: "1.800€/mes",
                    solution: "RAG Bot con 18 documentos. Respuestas 24/7.",
                    results: ["68% tickets resueltos", "11h/sem liberadas", "Satisfacción ↑ 17%"],
                    roi: "1.650€",
                    payback: "10 días",
                    btn: "NECESITO ESTO YA"
                  },
                  {
                    title: "CONSULTORÍA B2B",
                    problem: "Generación propuestas 6h. 90% repetitivo.",
                    bleed: "3.200€/mes",
                    solution: "Doc automation. Input params -> PDF listo en 15min.",
                    results: ["Tiempo: 6h → 20min", "3x más propuestas", "Cierre ↑ 11%"],
                    roi: "4.100€",
                    payback: "4 días",
                    btn: "ESTO NECESITO"
                  }
                ].map((study, idx) => (
                  <div key={idx} className="bg-black border border-gray-800 p-6 flex flex-col hover:border-blood transition-colors group">
                     <div className="mb-4 border-b border-gray-800 pb-4">
                        <h3 className="font-bold text-lg text-white mb-2">{study.title}</h3>
                        <p className="text-xs text-gray-400">PROBLEMA: {study.problem}</p>
                        <p className="text-blood font-mono font-bold mt-2">HEMORRAGIA: {study.bleed}</p>
                     </div>
                     <div className="mb-4 flex-grow">
                        <p className="text-sm text-gray-300 mb-4">{study.solution}</p>
                        <ul className="text-xs space-y-1 text-ash font-mono">
                           {study.results.map((r, i) => <li key={i}>✓ {r}</li>)}
                        </ul>
                     </div>
                     <div className="bg-blood/10 p-3 mb-4 rounded">
                        <div className="flex justify-between text-xs font-bold text-blood">
                           <span>ROI: {study.roi}</span>
                           <span>PAYBACK: {study.payback}</span>
                        </div>
                     </div>
                     <Button variant="secondary" className="w-full text-xs py-2" onClick={openModal}>{study.btn}</Button>
                  </div>
                ))}

             </div>
          </div>
        </Section>

        {/* AUDIENCE */}
        <Section className="bg-white text-black">
           <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display font-black text-3xl mb-6 flex items-center gap-2">
                   ESTO ES PARA TI SI...
                </h3>
                <ul className="space-y-4 font-bold text-lg">
                   {['Facturas >50K€/año', 'Procesos manuales dolorosos', 'Quieres resultados, no cursos', 'Valor 600€ como inversión', 'Velocidad de implementación'].map((item, i) => (
                      <li key={i} className="flex gap-3 items-center"><Check className="text-blood stroke-[4px] w-6 h-6"/> {item}</li>
                   ))}
                </ul>
              </div>
              <div className="opacity-70 grayscale">
                <h3 className="font-display font-black text-3xl mb-6 flex items-center gap-2">
                   ESTO NO ES PARA TI...
                </h3>
                <ul className="space-y-4 font-medium text-lg decoration-slice">
                   {['Buscas tutoriales bonitos', 'Quieres "aprender" (ve a AILINK)', 'Presupuesto <600€', 'Esperas magia sin cambios', 'Prefieres pagar 5-10K por lo mismo'].map((item, i) => (
                      <li key={i} className="flex gap-3 items-center"><X className="text-black w-6 h-6"/> {item}</li>
                   ))}
                </ul>
                <p className="mt-8 text-sm font-mono border-t border-black pt-4">
                  Si buscas postureo, ve a ver a Agustín Medina. <br/>
                  Si buscas ahorrar 20.000€/año, quédate aquí.
                </p>
              </div>
           </div>
        </Section>

        {/* GUARANTEE */}
        <Section className="bg-blood relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="max-w-3xl mx-auto text-center relative z-10 text-white">
              <Shield className="w-16 h-16 mx-auto mb-6 text-black" />
              <h2 className="text-3xl md:text-5xl font-display font-black mb-6 uppercase leading-tight">
                 Nuestra garantía es agresiva porque sabemos que funciona
              </h2>
              <div className="bg-black text-white p-8 border-4 border-white/20 transform -rotate-1">
                 <h3 className="text-2xl font-bold mb-4 text-blood">GARANTÍA TOTAL 30 DÍAS</h3>
                 <p className="mb-6">
                    Si después de implementar no reduces costes operativos mínimo 30% o no liberas tiempo...
                 </p>
                 <p className="text-xl font-bold mb-2">Te devolvemos los 600€ completos.</p>
                 <p className="text-xl font-bold">Y te pagamos 200€ adicionales por tu tiempo.</p>
              </div>
              <div className="mt-8 text-sm font-mono opacity-80">
                 En 47 implementaciones: 0 devoluciones. ROI promedio 4.2x.
              </div>
           </div>
        </Section>

        {/* FAQ */}
        <Section>
           <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold mb-10 text-center">FAQ PAIN-BASED</h2>
              <div className="space-y-6">
                 {[
                   { q: "¿Por qué 600€ si otros cobran miles?", a: "Lambda cobra 3-10K por cloud caro y educación. Nosotros somos ejecución pura y self-hosted. Sin inflar." },
                   { q: "¿Cómo sé que no es un template genérico?", a: "Auditoría de TU negocio primero. 600€ es implementación personalizada, un template cuesta 50€." },
                   { q: "¿Necesito equipo técnico?", a: "No. Solo necesitas ganas de ahorrar. Nosotros ponemos el expertise técnico. Tú usas el sistema." },
                   { q: "¿Funciona con mi CRM?", a: "Sí. HubSpot, Salesforce, Pipedrive, Gmail, Outlook, Notion, Airtable, Stripe... Si tiene API, lo conectamos." }
                 ].map((faq, i) => (
                    <div key={i} className="bg-gray-900/50 border border-gray-800 p-6">
                       <h4 className="font-bold text-lg text-white mb-2">{faq.q}</h4>
                       <p className="text-gray-400 text-sm">{faq.a}</p>
                    </div>
                 ))}
              </div>
           </div>
        </Section>

        {/* FINAL CTA */}
        <Section className="pb-32 pt-32">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase">
                 CADA DÍA SIN AUTOMATIZAR ES <span className="text-blood">DINERO QUEMADO</span>
              </h2>
              <p className="text-xl text-ash mb-10">
                 La pregunta no es "¿debería automatizar?"<br/>
                 La pregunta es "¿cuánto más voy a perder antes de hacerlo?"
              </p>
              <div className="flex flex-col gap-6 items-center">
                 <Button onClick={openModal} className="text-xl px-12 py-6 bg-blood hover:bg-red-600 animate-pulse-fast">
                    AUDITORÍA GRATUITA - DESCUBRE TU HEMORRAGIA
                 </Button>
                 <a href="mailto:hola@iaferoz.es" className="text-sm text-gray-500 hover:text-white transition-colors underline">
                    CONTRATAR SISTEMA FEROZ 7D - 600€
                 </a>
              </div>
              <div className="mt-12 pt-12 border-t border-gray-900 text-xs font-mono text-gray-600">
                 Telegram: @iaferoz_soporte • Email: hola@iaferoz.es • Respuesta &lt;2h
              </div>
           </div>
        </Section>

      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-900 py-12 px-4">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
            <div>
               <h3 className="font-display font-bold text-white mb-4">IA FEROZ</h3>
               <p className="text-xs text-gray-500">Automatización que muerde.</p>
            </div>
            <div>
               <h4 className="font-bold text-white text-sm mb-4">SERVICIOS</h4>
               <ul className="space-y-2 text-xs text-gray-500">
                  <li>Sistema Feroz 7D</li>
                  <li>Soporte Extendido</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-white text-sm mb-4">RECURSOS</h4>
               <ul className="space-y-2 text-xs text-gray-500">
                  <li>Calculadora ROI</li>
                  <li>Casos Estudio</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-white text-sm mb-4">LEGAL</h4>
               <ul className="space-y-2 text-xs text-gray-500">
                  <li>Privacidad</li>
                  <li>Términos</li>
               </ul>
            </div>
         </div>
         <div className="text-center border-t border-gray-900 pt-8 text-xs text-gray-600 font-mono uppercase">
            © 2025 IA Feroz - Durá Ventures S.L.
            <br/>
            <span className="text-blood/50 mt-2 block">El mercado es de lobos. Nosotros somos más feroces.</span>
         </div>
      </footer>
    </div>
  );
}

export default App;