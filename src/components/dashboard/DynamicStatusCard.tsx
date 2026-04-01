import {
  Lock, Clock, ShieldCheck, FileText, Download, AlertCircle, ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type CardState =
  | "pay"
  | "report-in-progress"
  | "buy-insurance"
  | "policy-in-progress"
  | "download-policy"
  | "payment-failed";

interface DynamicStatusCardProps {
  state: CardState;
  onUnlock?: () => void;
  onCheckStatus?: () => void;
  onViewPurchases?: () => void;
  onExploreInsurance?: () => void;
  onDownloadPolicy?: () => void;
  onRetryPayment?: () => void;
  /** Dev-only: simulate report ready */
  onSimulateReportReady?: () => void;
}

const stateConfig: Record<
  CardState,
  {
    badge: string;
    badgeClass: string;
    icon: React.ElementType;
    title: string;
    body: string;
    support?: string;
    primaryLabel: string;
    primaryAction: keyof DynamicStatusCardProps;
    secondaryLabel?: string;
    secondaryAction?: keyof DynamicStatusCardProps;
  }
> = {
  pay: {
    badge: "Payment Required",
    badgeClass: "bg-primary/20 text-primary border-primary/30",
    icon: Lock,
    title: "Unlock comprehensive report",
    body: "Request deeper identity, document, breach-source, and password intelligence.",
    support: "Your comprehensive report will be prepared within 8 hours after payment.",
    primaryLabel: "Unlock for ₹99",
    primaryAction: "onUnlock",
  },
  "report-in-progress": {
    badge: "In Progress",
    badgeClass: "bg-primary/20 text-primary border-primary/30",
    icon: Clock,
    title: "Comprehensive report in progress",
    body: "We're preparing your deeper exposure report. We'll notify you by email once it is ready.",
    support: "This may take up to 8 hours.\nFor queries, contact contact@mitigata.com",
    primaryLabel: "Check Status",
    primaryAction: "onCheckStatus",
    secondaryLabel: "View Purchases",
    secondaryAction: "onViewPurchases",
  },
  "buy-insurance": {
    badge: "Active",
    badgeClass: "bg-primary/20 text-primary border-primary/30",
    icon: ShieldCheck,
    title: "Get cyber insurance",
    body: "Add protection against digital fraud, identity misuse, and financial loss.",
    support: "Stay protected beyond exposure monitoring.",
    primaryLabel: "Explore Cyber Insurance",
    primaryAction: "onExploreInsurance",
  },
  "policy-in-progress": {
    badge: "In Progress",
    badgeClass: "bg-primary/20 text-primary border-primary/30",
    icon: FileText,
    title: "Policy preparation in progress",
    body: "Your cyber insurance policy is being prepared and will be shared once ready.",
    support: "For queries, contact contact@mitigata.com",
    primaryLabel: "View Purchases",
    primaryAction: "onViewPurchases",
  },
  "download-policy": {
    badge: "Ready",
    badgeClass: "bg-primary/20 text-primary border-primary/30",
    icon: Download,
    title: "Your policy is ready",
    body: "Your cyber insurance policy has been issued and is ready to download.",
    support: "Policy shared successfully.",
    primaryLabel: "Download Policy",
    primaryAction: "onDownloadPolicy",
    secondaryLabel: "View Purchases",
    secondaryAction: "onViewPurchases",
  },
  "payment-failed": {
    badge: "Failed",
    badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
    icon: AlertCircle,
    title: "Payment failed",
    body: "Your payment could not be completed. Please try again.",
    support: "For queries, contact contact@mitigata.com",
    primaryLabel: "Try Again",
    primaryAction: "onRetryPayment",
    secondaryLabel: "View Purchases",
    secondaryAction: "onViewPurchases",
  },
};

const DynamicStatusCard = (props: DynamicStatusCardProps) => {
  const { state, onSimulateReportReady } = props;
  const config = stateConfig[state];
  const Icon = config.icon;

  const primaryHandler = props[config.primaryAction] as (() => void) | undefined;
  const secondaryHandler = config.secondaryAction
    ? (props[config.secondaryAction] as (() => void) | undefined)
    : undefined;

  return (
    <div className="bg-foreground text-card p-6 rounded-[20px] flex flex-col justify-center w-full h-full">
      {/* Status badge */}
      <Badge
        variant="outline"
        className={`text-[9px] font-semibold px-2 py-0.5 w-fit mb-3 ${config.badgeClass}`}
      >
        {config.badge}
      </Badge>

      <Icon className="h-6 w-6 mb-3 text-primary" strokeWidth={1.5} />
      <h3 className="text-sm font-semibold mb-1">{config.title}</h3>
      <p className="text-xs opacity-60 mb-3 leading-relaxed">{config.body}</p>

      {config.support && (
        <p className="text-[10px] opacity-40 mb-4 whitespace-pre-line">{config.support}</p>
      )}

      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={primaryHandler}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 w-fit font-semibold text-xs"
        >
          {config.primaryLabel}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>

        {secondaryHandler && config.secondaryLabel && (
          <Button
            onClick={secondaryHandler}
            size="sm"
            variant="outline"
            className="rounded-lg px-4 w-fit font-semibold text-xs border-primary/20 text-primary hover:bg-primary/10"
          >
            {config.secondaryLabel}
          </Button>
        )}

        {/* Dev simulate button */}
        {state === "report-in-progress" && onSimulateReportReady && (
          <Button
            onClick={onSimulateReportReady}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 w-fit font-semibold text-[10px]"
          >
            Simulate Ready
          </Button>
        )}
      </div>
    </div>
  );
};

export default DynamicStatusCard;

/**
 * Resolves the correct card state based on priority logic:
 * 1. Payment failed
 * 2. Policy ready → Download Policy
 * 3. Policy purchased but not ready → Policy in progress
 * 4. Report purchased but not ready → Report in progress
 * 5. Report ready but no insurance → Buy insurance
 * 6. No purchase → Pay ₹99
 */
export function resolveCardState({
  paymentFailed,
  policyReady,
  insurancePurchased,
  comprehensiveReportReady,
  comprehensivePurchased,
}: {
  paymentFailed: boolean;
  policyReady: boolean;
  insurancePurchased: boolean;
  comprehensiveReportReady: boolean;
  comprehensivePurchased: boolean;
}): CardState {
  if (paymentFailed) return "payment-failed";
  if (policyReady) return "download-policy";
  if (insurancePurchased && !policyReady) return "policy-in-progress";
  if (comprehensivePurchased && !comprehensiveReportReady) return "report-in-progress";
  if (comprehensiveReportReady && !insurancePurchased) return "buy-insurance";
  return "pay";
}
