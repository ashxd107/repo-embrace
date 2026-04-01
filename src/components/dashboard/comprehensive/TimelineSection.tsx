import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    date: "Jan 2025",
    source: "HiTeckGroop.in — JIO Karnataka",
    description: "Aadhaar, phone, and address found for the target and linked family record.",
    tags: ["Aadhaar", "Phone", "Password", "Address"],
    people: "Self + Father",
  },
  {
    date: "Jan 2025",
    source: "Alien TxtBase — Stealer Logs",
    description: "Browser-stored credentials harvested via infostealer malware affecting primary account.",
    tags: ["Email", "Password", "Phone"],
    people: "Self",
  },
  {
    date: "Nov 2024",
    source: "DarkForums Dump — Financial Platform",
    description: "PAN and banking credentials exposed from a financial services database dump.",
    tags: ["PAN", "Password", "Address"],
    people: "Self + Spouse",
  },
  {
    date: "Jul 2024",
    source: "BreachDB — Social Media",
    description: "Credential dump from social media platform breaches.",
    tags: ["Email", "Password", "Username"],
    people: "Self",
  },
  {
    date: "Mar 2024",
    source: "InfoStealer Collection — E-commerce",
    description: "Data from e-commerce and payment platforms via infostealer campaigns, including family member records.",
    tags: ["Email", "Password", "Phone", "Driving License"],
    people: "Self + Spouse",
  },
];

const TimelineSection = () => (
  <section>
    <p className="text-caps mb-2">Breach Timeline</p>
    <h2 className="text-display text-xl mb-1.5">Exposure chronology</h2>
    <p className="text-body text-sm mb-6">
      Timeline of breach events where your data was identified, ordered by recency.
    </p>

    <div className="relative">
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/50" />

      <div className="space-y-0">
        {events.map((event, i) => (
          <motion.div
            key={event.source}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative pl-12 pb-6 last:pb-0"
          >
            <div className="absolute left-[14px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-primary bg-card z-10" />

            <div className="card-surface !p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-display text-sm">{event.source}</p>
                  <p className="text-body text-xs mt-0.5 leading-relaxed">{event.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-caps text-[10px]">{event.date}</span>
                  <span className="text-[10px] text-muted-foreground">{event.people}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[9px] font-medium bg-secondary/50 text-muted-foreground border-border/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TimelineSection;
