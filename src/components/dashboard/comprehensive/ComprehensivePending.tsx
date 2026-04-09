import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ComprehensivePendingProps {
  onGoToDashboard: () => void;
}

const progressSteps = [
  "Verifying records…",
  "Checking breach sources…",
  "Mapping exposure…",
  "Preparing report…",
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
      className="py-16 lg:py-24 max-w-md mx-auto flex flex-col items-center text-center px-4"
    >
      {/* ── Glow Ring Animation ── */}
      <div className="relative h-20 w-20 mb-10">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border border-primary/[0.08]" />
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="h-12 w-12 rounded-2xl bg-primary/[0.06] flex items-center justify-center border border-primary/[0.08]"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* ── Status Chip ── */}
      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] uppercase text-primary/70 mb-4">
        <span className="relative flex h-1.5 w-1.5">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-primary/40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary/50" />
        </span>
        Report in progress
      </span>

      {/* ── Title ── */}
      <h2 className="text-foreground text-lg font-semibold leading-snug mb-1.5">
        Preparing your report
      </h2>

      {/* ── Subtitle ── */}
      <p className="text-muted-foreground text-sm mb-3 max-w-xs leading-relaxed">
        Analyzing exposure across multiple breach sources
      </p>

      {/* ── Inline Progress Step ── */}
      <div className="mb-12">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-muted-foreground/60 font-medium"
          >
            {progressSteps[activeStep]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Fact Card ── */}
      <div className="w-full max-w-sm mb-12">
        <div className="rounded-xl border border-border/50 bg-muted/30 px-5 py-5 min-h-[110px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFact}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">{facts[activeFact].icon}</span>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/50">
                  Fact {factNumber}
                </span>
              </div>
              <p className="text-[13px] text-foreground/80 leading-relaxed text-left">
                {facts[activeFact].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Support Line ── */}
      <p className="text-muted-foreground/50 text-[11px] mb-8 leading-relaxed">
        We'll notify you when it's ready ·{" "}
        <a
          href="mailto:care@mitigata.com"
          className="text-primary/60 hover:text-primary transition-colors"
        >
          care@mitigata.com
        </a>
      </p>

      {/* ── Back Button ── */}
      <Button
        onClick={onGoToDashboard}
        variant="ghost"
        className="text-xs font-medium text-muted-foreground/60 hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-3.5 w-3.5" />
        Back to Dashboard
      </Button>
    </motion.div>
  );
};

export default ComprehensivePending;
