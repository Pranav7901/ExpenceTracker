"use client"
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, LineChart, PieChart, Wallet, Shield } from "lucide-react";
import { Card } from "../components/ui/card";
import FeatureCard from "../components/FeatureCard";

const About = () => {
  const features = [
    {
      title: "Expense Tracking",
      description: "Monitor your spending with precision and ease",
      Icon: LineChart,
    },
    {
      title: "Budget Analysis",
      description: "Visualize your financial patterns and trends",
      Icon: PieChart,
    },
    {
      title: "Smart Budgeting",
      description: "Set and achieve your financial goals effectively",
      Icon: Wallet,
    },
    {
      title: "Secure Platform",
      description: "Your financial data is protected with top-tier security",
      Icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-white bg-white/10 px-3 py-1 rounded-full">
            About Our Platform
          </span>
          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Simplify Your Financial Management
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            A modern expense tracking solution designed to help you take control of your finances with clarity and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-white">Our Vision</h2>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            We believe in simplifying financial management through thoughtful design and innovative technology. Our platform empowers you to make informed decisions about your money with confidence.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;