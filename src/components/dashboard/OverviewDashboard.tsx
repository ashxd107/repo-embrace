import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle, Key, Database, ShieldX,
  ShieldCheck, CheckCircle2, Lock, ShieldAlert,
  ArrowRight, Mail, Phone, FileText, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RiskScoreMeter from "./RiskScoreMeter";
import { getRiskContent, emptyStates } from "@/lib/riskContent";
import DynamicStatusCard, { resolveCardState, type CardState } from "./DynamicStatusCard";
import type { FlowType } from "@/types/flow";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

interface OverviewDashboardProps {
  onNavigate: (id: string) => void;
  riskScore?: number;
  isUnlocked?: boolean;
  onUnlock?: () => void;
  flowType?: FlowType;
  comprehensiveReportReady?: boolean;
  comprehensivePurchased?: boolean;
  onSimulateReportReady?: () => void;
  insurancePurchased?: boolean;
  policyReady?: boolean;
  onExploreInsurance?: () => void;
  onDownloadPolicy?: () => void;
  onViewPurchases?: () => void;
}

const EXPOSURE_COUNT = 24;
const PASSWORD_COUNT = 8;
const LEAK_SOURCE_COUNT = 5;

const alertHeadlines = [
  "Your Aadhaar may be exposed",
  "Your email is linked to leaked credentials",
  "Your personal data could be at risk",
];

const featureCards = [
  { id: "exposure", title: "Exposure Details", icon: AlertTriangle, cta: "View Details" },
  { id: "leak-sources", title: "Leak Sources", icon: Database, cta: "View Details" },
  { id: "recommendations", title: "Recommendations", icon: ShieldCheck, cta: "View Details" },
  { id: "call-assistance", title: "Call Assistance", icon: Phone, cta: "View Details" },
];

const OverviewDashboard = ({
  onNavigate,
  riskScore: RISK_SCORE = 82,
  isUnlocked = false,
  onUnlock,
  flowType = "free",
  comprehensiveReportReady = false,
  comprehensivePurchased = false,
  onSimulateReportReady,
  insurancePurchased = false,
  policyReady = false,
  onExploreInsurance,
  onDownloadPolicy,
  onViewPurchases,
}: OverviewDashboardProps) => {
  const riskContent = getRiskContent(RISK_SCORE);
  const hasExposures = EXPOSURE_COUNT > 0;
  const isLocked = !comprehensivePurchased;

  const summaryLine = hasExposures
    ? `${EXPOSURE_COUNT} exposures found across ${LEAK_SOURCE_COUNT} leak sources`
    : "No active exposures detected";

  const cardState: CardState = resolveCardState({
    policyReady,
    insurancePurchased,
    comprehensiveReportReady,
    comprehensivePurchased,
  });

  // Pick a contextual alert headline based on risk
  const alertHeadline = riskContent.band === "critical"
    ? alertHeadlines[0]
    : riskContent.band === "medium"
      ? alertHeadlines[1]
      : alertHeadlines[2];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="py-4 lg:py-6 space-y-5">
      {/* FREE PREVIEW BADGE */}
      {flowType === "free" && !comprehensivePurchased && (
        <motion.div variants={fadeIn} className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-medium px-3 py-1">
            <Lock className="h-3 w-3 mr-1.5" />
            Free Preview
          </Badge>
          <span className="text-body text-xs">Limited report view</span>
        </motion.div>
      )}

      {/* ROW 1: Score + Dynamic Status Card */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 card-surface !p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex flex-col items-center shrink-0">
            <RiskScoreMeter score={RISK_SCORE} />
          </div>
          <div className="flex flex-col justify-center text-center sm:text-left">
            <p className="text-caps mb-1.5">Personal Exposure Report</p>
            <h2 className="text-display text-lg lg:text-xl leading-tight">Rahul Sharma</h2>
            <p className="text-body text-sm mt-1">rahul****@gmail.com</p>
            <p className="text-body text-sm mt-0.5">+91 98XXXXXX10</p>
            <p className="text-body text-xs mt-3 leading-relaxed">{summaryLine}</p>
          </div>
        </div>

        <div className="lg:col-span-4 flex">
          <DynamicStatusCard
            state={cardState}
            onUnlock={onUnlock}
            onCheckStatus={() => onNavigate("comprehensive-report")}
            onViewPurchases={onViewPurchases}
            onExploreInsurance={onExploreInsurance}
            onDownloadPolicy={onDownloadPolicy}
            onSimulateReportReady={onSimulateReportReady}
          />
        </div>
      </motion.div>

      {/* Risk summary banner */}
      <motion.div variants={fadeIn} className="card-surface !px-5 !py-3 flex items-center gap-3">
        <div className={`h-2 w-2 rounded-full shrink-0 ${
          riskContent.band === "critical" ? "bg-destructive" :
          riskContent.band === "medium" ? "bg-risk-mid" : "bg-primary"
        }`} />
        <div className="min-w-0">
          <h2 className="text-display text-sm">
            {isLocked ? riskContent.lockedHeadline : riskContent.headline}
          </h2>
          <p className="text-body text-xs mt-0.5 opacity-70">
            {isLocked ? riskContent.lockedBody : riskContent.body}
          </p>
        </div>
      </motion.div>

      {/* CTA block - See exactly what's exposed */}
      {isLocked && onUnlock && (
        <motion.div variants={fadeIn} className="card-surface !p-5">
          <h4 className="text-display text-sm mb-3">See exactly what's exposed</h4>
          <ul className="space-y-2 mb-5">
            {[
              { icon: Mail, text: "Emails & passwords found" },
              { icon: Phone, text: "Linked phone numbers" },
              { icon: Database, text: "Breach sources" },
              { icon: ShieldX, text: "Risk severity breakdown" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-2.5 text-body text-xs">
                <item.icon className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={1.5} />
                {item.text}
              </li>
            ))}
          </ul>
          <Button
            onClick={onUnlock}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-6"
          >
            Unlock Full Report – ₹99
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Metric Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: "Total Exposures", value: String(EXPOSURE_COUNT), icon: AlertTriangle, risk: EXPOSURE_COUNT > 10 ? "high" as const : "low" as const },
          { label: "Passwords Exposed", value: isUnlocked ? String(PASSWORD_COUNT) : "—", icon: Key, risk: PASSWORD_COUNT > 5 ? "high" as const : "low" as const },
          { label: "Leak Sources", value: isUnlocked ? String(LEAK_SOURCE_COUNT) : "—", icon: Database, risk: "mid" as const },
          { label: "Risk Level", value: riskContent.band === "none" ? "Safe" : riskContent.band.charAt(0).toUpperCase() + riskContent.band.slice(1), icon: ShieldX, risk: riskContent.band === "critical" ? "high" as const : "low" as const },
        ].map((m) => (
          <div key={m.label} className="card-surface !p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <m.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <div className={`h-2 w-2 rounded-full ${
                m.risk === "high" ? "bg-risk-high" : m.risk === "mid" ? "bg-risk-mid" : "bg-risk-low"
              }`} />
            </div>
            <span className="text-display text-xl lg:text-2xl">{m.value}</span>
            <span className="text-body text-[11px] mt-0.5">{m.label}</span>
          </div>
        ))}
      </motion.div>

      {/* FEATURE CARDS (Clean, white) */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {featureCards.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="card-surface !p-5 flex flex-col items-start text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md group"
          >
            <card.icon className="h-5 w-5 text-primary mb-4" strokeWidth={1.5} />
            <h4 className="text-display text-sm mb-3">{card.title}</h4>
            <span className="text-[11px] font-medium text-primary flex items-center gap-1 mt-auto opacity-70 group-hover:opacity-100 transition-opacity">
              {card.cta} <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OverviewDashboard;
