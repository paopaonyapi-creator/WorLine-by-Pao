import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Force dynamic rendering for all /app/* routes — 
// prevents SSG during build when Supabase/Stripe env vars may not be set
export const dynamic = 'force-dynamic';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user;
  } catch (err) {
    console.error('App layout auth guard failed:', err);
    // Throwing happens if env vars are stripped at runtime
    redirect('/misconfigured');
  }

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
}
