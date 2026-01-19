import React from 'react';
import { Check, X } from 'lucide-react';

const Comparison: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-4 bg-transparent"></th>
            <th className="p-4 bg-gray-900 text-gray-400 font-display uppercase tracking-wider text-xl text-center border-t-4 border-gray-700">Lambda Automations</th>
            <th className="p-4 bg-blood/10 text-white font-display uppercase tracking-wider text-2xl text-center border-t-4 border-blood relative overflow-hidden">
              <span className="relative z-10 text-glow">IA Feroz</span>
              <div className="absolute inset-0 bg-blood/5 animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody className="font-mono text-sm md:text-base">
          {[
            { metric: "Precio", bad: '"Contacta para presupuesto"\n1.000-10.000 USD', good: '600€ fijo\nTransparente desde día 1' },
            { metric: "Entrega", bad: '14-21 días\nDepende de carga', good: '7 días máximo\nGarantizado' },
            { metric: "Garantía", bad: 'No especificada', good: 'Total + 200€\nSin riesgos' },
            { metric: "ROI", bad: 'Casos vagos en YouTube', good: 'Calculado pre-firma\nCon tu data real' },
            { metric: "Stack", bad: 'Cloud dependencies\nCostes recurrentes', good: 'Self-hosted\nControl + ahorro' },
            { metric: "Soporte", bad: 'Comunidad paga (600 members)\nRespuestas genéricas', good: 'Directo Telegram 14 días\nTu caso específico' },
            { metric: "Casos estudio", bad: 'Testimonios sin números', good: 'ROI documentado\nCliente por cliente' },
          ].map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-900/30' : 'bg-transparent'}>
              <td className="p-4 font-bold text-ash border-b border-gray-800 uppercase">{row.metric}</td>
              <td className="p-4 text-gray-400 border-b border-gray-800 text-center whitespace-pre-line">{row.bad}</td>
              <td className="p-4 text-white font-bold border-b border-blood/30 bg-blood/5 text-center whitespace-pre-line border-l border-r border-blood/20">{row.good}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td className="p-4 text-center font-bold text-blood uppercase italic">
                    La verdad duele. <br/> Pero te ahorra dinero.
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Comparison;