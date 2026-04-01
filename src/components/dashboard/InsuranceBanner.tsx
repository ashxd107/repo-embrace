import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsuranceBannerProps {
  variant?: "default" | "post-report" | "no-cyber";
}

const content = {
  default: {
    title: "Protect yourself further with cyber insurance",
    body: "Get coverage for digital fraud, identity misuse, and financial loss.",
    cta: "Explore Cyber Insurance",
  },
  "post-report": {
    title: "Get cyber insurance to stay fully secured",
    body: "Add protection against digital fraud, identity theft, and financial loss.",
    cta: "Explore Cyber Insurance",
  },
  "no-cyber": {
    title: "Your current plan does not include cyber protection",
    body: "Strengthen your protection against digital fraud, identity misuse, and online financial risk.",
    cta: "Buy Cyber Insurance",
  },
};

const InsuranceBanner = ({ variant = "default" }: InsuranceBannerProps) => {
  const c = content[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="card-surface !p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
    >
      <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
        <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>
      <div className="flex-1 text-center sm:text-left min-w-0">
        <h3 className="text-display text-sm mb-0.5">{c.title}</h3>
        <p className="text-body text-xs leading-relaxed">{c.body}</p>
      </div>
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 py-2 h-auto font-semibold text-sm shrink-0"
      >
        {c.cta}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default InsuranceBanner;
