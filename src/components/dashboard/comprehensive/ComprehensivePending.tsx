import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, Globe, Database, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ComprehensivePendingProps {
  onGoToDashboard: () => void;
}

const progressSteps = [
  { label: "Verifying records…", icon: FileSearch },
  { label: "Checking breach sources…", icon: Database },
  { label: "Mapping exposure…", icon: Scan },
  { label: "Preparing report…", icon: ShieldCheck },
];

const facts = [
  {
    icon: "🔐",
    text: "In many Indian data leaks, a phone number is enough to link a person's email, address, and other identity records.",
  },
  {
    icon: "🧾",
    text: "Aadhaar and PAN details are often traded along with phone numbers and addresses, not as separate records.",
  },
  {
    icon: "📧",
    text: "A leaked Gmail address can often be traced across shopping apps, job portals, food delivery apps, and other services used daily.",
  },
  {
    icon: "💳",
    text: "Many fraud attempts in India start with basic leaked data like email, phone number, and date of birth — not just bank details.",
  },
  {
    icon: "📱",
    text: "SIM-swap, fake KYC, and UPI-linked scams often become easier when leaked identity details are already available online.",
  },
  {
    icon: "🕵️",
    text: "A single exposed record can reveal more than expected when combined with data from telecom, ecommerce, and public sources.",
  },
  {
    icon: "🏠",
    text: "Address exposure becomes more serious when it appears with government ID or phone-number data in the same leak source.",
  },
  {
    icon: "⚠️",
    text: "Most users notice fraud only after misuse begins, but leaked data may have been circulating for weeks or months already.",
  },
];

const ComprehensivePending = ({ onGoToDashboard }: ComprehensivePendingProps) => {
  const [activeFact, setActiveFact] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % progressSteps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const factNumber = String(activeFact + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="py-12 lg:py-20 max-w-lg mx-auto flex flex-col items-center text-center px-4"
    >
      {/* ── Animated Shield ── */}
      <div className="relative h-24 w-24 mb-8">
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Inner circle */}
        <div className="absolute inset-3 rounded-full border border-primary/15" />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* ── Status Chip ── */}
      <span className="inline-flex items-center gap-2 text-caps text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-5">
        <span className="relative flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-primary/60"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        Report in progress
      </span>

      {/* ── Title ── */}
      <h2 className="text-display text-xl leading-snug mb-2">
        Preparing your comprehensive report
      </h2>

      {/* ── Subtitle ── */}
      <p className="text-body text-sm mb-6 max-w-sm">
        We're scanning multiple breach databases and cross-referencing your identity records. This usually takes a few hours.
      </p>

      {/* ── Progress Steps ── */}
      <div className="w-full max-w-sm mb-8">
        <div className="grid grid-cols-4 gap-2">
          {progressSteps.map((step, i) => {
            const isActive = i === activeStep;
            const isDone = i < activeStep;
            const StepIcon = step.icon;
            return (
              <div key={step.label} className="flex flex-col items-center gap-2">
                <motion.div
                  className="flex items-center justify-center"
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <StepIcon className={`h-5 w-5 transition-colors duration-300 ${
                    isActive ? "text-primary" :
                    isDone ? "text-primary/60" :
                    "text-muted-foreground/40"
                  }`} strokeWidth={1.5} />
                </motion.div>
                <div className={`h-1 w-full rounded-full overflow-hidden ${isDone || isActive ? "bg-primary/20" : "bg-secondary"}`}>
                  {(isDone || isActive) && (
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: isDone ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isDone ? 0 : 3.5, ease: "linear" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeStep}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-body text-xs font-medium mt-3"
          >
            {progressSteps[activeStep].label}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Fact Card ── */}
      <div className="w-full max-w-sm mb-10">
        <div className="rounded-2xl border border-border bg-card px-6 py-5 min-h-[120px] flex flex-col shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFact}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{facts[activeFact].icon}</span>
                <span className="text-caps">
                  Fact {factNumber}
                </span>
              </div>
              <p className="text-body text-[13px] text-left">
                {facts[activeFact].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Fact indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {facts.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeFact ? "w-4 bg-primary" : "w-1 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Support Line ── */}
      <p className="text-body text-xs mb-6">
        We'll notify you when it's ready ·{" "}
        <a
          href="mailto:care@mitigata.com"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          care@mitigata.com
        </a>
      </p>

      {/* ── Back Button ── */}
      <Button
        onClick={onGoToDashboard}
        variant="outline"
        size="sm"
        className="text-xs font-medium"
      >
        <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
        Back to Dashboard
      </Button>
    </motion.div>
  );
};

export default ComprehensivePending;
