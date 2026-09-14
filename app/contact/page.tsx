"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import PromoTicker from "@/components/PromoTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-blush flex flex-col justify-between">
      <div>
        <PromoTicker />
        <Header
          onSearch={() => {}}
          onCategorySelect={() => {}}
          activeCategory="All"
        />

        <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-ink/60 hover:text-charcoal mb-8"
          >
            <ArrowLeft size={15} /> Back to storefront
          </Link>

          <div className="mb-12">
            <p className="text-[12px] tracking-[0.25em] text-champagne uppercase font-medium mb-2">
              Customer Care & Atelier Showroom
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
              Get in Touch
            </h1>
            <p className="text-ink/60 text-[14px] mt-2">
              Whether you need fitting advice, custom bridal sizing, or order updates, our Lahore concierge team is here to assist.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Details Column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-charcoal/10 p-6 space-y-5">
                <div className="flex gap-3">
                  <MapPin size={20} className="text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[14px] text-charcoal">
                      Flagship Boutique
                    </h3>
                    <p className="text-[13px] text-ink/70 leading-relaxed mt-1">
                      14-L, M.M. Alam Road, Gulberg III,
                      <br />
                      Lahore, Punjab, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-charcoal/10">
                  <Phone size={20} className="text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[14px] text-charcoal">
                      Phone Helpline
                    </h3>
                    <p className="text-[13px] text-ink/70 mt-1">
                      +92 (42) 3575-8921
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-charcoal/10">
                  <MessageSquare size={20} className="text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[14px] text-charcoal">
                      WhatsApp Concierge
                    </h3>
                    <p className="text-[13px] text-ink/70 mt-1">
                      +92 300 8492211
                    </p>
                    <a
                      href="https://wa.me/923008492211"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[12px] text-champagne font-medium mt-1 hover:underline"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-charcoal/10">
                  <Mail size={20} className="text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[14px] text-charcoal">
                      Email Support
                    </h3>
                    <p className="text-[13px] text-ink/70 mt-1">care@soleve.pk</p>
                    <p className="text-[13px] text-ink/50">concierge@soleve.pk</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 border-t border-charcoal/10">
                  <Clock size={20} className="text-champagne shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[14px] text-charcoal">
                      Operating Hours
                    </h3>
                    <p className="text-[13px] text-ink/70 mt-1">
                      Mon – Sat: 11:00 AM – 9:00 PM PKT
                    </p>
                    <p className="text-[13px] text-ink/50">
                      Sunday: 2:00 PM – 8:00 PM PKT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Inquiry Form */}
            <div className="md:col-span-3">
              <div className="bg-white border border-charcoal/10 p-7 md:p-8">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-charcoal text-blush flex items-center justify-center mx-auto">
                      <CheckCircle size={28} className="text-champagne" />
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal">
                      Message Received
                    </h3>
                    <p className="text-[14px] text-ink/70 max-w-sm mx-auto">
                      Thank you for reaching out, {form.name}. Our concierge team will contact you via {form.phone} within 4 working hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          phone: "",
                          email: "",
                          subject: "Order Inquiry",
                          message: "",
                        });
                      }}
                      className="bg-charcoal text-blush px-6 py-2.5 text-[13px] tracking-wide mt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="font-serif text-xl text-charcoal mb-4">
                      Send Us a Message
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-ink/60 mb-1.5 font-medium">
                          Your Name *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Fatima Ali"
                          className="w-full border border-charcoal/20 px-3.5 py-2.5 text-[13px] outline-none focus:border-champagne"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] text-ink/60 mb-1.5 font-medium">
                          Phone Number (with WhatsApp) *
                        </label>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="0300-1234567"
                          className="w-full border border-charcoal/20 px-3.5 py-2.5 text-[13px] outline-none focus:border-champagne"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-ink/60 mb-1.5 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="fatima@example.com"
                          className="w-full border border-charcoal/20 px-3.5 py-2.5 text-[13px] outline-none focus:border-champagne"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] text-ink/60 mb-1.5 font-medium">
                          Subject
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                          }
                          className="w-full border border-charcoal/20 px-3.5 py-2.5 text-[13px] outline-none focus:border-champagne bg-white"
                        >
                          <option value="Order Inquiry">Order Inquiry & Tracking</option>
                          <option value="Size Consultation">Size & Fit Consultation</option>
                          <option value="Bridal Customization">Custom Bridal Khussa</option>
                          <option value="Exchange or Return">Exchange or Return</option>
                          <option value="Other">Other Query</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] text-ink/60 mb-1.5 font-medium">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Please describe how we can assist you..."
                        className="w-full border border-charcoal/20 px-3.5 py-2.5 text-[13px] outline-none focus:border-champagne resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-charcoal text-blush py-3.5 text-[13px] tracking-wide hover:bg-ink transition-colors"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
