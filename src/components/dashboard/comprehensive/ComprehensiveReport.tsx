import { motion } from "framer-motion";
import { Lock, FileText, Database, Key, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentsSection from "./DocumentsSection";
import CompLeakSources from "./CompLeakSources";
import PasswordsSection from "./PasswordsSection";
import TimelineSection from "./TimelineSection";

interface ComprehensiveReportProps {
  activeSection?: string;
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

const lockedSections = [
  {
    id: "comp-documents",
    icon: FileText,
    title: "Documents",
    subtitle: "Sensitive document exposure",
    hiddenCount: "3 hidden document findings",
  },
  {
    id: "comp-leak-sources",
    icon: Database,
    title: "Leak Sources",
    subtitle: "Detailed breach source analysis",
    hiddenCount: "4 source records locked",
  },
  {
    id: "comp-passwords",
    icon: Key,
    title: "Passwords",
    subtitle: "Compromised credentials",
    hiddenCount: "6 password exposures hidden",
  },
  {
    id: "comp-timeline",
    icon: Clock,
    title: "Timeline",
    subtitle: "Exposure chronology",
    hiddenCount: "Timeline details locked",
  },
];

const LockedSectionPreview = ({ section, isActive }: { section: typeof lockedSections[0]; isActive: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`card-surface !p-0 overflow-hidden relative ${isActive ? "ring-1 ring-primary/20" : ""}`}
  >
    <div className="absolute inset-0 bg-card/50 backdrop-blur-[4px] z-10 rounded-[20px]" />
    <div className="relative z-20 flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
        <section.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>
      <h4 className="text-display text-sm mb-1">{section.title}</h4>
      <p className="text-body text-xs mb-2">{section.subtitle}</p>
      <div className="flex items-center gap-1.5 text-destructive/70">
        <Lock className="h-3 w-3" strokeWidth={2} />
        <span className="text-[11px] font-medium">{section.hiddenCount}</span>
      </div>
    </div>
  </motion.div>
);

const ComprehensiveReport = ({ activeSection = "comp-documents", isUnlocked = true, onUnlock }: ComprehensiveReportProps) => {
  // Unlocked: show full report sections
  if (isUnlocked) {
    const renderSection = () => {
      switch (activeSection) {
        case "comp-documents":
          return <DocumentsSection />;
        case "comp-leak-sources":
          return <CompLeakSources isUnlocked={true} />;
        case "comp-passwords":
          return <PasswordsSection isUnlocked={true} />;
        case "comp-timeline":
          return <TimelineSection />;
        default:
          return <DocumentsSection />;
      }
    };

    return (
      <div className="py-4 lg:py-6">
        {renderSection()}
      </div>
    );
  }

  // Locked: show premium teaser preview
  const activeId = activeSection === "comprehensive-report" ? "comp-documents" : activeSection;

  return (
    <div className="py-4 lg:py-6 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-caps">Comprehensive Report Preview</p>
        </div>
        <h2 className="text-display text-xl mb-1">Full breach intelligence — locked</h2>
        <p className="text-body text-sm">
          The comprehensive report reveals source-level breach data, identity documents, hidden passwords, and exposure timelines not visible in the basic view.
        </p>
      </div>

      {/* Locked section grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lockedSections.map((section) => (
          <LockedSectionPreview key={section.id} section={section} isActive={section.id === activeId} />
        ))}
      </div>

      {/* Value panel + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="card-surface !p-6 border-primary/15"
      >
        <h3 className="text-display text-base mb-3">What you unlock for ₹99</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          {[
            "Full breach source details",
            "Aadhaar / PAN / document exposure checks",
            "Hidden password and identity records",
            "Timeline of major exposure events",
            "Family-linked record visibility",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-body text-xs">{item}</span>
            </div>
          ))}
        </div>

        {onUnlock && (
          <Button
            onClick={onUnlock}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 font-semibold text-xs"
          >
            Unlock for ₹99
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default ComprehensiveReport;
