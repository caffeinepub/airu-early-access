import { CheckCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSubmitWaitlist } from "../hooks/useQueries";

interface WaitlistFormProps {
  theme?: "light" | "dark";
}

export function WaitlistForm({ theme = "light" }: WaitlistFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitWaitlist = useSubmitWaitlist();

  const isDark = theme === "dark";

  const inputClass = isDark
    ? "w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
    : "w-full rounded-xl border border-[#ddd] bg-white text-[#111111] placeholder-[#aaa] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] transition-all";

  const labelClass = isDark
    ? "block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide"
    : "block text-xs font-medium text-[#888] mb-1.5 uppercase tracking-wide";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) return;
    try {
      await submitWaitlist.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        isWhatsApp,
        city: city.trim(),
      });
      setSubmitted(true);
    } catch {
      // handled by mutation state
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 py-6"
          data-ocid="waitlist.success_state"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDark ? "bg-white/10" : "bg-[#f0ebe3]"
            }`}
          >
            <CheckCircle
              className={`w-6 h-6 ${isDark ? "text-white" : "text-[#111111]"}`}
            />
          </div>
          <p
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-[#111111]"
            }`}
          >
            You're in.
          </p>
          <p className={`text-sm ${isDark ? "text-white/60" : "text-[#888]"}`}>
            We'll notify you before launch.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-4"
          data-ocid="waitlist.modal"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wf-name" className={labelClass}>
                Name
              </label>
              <input
                id="wf-name"
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
                data-ocid="waitlist.input"
              />
            </div>
            <div>
              <label htmlFor="wf-phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="wf-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={inputClass}
                data-ocid="waitlist.input"
              />
            </div>
          </div>
          <div>
            <label htmlFor="wf-city" className={labelClass}>
              City / Area
            </label>
            <input
              id="wf-city"
              list="wf-city-suggestions"
              placeholder="e.g. Gurgaon, Delhi, Mumbai..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className={inputClass}
              data-ocid="waitlist.input"
            />
            <datalist id="wf-city-suggestions">
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
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isWhatsApp}
              onChange={(e) => setIsWhatsApp(e.target.checked)}
              className={`rounded w-4 h-4 ${
                isDark ? "accent-white" : "accent-[#111111]"
              }`}
              data-ocid="waitlist.checkbox"
            />
            <span
              className={`text-sm ${isDark ? "text-white/60" : "text-[#666]"}`}
            >
              This is my WhatsApp number
            </span>
          </label>
          {submitWaitlist.isError && (
            <p
              className="text-red-400 text-sm"
              data-ocid="waitlist.error_state"
            >
              Something went wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={submitWaitlist.isPending}
            className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg ${
              isDark
                ? "bg-white text-[#111111] hover:bg-white/95"
                : "bg-[#111111] text-white hover:bg-[#333]"
            }`}
            data-ocid="waitlist.submit_button"
          >
            {submitWaitlist.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Joining...
              </>
            ) : (
              "Join Early Access"
            )}
          </button>
          <p
            className={`text-center text-xs ${
              isDark ? "text-white/40" : "text-[#aaa]"
            }`}
          >
            No payment required • We'll notify you before launch
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
