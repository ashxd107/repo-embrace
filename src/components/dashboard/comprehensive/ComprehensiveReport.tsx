import DocumentsSection from "./DocumentsSection";
import CompLeakSources from "./CompLeakSources";
import PasswordsSection from "./PasswordsSection";
import TimelineSection from "./TimelineSection";
import ComprehensiveSubNav from "./ComprehensiveSubNav";

interface ComprehensiveReportProps {
  activeSection?: string;
  isUnlocked?: boolean;
  onNavigate?: (id: string) => void;
}

const ComprehensiveReport = ({ activeSection = "comp-documents", isUnlocked = true, onNavigate }: ComprehensiveReportProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case "comp-documents":
        return <DocumentsSection />;
      case "comp-leak-sources":
        return <CompLeakSources isUnlocked={isUnlocked} />;
      case "comp-passwords":
        return <PasswordsSection isUnlocked={isUnlocked} />;
      case "comp-timeline":
        return <TimelineSection />;
      default:
        return <DocumentsSection />;
    }
  };

  return (
    <div className="py-3 sm:py-4 lg:py-6">
      {onNavigate && (
        <ComprehensiveSubNav activeSection={activeSection} onNavigate={onNavigate} />
      )}
      {renderSection()}
    </div>
  );
};

export default ComprehensiveReport;
