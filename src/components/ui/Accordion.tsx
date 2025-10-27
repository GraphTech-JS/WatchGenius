"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export type AccordionItem<K extends string = string> = {
  key: K;
  title: React.ReactNode;
  content: React.ReactNode;
};

type AccordionProps<K extends string = string> = {
  items: AccordionItem<K>[];
  multiple?: boolean;
  initialOpenKeys?: K[];
  openKeys?: K[];
  onOpenChange?: (keys: K[]) => void;
  className?: string;
};

export function Accordion<K extends string = string>({
  items,
  multiple = true,
  initialOpenKeys = [],
  openKeys,
  onOpenChange,
  className,
}: AccordionProps<K>) {
  const controlled = openKeys !== undefined;
  const [internalOpen, setInternalOpen] = useState<K[]>(initialOpenKeys as K[]);
  const currentOpen = controlled ? (openKeys as K[]) : internalOpen;

  const toggle = (key: K) => {
    const isOpen = currentOpen.includes(key);
    let next: K[];
    if (multiple) {
      next = isOpen
        ? currentOpen.filter((k) => k !== key)
        : [...currentOpen, key];
    } else {
      next = isOpen ? [] : [key];
    }
    if (!controlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const toId = (title: React.ReactNode, idx: number) =>
    typeof title === "string"
      ? `section-${title.toLowerCase().replace(/\s+/g, "-")}`
      : `section-${idx}`;

  return (
    <div className={["mb-8 space-y-1", className].filter(Boolean).join(" ")}>
      {items.map((it, idx) => {
        const isOpen = currentOpen.includes(it.key);
        const id = toId(it.title, idx);

        return (
          <div key={it.key}>
            <button
              onClick={() => toggle(it.key)}
              aria-expanded={isOpen}
              aria-controls={id}
              className="w-full flex items-center justify-between py-3
                         text-[20px]  font-[var(--font-inter)] text-[var(--text-dark)]
                         cursor-pointer  rounded-[8px]
                         transition-colors duration-200"
            >
              <span>{it.title}</span>
              <FaChevronDown
                className={`text-[20px] transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "rotate-180 text-[#04694f]"
                    : "text-[var(--text-dark)]"
                }`}
              />
            </button>

            <div
              id={id}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen
                  ? "pb-3 opacity-100 max-h-[500px]"
                  : "pb-0 max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2">{it.content}</div>
            </div>

            {idx < items.length - 1 && (
              <div className="h-px bg-[rgba(23,20,20,0.1)] " />
            )}
          </div>
        );
      })}
    </div>
  );
}
