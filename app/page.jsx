"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowRight, BarChart3, PieChart, Wallet2, Shield } from "lucide-react";
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleClick = () => {
    if (isSignedIn) {
      router.push('/dashboard'); // Redirect to dashboard if authenticated
    } else {
      router.push('/signin'); // Redirect to signin page if not authenticated
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl font-bold tracking-tight text-primary">
                Take Control of Your Finances
              </h1>
              <p className="text-xl text-muted-foreground">
                Track expenses, analyze spending patterns, and achieve your financial goals with our intuitive expense tracking solution.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={handleClick} >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
                alt="Financial Dashboard"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to manage your expenses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features to help you track, analyze, and optimize your spending
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Wallet2 className="h-8 w-8" />}
              title="Expense Tracking"
              description="Easily log and categorize your daily expenses with our intuitive interface"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Visual Analytics"
              description="Understand your spending patterns with beautiful charts and graphs"
            />
            <FeatureCard
              icon={<PieChart className="h-8 w-8" />}
              title="Budget Planning"
              description="Set and manage budgets for different categories to stay on track"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure Data"
              description="Your financial data is encrypted and protected with bank-level security"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to take control of your finances?
            </h2>
            <p className="text-lg mb-8">
              Join thousands of users who are already managing their expenses smarter
            </p>
            <Button size="lg" variant="secondary">
              Start Tracking Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="p-6 flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}