"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

export default function BillingPage() {
  const { user } = useUser();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    setLoadingPlan(priceId);

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        email: user?.primaryEmailAddress?.emailAddress,
        priceId,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong. Try again.");
      setLoadingPlan(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Billing</h1>
      <div className="p-10 max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">Choose a Plan</h1>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          <div className="w-full md:w-[79%] p-6 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Basic Plan
            </h2>
            <p className="text-gray-600 mb-4 font-semibold text-center">
              <span className="text-2xl font-bold">10$</span> /yearly
            </p>
            <div className="flex flex-col gap-2 text-gray-600 font-semibold">
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>10,000 Words/Year</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>100+ Content Templates</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>Limited Download & Copy</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>6 Months of History</span>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <Button
                className="cursor-pointer"
                onClick={() =>
                  handleSubscribe(
                    process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!
                  )
                }
                disabled={
                  loadingPlan === process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID
                }
              >
                {loadingPlan ===
                process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Subscribe to Basic"
                )}
              </Button>
            </div>
          </div>

          <div className="w-full md:w-[79%] p-6 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Premium Plan
            </h2>
            <p className="text-gray-600 mb-4 font-semibold text-center">
              <span className="text-2xl font-bold">50$</span> /yearly
            </p>
            <div className="flex flex-col gap-2 text-gray-600 font-semibold">
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>100,000 Words/Year</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>1000+ Content Templates</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>Unlimited Download & Copy</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-6 h-6 mt-1" />
                <span>12 Months of History</span>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <Button
                className="cursor-pointer"
                onClick={() =>
                  handleSubscribe(
                    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!
                  )
                }
                disabled={
                  loadingPlan ===
                  process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID
                }
              >
                {loadingPlan ===
                process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Subscribe to Premium"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
