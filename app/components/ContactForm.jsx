// components/ContactForm.jsx
"use client"; // Ensure this is marked as a client-side component
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };


  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6"
    >
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-black/20 border-zinc-800 placeholder:text-zinc-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-black/20 border-zinc-800 placeholder:text-zinc-400"
          required
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px] bg-black/20 border-zinc-800 placeholder:text-zinc-400"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
        onClick={handleSubmit}
      >
        Send Message
      </Button>
    </motion.form>
  );
};

export default ContactForm;