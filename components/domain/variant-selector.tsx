"use client";

import { useState } from "react";

export interface SelectedVariants {
  [key: string]: string;
}

interface VariantOption {
  label: string;
  value: string;
}

interface Variant {
  name: string;
  type: "size" | "color";
  options: VariantOption[];
}

interface VariantSelectorProps {
  variants: Variant[];
  onSelectVariant: (variants: SelectedVariants) => void;
}

export function VariantSelector({
  variants,
  onSelectVariant,
}: VariantSelectorProps) {
  const [selected, setSelected] = useState<SelectedVariants>({});

  const handleSelect = (variantName: string, optionValue: string) => {
    const newSelected = {
      ...selected,
      [variantName]: optionValue,
    };
    setSelected(newSelected);
    onSelectVariant(newSelected);
  };

  return (
    <div className="space-y-6">
      {variants.map((variant) => (
        <div key={variant.name} className="space-y-3">
          <label className="text-sm font-medium text-black">
            {variant.name}
          </label>

          {variant.type === "size" ? (
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(variant.name, option.value)}
                  className={`px-4 py-2 border text-sm font-medium transition-colors ${
                    selected[variant.name] === option.value
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-black hover:border-black"
                  }`}
                  aria-pressed={selected[variant.name] === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {variant.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(variant.name, option.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-colors flex items-center justify-center ${
                    selected[variant.name] === option.value
                      ? "border-black"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  aria-label={`${variant.name}: ${option.label}`}
                  aria-pressed={selected[variant.name] === option.value}
                  title={option.label}
                >
                  {selected[variant.name] === option.value && (
                    <span className="w-2 h-2 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
