import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentFailureModalProps {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export const ReportPaymentFailureModal = ({ open, onClose, onRetry }: PaymentFailureModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[360px] p-0 rounded-[20px] border-border/30 overflow-hidden gap-0 [&>button]:hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-8 flex flex-col items-center text-center"
      >
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" strokeWidth={1.5} />
        </div>
        <h3 className="text-foreground font-semibold text-base mb-1.5">Payment failed</h3>
        <p className="text-muted-foreground text-sm mb-6">
          ₹99 report payment could not be completed.
        </p>
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-10 text-sm"
          >
            Close
          </Button>
          <Button
            onClick={onRetry}
            className="flex-1 bg-foreground hover:bg-foreground/90 text-background h-10 font-semibold text-sm"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    </DialogContent>
  </Dialog>
);

export const InsurancePaymentFailureModal = ({ open, onClose, onRetry }: PaymentFailureModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[360px] p-0 rounded-[20px] border-border/30 overflow-hidden gap-0 [&>button]:hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="p-8 flex flex-col items-center text-center"
      >
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" strokeWidth={1.5} />
        </div>
        <h3 className="text-foreground font-semibold text-base mb-1.5">Insurance payment failed</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Your cyber insurance payment could not be completed.
        </p>
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-10 text-sm"
          >
            Close
          </Button>
          <Button
            onClick={onRetry}
            className="flex-1 bg-foreground hover:bg-foreground/90 text-background h-10 font-semibold text-sm"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    </DialogContent>
  </Dialog>
);
