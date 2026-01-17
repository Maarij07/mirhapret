"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SizeChartModalProps {
  category?: "tops" | "bottoms" | "dresses" | "traditional";
  inline?: boolean;
}

const sizeCharts = {
  tops: {
    title: "Tops & Blouses",
    headers: ["Size", "Bust (in)", "Waist (in)", "Length (in)"],
    rows: [
      ["XS", "32-34", "24-26", "24"],
      ["S", "34-36", "26-28", "25"],
      ["M", "36-38", "28-30", "26"],
      ["L", "38-40", "30-32", "27"],
      ["XL", "40-42", "32-34", "28"],
    ],
  },
  bottoms: {
    title: "Pants & Trousers",
    headers: ["Size", "Waist (in)", "Hip (in)", "Inseam (in)"],
    rows: [
      ["28", "28", "36", "30"],
      ["30", "30", "38", "30"],
      ["32", "32", "40", "31"],
      ["34", "34", "42", "31"],
      ["36", "36", "44", "32"],
    ],
  },
  dresses: {
    title: "Dresses & Gowns",
    headers: ["Size", "Bust (in)", "Waist (in)", "Hip (in)", "Length (in)"],
    rows: [
      ["XS", "32-34", "24-26", "34-36", "52"],
      ["S", "34-36", "26-28", "36-38", "53"],
      ["M", "36-38", "28-30", "38-40", "54"],
      ["L", "38-40", "30-32", "40-42", "55"],
    ],
  },
  traditional: {
    title: "Traditional Wear",
    headers: ["Size", "Bust (in)", "Waist (in)", "Hip (in)", "Kameez Length"],
    rows: [
      ["XS", "32-34", "24-26", "34-36", "42"],
      ["S", "34-36", "26-28", "36-38", "43"],
      ["M", "36-38", "28-30", "38-40", "44"],
      ["L", "38-40", "30-32", "40-42", "45"],
      ["XL", "40-42", "32-34", "42-44", "46"],
    ],
  },
};

export function SizeChartModal({ category = "tops", inline = false }: SizeChartModalProps) {
  const chart = sizeCharts[category];

  if (inline) {
    return (
      <div className="space-y-6">
        {/* Size Chart Table */}
        <div>
          <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-widest">
            {chart.title}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {chart.headers.map((header, index) => (
                    <th
                      key={index}
                      className="py-3 px-4 text-left font-medium text-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-100 last:border-0"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`py-3 px-4 text-gray-600 ${
                          cellIndex === 0 ? "font-medium text-black" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-widest">
            How to Measure
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-medium text-black min-w-[60px]">Bust</span>
              <span>Measure around the fullest part of your bust</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-black min-w-[60px]">Waist</span>
              <span>Measure around your natural waistline</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-black min-w-[60px]">Hip</span>
              <span>Measure around the fullest part of your hips</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-black min-w-[60px]">Length</span>
              <span>Measure from shoulder to desired length</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-xs text-gray-500 underline underline-offset-4 hover:text-black transition-colors"
          aria-label="View size chart"
        >
          Size Guide
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-200 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-black tracking-tight">
            Size Chart
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-8">
          {/* Size Chart Table */}
          <div>
            <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-widest">
              {chart.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {chart.headers.map((header, index) => (
                      <th
                        key={index}
                        className="py-3 px-4 text-left font-medium text-black"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-100 last:border-0"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`py-3 px-4 text-gray-600 ${
                            cellIndex === 0 ? "font-medium text-black" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-black mb-4 uppercase tracking-widest">
              How to Measure
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="font-medium text-black min-w-[60px]">Bust</span>
                <span>Measure around the fullest part of your bust</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-black min-w-[60px]">Waist</span>
                <span>Measure around your natural waistline</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-black min-w-[60px]">Hip</span>
                <span>Measure around the fullest part of your hips</span>
              </li>
              <li className="flex gap-3">
                <span className="font-medium text-black min-w-[60px]">Length</span>
                <span>Measure from shoulder to desired length</span>
              </li>
            </ul>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400 pt-4">
            All measurements are in inches. For the best fit, we recommend having measurements taken by a professional tailor.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
