import {
  Lock, Clock, ShieldCheck, FileText, Download, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type CardState =
  | "pay"
  | "report-in-progress"
  | "buy-insurance"
  | "policy-in-progress"
  | "download-policy";

interface DynamicStatusCardProps {
  state: CardState;
  onUnlock?: () => void;
  onCheckStatus?: () => void;
  onViewPurchases?: () => void;
  onExploreInsurance?: () => void;
  onDownloadPolicy?: () => void;
  onSimulateReportReady?: () => void;
}

const stateConfig: Record<
  CardState,
  {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryAction: keyof DynamicStatusCardProps;
    secondaryLabel?: string;
    secondaryAction?: keyof DynamicStatusCardProps;
  }
> = {
  pay: {
    icon: Lock,
    title: "Unlock full report",
    subtitle: "See exposed passwords, documents & breach sources.",
    primaryLabel: "Unlock for ₹99",
    primaryAction: "onUnlock",
  },
  "report-in-progress": {
    icon: Clock,
    title: "Report in progress",
    subtitle: "We'll notify you once your report is ready.",
    primaryLabel: "Check Status",
    primaryAction: "onCheckStatus",
  },
  "buy-insurance": {
    icon: ShieldCheck,
    title: "Get cyber insurance",
    subtitle: "Protect against fraud, identity theft & financial loss.",
    primaryLabel: "Explore Insurance",
    primaryAction: "onExploreInsurance",
  },
  "policy-in-progress": {
    icon: FileText,
    title: "Policy in progress",
    subtitle: "Your policy is being prepared and will be shared soon.",
    primaryLabel: "View Purchases",
    primaryAction: "onViewPurchases",
  },
  "download-policy": {
    icon: Download,
    title: "Policy ready",
    subtitle: "Your cyber insurance policy is ready to download.",
    primaryLabel: "Download Policy",
    primaryAction: "onDownloadPolicy",
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
    <div className="bg-foreground text-card p-5 sm:p-6 rounded-[20px] flex flex-col justify-between w-full h-full min-h-[160px] sm:min-h-[180px]">
      <div>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-2.5 sm:mb-3 text-primary" strokeWidth={1.5} />
        <h3 className="text-[13px] sm:text-sm font-semibold mb-1 sm:mb-1.5">{config.title}</h3>
        <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'hsla(0,0%,100%,0.5)' }}>
          {config.subtitle}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap mt-5">
        <Button
          onClick={primaryHandler}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 w-fit font-semibold text-xs"
        >
          {config.primaryLabel}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>

        {secondaryHandler && config.secondaryLabel && (
          <Button
            onClick={secondaryHandler}
            size="sm"
            variant="outline"
            className="px-4 w-fit font-semibold text-xs border-primary/20 text-primary hover:bg-primary/10"
          >
            {config.secondaryLabel}
          </Button>
        )}

        {state === "report-in-progress" && onSimulateReportReady && (
          <Button
            onClick={onSimulateReportReady}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 w-fit font-semibold text-[10px]"
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
  policyReady,
  insurancePurchased,
  comprehensiveReportReady,
  comprehensivePurchased,
}: {
  policyReady: boolean;
  insurancePurchased: boolean;
  comprehensiveReportReady: boolean;
  comprehensivePurchased: boolean;
}): CardState {
  if (policyReady) return "download-policy";
  if (insurancePurchased && !policyReady) return "policy-in-progress";
  if (comprehensivePurchased && !comprehensiveReportReady) return "report-in-progress";
  if (comprehensiveReportReady && !insurancePurchased) return "buy-insurance";
  return "pay";
}
