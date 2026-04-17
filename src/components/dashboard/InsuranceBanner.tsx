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
      className="card-surface !p-4 sm:!p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
    >
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto sm:contents">
        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </div>
        <div className="flex-1 sm:text-left min-w-0">
          <h3 className="text-display text-[13px] sm:text-sm mb-0.5 leading-snug">{c.title}</h3>
          <p className="text-body text-[11px] sm:text-xs leading-relaxed">{c.body}</p>
        </div>
      </div>
      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 h-10 sm:h-auto font-semibold text-xs sm:text-sm shrink-0 w-full sm:w-auto"
      >
        {c.cta}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default InsuranceBanner;
