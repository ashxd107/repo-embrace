import { motion } from "framer-motion";
import {
  FileText, Key, MapPin, Users, Clock, Lock, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const findings = [
  {
    icon: FileText,
    title: "Aadhaar or PAN linked to breach sources",
    description: "Identity documents may appear in hidden leak records.",
  },
  {
    icon: Key,
    title: "Passwords exposed in hidden records",
    description: "Compromised credentials from stealer logs and dark-web dumps.",
  },
  {
    icon: MapPin,
    title: "Address and identity details in source-level leaks",
    description: "Physical address and personal identifiers found across breach databases.",
  },
  {
    icon: Users,
    title: "Family-linked records connected to your profile",
    description: "Exposure of family members' identity data tied to your scan.",
  },
  {
    icon: Clock,
    title: "Exact source names and leak timelines",
    description: "When and where each exposure event occurred.",
  },
];

interface WhatYouMayBeMissingProps {
  onUnlock?: () => void;
  onViewComprehensive?: () => void;
}

const WhatYouMayBeMissing = ({ onUnlock, onViewComprehensive }: WhatYouMayBeMissingProps) => (
  <motion.div variants={fadeIn} className="card-surface !p-6">
    <div className="flex items-center gap-2 mb-1">
      <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
      <p className="text-caps">Comprehensive Intelligence</p>
    </div>
    <h3 className="text-display text-base mb-1">What the comprehensive report may reveal</h3>
    <p className="text-body text-xs mb-5">
      The full report goes deeper — uncovering source-level breach data, identity documents, and hidden records not visible in the basic preview.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
      {findings.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="bg-secondary/40 rounded-2xl px-4 py-3.5 border border-border/20"
        >
          <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center mb-2.5">
            <item.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </div>
          <p className="text-display text-xs leading-snug mb-1">{item.title}</p>
          <p className="text-body text-[11px] leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-wrap gap-2.5">
      {onUnlock && (
        <Button
          onClick={onUnlock}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 font-semibold text-xs"
        >
          Unlock for ₹99
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      )}
      {onViewComprehensive && (
        <Button
          onClick={onViewComprehensive}
          size="sm"
          variant="outline"
          className="px-4 font-semibold text-xs border-border text-foreground hover:bg-secondary/60"
        >
          View Comprehensive Report
        </Button>
      )}
    </div>
  </motion.div>
);

export default WhatYouMayBeMissing;
