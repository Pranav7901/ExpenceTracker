import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, LineChart, PieChart, Wallet, Shield } from "lucide-react";
import { Card } from "./ui/card";


const FeatureCard = ({ title, description, Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 h-full backdrop-blur-sm bg-black/90 border border-white/10 hover:bg-black/80 transition-all duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-full bg-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </Card>
    </motion.div>
  );

  export default FeatureCard;