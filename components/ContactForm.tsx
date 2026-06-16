"use client";

/**
 * NovaGlyphs Contact Form - Production Ready
 * 
 * For a fully live form:
 * 1. Go to https://formspree.io (free)
 * 2. Create a new form
 * 3. Copy the endpoint (looks like https://formspree.io/f/xxxxxx)
 * 4. Replace the FORMSPREE_ENDPOINT below with your real one.
 * 
 * This will actually deliver emails to you with the data.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

// === IMPORTANT: Replace this with your real Formspree endpoint ===
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID_HERE";

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

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          message: formData.message,
          _subject: `New inquiry from ${formData.name} via NovaGlyphs Studio`,
        }),
      });

      if (response.ok) {
        toast.success("Transmission received.", {
          description: "We'll respond within 48 hours. Thank you.",
          duration: 7000,
        });

        // Reset form
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Something went wrong sending your message.", {
        description: "Please try again or email us directly via the links below.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
