import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// These should be set in .env.local
const MERCHANT_ID = process.env.IMOJE_MERCHANT_ID;
const SERVICE_ID = process.env.IMOJE_SERVICE_ID;
const SERVICE_KEY = process.env.IMOJE_SERVICE_KEY;
const AUTH_TOKEN = process.env.IMOJE_AUTH_TOKEN;
const IS_SANDBOX = true;

const API_BASE_URL = IS_SANDBOX 
  ? `https://sandbox.api.imoje.pl/v1/merchant/${MERCHANT_ID}`
  : `https://api.imoje.pl/v1/merchant/${MERCHANT_ID}`;

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables first
    if (!MERCHANT_ID || !SERVICE_ID || !SERVICE_KEY || !AUTH_TOKEN) {
      console.error("Missing imoje configuration:", { 
        hasMerchantId: !!MERCHANT_ID, 
        hasServiceId: !!SERVICE_ID, 
        hasServiceKey: !!SERVICE_KEY, 
        hasAuthToken: !!AUTH_TOKEN 
      });
      return NextResponse.json({ 
        success: false, 
        error: "Błąd konfiguracji serwera płatności" 
      }, { status: 500 });
    }

    const body = await req.json();
    const { items, totalPrice, customer, successUrl, failureUrl } = body;

    // 1. Create unique order ID
    const orderId = `RW-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 2. Save pending transaction to Firestore (Moved up to get ID for success/failure URLs)
    const transactionRef = await addDoc(collection(db, "transactions"), {
      orderId,
      customer,
      items,
      totalAmount: totalPrice,
      status: "pending",
      paymentMethod: "imoje",
      createdAt: serverTimestamp(),
    });

    // 3. Prepare imoje transaction body
    const transactionBody = {
      serviceId: SERVICE_ID,
      amount: Math.round(totalPrice * 100), // imoje expects amount in grosze (cents)
      currency: "PLN",
      orderId: orderId,
      customer: {
        firstName: customer.fullName.split(" ")[0] || "Klient",
        lastName: customer.fullName.split(" ").slice(1).join(" ") || "Rafał Woźny",
        email: customer.email,
      },
      urlSuccess: successUrl || `${req.nextUrl.origin}/checkout/success?id=${transactionRef.id}`,
      urlFailure: failureUrl || `${req.nextUrl.origin}/checkout/failure?id=${transactionRef.id}`,
      type: "sale",
      method: "no_method" // This allows user to choose method on imoje page
    };

    const payload = JSON.stringify(transactionBody);
    
    // 4. Generate Signature
    // Format: signature=val;alg=sha256
    const signature = crypto
      .createHmac("sha256", SERVICE_KEY)
      .update(payload)
      .digest("hex");

    const signatureHeader = `signature=${signature};alg=sha256`;

    // 5. Call imoje API to create transaction
    const response = await fetch(`${API_BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`,
        "x-imoje-signature": signatureHeader
      },
      body: payload
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Imoje API Error:", data);
      return NextResponse.json({ 
        success: false, 
        error: "Błąd bramki płatniczej",
        details: data
      }, { status: 400 });
    }

    // Return the payment URL to the client
    return NextResponse.json({ 
      success: true, 
      paymentUrl: data.payment.url,
      transactionId: transactionRef.id 
    });

  } catch (error: any) {
    console.error("Payment Initiation Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Wystąpił błąd podczas inicjacji płatności" 
    }, { status: 500 });
  }
}
