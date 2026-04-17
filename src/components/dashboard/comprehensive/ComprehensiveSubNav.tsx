import { FileText, Database, Key, Clock } from "lucide-react";

const subNavItems = [
  { id: "comp-documents", label: "Documents", icon: FileText },
  { id: "comp-passwords", label: "Passwords", icon: Key },
  { id: "comp-leak-sources", label: "Leak Sources", icon: Database },
  { id: "comp-timeline", label: "Timeline", icon: Clock },
];

interface ComprehensiveSubNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const ComprehensiveSubNav = ({ activeSection, onNavigate }: ComprehensiveSubNavProps) => (
  <div className="lg:hidden sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 bg-background/95 backdrop-blur-md border-b border-border/20 mb-4">
    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1">
      {subNavItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0
              ${isActive
                ? "bg-foreground text-card"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }
            `}
          >
            <item.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            {item.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default ComprehensiveSubNav;
