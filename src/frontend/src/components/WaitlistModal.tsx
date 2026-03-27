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
  const [isWhatsApp, setIsWhatsApp] = useState(false);
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
      setIsWhatsApp(false);
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
              <div className="w-16 h-16 rounded-full bg-[#f0ebe3] flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#111111]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#111111] font-serif">
                You're in!
              </h3>
              <p className="text-[#666666] text-base">
                You've joined{" "}
                <span className="font-semibold text-[#111111]">
                  {submittedCount.toString()} others
                </span>{" "}
                from the first batch.
              </p>
              <p className="text-sm text-[#666666]">
                We'll contact you before launch.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-2 rounded-full bg-[#111111] text-white px-8 py-3 text-sm font-medium hover:bg-[#333] transition-colors"
                data-ocid="waitlist.close_button"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-[#f0ebe3] px-8 pt-8 pb-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display font-semibold text-[#111111]">
                    Reserve Your Unit
                  </DialogTitle>
                  <p className="text-[#666666] text-sm mt-1">
                    Takes 30 seconds. No payment required.
                  </p>
                </DialogHeader>
              </div>
              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="wl-name"
                    className="text-[#111111] text-sm font-medium"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="wl-name"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl border-[#ddd] focus-visible:ring-[#111111] text-[#111111]"
                    data-ocid="waitlist.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="wl-phone"
                    className="text-[#111111] text-sm font-medium"
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
                    className="rounded-xl border-[#ddd] focus-visible:ring-[#111111] text-[#111111]"
                    data-ocid="waitlist.input"
                  />
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWhatsApp}
                    onChange={(e) => setIsWhatsApp(e.target.checked)}
                    className="rounded border-[#ddd] accent-[#111111] w-4 h-4"
                    data-ocid="waitlist.checkbox"
                  />
                  <span className="text-sm text-[#555]">
                    This is my WhatsApp number
                  </span>
                </label>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="wl-city"
                    className="text-[#111111] text-sm font-medium"
                  >
                    City / Area
                  </Label>
                  <input
                    id="wl-city"
                    list="city-suggestions"
                    placeholder="e.g. Gurgaon, Delhi, Mumbai..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full rounded-xl border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#111111] text-[#111111] px-3 py-2 text-sm bg-white"
                    data-ocid="waitlist.input"
                  />
                  <datalist id="city-suggestions">
                    <option value="Gurgaon" />
                    <option value="Delhi" />
                    <option value="Noida" />
                    <option value="Bangalore" />
                    <option value="Mumbai" />
                    <option value="Chennai" />
                    <option value="Hyderabad" />
                    <option value="Pune" />
                    <option value="Kolkata" />
                    <option value="Jaipur" />
                  </datalist>
                </div>
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
                  className="w-full rounded-full bg-[#111111] text-white py-3 text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  data-ocid="waitlist.submit_button"
                >
                  {submitWaitlist.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Reserving...
                    </>
                  ) : (
                    "Reserve My Unit"
                  )}
                </button>
                <div className="text-center space-y-1 pt-1">
                  <p className="text-xs text-[#999]">No spam. Only updates.</p>
                  <p className="text-xs text-[#999]">
                    We'll contact you before launch
                  </p>
                  <p className="text-xs text-[#999]">No payment required</p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
