"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export function QuantitySelector({
  onQuantityChange,
  max = 10,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 w-fit">
      <button
        onClick={handleDecrease}
        disabled={quantity === 1}
        className="px-4 py-2 text-sm font-medium text-black disabled:text-gray-300 hover:disabled:text-gray-300 hover:bg-gray-50"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-4 py-2 text-sm font-medium text-black border-l border-r border-gray-300">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={quantity === max}
        className="px-4 py-2 text-sm font-medium text-black disabled:text-gray-300 hover:disabled:text-gray-300 hover:bg-gray-50"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
