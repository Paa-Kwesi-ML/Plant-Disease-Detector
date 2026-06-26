import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, Phone, HelpCircle, MessageSquare, Copy, Check, ExternalLink } from "lucide-react";
import { ContactFormData } from "../types";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    topic: "General Diagnosis Question",
    message: ""
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    subject: string;
    body: string;
    mailtoUrl: string;
  } | null>(null);

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const subject = `Plantoos Enquiry: ${formData.fullName} - ${formData.topic}`;
    const body = `Hi Plantoos team,\n\nI have the following enquiry:\n\nTopic: ${formData.topic}\nName: ${formData.fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n--\nSent via Plantoos Portal`;
    const mailtoUrl = `mailto:paabartels1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setLastSubmittedData({
      subject,
      body,
      mailtoUrl
    });

    try {
      // Send message to our server-side API first
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        
        // Attempt programmatic auto-open
        try {
          window.location.href = mailtoUrl;
        } catch (redirectError) {
          console.warn("Iframe mailto redirect prevented", redirectError);
        }
        
        setFormData({
          fullName: "",
          email: "",
          topic: "General Diagnosis Question",
          message: ""
        });
      }, 800);
    } catch (err) {
      console.error("Error sending contact inquiry:", err);
      // Fail gracefully: still transition and make email ready
      setLoading(false);
      setSubmitted(true);
      try {
        window.location.href = mailtoUrl;
      } catch (redirectError) {
        console.warn("Iframe mailto redirect prevented", redirectError);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in py-4">
      {/* Intro Header */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 sm:p-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-250 font-mono">
          <Mail className="h-3.5 w-3.5 text-emerald-600" /> Plant Extensions
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 font-sans tracking-tight mt-2">
          Reach Our Plant Health Team
        </h2>
        <p className="text-emerald-800 text-sm max-w-3xl mt-1">
          Have an unidentified plant disease or questions regarding the Plantoos reports? Write to us below. Our researchers and plant care team typically respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-950 border-b border-emerald-50 pb-3 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              Office Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-emerald-650 uppercase">
                    Location
                  </h4>
                  <p className="text-sm font-semibold text-emerald-900">
                    Kwame Nkrumah University of Science and Technology
                  </p>
                  <p className="text-xs text-emerald-700/90 leading-relaxed font-sans">
                    Kumasi - Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 mt-1">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-emerald-650 uppercase">
                    E-mail
                  </h4>
                  <p className="text-sm font-semibold text-emerald-900">
                    paabartels1@gmail.com
                  </p>
                  <p className="text-xs text-emerald-700/80 font-sans">
                    For custom inquiries, collaborations, or general dataset feedback.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100 mt-1">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-emerald-650 uppercase">
                    Phone contact or hotline
                  </h4>
                  <p className="text-sm font-semibold text-emerald-900">
                    +233 554062406
                  </p>
                  <p className="text-xs text-emerald-700/80 font-sans">
                    Mon-Fri • 8:00 AM - 5:00 PM GMT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-600 border border-emerald-700 text-white rounded-2xl p-6 space-y-3 relative overflow-hidden shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono">
              Academic Partnerships
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              We frequently accept leaf scans, drone-recorded thermal imagery, and localized plant-phenotyping repositories to supplement our educational dataset. Feel free to request secure upload pipelines for research partnerships.
            </p>
          </div>
        </div>

        {/* Contact Form card */}
        <div className="lg:col-span-7 bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="space-y-6 animate-fade-in text-slate-800">
              <div className="text-center py-6 border-b border-slate-100">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 text-emerald-600 border border-emerald-105 rounded-full mb-3">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950 font-sans tracking-tight">
                  Inquiry Logged & Prepared!
                </h3>
                <p className="text-emerald-800/95 text-xs sm:text-sm max-w-md mx-auto mt-1.5 leading-relaxed">
                  Thank you! Your message has been recorded. To send your message directly to <strong className="font-extrabold text-emerald-950">paabartels1@gmail.com</strong>, choose one of the reliable methods below.
                </p>
              </div>

              {/* Option 1: Direct link triggering */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono block">
                  Option 1: Send via Local Email Application
                </span>
                <a
                  href={lastSubmittedData?.mailtoUrl}
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-4 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.005] active:scale-[0.995] text-white font-extrabold rounded-xl text-xs uppercase tracking-widest shadow-md transition-all duration-150 cursor-pointer text-center"
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>Launch Email App (Pre-filled)</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-[10px] text-slate-500 font-mono text-center leading-normal">
                  *Bypasses browser restrictions. Compatible with Outlook, Apple Mail, Mail on Mobile, etc.
                </p>
              </div>

              {/* Option 2: Clipboard copy assistant */}
              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Option 2: Copy-Paste for Webmail
                  </span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-extrabold uppercase font-mono">
                    Reliable Fallback
                  </span>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  If you use browser-based webmail (such as Gmail, Outlook Web, or Yahoo Mail in a browser tab), copy and paste the pre-filled fields below:
                </p>

                <div className="space-y-3.5 text-xs">
                  {/* Recipient */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">Recipient Address</span>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                      <input 
                        type="text" 
                        readOnly 
                        value="paabartels1@gmail.com" 
                        className="bg-transparent flex-1 focus:outline-none text-slate-800 font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy("paabartels1@gmail.com", "recipient")}
                        className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-emerald-600 rounded-lg transition-colors flex items-center gap-1 font-mono text-[10px] font-bold uppercase shrink-0"
                        title="Copy Recipient Address"
                      >
                        {copiedField === "recipient" ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        <span>{copiedField === "recipient" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">Subject Line</span>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={lastSubmittedData?.subject || ""} 
                        className="bg-transparent flex-1 focus:outline-none text-slate-800 truncate font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(lastSubmittedData?.subject || "", "subject")}
                        className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-emerald-600 rounded-lg transition-colors flex items-center gap-1 font-mono text-[10px] font-bold uppercase shrink-0"
                        title="Copy Subject Line"
                      >
                        {copiedField === "subject" ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        <span>{copiedField === "subject" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block">Email Body</span>
                    <div className="relative bg-white border border-slate-200 rounded-xl p-3">
                      <textarea 
                        readOnly 
                        rows={4}
                        value={lastSubmittedData?.body || ""} 
                        className="w-full bg-transparent focus:outline-none text-slate-700 font-sans resize-none text-[11px] leading-relaxed pb-8"
                      />
                      <div className="absolute right-2 bottom-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(lastSubmittedData?.body || "", "body")}
                          className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-lg border border-slate-150 transition-colors flex items-center gap-1 font-mono text-[10px] font-bold uppercase"
                          title="Copy Email Body"
                        >
                          {copiedField === "body" ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedField === "body" ? "Copied Message" : "Copy Message"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-650 hover:text-emerald-700 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  Send New Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold text-emerald-950 tracking-wide uppercase block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full text-sm border border-emerald-100 bg-emerald-50/20 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-950 placeholder-emerald-700/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-emerald-950 tracking-wide uppercase block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@gmail.com"
                    className="w-full text-sm border border-emerald-100 bg-emerald-50/20 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-950 placeholder-emerald-700/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="topic" className="text-xs font-bold text-emerald-950 tracking-wide uppercase block">
                  Select Botanical Area
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full text-sm border border-emerald-100 bg-emerald-50/20 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-950"
                >
                  <option value="General Diagnosis Question">General Diagnosis Question</option>
                  <option value="Pathology Corpus Downloads">Pathology Corpus Downloads</option>
                  <option value="Research & Bio-Dome Integration">Research & Bio-Dome Integration</option>
                  <option value="Urgent Disease Outbreak Warning">Urgent Disease Outbreak Warning</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label id="message-label" htmlFor="message" className="text-xs font-bold text-emerald-950 tracking-wide uppercase block">
                  Your Plant Symptoms / Research Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your plant condition, weather patterns, historical irrigation or questions here..."
                  className="w-full text-sm border border-emerald-100 bg-emerald-50/20 px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-950 placeholder-emerald-700/40"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300 font-bold rounded-xl text-xs uppercase tracking-widest hover:shadow-lg transition-all duration-200"
              >
                {loading ? (
                  <span>transmitting botanical report...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Deliver Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
