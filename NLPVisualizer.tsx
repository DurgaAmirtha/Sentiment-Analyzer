import { motion } from "motion/react";
import { type NLPStep } from "../types";
import { Terminal } from "lucide-react";

interface NLPVisualizerProps {
  steps: NLPStep[];
}

export function NLPVisualizer({ steps }: NLPVisualizerProps) {
  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400/60">NLP Processing Pipeline</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {steps.map((step, idx) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg group hover:border-emerald-500/30 transition-colors"
          >
            <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Step {idx + 1}: {step.name}</div>
            <div className="font-mono text-xs text-emerald-400/80 break-words line-clamp-3 group-hover:line-clamp-none transition-all">
              {Array.isArray(step.result) 
                ? step.result.map(t => <span key={t} className="inline-block mr-1 opacity-70">"{t}"</span>)
                : step.result
              }
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
