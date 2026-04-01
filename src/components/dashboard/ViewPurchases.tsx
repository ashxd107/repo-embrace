import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, FileText, Download, ExternalLink, Mail, ShoppingBag } from "lucide-react";
import type { FlowType } from "@/types/flow";

/* ── Mock purchase data derived from flow state ── */

type InsuranceStatus = "Active" | "In Progress" | "Failed" | "Expired" | "Cancelled";
type ReportStatus = "Completed" | "In Progress" | "Failed" | "Refunded";

interface InsurancePurchase {
  planName: string;
  planType: string;
  sumInsured: string;
  purchaseDate: string;
  premiumPaid: string;
  policyNumber?: string;
  status: InsuranceStatus;
  policyReady: boolean;
}

interface ReportPurchase {
  productName: string;
  purchaseDate: string;
  amountPaid: string;
  reportType: string;
  status: ReportStatus;
  reportReady: boolean;
  invoiceAvailable: boolean;
}

const statusColor: Record<string, string> = {
  Active: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-amber-50 text-amber-600 border-amber-200",
  Failed: "bg-destructive/10 text-destructive border-destructive/20",
  Expired: "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-muted text-muted-foreground border-border",
  Refunded: "bg-muted text-muted-foreground border-border",
};

function getInsurancePurchases(flowType: FlowType): InsurancePurchase[] {
  if (flowType === "policy-basic" || flowType === "policy-comprehensive") {
    return [
      {
        planName: "Cyber Insurance",
        planType: "Individual Plan",
        sumInsured: "₹1,00,000",
        purchaseDate: "12 Apr 2026",
        premiumPaid: "₹1,499",
        policyNumber: "MI-CYB-2026-00124",
        status: "Active",
        policyReady: true,
      },
    ];
  }
  return [];
}

function getReportPurchases(
  flowType: FlowType,
  comprehensivePurchased: boolean,
  comprehensiveReportReady: boolean
): ReportPurchase[] {
  if (comprehensivePurchased || flowType === "policy-comprehensive") {
    return [
      {
        productName: "Comprehensive Report Unlock",
        purchaseDate: "14 Apr 2026",
        amountPaid: "₹99",
        reportType: "Comprehensive",
        status: comprehensiveReportReady ? "Completed" : "In Progress",
        reportReady: comprehensiveReportReady,
        invoiceAvailable: true,
      },
    ];
  }
  return [];
}

/* ── Sub-components ── */

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-body text-xs">{label}</span>
    <span className="text-display text-xs font-medium">{value}</span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="outline" className={`text-[11px] font-medium px-2 py-0.5 rounded-lg border ${statusColor[status] || ""}`}>
    {status}
  </Badge>
);

const InsuranceCard = ({ purchase }: { purchase: InsurancePurchase }) => (
  <Card className="p-4 space-y-3 border-border/30 shadow-sm">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
          <Shield className="h-4 w-4 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-display text-sm font-semibold">{purchase.planName}</p>
          <p className="text-body text-[11px]">{purchase.planType}</p>
        </div>
      </div>
      <StatusBadge status={purchase.status} />
    </div>

    <div className="space-y-2 pt-1">
      <MetaRow label="Sum insured" value={purchase.sumInsured} />
      <MetaRow label="Premium paid" value={purchase.premiumPaid} />
      <MetaRow label="Purchased on" value={purchase.purchaseDate} />
      {purchase.policyNumber && <MetaRow label="Policy number" value={purchase.policyNumber} />}
    </div>

    {purchase.status === "Active" && purchase.policyReady && (
      <Button size="sm" className="w-full rounded-xl text-xs h-9 gap-2">
        <Download className="h-3.5 w-3.5" />
        Download Policy
      </Button>
    )}

    {purchase.status === "In Progress" && (
      <p className="text-body text-xs text-center pt-1">Your policy is being processed. It will appear here once ready.</p>
    )}

    {purchase.status === "Failed" && (
      <p className="text-body text-xs text-center pt-1">
        Purchase unsuccessful. Please try again or contact{" "}
        <a href="mailto:contact@mitigata.com" className="text-primary font-medium hover:underline">contact@mitigata.com</a>
      </p>
    )}
  </Card>
);

const ReportCard = ({ purchase }: { purchase: ReportPurchase }) => (
  <Card className="p-4 space-y-3 border-border/30 shadow-sm">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
          <FileText className="h-4 w-4 text-primary" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-display text-sm font-semibold">{purchase.productName}</p>
          <p className="text-body text-[11px]">{purchase.reportType}</p>
        </div>
      </div>
      <StatusBadge status={purchase.status} />
    </div>

    <div className="space-y-2 pt-1">
      <MetaRow label="Amount paid" value={purchase.amountPaid} />
      <MetaRow label="Purchased on" value={purchase.purchaseDate} />
    </div>

    {purchase.status === "In Progress" && (
      <p className="text-body text-xs text-center pt-1">Your report is being prepared. We'll notify you once it is ready.</p>
    )}

    <div className="flex gap-2">
      {purchase.invoiceAvailable && (
        <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs h-9 gap-2">
          <Download className="h-3.5 w-3.5" />
          Download Invoice
        </Button>
      )}
      {purchase.reportReady && (
        <Button size="sm" className="flex-1 rounded-xl text-xs h-9 gap-2">
          <ExternalLink className="h-3.5 w-3.5" />
          Open Report
        </Button>
      )}
    </div>

    {purchase.status === "Failed" && (
      <p className="text-body text-xs text-center pt-1">
        Payment failed. Please try again or contact{" "}
        <a href="mailto:contact@mitigata.com" className="text-primary font-medium hover:underline">contact@mitigata.com</a>
      </p>
    )}
  </Card>
);

const EmptySection = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-xl border border-dashed border-border/40 p-6 text-center space-y-1.5">
    <p className="text-display text-sm font-medium">{title}</p>
    <p className="text-body text-xs">{description}</p>
  </div>
);

const FullEmpty = () => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
    <div className="h-14 w-14 rounded-2xl bg-secondary/60 flex items-center justify-center">
      <ShoppingBag className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
    </div>
    <div className="space-y-1">
      <p className="text-display text-base font-semibold">No purchases yet</p>
      <p className="text-body text-sm max-w-[240px]">You haven't purchased any reports or cyber insurance yet.</p>
    </div>
  </div>
);

/* ── Main component ── */

interface ViewPurchasesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flowType: FlowType;
  comprehensivePurchased: boolean;
  comprehensiveReportReady: boolean;
}

const ViewPurchases = ({ open, onOpenChange, flowType, comprehensivePurchased, comprehensiveReportReady }: ViewPurchasesProps) => {
  const insurancePurchases = getInsurancePurchases(flowType);
  const reportPurchases = getReportPurchases(flowType, comprehensivePurchased, comprehensiveReportReady);
  const hasAny = insurancePurchases.length > 0 || reportPurchases.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[420px] p-0 bg-background border-border/20 overflow-y-auto">
        <div className="px-6 pt-6 pb-4">
          <SheetHeader className="text-left">
            <SheetTitle className="text-display text-lg font-semibold">Purchases</SheetTitle>
          </SheetHeader>
          <p className="text-body text-xs mt-1">Your reports and insurance purchases</p>
        </div>

        {!hasAny ? (
          <FullEmpty />
        ) : (
          <div className="px-6 pb-8 space-y-6">
            {/* Cyber Insurance Section */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="text-display text-sm font-semibold">Cyber Insurance</h3>
              </div>
              {insurancePurchases.length > 0 ? (
                <div className="space-y-3">
                  {insurancePurchases.map((p, i) => (
                    <InsuranceCard key={i} purchase={p} />
                  ))}
                </div>
              ) : (
                <EmptySection title="No insurance purchases" description="You haven't purchased any cyber insurance yet." />
              )}
            </section>

            {/* Reports Section */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="text-display text-sm font-semibold">Reports</h3>
              </div>
              {reportPurchases.length > 0 ? (
                <div className="space-y-3">
                  {reportPurchases.map((p, i) => (
                    <ReportCard key={i} purchase={p} />
                  ))}
                </div>
              ) : (
                <EmptySection title="No report purchases" description="You haven't purchased any reports yet." />
              )}
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ViewPurchases;
