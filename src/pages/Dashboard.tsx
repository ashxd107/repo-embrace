import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import ExposureSection from "@/components/dashboard/ExposureSection";
import Recommendations from "@/components/dashboard/Recommendations";
import CallAssistance from "@/components/dashboard/CallAssistance";
import LeakSources from "@/components/dashboard/LeakSources";
import StickyCTA from "@/components/dashboard/StickyCTA";
import LockedOverlay from "@/components/dashboard/LockedOverlay";
import UnlockPaymentModal from "@/components/dashboard/UnlockPaymentModal";
import InsuranceBanner from "@/components/dashboard/InsuranceBanner";
import ComprehensiveReport from "@/components/dashboard/comprehensive/ComprehensiveReport";
import ComprehensivePending from "@/components/dashboard/comprehensive/ComprehensivePending";
import type { FlowType } from "@/types/flow";

const Dashboard = () => {
  const { flow } = useParams<{ flow: string }>();
  const flowType: FlowType = flow === "policy-basic"
    ? "policy-basic"
    : flow === "policy-comprehensive"
      ? "policy-comprehensive"
      : "free";

  // Flow 3 starts on comprehensive-report (pending state)
  const [activeItem, setActiveItem] = useState(
    flowType === "policy-comprehensive" ? "comprehensive-report" : "overview"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [riskScore, setRiskScore] = useState(82);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [comprehensiveReportReady, setComprehensiveReportReady] = useState(false);
  const [insurancePurchased, setInsurancePurchased] = useState(false);
  const [policyReady, setPolicyReady] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  // Whether the user has paid / is entitled to comprehensive
  const [comprehensivePurchased, setComprehensivePurchased] = useState(
    flowType === "policy-comprehensive"
  );

  // Free user: preview is partially locked until payment. After payment, the basic report unlocks
  // immediately while the comprehensive report remains in the pending/ready lifecycle.
  // policy-basic: basic report fully unlocked. No comprehensive.
  // policy-comprehensive: basic report fully unlocked. Comprehensive is requested (pending until ready).
  const isBasicUnlocked = flowType !== "free" || comprehensivePurchased || comprehensiveReportReady;

  const isCompReportActive =
    (activeItem === "comprehensive-report" || activeItem.startsWith("comp-")) &&
    (flowType !== "policy-comprehensive" || comprehensiveReportReady);
  const shouldShowUnlockPrompts = flowType === "free" && !comprehensivePurchased;
  const shouldShowPendingLocks = flowType === "free" && comprehensivePurchased && !comprehensiveReportReady && !isBasicUnlocked;

  const handleUnlock = () => {
    if (flowType === "free") {
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    setComprehensivePurchased(true);
    // Navigate to comprehensive pending state
    setActiveItem("comprehensive-report");
  };

  const handleReportReady = () => {
    setComprehensiveReportReady(true);

    if (flowType === "policy-comprehensive" && (activeItem === "comprehensive-report" || activeItem.startsWith("comp-"))) {
      setActiveItem("overview");
    }
  };

  const renderContent = () => {
    // Comprehensive Report section
    if (activeItem === "comprehensive-report" || activeItem.startsWith("comp-")) {
      // Free user who hasn't paid yet — show locked overlay
      if (flowType === "free" && !comprehensivePurchased) {
        return (
          <div className="py-4 lg:py-8 relative">
            <LockedOverlay onUnlock={handleUnlock} />
            <ComprehensiveReport activeSection={activeItem === "comprehensive-report" ? "comp-documents" : activeItem} isUnlocked={false} />
          </div>
        );
      }

      // Comprehensive purchased/entitled but not ready yet
      if (!comprehensiveReportReady) {
        return (
          <ComprehensivePending
            onGoToDashboard={() => setActiveItem("overview")}
          />
        );
      }

      // Report ready — show with insurance banner
      return (
        <div className="space-y-5">
          <ComprehensiveReport activeSection={activeItem === "comprehensive-report" ? "comp-documents" : activeItem} isUnlocked={true} />
          <InsuranceBanner variant={flowType === "policy-comprehensive" ? "post-report" : "default"} />
        </div>
      );
    }

    switch (activeItem) {
      case "overview":
        return (
          <OverviewDashboard
            onNavigate={setActiveItem}
            riskScore={riskScore}
            isUnlocked={isBasicUnlocked}
            onUnlock={shouldShowUnlockPrompts ? handleUnlock : undefined}
            flowType={flowType}
            comprehensiveReportReady={comprehensiveReportReady}
            comprehensivePurchased={comprehensivePurchased}
            onSimulateReportReady={handleReportReady}
            insurancePurchased={insurancePurchased}
            policyReady={policyReady}
            paymentFailed={paymentFailed}
            onRetryPayment={() => { setPaymentFailed(false); setPaymentModalOpen(true); }}
            onExploreInsurance={() => setActiveItem("call-assistance")}
            onDownloadPolicy={() => window.open("#", "_blank")}
            onViewPurchases={() => setActiveItem("call-assistance")}
          />
        );
      case "exposure":
        return (
          <div className="py-4 lg:py-8">
            <ExposureSection isUnlocked={isBasicUnlocked} onUnlock={shouldShowUnlockPrompts ? handleUnlock : undefined} />
          </div>
        );
      case "leak-sources":
        return (
          <div className="py-4 lg:py-8">
            <LeakSources isUnlocked={isBasicUnlocked} onUnlock={shouldShowUnlockPrompts ? handleUnlock : undefined} />
          </div>
        );
      case "recommendations":
        return (
          <div className="py-4 lg:py-8 relative">
            {shouldShowUnlockPrompts ? (
              <LockedOverlay onUnlock={handleUnlock} />
            ) : shouldShowPendingLocks ? (
              <LockedOverlay variant="pending" />
            ) : null}
            <Recommendations />
          </div>
        );
      case "call-assistance":
        return (
          <div className="py-4 lg:py-8">
            <CallAssistance />
          </div>
        );
      default:
        return null;
    }
  };

  const mainMarginClass = isCompReportActive
    ? "lg:ml-[288px]"
    : "lg:ml-[260px]";

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      <DashboardSidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        riskScore={riskScore}
        onRiskScoreChange={setRiskScore}
        flowType={flowType}
        isUnlocked={isBasicUnlocked}
        comprehensivePurchased={comprehensivePurchased}
        comprehensiveReportReady={comprehensiveReportReady}
      />

      <main className={`pt-16 lg:pt-0 ${mainMarginClass} px-4 sm:px-6 lg:px-8 xl:px-12 py-4 pb-24 max-w-[1200px] transition-all duration-300`}>
        {renderContent()}
      </main>

      {/* Debug Simulation Panel */}
      <div className={`fixed bottom-0 right-0 z-50 bg-foreground text-card p-3 rounded-tl-xl shadow-2xl text-[11px] space-y-2 max-w-[280px] ${mainMarginClass}`}>
        <p className="font-semibold text-xs opacity-80 mb-1">🛠 Simulate Card States</p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => { setComprehensivePurchased(false); setComprehensiveReportReady(false); setInsurancePurchased(false); setPolicyReady(false); setPaymentFailed(false); setActiveItem("overview"); }}
            className="px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            Pay ₹99
          </button>
          <button
            onClick={() => { setComprehensivePurchased(true); setComprehensiveReportReady(false); setInsurancePurchased(false); setPolicyReady(false); setPaymentFailed(false); setActiveItem("overview"); }}
            className="px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            Report In Progress
          </button>
          <button
            onClick={() => { setComprehensivePurchased(true); setComprehensiveReportReady(true); setInsurancePurchased(false); setPolicyReady(false); setPaymentFailed(false); setActiveItem("overview"); }}
            className="px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            Buy Insurance
          </button>
          <button
            onClick={() => { setComprehensivePurchased(true); setComprehensiveReportReady(true); setInsurancePurchased(true); setPolicyReady(false); setPaymentFailed(false); setActiveItem("overview"); }}
            className="px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            Policy In Progress
          </button>
          <button
            onClick={() => { setComprehensivePurchased(true); setComprehensiveReportReady(true); setInsurancePurchased(true); setPolicyReady(true); setPaymentFailed(false); setActiveItem("overview"); }}
            className="px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            Download Policy
          </button>
          <button
            onClick={() => { setPaymentFailed(true); setActiveItem("overview"); }}
            className="px-2 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
          >
            Payment Failed
          </button>
        </div>
      </div>

      {/* Sticky CTA only for free users who haven't paid */}
      {shouldShowUnlockPrompts && !isCompReportActive && (
        <StickyCTA onClick={handleUnlock} />
      )}

      {shouldShowUnlockPrompts && (
        <UnlockPaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} onSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
};

export default Dashboard;
