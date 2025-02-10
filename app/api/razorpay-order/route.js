import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Named export for POST method
export async function POST(req) {
  try {
    const { amount } = await req.json(); // Parse the request body

    // Ensure amount is in paise (100 paise = 1 INR)
    const amountInPaise = parseInt(amount) * 100; // Convert to paise

    if (isNaN(amountInPaise)) {
      return new Response(
        JSON.stringify({ error: "Invalid amount provided" }),
        { status: 400 }
      );
    }

    const options = {
      amount: amountInPaise, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
    };

    // Attempt to create a Razorpay order
    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create Razorpay order",
        message: error.message || "Unknown error",
      }),
      { status: 500 }
    );
  }
}