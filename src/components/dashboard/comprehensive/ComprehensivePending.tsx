import { motion } from "framer-motion";
import { Shield, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ComprehensivePendingProps {
  onGoToDashboard: () => void;
}

const steps = ["Verifying records", "Mapping sources", "Preparing report"];

const ComprehensivePending = ({ onGoToDashboard }: ComprehensivePendingProps) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="py-16 lg:py-24 max-w-md mx-auto flex flex-col items-center text-center"
    >
      {/* Animated icon */}
      <div className="relative h-28 w-28 mb-10">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute inset-3 rounded-full border border-primary/8"
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.05, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        {/* Soft glow */}
        <motion.div
          className="absolute inset-5 rounded-full bg-primary/[0.04]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 rounded-2xl bg-primary/[0.07] flex items-center justify-center">
            <Shield className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </div>
        </div>
        {/* Scan line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-14 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          animate={{ top: ["25%", "75%", "25%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Status chip */}
      <span className="inline-flex items-center text-[11px] font-medium tracking-wide uppercase text-primary/70 mb-5">
        <span className="relative mr-2 flex h-1.5 w-1.5">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-primary/40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary/60" />
        </span>
        Report in progress
      </span>

      {/* Title */}
      <h2 className="text-display text-xl lg:text-[22px] font-semibold leading-snug mb-2.5">
        Your comprehensive report is being prepared
      </h2>

      {/* Subtitle */}
      <p className="text-muted-foreground text-sm mb-10 max-w-xs leading-relaxed">
        We're processing deeper exposure findings for your account.
      </p>

      {/* Animated steps */}
      <div className="flex items-center gap-6 mb-10">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <motion.div
              className={`h-1.5 w-1.5 rounded-full ${
                i === activeStep ? "bg-primary" : "bg-border"
              }`}
              animate={i === activeStep ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.span
              className="text-[11px]"
              animate={{ opacity: i === activeStep ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              style={{ color: i === activeStep ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
            >
              {step}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Email notification line */}
      <div className="flex items-center gap-2 text-muted-foreground/60 text-xs mb-1.5">
        <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>We'll email you when it's ready.</span>
      </div>

      {/* Support */}
      <p className="text-muted-foreground/40 text-[11px] mb-10">
        For help:{" "}
        <a href="mailto:care@mitigata.com" className="text-primary/50 hover:text-primary transition-colors">
          care@mitigata.com
        </a>
      </p>

      {/* Button */}
      <Button
        onClick={onGoToDashboard}
        variant="outline"
        className="px-5 text-xs font-medium border-border/40 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
        Back to Dashboard
      </Button>
    </motion.div>
  );
};

export default ComprehensivePending;
