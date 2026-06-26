import React from "react";
import { Leaf, Eye, ShieldCheck, Heart, Users, Sparkles, HelpCircle } from "lucide-react";
import { GENERAL_FAQ } from "../data";

export default function AboutSection() {
  const values = [
    {
      icon: Eye,
      title: "Early Biological Detection",
      description: "Spot complex microscopic plant pathologies, chlorosis, and insect infestations earlier than conventional observational farming methods."
    },
    {
      icon: ShieldCheck,
      title: "Sustainable Recommendations",
      description: "Our diagnosis system prioritizes eco-solvent treatments, organic micro-nutrients, and biological controls over toxic chemicals."
    },
    {
      icon: Users,
      title: "Farming Communities First",
      description: "Engineered to democratize high-grade agricultural extensions. Helping backyard gardeners and commercial organic farmers alike."
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in py-4">
      {/* Hero Brand Showcase */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-emerald-800 relative overflow-hidden">
        {/* Abstract leaf shape backdrop background */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4">
          <Leaf className="h-96 w-96 text-white" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-500/20 font-mono">
            <Sparkles className="h-3.5 w-3.5" /> Our Mission
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
            Bridge the gap between botany and Artificial Intelligence.
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-lg leading-relaxed font-sans font-light">
            Plantoos is a public agricultural-extension initiative that puts state-of-the-art multimodal machine vision inside every farmer's pocket. We provide instantaneous, granular diagnosis of leaf diseases, rusts, blights, and deficiencies, along with non-destructive, plant-safe remedies.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-emerald-200/90 font-mono">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>5+ Foliage Pathologies</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Organic-First Integrated Pest Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-950">
            Why Use Plantoos?
          </h3>
          <p className="text-emerald-800 text-sm sm:text-base">
            Constructed directly in alignment with modern agricultural science to support sustainable foliage cultivation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200 space-y-4"
              >
                <div className="inline-flex items-center justify-center p-3.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">{v.title}</h4>
                <p className="text-emerald-800/80 text-sm leading-relaxed font-sans">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Structured Guidelines and FAQ */}
      <section className="bg-emerald-50/50 rounded-2xl border border-emerald-100/80 p-6 sm:p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg text-white">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 font-sans">
            Guiding Principles & Support FAQ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GENERAL_FAQ.map((faq, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-sm sm:text-base font-bold text-emerald-900 border-l-2 border-emerald-500 pl-3">
                {faq.question}
              </h4>
              <p className="text-emerald-850 text-xs sm:text-sm leading-relaxed pl-3 pl-3">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-center max-w-xl mx-auto space-y-2 py-4">
        <Heart className="h-5 w-5 text-emerald-550 mx-auto animate-pulse" />
        <p className="text-[11px] text-emerald-600/70 leading-relaxed font-mono">
          PLANTOOS DIAGNOSTIC INTERFACE v1.2 • REAL-TIME INTERPRETATIVE BOTANICAL AI MODEL. NOT AN ABSOLUTE REPLACEMENT FOR PROFOUND LOCAL AGRICULTURAL TESTING STATIONS.
        </p>
      </section>
    </div>
  );
}
