export type RiskBand = "none" | "low" | "medium" | "critical";

export interface RiskContent {
  band: RiskBand;
  headline: string;
  body: string;
  supportingLine: string;
  secondarySupportingLine: string;
  ctaLabel: string;
  badgeLabel: string;
  badgeClass: string;
  ctaCardTitle: string;
  ctaCardBody: string;
  meterEmphasis: "safe" | "caution" | "warning" | "danger";
  // Locked-state clickbait copy (used only when comprehensive report is locked)
  lockedHeadline: string;
  lockedBody: string;
  // Locked-state urgency line shown under score card
  lockedScoreLine: string;
}

export function getRiskBand(score: number): RiskBand {
  if (score === 0) return "none";
  if (score <= 40) return "low";
  if (score <= 70) return "medium";
  return "critical";
}

const riskContentMap: Record<RiskBand, RiskContent> = {
  none: {
    band: "none",
    headline: "You're safe — keep it that way.",
    body: "Even clean data can be targeted. Insure against future risk.",
    supportingLine: "No active exposure was detected in the latest scan.",
    secondarySupportingLine: "You can still stay protected against future digital fraud.",
    ctaLabel: "Get Cyber Insurance",
    badgeLabel: "Safe",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    ctaCardTitle: "Stay protected",
    ctaCardBody: "Prepare for future digital risk with proactive coverage.",
    meterEmphasis: "safe",
    lockedHeadline: "Some personal records may still be exposed",
    lockedBody: "Unlock the comprehensive report to check document, source, and password-level findings.",
    lockedScoreLine: "Additional source-level findings may still be available",
  },
  low: {
    band: "low",
    headline: "Minor exposure detected.",
    body: "Small risks can grow. Stay covered just in case.",
    supportingLine: "A limited level of exposure was detected.",
    secondarySupportingLine: "Staying protected now can reduce future risk.",
    ctaLabel: "Get Cyber Insurance",
    badgeLabel: "Low Risk",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    ctaCardTitle: "Reduce your risk",
    ctaCardBody: "Minor exposure was found. Consider coverage to stay ahead.",
    meterEmphasis: "caution",
    lockedHeadline: "Your data may appear in limited breach sources",
    lockedBody: "Unlock the comprehensive report to review deeper source details and hidden exposed records.",
    lockedScoreLine: "The full report may reveal hidden supporting details",
  },
  medium: {
    band: "medium",
    headline: "Your data is at risk.",
    body: "Some of your details are out there. Cover yourself before it's misused.",
    supportingLine: "Some of your personal details may be exposed.",
    secondarySupportingLine: "It is a good time to review your protection.",
    ctaLabel: "Get Cyber Insurance",
    badgeLabel: "Medium Risk",
    badgeClass: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
    ctaCardTitle: "Reduce your risk",
    ctaCardBody: "Your exposed data could be used for fraud or identity misuse.",
    meterEmphasis: "warning",
    lockedHeadline: "Important personal details may be exposed",
    lockedBody: "Unlock the comprehensive report to see source-level details and affected records.",
  },
  critical: {
    band: "critical",
    headline: "Your data is exposed.",
    body: "Act now to prevent fraud or identity theft.",
    supportingLine: "Your data has been found across multiple breach sources.",
    secondarySupportingLine: "Immediate action is recommended.",
    ctaLabel: "Get Cyber Insurance",
    badgeLabel: "Critical Risk",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    ctaCardTitle: "Reduce your risk",
    ctaCardBody: "Your exposed data can be used for fraud or identity misuse.",
    meterEmphasis: "danger",
    lockedHeadline: "Your PAN or Aadhaar may be exposed",
    lockedBody: "Unlock the comprehensive report to see where high-risk identity data was found.",
  },
};

export function getRiskContent(score: number): RiskContent {
  return riskContentMap[getRiskBand(score)];
}

// Empty state messages for sections
export const emptyStates = {
  exposure: "No exposed credentials or personal details were found in the latest scan.",
  leakSources: "No breach sources were detected for the data checked in this scan.",
  affectedDomains: "No websites or services were linked to exposed records in the current results.",
  recommendations: "No urgent recommendations at this time. Keep your accounts secure.",
};
