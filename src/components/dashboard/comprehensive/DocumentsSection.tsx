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

const exposedPeople: PersonExposure[] = [
  {
    relation: "Self",
    name: "Rahul Sharma",
    documents: [
      { type: "Aadhaar", value: "XXXX XXXX 1234", icon: FileText },
      { type: "PAN", value: "ABCDE12XXF", icon: CreditCard },
    ],
  },
  {
    relation: "Father",
    name: "Ramesh Sharma",
    documents: [
      { type: "Aadhaar", value: "XXXX XXXX 6042", icon: FileText },
    ],
  },
  {
    relation: "Spouse",
    name: "Priya Sharma",
    documents: [
      { type: "PAN", value: "FGHIJ34XXK", icon: CreditCard },
      { type: "Driving License", value: "KA••••••2019", icon: Car },
    ],
  },
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
      Overview of exposed identity documents across all affected individuals.
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

    {/* Person-wise document cards */}
    <div className="space-y-6">
      {exposedPeople.map((person, i) => (
        <motion.div
          key={person.name}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="card-surface !p-0 overflow-hidden"
        >
          {/* Person header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-border/20">
            <Badge variant="outline" className="text-[10px] font-medium bg-primary/6 text-primary border-primary/15 px-2 py-0.5">
              {person.relation}
            </Badge>
            <span className="text-sm font-medium text-foreground">{person.name}</span>
          </div>

          {/* Documents grid */}
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {person.documents.map((doc) => (
                <div key={doc.type} className="bg-secondary/40 rounded-xl px-4 py-3 flex items-center gap-4">
                  <div className="h-9 w-9 rounded-lg bg-destructive/[0.06] flex items-center justify-center shrink-0">
                    <doc.icon className="h-4 w-4 text-destructive/70" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider mb-0.5">{doc.type}</p>
                    <p className="text-[13px] font-normal text-foreground leading-snug">{doc.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default DocumentsSection;
