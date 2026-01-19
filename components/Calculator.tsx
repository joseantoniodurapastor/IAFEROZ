import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { ROIResult } from '../types';

interface CalculatorProps {
  onOpenModal?: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onOpenModal }) => {
  const [sector, setSector] = useState<string>('');
  const [employees, setEmployees] = useState<number>(5);
  const [hours, setHours] = useState<number>(10);
  const [result, setResult] = useState<ROIResult | null>(null);

  const calculateROI = () => {
    // Aggressive heuristic calculation
    // Base cost per hour (fully loaded) ~ 25€ (conservative but realistic for calculation base)
    // Loss factor multiplier
    
    const laborCost = Math.round((employees * 0.3) * (hours * 4 * 25)); // 30% of employees doing manual work * hours * hourly rate
    const lostLeads = Math.round(laborCost * 0.45); // Estimated opportunity cost
    const errors = Math.round(laborCost * 0.1);
    
    const monthlyLoss = laborCost + lostLeads + errors;
    const yearlyLoss = monthlyLoss * 12;
    
    const investment = 600;
    const dailySaving = monthlyLoss / 22; // working days
    const paybackDays = Math.ceil(investment / dailySaving);
    const roiYear1 = Math.round(((yearlyLoss - investment) / investment) * 100);

    setResult({
      monthlyLoss,
      laborCost,
      lostLeads,
      errors,
      yearlyLoss,
      paybackDays: paybackDays < 1 ? 1 : paybackDays,
      roiYear1
    });
  };

  useEffect(() => {
    calculateROI();
  }, [employees, hours, sector]);

  return (
    <div className="max-w-4xl mx-auto bg-charcoal/50 border border-blood/30 p-6 md:p-10 rounded-sm backdrop-blur-sm">
      <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-10 text-white">
        ¿CUÁNTO DINERO ESTÁS <span className="text-blood text-glow">QUEMANDO</span> AHORA MISMO?
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* INPUTS */}
        <div className="space-y-8">
          <div>
            <label className="block text-ash mb-3 font-bold uppercase text-sm">1. Sector de tu empresa</label>
            <div className="grid grid-cols-2 gap-2">
              {['Real Estate', 'eCommerce', 'Servicios', 'B2B SaaS', 'Otro'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`border p-2 text-xs uppercase font-mono transition-all ${
                    sector === s 
                      ? 'bg-blood border-blood text-white' 
                      : 'border-gray-700 text-gray-500 hover:border-blood'
                  }`}
                >
                  [ {sector === s ? 'x' : ' '}] {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-ash mb-3 font-bold uppercase text-sm flex justify-between">
              2. Empleados manuales
              <span className="text-blood font-mono text-xl">{employees}</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={employees}
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-ash mb-3 font-bold uppercase text-sm flex justify-between">
              3. Horas sem. repetitivas
              <span className="text-blood font-mono text-xl">{hours}h</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* OUTPUT */}
        <div className="relative border-l-2 border-blood/20 pl-0 md:pl-10 flex flex-col justify-center">
          <AnimatePresence mode='wait'>
            {result && (
              <motion.div
                key={result.monthlyLoss}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-800 pb-4">
                  <div className="text-ash text-sm uppercase tracking-widest mb-1">Tu Hemorragia Mensual</div>
                  <div className="text-5xl md:text-6xl font-display font-bold text-blood text-glow">
                    {result.monthlyLoss.toLocaleString('es-ES')}€
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-400 font-mono">
                  <div className="flex justify-between">
                    <span>• Coste laboral desperdiciado:</span>
                    <span className="text-white">{result.laborCost.toLocaleString('es-ES')}€/mes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Leads perdidos:</span>
                    <span className="text-white">{result.lostLeads.toLocaleString('es-ES')}€/mes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Errores humanos:</span>
                    <span className="text-white">{result.errors.toLocaleString('es-ES')}€/mes</span>
                  </div>
                </div>

                <div className="bg-blood/10 p-4 border border-blood/50">
                  <div className="flex justify-between items-end mb-2">
                    <span className="uppercase font-bold text-white">En 1 año pierdes:</span>
                    <span className="text-2xl font-bold text-white">{result.yearlyLoss.toLocaleString('es-ES')}€</span>
                  </div>
                  <div className="h-px w-full bg-blood/30 mb-2"></div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-gray-400 block">Inversión IA Feroz</span>
                      <span className="text-white text-lg font-bold">600€</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block">ROI Año 1</span>
                      <span className="text-blood text-lg font-bold">{result.roiYear1}%</span>
                    </div>
                    <div className="col-span-2 text-center bg-black/40 py-1 rounded">
                      Payback: <span className="text-green-400 font-bold">{result.paybackDays} días</span>
                    </div>
                  </div>
                </div>

                <Button fullWidth className="mt-4" onClick={onOpenModal}>
                  CORTA LA HEMORRAGIA AHORA
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Calculator;