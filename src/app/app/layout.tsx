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
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
}
