"use client"; // Make sure this is present

import { Mail, Phone, MessageSquare } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";  // Ensure this is correct

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "pranavmore96k@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+917038637629",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Live Chat",
      value: "Available 24/7",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-wider text-zinc-400">Get in Touch</span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Have questions about your expenses? Our team is here to help you manage your finances better.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800/50">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-2 bg-zinc-800/50 rounded-lg">{item.icon}</div>
                    <div>
                      <p className="text-sm text-zinc-400">{item.title}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800/50">
              <h2 className="text-xl font-semibold mb-4">Operating Hours</h2>
              <div className="space-y-2 text-zinc-400">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-zinc-800/50"
          >
            <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;