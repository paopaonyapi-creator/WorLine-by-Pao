import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCheckoutConfig } from '@/lib/billing/get-checkout-config';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const config = getCheckoutConfig(process.env);
    
    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2023-10-16' as any,
    });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      billing_address_collection: 'required',
      customer_email: user.email,
      line_items: [
        {
          price: config.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${config.appUrl}/app/settings/billing?success=true`,
      cancel_url: `${config.appUrl}/app/settings/billing?canceled=true`,
      client_reference_id: user.id,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
