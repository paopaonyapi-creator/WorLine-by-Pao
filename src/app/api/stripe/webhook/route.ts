import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
export async function POST(req: Request) {
  const strSecret = process.env.STRIPE_SECRET_KEY;
  const webSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!strSecret) return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
  if (!webSecret) return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
  if (!supUrl) return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  if (!supRole) return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 });

  const stripe = new Stripe(strSecret);
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webSecret
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  const supabase = createClient(supUrl, supRole);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;
      
      if (userId) {
        // We get the line items to know the price ID
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const priceId = lineItems.data[0]?.price?.id;

        await supabase.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: priceId,
          status: 'active',
        }, { onConflict: 'user_id' });
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      const customerId = subscription.customer as string;

      const { data } = await supabase.from('subscriptions').select('user_id').eq('stripe_customer_id', customerId).single();
      
      if (data?.user_id) {
        await supabase.from('subscriptions').update({
          status: subscription.status,
          stripe_price_id: subscription.items.data[0].price.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        }).eq('user_id', data.user_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
