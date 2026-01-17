"use client";

import Link from "next/link";

interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const sections: FooterSection[] = [
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Delivery & Returns", href: "/delivery" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-800" role="contentinfo">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-16 md:mb-20">
          {sections.map((section) => (
            <nav key={section.title}>
              <h3 className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs text-gray-500">
          <p>
            © {currentYear} mirhapret. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span>Crafted with intention</span>
            <span>Pakistan-based</span>
          </div>
        </div>
      </div>
    </footer>
  );
}