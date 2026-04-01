import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentFailureModalProps {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export const ReportPaymentFailureModal = ({ open, onClose, onRetry }: PaymentFailureModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[400px] p-0 rounded-[20px] border-border/30 overflow-hidden gap-0 [&>button]:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="p-6 py-10 flex flex-col items-center text-center"
      >
        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
          <AlertCircle className="h-7 w-7 text-destructive" strokeWidth={1.5} />
        </div>
        <h3 className="text-display text-lg mb-2">Payment failed</h3>
        <p className="text-body text-sm max-w-[300px] mb-2 leading-relaxed">
          Your ₹99 payment for the comprehensive report could not be completed.
        </p>
        <p className="text-body text-xs text-muted-foreground mb-6">
          Please try again or contact contact@mitigata.com if the issue continues.
        </p>
        <div className="flex gap-3 w-full max-w-[260px]">
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
    <DialogContent className="sm:max-w-[400px] p-0 rounded-[20px] border-border/30 overflow-hidden gap-0 [&>button]:hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="p-6 py-10 flex flex-col items-center text-center"
      >
        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
          <AlertCircle className="h-7 w-7 text-destructive" strokeWidth={1.5} />
        </div>
        <h3 className="text-display text-lg mb-2">Insurance payment failed</h3>
        <p className="text-body text-sm max-w-[300px] mb-2 leading-relaxed">
          Your cyber insurance payment could not be completed.
        </p>
        <p className="text-body text-xs text-muted-foreground mb-6">
          Please try again or contact contact@mitigata.com for support.
        </p>
        <div className="flex gap-3 w-full max-w-[260px]">
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
