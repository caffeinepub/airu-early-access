import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSubmitWaitlist } from "../hooks/useQueries";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isWhatsApp, setIsWhatsApp] = useState(true);
  const [city, setCity] = useState("");
  const [submittedCount, setSubmittedCount] = useState<bigint | null>(null);
  const submitWaitlist = useSubmitWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) return;
    try {
      const count = await submitWaitlist.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        isWhatsApp,
        city: city.trim(),
      });
      setSubmittedCount(count);
    } catch {
      // error handled by mutation state
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setIsWhatsApp(true);
      setCity("");
      setSubmittedCount(null);
      submitWaitlist.reset();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="waitlist.modal"
        className="max-w-md rounded-2xl p-0 overflow-hidden border-0 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {submittedCount !== null ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-10 flex flex-col items-center text-center gap-4"
              data-ocid="waitlist.success_state"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "#f5f0e8" }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: "#0a0a0a" }} />
              </div>
              <h3 className="text-2xl font-semibold text-[#0a0a0a]">
                You&apos;re reserved!
              </h3>
              <p className="text-[#666] text-base">
                You&apos;ve joined{" "}
                <span className="font-semibold text-[#0a0a0a]">
                  {submittedCount.toString()} others
                </span>{" "}
                from the first batch.
              </p>
              <p className="text-sm text-[#888]">
                We&apos;ll notify you before launch. No spam.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-2 rounded-full bg-[#0a0a0a] text-white px-8 py-3 text-sm font-medium hover:bg-[#333] transition-colors"
                data-ocid="waitlist.close_button"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="px-8 pt-8 pb-6" style={{ background: "#f5f0e8" }}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#0a0a0a]">
                    Reserve your spot (Free)
                  </DialogTitle>
                  <p className="text-[#666] text-sm mt-2 leading-relaxed">
                    No payment required &bull; Early access only
                  </p>
                </DialogHeader>
              </div>
              <form
                onSubmit={handleSubmit}
                className="px-8 py-6 space-y-4 bg-white"
              >
                <div className="space-y-1.5">
                  <Label
                    htmlFor="wl-name"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    Name
                  </Label>
                  <Input
                    id="wl-name"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl border-[#e0e0e0] focus-visible:ring-[#0a0a0a]"
                    data-ocid="waitlist.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="wl-phone"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="wl-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="rounded-xl border-[#e0e0e0] focus-visible:ring-[#0a0a0a]"
                    data-ocid="waitlist.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="wl-city"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    City
                  </Label>
                  <Input
                    id="wl-city"
                    placeholder="Mumbai, Delhi, Bangalore..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="rounded-xl border-[#e0e0e0] focus-visible:ring-[#0a0a0a]"
                    data-ocid="waitlist.input"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWhatsApp}
                    onChange={(e) => setIsWhatsApp(e.target.checked)}
                    className="rounded border-[#ddd] accent-[#0a0a0a] w-4 h-4"
                    data-ocid="waitlist.checkbox"
                  />
                  <span className="text-sm text-[#555]">
                    This is my WhatsApp number
                  </span>
                </label>
                {submitWaitlist.isError && (
                  <p
                    className="text-red-500 text-sm"
                    data-ocid="waitlist.error_state"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitWaitlist.isPending}
                  className="w-full rounded-full bg-[#0a0a0a] text-white py-3.5 text-sm font-semibold hover:bg-[#222] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  data-ocid="waitlist.submit_button"
                >
                  {submitWaitlist.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Reserving...
                    </>
                  ) : (
                    "Reserve your spot (Free)"
                  )}
                </button>
                <p className="text-center text-xs text-[#aaa] leading-relaxed">
                  We&apos;ll notify you before launch. No spam. No payment
                  required.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
