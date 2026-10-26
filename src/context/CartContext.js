"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BRAND, COUPONS } from "@/data/pizzaData";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [fulfillmentType, setFulfillmentType] = useState("delivery"); // 'delivery' | 'pickup'

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("forno_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("forno_coupon");
      if (savedCoupon && COUPONS[savedCoupon]) {
        setAppliedCoupon(COUPONS[savedCoupon]);
      }
    } catch {
      // Graceful fallback for environments with restricted storage
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("forno_cart", JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem("forno_coupon", appliedCoupon.code);
      } else {
        localStorage.removeItem("forno_coupon");
      }
    } catch {
      // Ignore storage errors
    }
  }, [appliedCoupon]);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  /**
   * Adds an item or customized pizza to the cart
   * @param {Object} product - base product item
   * @param {Object} options - { size, crust, toppings: [], extras: [], quantity: 1, unitPrice }
   */
  const addItem = (product, options = {}) => {
    const size = options.size || { id: "regular", name: "Regular (8\")" };
    const crust = options.crust || { id: "classic", name: "Classic Hand-Tossed" };
    const toppings = options.toppings || [];
    const extras = options.extras || [];
    const quantity = Math.max(1, options.quantity || 1);

    // Calculate item unit price if not already specified
    let unitPrice = options.unitPrice;
    if (!unitPrice) {
      unitPrice = product.price;
      if (options.size && options.size.priceAdd) {
        unitPrice += options.size.priceAdd;
      }
      if (options.crust && options.crust.price) {
        unitPrice += options.crust.price;
      }
      if (toppings.length > 0) {
        const toppingsCost = toppings.reduce((sum, t) => sum + (t.price || 0), 0);
        unitPrice += toppingsCost;
      }
      if (extras.length > 0) {
        const extrasCost = extras.reduce((sum, e) => sum + (e.price || 0), 0);
        unitPrice += extrasCost;
      }
    }

    // Generate unique line item key based on customizations
    const toppingKeys = toppings.map((t) => t.id || t.name).sort().join(",");
    const extraKeys = extras.map((e) => e.id || e.name).sort().join(",");
    const lineId = `${product.id}-${size.id || "reg"}-${crust.id || "classic"}-${toppingKeys}-${extraKeys}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.lineId === lineId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prevItems,
          {
            lineId,
            productId: product.id,
            name: product.name,
            image: product.image,
            diet: product.diet,
            unitPrice: Math.round(unitPrice),
            size,
            crust,
            toppings,
            extras,
            quantity,
            notes: options.notes || "",
          },
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.name} to your order!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (lineId, delta) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.lineId === lineId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (lineId) => {
    setItems((prevItems) => prevItems.filter((item) => item.lineId !== lineId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrder) {
      if (appliedCoupon.type === "flat") {
        discount = appliedCoupon.value;
      } else if (appliedCoupon.type === "percent") {
        const calculated = Math.round((subtotal * appliedCoupon.value) / 100);
        discount = Math.min(calculated, appliedCoupon.maxDiscount || calculated);
      }
    }
  }

  const deliveryFee = fulfillmentType === "pickup" ? 0 : subtotal >= BRAND.freeDeliveryThreshold || subtotal === 0 ? 0 : BRAND.deliveryFee;

  const total = Math.max(0, subtotal - discount + deliveryFee);

  const applyCoupon = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    const coupon = COUPONS[code];

    if (!coupon) {
      return { success: false, message: "Invalid coupon code. Try FORNO150 or WELCOME20." };
    }

    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Add ₹${coupon.minOrder - subtotal} more to apply coupon ${coupon.code} (Min order ₹${coupon.minOrder}).`,
      };
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon ${coupon.code} applied successfully!`);
    return { success: true, message: `Coupon ${coupon.code} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed", "info");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast,
        fulfillmentType,
        setFulfillmentType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
