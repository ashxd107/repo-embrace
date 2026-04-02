import { motion } from "framer-motion";
import {
  Database, FileText, Key, Clock, Users, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const benefits = [
  { icon: Database, label: "Full breach source details" },
  { icon: FileText, label: "Aadhaar / PAN / document exposure checks" },
  { icon: Key, label: "Hidden password and identity records" },
  { icon: Clock, label: "Timeline of major exposure events" },
  { icon: Users, label: "Family-linked record visibility" },
];

interface UnlockValuePanelProps {
  onUnlock?: () => void;
}

const UnlockValuePanel = ({ onUnlock }: UnlockValuePanelProps) => (
  <motion.div variants={fadeIn} className="card-surface !p-6 border-primary/15">
    <p className="text-caps mb-1">Full Report Access</p>
    <h3 className="text-display text-base mb-4">What you unlock for ₹99</h3>

    <div className="space-y-2.5 mb-5">
      {benefits.map((b) => (
        <div key={b.label} className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <b.icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-body text-xs">{b.label}</span>
        </div>
      ))}
    </div>

    {onUnlock && (
      <Button
        onClick={onUnlock}
        size="sm"
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 font-semibold text-xs w-full sm:w-auto"
      >
        Unlock for ₹99
        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
      </Button>
    )}
  </motion.div>
);

export default UnlockValuePanel;
