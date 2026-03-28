import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCheckoutConfig } from '@/lib/billing/get-checkout-config';

export async function POST(req: Request) {
  try {
    const config = getCheckoutConfig(process.env);
    
    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2023-10-16' as any,
    });

    const { userId, email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      billing_address_collection: 'required',
      customer_email: email,
      line_items: [
        {
          price: config.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${config.appUrl}/app/settings/billing?success=true`,
      cancel_url: `${config.appUrl}/app/settings/billing?canceled=true`,
      client_reference_id: userId,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
