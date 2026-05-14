import { motion } from "motion/react";
import { SentimentType, type SentimentResult } from "../types";
import { cn } from "../lib/utils";
import { Smile, Frown, Meh, AlertCircle } from "lucide-react";

interface SentimentResultProps {
  result: SentimentResult;
}

export function SentimentDisplay({ result }: SentimentResultProps) {
  const isPositive = result.label === SentimentType.POSITIVE;
  const isNegative = result.label === SentimentType.NEGATIVE;
  const isNeutral = result.label === SentimentType.NEUTRAL;

  const Icon = isPositive ? Smile : isNegative ? Frown : Meh;
  const colorClass = isPositive 
    ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
    : isNegative 
      ? "text-rose-500 bg-rose-500/10 border-rose-500/20" 
      : "text-amber-500 bg-amber-500/10 border-amber-500/20";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className={cn("p-6 rounded-2xl border flex items-center gap-6", colorClass)}>
        <div className="p-4 rounded-xl bg-white/10">
          <Icon className="w-12 h-12" />
        </div>
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider opacity-60">Classification</h3>
          <p className="text-3xl font-bold capitalize">{result.label}</p>
        </div>
        <div className="ml-auto text-right">
          <h3 className="text-sm font-medium uppercase tracking-wider opacity-60">Confidence</h3>
          <p className="text-3xl font-bold">{(result.confidence * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-white/90">Analysis Summary</h3>
          </div>
          <p className="text-white/60 leading-relaxed text-sm">
            {result.explanation}
          </p>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center">
          <h3 className="text-sm font-medium uppercase tracking-wider text-white/40 mb-2">Intensity Meter</h3>
          <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((result.score + 1) / 2) * 100}%` }}
              className={cn(
                "h-full rounded-full transition-colors",
                isPositive ? "bg-emerald-500" : isNegative ? "bg-rose-500" : "bg-amber-500"
              )}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] uppercase font-mono text-white/30">
            <span>Negative</span>
            <span>Neutral</span>
            <span>Positive</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
