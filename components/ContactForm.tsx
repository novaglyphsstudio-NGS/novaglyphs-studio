"use client";

/**
 * NovaGlyphs Contact Form
 * Premium, minimal contact form. Fully functional client-side with loading + success states.
 * On submit: simulates a real request (replace with email service, Resend, Formspree, or API route).
 * Uses Sonner for elegant toast feedback.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please provide your name, email, and a message.");
      return;
    }

    setIsSubmitting(true);

    // === PRODUCTION INTEGRATION POINT ===
    // Replace this block with your preferred email/API integration.
    // Examples: 
    // - POST to /api/contact (create route handler)
    // - Resend / Sendgrid / Formspree / emailjs
    // For now we simulate a 900ms roundtrip and always succeed.
    await new Promise((r) => setTimeout(r, 900));

    toast.success("Transmission received. We will contact you within 48 hours.", {
      description: "NovaGlyphs Studio — Sovereign Systems",
      duration: 6200,
    });

    // Reset
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs tracking-[1px] text-white/60 uppercase">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Alex Rivera"
            required
            className="h-12 bg-white/[0.022] border-white/10 focus:border-[#00f0ff]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs tracking-[1px] text-white/60 uppercase">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@domain.com"
            required
            className="h-12 bg-white/[0.022] border-white/10 focus:border-[#00f0ff]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-xs tracking-[1px] text-white/60 uppercase">
          Organization / Project
        </Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your initiative or company"
          className="h-12 bg-white/[0.022] border-white/10 focus:border-[#00f0ff]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs tracking-[1px] text-white/60 uppercase">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about the intelligence problem you are trying to solve..."
          rows={7}
          required
          className="resize-y min-h-[148px] bg-white/[0.022] border-white/10 focus:border-[#00f0ff] text-[15px] leading-relaxed"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary h-12 w-full md:w-auto px-10 text-sm tracking-[1.5px] uppercase rounded-full disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Transmitting...
          </>
        ) : (
          <>
            Send Transmission <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-[11px] text-white/40 max-w-md leading-snug pt-1">
        All inquiries are handled directly by the NovaGlyphs team. We typically respond within two business days.
      </p>
    </form>
  );
}
