import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, FileText } from "lucide-react";

const DOCUMENT_LABELS = new Set(["Aadhaar", "Aadhaar Card", "PAN", "PAN Card", "Driving License", "Passport"]);

interface LeakField {
  label: string;
  value: string;
  sensitive?: boolean;
  fullWidth?: boolean;
  freeVisible?: boolean;
}

interface AffectedPerson {
  relation: string;
  name: string;
  fields: LeakField[];
}

interface LeakSource {
  id: number;
  title: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  date: string;
  summary: string;
  affectedPeople: AffectedPerson[];
  freeVisible?: boolean;
}

const leakSources: LeakSource[] = [
  {
    id: 1,
    title: "HiTeckGroop.in — JIO Karnataka (Cellular Operator)",
    risk: "Critical",
    date: "Early 2025",
    summary: "Aadhaar, phone, address and account credentials were found in this telecom breach.",
    freeVisible: true,
    affectedPeople: [
      {
        relation: "Self",
        name: "Rahul Sharma",
        fields: [
          { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
          { label: "Password", value: "••••••••••", sensitive: true, freeVisible: true },
          { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true, freeVisible: false },
          { label: "Phone 2", value: "+91 88005XXXXX", sensitive: true, freeVisible: false },
          { label: "Region", value: "JIO Karnataka", freeVisible: false },
          { label: "Aadhaar Card", value: "XXXX XXXX 6042", sensitive: true, freeVisible: false },
          { label: "Source Date", value: "Early 2025", freeVisible: false },
          { label: "Address", value: "C/O T V S P Sekhar, NO-001 1ST FLOOR KRISHNA REDDY ENCLAVE, SHANABUGH LAYOUT, Bengaluru, Karnataka", fullWidth: true, freeVisible: false },
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
          { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
          { label: "Password", value: "••••••••••", sensitive: true, freeVisible: true },
          { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true, freeVisible: false },
          { label: "Source Type", value: "Stealer Log", freeVisible: false },
          { label: "Source Date", value: "Early 2025", freeVisible: false },
          { label: "Region", value: "India", freeVisible: false },
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
          { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
          { label: "Password", value: "••••••••••", sensitive: true, freeVisible: true },
          { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true, freeVisible: false },
          { label: "PAN Card", value: "ABCDE12XXF", sensitive: true, freeVisible: false },
          { label: "Source Type", value: "Database Dump", freeVisible: false },
          { label: "Source Date", value: "Late 2024", freeVisible: false },
          { label: "Region", value: "India", freeVisible: false },
          { label: "Address", value: "HSR Layout, Bengaluru, Karnataka 560102", fullWidth: true, freeVisible: false },
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
          { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
          { label: "Password", value: "••••••••••", sensitive: true, freeVisible: true },
          { label: "Source Type", value: "Credential Dump", freeVisible: false },
          { label: "Source Date", value: "Mid 2024", freeVisible: false },
        ],
      },
    ],
  },
];

const riskBadgeStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const riskAccentColor: Record<string, string> = {
  Critical: "bg-destructive",
  High: "bg-risk-mid",
  Medium: "bg-primary",
  Low: "bg-muted-foreground",
};

const sensitiveFieldDot: Record<string, string> = {
  Critical: "bg-destructive/60",
  High: "bg-risk-mid/60",
  Medium: "bg-primary/60",
  Low: "bg-muted-foreground/40",
};

interface LeakSourcesProps {
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

const LeakSources = ({ isUnlocked = false, onUnlock }: LeakSourcesProps) => {
  const visibleSources = isUnlocked ? leakSources : leakSources.filter((s) => s.freeVisible);
  const totalCount = leakSources.length;

  return (
    <section>
      <p className="text-caps mb-2">Leak Source Details — {totalCount} Sources</p>
      <h2 className="text-display text-xl mb-1.5">Where your data was found</h2>
      <p className="text-body text-sm mb-6">
        {isUnlocked
          ? "Each source below shows exactly what was exposed and whose data was involved."
          : "You're viewing a limited preview. Unlock the full report to see all sources and complete details."}
      </p>

      <div className="space-y-6">
        {visibleSources.map((source, i) => {
          return (
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
                <div className="flex items-center gap-4 px-5 py-4 border-b border-border/20 flex-1 min-w-0">
                  <div className="h-7 w-7 rounded-lg bg-secondary/60 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-muted-foreground">{source.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-snug">{source.title}</h3>
                    <p className="text-xs font-normal text-muted-foreground mt-0.5 leading-relaxed">{source.summary}</p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-[10px] font-normal text-muted-foreground tracking-wide uppercase">{source.date}</span>
                    <Badge variant="outline" className={`text-[10px] font-medium ${riskBadgeStyles[source.risk]}`}>
                      {source.risk}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Affected people — non-document fields only */}
              <div className="px-6 py-5 space-y-5">
                {source.affectedPeople.map((person, pi) => {
                  const nonDocFields = person.fields.filter(f => !DOCUMENT_LABELS.has(f.label));
                  const visibleFields = isUnlocked
                    ? nonDocFields
                    : nonDocFields.filter((f) => f.freeVisible);
                  const lockedFields = isUnlocked
                    ? []
                    : nonDocFields.filter((f) => !f.freeVisible);

                  if (visibleFields.length === 0 && lockedFields.length === 0) return null;

                  return (
                    <div key={`${source.id}-${person.name}-${pi}`}>
                      {pi > 0 && <div className="border-t border-border/15 -mx-6 mb-5" />}
                      <div className="flex items-center gap-2 mb-3.5">
                        <Badge variant="outline" className="text-[10px] font-medium bg-primary/6 text-primary border-primary/15 px-2 py-0.5">
                          {person.relation}
                        </Badge>
                        <span className="text-sm font-medium text-foreground">{person.name}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {visibleFields.filter(f => !f.fullWidth).map((field) => (
                          <div
                            key={field.label}
                            className={`rounded-xl px-4 py-3 flex items-start gap-3 ${
                              field.sensitive ? "bg-secondary/50" : "bg-secondary/30"
                            }`}
                          >
                            {field.sensitive && (
                              <div className={`h-1.5 w-1.5 rounded-full mt-[7px] shrink-0 ${sensitiveFieldDot[source.risk]}`} />
                            )}
                            <div className="min-w-0">
                              <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">{field.label}</p>
                              <p className={`text-[13px] font-normal leading-snug text-foreground ${field.sensitive ? "text-destructive" : ""}`}>
                                {field.value}
                              </p>
                            </div>
                          </div>
                        ))}
                        {/* Locked field previews */}
                        {!isUnlocked && lockedFields.filter(f => !f.fullWidth).slice(0, 3).map((field) => (
                          <div
                            key={field.label}
                            className="rounded-xl px-4 py-3 flex items-start gap-3 bg-secondary/30"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">{field.label}</p>
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-[13px] select-none text-transparent bg-muted/80 rounded px-1"
                                  style={{ filter: "blur(5px)" }}
                                >
                                  {field.value}
                                </span>
                                <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Full-width visible fields */}
                      {isUnlocked && visibleFields.filter(f => f.fullWidth).map((field) => (
                        <div key={field.label} className="mt-2.5 rounded-xl px-4 py-3 bg-secondary/30">
                          <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">{field.label}</p>
                          <p className="text-[13px] font-normal leading-snug text-foreground">{field.value}</p>
                        </div>
                      ))}
                      {/* Locked full-width preview */}
                      {!isUnlocked && nonDocFields.filter(f => f.fullWidth).length > 0 && (
                        <div className="mt-2.5 rounded-xl px-4 py-3 bg-secondary/30">
                          <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[13px] select-none text-transparent bg-muted/80 rounded px-1"
                              style={{ filter: "blur(5px)" }}
                            >
                              Full address available in complete report
                            </span>
                            <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Aggregated Documents */}
                {(() => {
                  const allDocs = source.affectedPeople.flatMap(p =>
                    p.fields.filter(f => DOCUMENT_LABELS.has(f.label))
                  );
                  if (allDocs.length === 0) return null;

                  if (!isUnlocked) {
                    return (
                      <>
                        <div className="border-t border-border/15 -mx-6 mb-0" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {allDocs.map((d, i) => (
                            <div key={`${d.label}-${i}`} className="rounded-xl px-4 py-3 flex items-start gap-3 bg-secondary/30">
                              <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-1">{d.label}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[13px] select-none text-transparent bg-muted/80 rounded px-1" style={{ filter: "blur(5px)" }}>
                                    {d.value}
                                  </span>
                                  <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  }

                  return (
                    <>
                      <div className="border-t border-border/15 -mx-6 mb-0" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {allDocs.map((d, i) => (
                          <div key={`${d.label}-${i}`} className="rounded-xl px-4 py-3 flex items-start gap-3 bg-secondary/50">
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
          );
        })}
      </div>

      {/* Locked sources + CTA for free users */}
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-5 space-y-4"
        >
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

          {onUnlock && (
            <div className="card-surface !p-6 flex flex-col sm:flex-row items-center gap-5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Lock className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-display text-base mb-1">Unlock comprehensive report for ₹99</h3>
                <p className="text-body text-sm leading-relaxed">
                  Request deeper identity, document, and breach-source intelligence.
                </p>
              </div>
              <Button
                onClick={onUnlock}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 h-auto font-semibold text-sm shrink-0"
              >
                Unlock for ₹99
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default LeakSources;
