"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {Input} from "../components/ui/input";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem, 
} from  "@radix-ui/react-select";


import {Textarea} from "../components/ui/textarea";
import {Button} from "../components/ui/button";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80 backdrop-blur-sm", className)}
      {...props}
    />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4">
          <X className="h-5 w-5 text-gray-600 hover:text-black cursor-pointer" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const TransactionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [value, setValue] = useState({
    name: '',
    type: '',
    amount: '', // Use lowercase for consistency
    description: '', // Use lowercase for consistency
  });

  // Optimized handleChange function for dynamic state updates
  const handleChange = ({ target: { name, value } }) => {
    setValue((prevState) => ({
      ...prevState,
      [name]: value, // Update the correct field in the state
    }));
  };

  const [open, setOpen] = useState(false);
  const { user } = useUser(); 
  const userId = user ? user.id : null; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure the correct state (formData) is sent
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...value,
          userId : userId}),  // Use formData here
      });
  
      if (res.ok) {
        const data = await res.json();
        
        // Reset the form or perform other actions on success
        setValue({
          type: 'expence', // Reset default values
          name: '',
          amount: '',
          description: '',
        });
        setIsSubmitting(true);

    // Simulate form submission logic
    try {
      // Simulate API call or form processing (replace with actual logic)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

      // Display a success toast
      toast.success("Transaction submitted");

      // Redirect to the dashboard
      
    } catch (error) {
      // Handle errors if needed
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
      } else {
        console.error('Error submitting transaction:', res.statusText);
      }
    } catch (error) {
      console.error('Error submitting transaction', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        + Add Expenses
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200 shadow-lg transition-all duration-200 ease-in-out">
        <DialogTitle className="text-xl font-medium text-gray-900 tracking-tight">
          Add Transaction
        </DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Input
              type="text"
              name="name"
              value={value.name}
              onChange={handleChange}
              placeholder="Transaction Name"
              className="w-full border-gray-200 focus:border-gray-900 focus:ring-gray-900 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              name="amount"
              value={value.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full border-gray-200 focus:border-gray-900 focus:ring-gray-900 transition-colors"
              required
            />
          </div>
          <select
        name="type"
        value={value.type}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Income Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>


          <div className="space-y-2">
            <Textarea
              name="description"
              value={value.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full min-h-[100px] border-gray-200 focus:border-gray-900 focus:ring-gray-900 transition-colors resize-none"
            />
          </div>
           

         

          <Button
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Transaction"}
          </Button>
          <Link className="flex items-center justify-center" href="/dashboard">
        <p className="text-blue-500 items-center hover:underline">Go to Dashboard</p>
      </Link>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default TransactionForm;