"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { ChevronDown, Package, Plus, Minus, Trash2, Lock } from "lucide-react";

interface FormData {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  area: string;
  postalCode: string;
  notes: string;
  paymentMethod: "cod" | "bank";
}

const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Other",
];

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const itemCount = useCartStore((state) => state.getItemCount());
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [expandedSection, setExpandedSection] = useState<"email" | "shipping" | "payment">("email");
  const [isProcessing, setIsProcessing] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [validatedSections, setValidatedSections] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    area: "",
    postalCode: "",
    notes: "",
    paymentMethod: "cod",
  });

  const shippingCost = totalPrice >= 5000 ? 0 : 299;
  const finalTotal = totalPrice + shippingCost;

  // Validation functions
  const validateContact = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.phone.trim()) {
      newErrors["phone"] = "Mobile number is required";
    } else if (formData.phone.length < 10) {
      newErrors["phone"] = "Mobile number must be at least 10 digits";
    }

    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors["email"] = "Please enter a valid email";
    }

    return newErrors;
  };

  const validateShipping = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors["firstName"] = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors["lastName"] = "Last name is required";
    }
    if (!formData.address.trim()) {
      newErrors["address"] = "Address is required";
    }
    if (!formData.city) {
      newErrors["city"] = "City is required";
    }

    return newErrors;
  };

  const isContactValid = () => {
    return Object.keys(validateContact()).length === 0;
  };

  const isShippingValid = () => {
    return Object.keys(validateShipping()).length === 0;
  };

  const handleAccordionClick = (section: "email" | "shipping" | "payment") => {
    // Validate current section before switching
    let currentErrors: { [key: string]: string } = {};

    if (expandedSection === "email") {
      currentErrors = validateContact();
    } else if (expandedSection === "shipping") {
      currentErrors = validateShipping();
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setValidatedSections(new Set([...validatedSections, expandedSection]));
      
      // Scroll to first error field
      setTimeout(() => {
        const firstErrorField = document.querySelector('[data-error="true"]') as HTMLInputElement | HTMLSelectElement | null;
        if (firstErrorField) {
          firstErrorField.focus();
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
      return;
    }

    setErrors({});
    setExpandedSection(expandedSection === section ? "email" : section);
  };

  // Empty cart redirect
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-medium text-black">Your cart is empty</h1>
            <p className="text-gray-500 text-sm max-w-sm">
              Add some items to your cart before checking out.
            </p>
            <Link href="/category/pret" className="inline-block mt-6">
              <Button className="bg-black text-white hover:bg-gray-900 px-8 py-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsProcessing(false);
    // Redirect to order confirmation
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Accordion Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Contact Information Section */}
            <div className={`border ${expandedSection === "email" ? "border-gray-200" : validatedSections.has("email") && !isContactValid() ? "border-red-500" : "border-gray-200"}`}>
              <button
                onClick={() => handleAccordionClick("email")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-black uppercase tracking-widest">
                  Contact Information
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSection === "email" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === "email" && (
                <div className="border-t border-gray-100 px-6 py-6 space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs text-gray-400">
                      Already have an account?{" "}
                      <button className="font-semibold text-black hover:text-gray-600">
                        SIGN IN
                      </button>
                    </p>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-xs font-medium">
                        +92
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          const numericOnly = e.target.value.replace(/\D/g, "");
                          setFormData({ ...formData, phone: numericOnly });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        data-error={errors.phone ? "true" : "false"}
                        className={`flex-1 px-4 py-3 border ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} focus:border-black focus:outline-none transition-colors text-sm`}
                        placeholder="300 1234567"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2">
                      Email <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      data-error={errors.email ? "true" : "false"}
                      className={`w-full px-4 py-3 border ${errors.email ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} focus:border-black focus:outline-none transition-colors text-sm`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Section */}
            <div className={`border ${expandedSection === "shipping" ? "border-gray-200" : validatedSections.has("shipping") && !isShippingValid() ? "border-red-500" : "border-gray-200"}`}>
              <button
                onClick={() => handleAccordionClick("shipping")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-black uppercase tracking-widest">
                  Shipping
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSection === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === "shipping" && (
                <div className="border-t border-gray-100 px-6 py-6 space-y-6">
                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-black mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          if (errors.firstName) setErrors({ ...errors, firstName: "" });
                        }}
                        data-error={errors.firstName ? "true" : "false"}
                        className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} focus:border-black focus:outline-none transition-colors text-sm`}
                        placeholder="Ayesha"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          if (errors.lastName) setErrors({ ...errors, lastName: "" });
                        }}
                        data-error={errors.lastName ? "true" : "false"}
                        className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} focus:border-black focus:outline-none transition-colors text-sm`}
                        placeholder="Khan"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: "" });
                      }}
                      data-error={errors.address ? "true" : "false"}
                      className={`w-full px-4 py-3 border ${errors.address ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} focus:border-black focus:outline-none transition-colors text-sm`}
                      placeholder="House no, Street name"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Apartment */}
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2">
                      Apartment, Suite, etc.
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm bg-gray-50"
                      placeholder="Apt 4B, Floor 2"
                    />
                  </div>

                  {/* City & Area */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-black mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (errors.city) setErrors({ ...errors, city: "" });
                        }}
                        data-error={errors.city ? "true" : "false"}
                        className={`w-full px-4 py-3 border ${errors.city ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} focus:border-black focus:outline-none transition-colors text-sm`}
                      >
                        <option value="">Select city</option>
                        {PAKISTAN_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black mb-2">
                        Area / Locality
                      </label>
                      <input
                        type="text"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm bg-gray-50"
                        placeholder="DHA Phase 6"
                      />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="max-w-[200px]">
                    <label className="block text-xs font-semibold text-black mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm bg-gray-50"
                      placeholder="75500"
                      maxLength={6}
                    />
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-black mb-2">
                      Delivery Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm bg-gray-50 resize-none"
                      rows={3}
                      placeholder="Gate code, landmark, preferred delivery time..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="border border-gray-200">
              <button
                onClick={() => handleAccordionClick("payment")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-black uppercase tracking-widest">
                  Payment
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSection === "payment" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === "payment" && (
                <div className="border-t border-gray-100 px-6 py-6 space-y-4">
                  {/* Cash on Delivery */}
                  <label className="flex items-start gap-4 p-4 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-black block">Cash on Delivery</span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Pay when your order arrives
                      </span>
                    </div>
                  </label>

                  {/* EasyPaisa - Coming Soon */}
                  <label className="flex items-start gap-4 p-4 border border-gray-200 cursor-not-allowed opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-400 block">EasyPaisa</span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Coming soon
                      </span>
                    </div>
                  </label>

                  {/* JazzCash - Coming Soon */}
                  <label className="flex items-start gap-4 p-4 border border-gray-200 cursor-not-allowed opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-400 block">JazzCash</span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Coming soon
                      </span>
                    </div>
                  </label>

                  {/* SadaPay - Coming Soon */}
                  <label className="flex items-start gap-4 p-4 border border-gray-200 cursor-not-allowed opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-400 block">SadaPay</span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Coming soon
                      </span>
                    </div>
                  </label>

                  {/* NayaPay - Coming Soon */}
                  <label className="flex items-start gap-4 p-4 border border-gray-200 cursor-not-allowed opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-400 block">NayaPay</span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Coming soon
                      </span>
                    </div>
                  </label>

                  {/* Bank Transfer - Coming Soon */}
                  <label className="flex items-start gap-4 p-4 border border-gray-200 cursor-not-allowed opacity-50">
                    <input
                      type="radio"
                      name="payment"
                      disabled
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-400 block">Bank Transfer</span>
                      <span className="text-xs text-gray-400 block mt-1">
                        Coming soon
                      </span>
                    </div>
                  </label>

                  {/* Security Message */}
                  <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-100 rounded mt-4">
                    <Lock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-xs text-gray-600">Your payment details are encrypted</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Your Bag */}
              <div>
                <h2 className="text-sm font-semibold text-black mb-4">
                  Your Bag ({itemCount})
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="w-20 h-24 bg-gray-100 flex-shrink-0 relative rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="text-sm font-medium text-black line-clamp-2">
                          {item.name}
                        </p>
                        {item.variants && Object.keys(item.variants).length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            {Object.entries(item.variants)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-auto">
                          Rs {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-sm font-medium text-black">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded mt-auto">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 transition-colors text-gray-600"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 transition-colors text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="mt-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redeem Voucher */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xs font-semibold text-black uppercase tracking-widest mb-3">
                  Redeem Your Voucher
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 focus:border-black focus:outline-none transition-colors text-sm bg-gray-50"
                    placeholder="Enter Code"
                  />
                  <button className="px-4 py-2 bg-black text-white text-xs font-semibold hover:bg-gray-900 transition-colors">
                    APPLY
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xs font-semibold text-black uppercase tracking-widest mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price incl. tax</span>
                    <span className="text-black font-medium">Rs {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-black font-medium">
                      {shippingCost === 0 ? "Free" : `Rs ${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sales Tax</span>
                    <span className="text-black font-medium">Rs 587</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">FBR service charges</span>
                    <span className="text-black font-medium">Rs 1</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-semibold text-black">Total</span>
                    <span className="font-semibold text-black text-lg">
                      Rs {(finalTotal + 588).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !isContactValid() || !isShippingValid()}
                className="w-full bg-black text-white text-sm font-semibold py-4 hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing 
                  ? "PROCESSING..." 
                  : expandedSection === "payment" 
                  ? "PLACE YOUR ORDER" 
                  : "PROCEED TO SHIPPING"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
