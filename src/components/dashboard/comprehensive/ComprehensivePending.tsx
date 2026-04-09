import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, Bell, Lightbulb, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ComprehensivePendingProps {
  onGoToDashboard: () => void;
}

const steps = [
  "Verifying records",
  "Checking breach sources",
  "Mapping identity exposure",
  "Preparing your report",
];

const facts = [
  "Most leaked data is misused within hours of exposure.",
  "1 in 3 users has been exposed in a data breach.",
  "Emails are often linked to passwords and phone numbers.",
  "Identity theft cases are rapidly increasing worldwide.",
  "Leaked credentials are traded instantly on dark web forums.",
  "A single breach can expose multiple linked accounts.",
];

const ComprehensivePending = ({ onGoToDashboard }: ComprehensivePendingProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFact, setActiveFact] = useState(0);

  // Cycle steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Cycle facts
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="py-12 lg:py-20 max-w-lg mx-auto flex flex-col items-center text-center"
    >
      {/* ── Premium Scanning Animation ── */}
      <div className="relative h-40 w-40 mb-12">
        {/* Radar sweep */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.12) 15%, transparent 30%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Concentric rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/[0.06]"
            style={{
              inset: `${16 + i * 16}px`,
            }}
          />
        ))}
        {/* Pulsing glow ring */}
        <motion.div
          className="absolute inset-6 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner soft glow */}
        <motion.div
          className="absolute inset-12 rounded-full bg-primary/[0.04]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-16 w-16 rounded-2xl bg-primary/[0.08] flex items-center justify-center backdrop-blur-sm border border-primary/[0.06]"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </motion.div>
        </div>
        {/* Scan line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ top: ["15%", "85%", "15%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbiting dot */}
        <motion.div
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/30"
          style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
          animate={{
            x: [0, 56, 0, -56, 0],
            y: [-56, 0, 56, 0, -56],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ── Status Badge ── */}
      <span className="inline-flex items-center text-[11px] font-medium tracking-widest uppercase text-primary/80 mb-4">
        <span className="relative mr-2 flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-primary/30"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/60" />
        </span>
        Report in Progress
      </span>

      {/* ── Title ── */}
      <h2 className="text-foreground text-xl lg:text-[22px] font-semibold leading-snug mb-2">
        Preparing your report
      </h2>

      {/* ── Subtext ── */}
      <p className="text-muted-foreground text-sm mb-10 max-w-xs leading-relaxed">
        Analyzing exposure across multiple data sources.
      </p>

      {/* ── Step Progress ── */}
      <div className="w-full max-w-xs mb-10">
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isCompleted = i < activeStep;
            return (
              <div key={step} className="flex items-center gap-3 py-2.5">
                {/* Step indicator */}
                <div className="relative flex items-center justify-center h-6 w-6 shrink-0">
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/15"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <motion.div
                    className="flex items-center justify-center rounded-full"
                    animate={{
                      width: isActive ? 24 : 20,
                      height: isActive ? 24 : 20,
                      backgroundColor: isActive
                        ? "hsl(var(--primary) / 0.12)"
                        : isCompleted
                        ? "hsl(var(--primary) / 0.08)"
                        : "hsl(var(--muted))",
                      borderWidth: 1,
                      borderColor: isActive
                        ? "hsl(var(--primary) / 0.2)"
                        : "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <Check className="h-3 w-3 text-primary/60" strokeWidth={2.5} />
                    ) : (
                      <motion.div
                        className="rounded-full"
                        animate={{
                          width: isActive ? 6 : 4,
                          height: isActive ? 6 : 4,
                          backgroundColor: isActive
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted-foreground) / 0.3)",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </div>
                {/* Step label */}
                <motion.span
                  className="text-[13px] font-medium"
                  animate={{
                    opacity: isActive ? 1 : isCompleted ? 0.6 : 0.35,
                    color: isActive
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dynamic Fact Card ── */}
      <div className="w-full max-w-sm mb-10">
        <div className="rounded-xl border border-primary/[0.08] bg-primary/[0.03] px-5 py-4 min-h-[72px] flex items-start gap-3">
          <div className="mt-0.5 shrink-0">
            <Lightbulb className="h-4 w-4 text-primary/60" strokeWidth={1.5} />
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeFact}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-[13px] text-muted-foreground leading-relaxed text-left"
            >
              {facts[activeFact]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Notification line ── */}
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
        <Bell className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span>You'll be notified once your report is ready.</span>
      </div>

      {/* ── Support ── */}
      <p className="text-muted-foreground text-[11px] mb-10">
        Need help?{" "}
        <a
          href="mailto:care@mitigata.com"
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        >
          care@mitigata.com
        </a>
      </p>

      {/* ── Back Button ── */}
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
