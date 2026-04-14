import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, BookOpen, Car, ShieldCheck, ShieldX } from "lucide-react";

interface ExposedDocument {
  type: string;
  value: string;
  icon: typeof FileText;
}

interface PersonExposure {
  relation: string;
  name: string;
  documents: ExposedDocument[];
}

const allDocuments: ExposedDocument[] = [
  { type: "Aadhaar", value: "XXXX XXXX 1234", icon: FileText },
  { type: "PAN", value: "ABCDE12XXF", icon: CreditCard },
  { type: "Aadhaar", value: "XXXX XXXX 6042", icon: FileText },
  { type: "PAN", value: "FGHIJ34XXK", icon: CreditCard },
  { type: "Driving License", value: "KA••••••2019", icon: Car },
];

const documentSummary = [
  { type: "Aadhaar", count: 2, icon: FileText },
  { type: "PAN", count: 2, icon: CreditCard },
  { type: "Passport", count: 0, icon: BookOpen },
  { type: "Driving License", count: 1, icon: Car },
];

const DocumentsSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
  >
    <p className="text-caps mb-2">Documents</p>
    <h2 className="text-display text-xl mb-1.5">Sensitive document exposure</h2>
    <p className="text-body text-sm mb-6">
      Overview of exposed identity documents found across data breaches.
    </p>

    {/* Summary strip */}
    <div className="flex flex-wrap gap-2.5 mb-6">
      {documentSummary.map((doc) => {
        const found = doc.count > 0;
        return (
          <div
            key={doc.type}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border ${
              found
                ? "bg-destructive/[0.06] border-destructive/15 text-destructive"
                : "bg-secondary/40 border-border/20 text-muted-foreground"
            }`}
          >
            {found ? (
              <ShieldX className="h-3.5 w-3.5" strokeWidth={1.5} />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
            )}
            <span className="font-normal">{doc.type}</span>
            <span className="opacity-70 font-normal">
              {found ? `found in ${doc.count} record${doc.count > 1 ? "s" : ""}` : "not found"}
            </span>
          </div>
        );
      })}
    </div>

    {/* Flat document list */}
    <div className="card-surface !p-0 overflow-hidden">
      {allDocuments.map((doc, i) => (
        <motion.div
          key={`${doc.type}-${doc.value}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className={`flex items-center gap-4 px-5 py-4 ${
            i < allDocuments.length - 1 ? "border-b border-border/20" : ""
          }`}
        >
          <doc.icon className="h-4.5 w-4.5 text-destructive/70 shrink-0" strokeWidth={1.5} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-0.5">{doc.type}</p>
            <p className="text-[13px] font-normal text-foreground leading-snug">{doc.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default DocumentsSection;
