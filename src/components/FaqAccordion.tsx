"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900 text-sm sm:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${
                  isOpen ? "rotate-180 text-emerald-600" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

