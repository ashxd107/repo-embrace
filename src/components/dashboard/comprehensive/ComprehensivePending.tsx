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
      <div className="relative h-32 w-32 mb-10">
        {/* Outermost ripple */}
        <motion.div
          className="absolute -inset-4 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.5], opacity: [0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Second ripple - staggered */}
        <motion.div
          className="absolute -inset-2 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.4], opacity: [0.2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
        {/* Third ripple - staggered */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.3], opacity: [0.25, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 2 }}
        />
        {/* Static outer ring */}
        <div className="absolute inset-2 rounded-full border border-primary/[0.08]" />
        {/* Inner soft glow */}
        <motion.div
          className="absolute inset-6 rounded-full bg-primary/[0.05]"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Center icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-16 w-16 rounded-2xl bg-primary/[0.08] flex items-center justify-center backdrop-blur-sm"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </motion.div>
        </div>
        {/* Orbiting dot */}
        <motion.div
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
          style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
          animate={{
            x: [0, 48, 0, -48, 0],
            y: [-48, 0, 48, 0, -48],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Scan line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          animate={{ top: ["20%", "80%", "20%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Status chip */}
      <span className="inline-flex items-center text-[11px] font-medium tracking-widest uppercase text-primary/80 mb-5">
        <span className="relative mr-2 flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-primary/30"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/60" />
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
      <div className="flex items-center gap-8 mb-10">
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2.5">
              <div className="relative flex items-center justify-center h-3 w-3">
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: isActive ? 8 : 5,
                    height: isActive ? 8 : 5,
                    backgroundColor: isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--border))",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
              <motion.span
                className="text-[11px] font-medium"
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  y: isActive ? 0 : 2,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  color: isActive
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                {step}
              </motion.span>
            </div>
          );
        })}
      </div>

      {/* Email notification line */}
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1.5">
        <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>We'll email you when it's ready.</span>
      </div>

      {/* Support */}
      <p className="text-muted-foreground text-[11px] mb-10">
        For help:{" "}
        <a
          href="mailto:care@mitigata.com"
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        >
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
