"use client"

import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import Loading from "../components/Loading"

interface PricingCardProps {
  title: string;
  price: string; // Price in string format (e.g., "5000" for ₹5000)
  description: string;
  features: string[];
  isPopular?: boolean;
  phone?: string;
}


const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
}: PricingCardProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePayment = async () => {
      setIsLoading(true);
    if (!isSignedIn) {
      toggleModal(); // Open modal if user is not signed in
      return;
    }

    // Load Razorpay script dynamically
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error("Failed to load Razorpay script"));
        document.body.appendChild(script);
      });
    };

    try {
      const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!isScriptLoaded) throw new Error("Razorpay SDK failed to load");

      // Call your server-side API to create a Razorpay order
      const res = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parseInt(price) }), // Convert to paise
      });

      const { order } = await res.json();
      const name = user.firstName;
      const phone = user.primaryPhoneNumber?.phoneNumber;

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: "INR",
        name: "ExpenceTracker",
        description: title,
        order_id: order.id,
        handler: function (response: any) {
          setIsLoading(false);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: {name},
          email: "pranavmore96k@gmail.com",
          contact: `${phone} ? ${phone} : "No phone number available"`,
        },
        theme: {
          color: isPopular ? "#000000" : "#ffffff",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false); // Hide loader if user closes the Razorpay popup
          }
        }
      };

      const rzp = new (window as any).Razorpay(options); // Access Razorpay from the global window object
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {isLoading && <Loading/>}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl mb-4 text-black">Oops! Sign In</h2>
            <p className="text-black">You need to sign in to make a payment.</p>
            <div className="mt-4">
              <button
                onClick={toggleModal}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Card */}
      <div
        className={cn(
          "relative rounded-xl border p-8 transition-all hover:shadow-lg",
          isPopular
            ? "border-black bg-black text-white"
            : "border-gray-200 bg-white text-black hover:border-gray-300"
        )}
      >
        {isPopular && (
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <div className="rounded-full bg-white px-4 py-1 text-sm font-medium text-black">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <div className="mb-6">
          <span className="text-4xl font-bold">₹{price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        <Button
          className={cn(
            "w-full",
            isPopular
              ? "bg-white text-black hover:bg-gray-100"
              : "bg-black text-white hover:bg-gray-900"
          )}
          onClick={handlePayment}
        >
          Get Started
        </Button>
        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-5 w-5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;