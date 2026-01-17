"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Check, Copy } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variants?: Record<string, string>;
}

interface OrderData {
  orderId: string;
  phone: string;
  email?: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  items: OrderItem[];
  totalPrice: number;
  shippingCost: number;
  taxAmount: number;
  finalTotal: number;
  orderDate: string;
  estimatedDelivery: string;
  paymentMethod: string;
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get order data from localStorage (set by checkout page)
    const storedOrderData = localStorage.getItem("lastOrder");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  const copyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard.writeText(orderData.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  if (!mounted || !orderData) {
    return (
      <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="bg-white">
        {/* Success Header */}
        <section className="border-b border-gray-100 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-medium text-black">
                  Order Confirmed
                </h1>
                <p className="text-gray-500 text-sm">
                  Thank you for your order. We're preparing it now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Order ID Section */}
        <section className="border-b border-gray-100 py-8 md:py-10">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Order Number
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-medium text-black font-mono">
                  {orderData.orderId}
                </span>
                <button
                  onClick={copyOrderId}
                  className="p-2 hover:bg-gray-50 transition-colors text-gray-400 hover:text-black"
                  title="Copy order ID"
                >
                  {copiedOrderId ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Confirmation details have been sent to {orderData.phone}
              </p>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="border-b border-gray-100 py-8 md:py-10">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-black mb-6">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-6 pb-6 border-b border-gray-100">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-100 rounded flex-shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">{item.name}</p>
                      {item.variants && Object.keys(item.variants).length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.variants)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-black">
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-6 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Price incl. tax</span>
                <span className="text-black font-medium">
                  Rs {orderData.totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-black font-medium">
                  {orderData.shippingCost === 0
                    ? "Free"
                    : `Rs ${orderData.shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Sales Tax</span>
                <span className="text-black font-medium">
                  Rs {orderData.taxAmount}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>FBR service charges</span>
                <span className="text-black font-medium">Rs 1</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold text-black">Total</span>
                <span className="font-semibold text-black text-lg">
                  Rs {(orderData.finalTotal + 1).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="border-b border-gray-100 py-8 md:py-10">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-black mb-6">
              Delivery Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Shipping Address
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-black">
                    {orderData.firstName} {orderData.lastName}
                  </p>
                  <p>{orderData.address}</p>
                  <p>
                    {orderData.city}
                  </p>
                  <p className="text-xs text-gray-500 pt-2">{orderData.phone}</p>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Estimated Delivery
                </p>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-medium text-black text-base">
                    {orderData.estimatedDelivery}
                  </p>
                  <p className="text-xs text-gray-500">
                    You'll receive SMS updates at {orderData.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">
                Payment Method
              </p>
              <p className="text-sm text-black font-medium">
                Cash on Delivery
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Pay when your order arrives
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <div className="flex flex-col gap-3">
              <Link href="/track">
                <button className="w-full py-4 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-gray-900 transition-colors rounded-full">
                  Track Your Order
                </button>
              </Link>
              <Link href="/collections">
                <button className="w-full py-4 border border-gray-200 text-black text-sm font-semibold uppercase tracking-wide hover:bg-gray-50 transition-colors rounded-full">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="border-t border-gray-100 py-8 md:py-10 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-black mb-4">
              Need Help?
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                For order updates and tracking, use your order number:{" "}
                <span className="font-mono font-semibold text-black">
                  {orderData.orderId}
                </span>
              </p>
              <p>
                Returns are easy. If you're not satisfied, you can return within 7 days.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
