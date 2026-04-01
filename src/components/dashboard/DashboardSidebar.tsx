import { Eye, Lightbulb, LayoutDashboard, X, PhoneCall, MoreHorizontal, LogOut, UserRound, FileSearch, FileText, Database, Key, Clock, ArrowLeft, ShoppingBag } from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { FlowType } from "@/types/flow";

// Nav items differ by flow + entitlement state
const getMenuItems = (flowType: FlowType, comprehensivePurchased: boolean, comprehensiveReportReady: boolean) => {
  const base = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "exposure", label: "Exposure", icon: Eye },
  ];

  if (flowType === "free") {
    if (comprehensivePurchased) {
      // After payment: show Comprehensive Report nav
      base.push({ id: "comprehensive-report", label: "Comprehensive Report", icon: FileSearch });
    } else {
      // Before payment: show Leak Sources
      base.push({ id: "leak-sources", label: "Leak Sources", icon: Database });
    }
  }

  if (flowType === "policy-basic") {
    if (comprehensivePurchased) {
      base.push({ id: "comprehensive-report", label: "Comprehensive Report", icon: FileSearch });
    } else {
      base.push({ id: "leak-sources", label: "Leak Sources", icon: Database });
    }
  }

  if (flowType === "policy-comprehensive") {
    base.push({ id: "comprehensive-report", label: "Comprehensive Report", icon: FileSearch });
  }

  // Recommendations only available after report is ready
  if (
    (flowType === "policy-basic") ||
    (flowType === "free" && comprehensiveReportReady) ||
    (flowType === "policy-comprehensive" && comprehensiveReportReady)
  ) {
    base.push({ id: "recommendations", label: "Recommendations", icon: Lightbulb });
  }

  base.push({ id: "call-assistance", label: "Call Assistance", icon: PhoneCall });

  return base;
};

const compSubNavItems = [
  { id: "comp-documents", label: "Documents", icon: FileText },
  { id: "comp-leak-sources", label: "Leak Sources", icon: Database },
  { id: "comp-passwords", label: "Passwords", icon: Key },
  { id: "comp-timeline", label: "Timeline", icon: Clock },
];

const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98XXXXXX10",
};

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (id: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  riskScore?: number;
  onRiskScoreChange?: (score: number) => void;
  flowType?: FlowType;
  isUnlocked?: boolean;
  comprehensivePurchased?: boolean;
  comprehensiveReportReady?: boolean;
  onOpenPurchases?: () => void;
}

const RiskScoreControl = ({ score, onChange }: { score: number; onChange: (v: number) => void }) => (
  <div className="p-3">
    <div className="rounded-xl bg-secondary/40 px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Risk Score</span>
        <span className="text-display text-sm font-semibold">{score}</span>
      </div>
      <Slider
        value={[score]}
        onValueChange={(v) => onChange(v[0])}
        max={100}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Safe</span>
        <span>Critical</span>
      </div>
    </div>
  </div>
);

const ProfileRow = ({ collapsed = false, onOpenPurchases }: { collapsed?: boolean; flowType?: FlowType; comprehensivePurchased?: boolean; comprehensiveReportReady?: boolean; onOpenPurchases?: () => void }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  if (collapsed) {
    return (
      <div className="p-2 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-9 w-9 rounded-xl bg-secondary/40 flex items-center justify-center transition-colors hover:bg-secondary/60">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">RS</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="right" className="w-40 rounded-xl">
            <DropdownMenuItem onClick={() => setProfileOpen(true)} className="rounded-lg text-sm cursor-pointer">
              <UserRound className="h-4 w-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpenPurchases?.()} className="rounded-lg text-sm cursor-pointer">
              <ShoppingBag className="h-4 w-4 mr-2" />
              View Purchases
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLogoutOpen(true)} className="rounded-lg text-sm cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="sm:max-w-sm rounded-[20px]">
            <DialogHeader>
              <DialogTitle className="text-display text-lg">Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">RS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-display text-sm">{userData.name}</p>
                  <p className="text-body text-xs">Personal Account</p>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-body text-sm">Email</span>
                  <span className="text-display text-sm">{userData.email}</span>
                </div>
                <div className="border-t border-border/30" />
                <div className="flex justify-between items-center">
                  <span className="text-body text-sm">Phone</span>
                  <span className="text-display text-sm">{userData.phone}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
          <AlertDialogContent className="sm:max-w-sm rounded-[20px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-display text-lg">Log out</AlertDialogTitle>
              <AlertDialogDescription className="text-body text-sm">Are you sure you want to log out?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
              <AlertDialogAction className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    );
  }

  return (
    <>
      <div className="p-3">
        <div className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              RS
            </AvatarFallback>
          </Avatar>
          <span className="text-display text-sm flex-1 truncate">{userData.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-7 w-7 rounded-lg hover:bg-secondary/60 flex items-center justify-center shrink-0 transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              <DropdownMenuItem onClick={() => setProfileOpen(true)} className="rounded-lg text-sm cursor-pointer">
                <UserRound className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenPurchases?.()} className="rounded-lg text-sm cursor-pointer">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Purchases
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogoutOpen(true)} className="rounded-lg text-sm cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-sm rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="text-display text-lg">Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">RS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-display text-sm">{userData.name}</p>
                <p className="text-body text-xs">Personal Account</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-body text-sm">Email</span>
                <span className="text-display text-sm">{userData.email}</span>
              </div>
              <div className="border-t border-border/30" />
              <div className="flex justify-between items-center">
                <span className="text-body text-sm">Phone</span>
                <span className="text-display text-sm">{userData.phone}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent className="sm:max-w-sm rounded-[20px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-display text-lg">Log out</AlertDialogTitle>
            <AlertDialogDescription className="text-body text-sm">Are you sure you want to log out?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ViewPurchases open={purchasesOpen} onOpenChange={setPurchasesOpen} flowType={flowType} comprehensivePurchased={comprehensivePurchased} comprehensiveReportReady={comprehensiveReportReady} />
    </>
  );
};

/* ── Collapsed icon-only nav ── */
const CollapsedNavList = ({ menuItems, activeItem, onNavigate }: { menuItems: typeof compSubNavItems; activeItem: string; onNavigate: (id: string) => void }) => {
  const isCompReportActive = activeItem === "comprehensive-report" || activeItem.startsWith("comp-");

  return (
    <TooltipProvider delayDuration={200}>
      <ul className="space-y-1 flex flex-col items-center">
        {menuItems.map((item) => {
          const isActive = item.id === "comprehensive-report" ? isCompReportActive : activeItem === item.id;
          return (
            <li key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`
                      h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200
                      ${isActive
                        ? "bg-primary/8 shadow-[inset_0_1px_2px_rgba(4,219,127,0.08)]"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      }
                    `}
                  >
                    <item.icon
                      className={`h-[18px] w-[18px] ${isActive ? "text-primary" : ""}`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="rounded-lg text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
};

/* ── Comprehensive sub-nav panel ── */
const CompSubNavPanel = ({ activeItem, onNavigate, onBack }: {
  activeItem: string;
  onNavigate: (id: string) => void;
  onBack: () => void;
}) => (
  <aside className="fixed left-[68px] top-0 bottom-0 w-[220px] bg-card border-r border-border/20 flex flex-col z-30 hidden lg:flex">
    <div className="px-5 pt-6 pb-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Dashboard
      </button>
      <h3 className="text-display text-sm">Comprehensive Report</h3>
      <p className="text-body text-[11px] mt-0.5">Detailed exposure analysis</p>
    </div>

    <nav className="flex-1 px-3 py-2">
      <p className="text-caps px-3 mb-3">Sections</p>
      <ul className="space-y-1">
        {compSubNavItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                  ${isActive
                    ? "bg-primary/8 text-foreground font-semibold shadow-[inset_0_1px_2px_rgba(4,219,127,0.08)]"
                    : "text-muted-foreground font-medium hover:bg-secondary/60 hover:text-foreground"
                  }
                `}
              >
                <item.icon
                  className={`h-[16px] w-[16px] shrink-0 ${isActive ? "text-primary" : ""}`}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  </aside>
);

/* ── Full-width nav list (normal mode) ── */
const NavList = ({ menuItems, activeItem, onNavigate, onItemClick }: {
  menuItems: ReturnType<typeof getMenuItems>;
  activeItem: string;
  onNavigate: (id: string) => void;
  onItemClick?: () => void;
}) => {
  return (
    <ul className="space-y-1">
      {menuItems.map((item) => {
        const isCompReportActive = activeItem === "comprehensive-report" || activeItem.startsWith("comp-");
        const isActive = item.id === "comprehensive-report" ? isCompReportActive : activeItem === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => { onNavigate(item.id); onItemClick?.(); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                transition-all duration-200
                ${isActive
                  ? "bg-primary/8 text-foreground font-semibold shadow-[inset_0_1px_2px_rgba(4,219,127,0.08)]"
                  : "text-muted-foreground font-medium hover:bg-secondary/60 hover:text-foreground"
                }
              `}
            >
              <item.icon
                className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-primary" : ""}`}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const DashboardSidebar = ({ activeItem, onNavigate, mobileOpen, onMobileClose, riskScore = 82, onRiskScoreChange, flowType = "free", comprehensivePurchased = false, comprehensiveReportReady = false }: DashboardSidebarProps) => {
  const isMobile = useIsMobile();
  const isCompReportActive =
    (activeItem === "comprehensive-report" || activeItem.startsWith("comp-")) &&
    (flowType !== "policy-comprehensive" || comprehensiveReportReady);
  const menuItems = getMenuItems(flowType, comprehensivePurchased, comprehensiveReportReady);

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-[280px] p-0 bg-card border-border/20 [&>button]:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto" />
              <button onClick={onMobileClose} className="h-8 w-8 rounded-lg bg-secondary/60 flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-2">
              <p className="text-caps px-3 mb-3">Menu</p>
              {isCompReportActive ? (
                <>
                  <button
                    onClick={() => { onNavigate("overview"); onMobileClose?.(); }}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium px-3 mb-3"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Dashboard
                  </button>
                  <p className="text-caps px-3 mb-2">Report Sections</p>
                  <ul className="space-y-1">
                    {compSubNavItems.map((item) => {
                      const isActive = activeItem === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => { onNavigate(item.id); onMobileClose?.(); }}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
                              ${isActive
                                ? "bg-primary/8 text-foreground font-semibold"
                                : "text-muted-foreground font-medium hover:bg-secondary/60 hover:text-foreground"
                              }
                            `}
                          >
                            <item.icon className={`h-[16px] w-[16px] shrink-0 ${isActive ? "text-primary" : ""}`} strokeWidth={isActive ? 2 : 1.5} />
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <NavList menuItems={menuItems} activeItem={activeItem} onNavigate={onNavigate} onItemClick={onMobileClose} />
              )}
            </nav>
            {onRiskScoreChange && !isCompReportActive && <RiskScoreControl score={riskScore} onChange={onRiskScoreChange} />}
            <ProfileRow flowType={flowType} comprehensivePurchased={comprehensivePurchased} comprehensiveReportReady={comprehensiveReportReady} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: collapsed icon-only mode when in comprehensive report
  if (isCompReportActive) {
    return (
      <>
        <aside className="fixed left-0 top-0 bottom-0 w-[68px] bg-card border-r border-border/20 flex flex-col z-40 hidden lg:flex transition-all duration-300">
          <div className="p-4 pb-3 flex justify-center">
            <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileSearch className="h-4 w-4 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <nav className="flex-1 px-2 py-4">
            <CollapsedNavList menuItems={menuItems} activeItem={activeItem} onNavigate={onNavigate} />
          </nav>
          <ProfileRow collapsed flowType={flowType} comprehensivePurchased={comprehensivePurchased} comprehensiveReportReady={comprehensiveReportReady} />
        </aside>

        <CompSubNavPanel
          activeItem={activeItem}
          onNavigate={onNavigate}
          onBack={() => onNavigate("overview")}
        />
      </>
    );
  }

  // Desktop: normal full sidebar
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border/20 flex-col z-40 hidden lg:flex transition-all duration-300">
      <div className="p-6 pb-4">
        <img src={mitigataLogo} alt="Mitigata" className="h-8 w-auto" />
      </div>
      <nav className="flex-1 px-3 py-4">
        <p className="text-caps px-3 mb-3">Menu</p>
        <NavList menuItems={menuItems} activeItem={activeItem} onNavigate={onNavigate} />
      </nav>
      {onRiskScoreChange && <RiskScoreControl score={riskScore} onChange={onRiskScoreChange} />}
      <ProfileRow flowType={flowType} comprehensivePurchased={comprehensivePurchased} comprehensiveReportReady={comprehensiveReportReady} />
    </aside>
  );
};

export default DashboardSidebar;
