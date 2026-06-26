import React, { useState } from "react";
import { Database, Download, ExternalLink, Library, Search, Layers } from "lucide-react";
import { DatasetItem } from "../types";

export default function DatasetSection({ datasets }: { datasets: DatasetItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Leaves", "Fruit", "Vegetables", "Mixed Crops"];

  // Filter datasets
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesCategory = selectedCategory === "All" || dataset.category === selectedCategory;
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in py-4">
      {/* Intro Header Section */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-150 text-emerald-855 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-250 font-mono">
            <Database className="h-3.5 w-3.5 text-emerald-600" /> Botanical Repositories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 font-sans tracking-tight">
            Academic & Agricultural Datasets
          </h2>
          <p className="text-emerald-800 text-sm leading-relaxed">
            Support your machine learning, deep learning or agricultural research using these curated open-access plant health databases. Click to explore or download raw image crops directly.
          </p>
        </div>
        
        {/* Statistics Pill */}
        <div className="bg-white border border-emerald-200 rounded-xl p-4 flex items-center gap-4 shadow-sm self-start md:self-auto">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-950">77,200+</div>
            <div className="text-[11px] text-emerald-700/80 uppercase tracking-widest font-mono">
              TOTAL SPECTRAL SAMPLES
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3 rounded-2xl border border-emerald-100 shadow-sm">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-emerald-600/70" />
          <input
            type="text"
            placeholder="Search plant datasets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/20 text-emerald-950 placeholder-emerald-700/50"
          />
        </div>
        
        {/* Category switcher */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedCategory(lvl)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 flex-1 sm:flex-none text-center ${
                selectedCategory === lvl
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/10"
                  : "bg-white text-emerald-800 border-emerald-100 hover:bg-emerald-50/50"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Grid */}
      {filteredDatasets.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDatasets.map((it) => (
            <div
              key={it.id}
              className="bg-white border border-emerald-100/90 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-250 flex flex-col justify-between p-6 relative overflow-hidden group"
            >
              {/* Category tag */}
              <div className="absolute right-4 top-4 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-200 font-mono">
                {it.category}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Database className="h-5 w-5" />
                  <span className="text-xs font-bold font-mono text-emerald-600">
                    REPOSITORY ENTRY
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-emerald-950 font-sans tracking-tight group-hover:text-emerald-700 transition-colors">
                    {it.name}
                  </h3>
                  <p className="text-emerald-800/80 text-xs sm:text-sm leading-relaxed font-sans">
                    {it.description}
                  </p>
                </div>

                {/* Micro info bar */}
                <div className="flex items-center gap-6 text-xs text-emerald-800 bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/50">
                  <div>
                    <span className="text-emerald-600/70 font-mono uppercase text-[10px] block">
                      Image Count:
                    </span>
                    <span className="font-bold font-sans text-emerald-900">
                      {it.sampleCount.toLocaleString()} captures
                    </span>
                  </div>
                  <div className="h-8 w-px bg-emerald-200/50" />
                  <div>
                    <span className="text-emerald-600/70 font-mono uppercase text-[10px] block">
                      Download Volume:
                    </span>
                    <span className="font-bold font-sans text-emerald-900">
                      {it.fileSize}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-emerald-50 flex flex-col sm:flex-row gap-3 sm:gap-2 items-center justify-between text-center sm:text-left">
                <span className="text-[10px] text-emerald-500/80 font-mono uppercase">
                  Subject strictly to Creative Commons License.
                </span>

                <a
                  href={it.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-750 hover:shadow-lg transition-all duration-200"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Obtain Data</span>
                  <ExternalLink className="h-3 w-3 inline" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-emerald-100 space-y-4">
          <Layers className="h-12 w-12 text-emerald-300 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-950">No datasets match filters</h3>
          <p className="text-emerald-700 text-sm">
            Try adjusting your query or resetting category selection back to 'All'.
          </p>
        </div>
      )}
    </div>
  );
}
