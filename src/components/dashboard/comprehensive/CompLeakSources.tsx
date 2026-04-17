import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Lock, FileText } from "lucide-react";

const DOCUMENT_LABELS = new Set(["Aadhaar", "Aadhaar Card", "PAN", "PAN Card", "Driving License", "Passport"]);

interface AffectedPerson {
  relation: string;
  name: string;
  fields: { label: string; value: string; sensitive?: boolean }[];
}

interface CompLeakSource {
  id: number;
  title: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  date: string;
  summary: string;
  affectedPeople: AffectedPerson[];
  freeVisible?: boolean;
}

const leakSources: CompLeakSource[] = [
  {
    id: 1,
    title: "HiTeckGroop.in — JIO Karnataka",
    risk: "Critical",
    date: "Early 2025",
    summary: "Aadhaar, phone, address and account credentials were found in this telecom breach.",
    freeVisible: true,
    affectedPeople: [
      {
        relation: "Self",
        name: "Rahul Sharma",
        fields: [
          { label: "Email", value: "rahul****@gmail.com" },
          { label: "Password", value: "r@hul$h@rm@90", sensitive: true },
          { label: "Phone", value: "+91 93810XXXXX", sensitive: true },
          { label: "Aadhaar", value: "XXXX XXXX 1234", sensitive: true },
          { label: "Address", value: "C/O T V S P Sekhar, Bengaluru, Karnataka" },
        ],
      },
      {
        relation: "Father",
        name: "Ramesh Sharma",
        fields: [
          { label: "Aadhaar", value: "XXXX XXXX 6042", sensitive: true },
          { label: "Address", value: "Partially exposed" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Alien TxtBase — Stealer Log Combolist",
    risk: "High",
    date: "Early 2025",
    summary: "Browser-stored credentials harvested via infostealer malware.",
    freeVisible: true,
    affectedPeople: [
      {
        relation: "Self",
        name: "Rahul Sharma",
        fields: [
          { label: "Email", value: "rahul****@gmail.com" },
          { label: "Password", value: "Rahul@2024!", sensitive: true },
          { label: "Phone", value: "+91 93810XXXXX", sensitive: true },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "DarkForums Dump — Financial Services Platform",
    risk: "Critical",
    date: "Late 2024",
    summary: "PAN, banking credentials and address from a financial platform database dump.",
    affectedPeople: [
      {
        relation: "Self",
        name: "Rahul Sharma",
        fields: [
          { label: "Email", value: "rahul.sharma@gmail.com" },
          { label: "Password", value: "Fin@nce#2023", sensitive: true },
          { label: "Phone", value: "+91 93810XXXXX", sensitive: true },
          { label: "PAN", value: "ABCDE12XXF", sensitive: true },
          { label: "Address", value: "HSR Layout, Bengaluru, Karnataka 560102" },
        ],
      },
      {
        relation: "Spouse",
        name: "Priya Sharma",
        fields: [
          { label: "PAN", value: "FGHIJ34XXK", sensitive: true },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "BreachDB — Social Media Credential Dump",
    risk: "Medium",
    date: "Mid 2024",
    summary: "Credentials from social media platform breaches.",
    affectedPeople: [
      {
        relation: "Self",
        name: "Rahul Sharma",
        fields: [
          { label: "Email", value: "rahul.sharma@gmail.com" },
          { label: "Password", value: "Social@Pass1", sensitive: true },
          { label: "Username", value: "rahul_sh90" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "InfoStealer Collection — E-commerce Platform",
    risk: "High",
    date: "Q1 2024",
    summary: "Data harvested from e-commerce and payment platforms via infostealer campaigns.",
    affectedPeople: [
      {
        relation: "Self",
        name: "Rahul Sharma",
        fields: [
          { label: "Email", value: "rahul.sharma@gmail.com" },
          { label: "Password", value: "Shop@2024#R", sensitive: true },
          { label: "Phone", value: "+91 93810XXXXX", sensitive: true },
          { label: "Address", value: "Koramangala, Bengaluru, Karnataka 560034" },
        ],
      },
      {
        relation: "Spouse",
        name: "Priya Sharma",
        fields: [
          { label: "Driving License", value: "KA••••••2019", sensitive: true },
        ],
      },
    ],
  },
];

// Badge styles — colored but WCAG-friendly (muted backgrounds, strong text)
const riskBadgeStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

// Left accent bar color per risk level
const riskAccentColor: Record<string, string> = {
  Critical: "bg-destructive",
  High: "bg-risk-mid",
  Medium: "bg-primary",
  Low: "bg-muted-foreground",
};

// Sensitive field left-dot color per source risk
const sensitiveFieldDot: Record<string, string> = {
  Critical: "bg-destructive/60",
  High: "bg-risk-mid/60",
  Medium: "bg-primary/60",
  Low: "bg-muted-foreground/40",
};

interface CompLeakSourcesProps {
  isUnlocked?: boolean;
}

const CompLeakSources = ({ isUnlocked = true }: CompLeakSourcesProps) => {
  const visibleSources = isUnlocked ? leakSources : leakSources.filter((s) => s.freeVisible);

  return (
    <section>
      <p className="text-caps mb-2">Leak Source Intelligence — {leakSources.length} Sources</p>
      <h2 className="text-display text-lg sm:text-xl mb-1.5">Detailed breach source analysis</h2>
      <p className="text-body text-[13px] sm:text-sm mb-5 sm:mb-6">
        {isUnlocked
          ? "Each source below shows exactly what was exposed and whose data was involved."
          : "You're viewing a limited preview. Unlock the full report to see all sources and complete details."}
      </p>

      <div className="space-y-4 sm:space-y-6">
        {visibleSources.map((source, i) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="card-surface !p-0 overflow-hidden"
          >
            {/* Source header with risk accent bar */}
            <div className="flex items-stretch">
              <div className={`w-1 shrink-0 ${riskAccentColor[source.risk]} rounded-l-[20px]`} />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-border/20 flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="h-7 w-7 rounded-lg bg-secondary/60 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-muted-foreground">{source.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] sm:text-sm font-semibold text-foreground leading-snug">{source.title}</h3>
                    <p className="text-[11px] sm:text-xs font-normal text-muted-foreground mt-0.5 leading-relaxed">{source.summary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pl-10 sm:pl-0">
                  <span className="text-[10px] font-normal text-muted-foreground tracking-wide uppercase">{source.date}</span>
                  <Badge variant="outline" className={`text-[10px] font-medium ${riskBadgeStyles[source.risk]}`}>
                    {source.risk}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Affected people — non-document fields only */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
              {source.affectedPeople.map((person, pi) => {
                const nonDocFields = person.fields.filter(f => !DOCUMENT_LABELS.has(f.label));
                if (nonDocFields.length === 0) return null;
                return (
                  <div key={`${source.id}-${person.name}`}>
                    {pi > 0 && <div className="border-t border-border/15 -mx-4 sm:-mx-6 mb-4 sm:mb-5" />}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-[10px] font-medium bg-primary/6 text-primary border-primary/15 px-2 py-0.5">
                        {person.relation}
                      </Badge>
                      <span className="text-[13px] sm:text-sm font-medium text-foreground">{person.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {nonDocFields.map((field) => (
                        <div
                          key={field.label}
                          className={`rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2.5 sm:gap-3 ${
                            field.sensitive ? "bg-secondary/50" : "bg-secondary/30"
                          }`}
                        >
                          {field.sensitive && (
                            <div className={`h-1.5 w-1.5 rounded-full mt-[7px] shrink-0 ${sensitiveFieldDot[source.risk]}`} />
                          )}
                          <div className="min-w-0">
                            <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">{field.label}</p>
                            <p className="text-[13px] font-normal leading-snug text-foreground">
                              {field.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Aggregated Documents */}
              {(() => {
                const allDocs = source.affectedPeople.flatMap(p =>
                  p.fields.filter(f => DOCUMENT_LABELS.has(f.label))
                );
                if (allDocs.length === 0) return null;
                return (
                  <>
                    <div className="border-t border-border/15 -mx-4 sm:-mx-6 mb-0" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allDocs.map((d, i) => (
                        <div key={`${d.label}-${i}`} className="rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2.5 sm:gap-3 bg-secondary/50">
                          <div className={`h-1.5 w-1.5 rounded-full mt-[7px] shrink-0 ${sensitiveFieldDot[source.risk]}`} />
                          <div className="min-w-0">
                            <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">{d.label}</p>
                            <p className="text-[13px] font-normal leading-snug text-foreground">{d.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Locked sources for free users */}
      {!isUnlocked && (
        <div className="mt-5 space-y-4">
          {leakSources.filter((s) => !s.freeVisible).map((source) => (
            <div key={source.id} className="card-surface relative overflow-hidden">
              <div className="absolute inset-0 bg-card/70 backdrop-blur-[6px] z-10 flex items-center justify-center rounded-[20px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-xs font-medium">Locked</span>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="h-7 w-7 rounded-lg bg-secondary/60 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-muted-foreground">{source.id}</span>
                </div>
                <h3 className="text-sm font-medium text-foreground flex-1">{source.title}</h3>
                <Badge variant="outline" className={`text-[10px] font-medium ${riskBadgeStyles[source.risk]}`}>
                  {source.risk}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CompLeakSources;
