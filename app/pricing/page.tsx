"use client"
import PricingCard from "../components/PricingCard";

const Pricing = () => {
  const plans = [
    {
      title: "Basic",
      price: "9",
      description: "Perfect for individuals starting their journey",
      features: [
        "Basic expense tracking",
        "Monthly reports",
        "Up to 50 transactions/month",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      title: "Intermediate",
      price: "29",
      description: "Ideal for growing businesses",
      features: [
        "Everything in Basic",
        "Unlimited transactions",
        "Custom categories",
        "Priority support",
        "Advanced analytics",
        "Multiple accounts",
      ],
      isPopular: true,
    },
    {
      title: "Premium",
      price: "99",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Intermediate",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Team collaboration",
        "Advanced security features",
        "Custom reporting",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-black tracking-tight sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mb-12 text-lg text-gray-600">
          Choose the perfect plan for your needs. No hidden fees.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;