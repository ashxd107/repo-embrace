import { motion, AnimatePresence } from "framer-motion";
import { Clock, Mail, ArrowLeft, FileSearch, Shield, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface ComprehensivePendingProps {
  onGoToDashboard: () => void;
}

const statusSteps = [
  "Verifying records",
  "Checking breach sources",
  "Mapping identity-linked exposure",
  "Preparing your report",
];

const ComprehensivePending = ({ onGoToDashboard }: ComprehensivePendingProps) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % statusSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="py-8 lg:py-12 max-w-xl mx-auto"
    >
      <div className="card-surface !p-8 lg:!p-10 text-center">
        {/* Animated scanning icon */}
        <div className="relative h-24 w-24 mx-auto mb-8">
          {/* Outer pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-2 rounded-full border border-primary/15"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Inner glow */}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary/5"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          {/* Scanning line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            animate={{ top: ["20%", "80%", "20%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-medium px-3 py-1 mb-5">
          <Clock className="h-3 w-3 mr-1.5" />
          Report In Progress
        </Badge>

        <h2 className="text-display text-xl lg:text-2xl mb-3">
          Your comprehensive report is being prepared
        </h2>
        <p className="text-body text-sm leading-relaxed mb-8 max-w-md mx-auto">
          We're processing deeper exposure intelligence across leak records, identity data, and document-linked findings.
        </p>

        {/* Animated status steps */}
        <div className="card-surface !p-4 !bg-secondary/30 !border-border/20 mb-6">
          <div className="space-y-2.5">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="relative h-4 w-4 flex items-center justify-center shrink-0">
                  {i === activeStep ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Radio className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                    </motion.div>
                  ) : i < activeStep ? (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                  ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" />
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${step}-${i === activeStep}`}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: i === activeStep ? 1 : 0.4 }}
                    className={`text-xs ${i === activeStep ? "text-display font-medium" : "text-body"}`}
                  >
                    {step}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Info rows */}
        <div className="card-surface !p-4 !bg-secondary/20 !border-border/10 mb-6 space-y-2.5">
          <div className="flex items-center gap-3 justify-center">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
            <p className="text-body text-xs">
              We will notify you by email once your report is ready.
            </p>
          </div>
        </div>

        {/* Support line */}
        <p className="text-body text-[11px] opacity-60 mb-6">
          For queries, contact{" "}
          <a href="mailto:care@mitigata.com" className="text-primary hover:underline">
            care@mitigata.com
          </a>
        </p>

        <Button
          onClick={onGoToDashboard}
          variant="outline"
          className="px-5 text-sm font-semibold"
        >
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Back to Dashboard
        </Button>
      </div>
    </motion.div>
  );
};

export default ComprehensivePending;
