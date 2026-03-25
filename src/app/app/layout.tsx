// Force dynamic rendering for all /app/* routes — 
// prevents SSG during build when Supabase/Stripe env vars may not be set
export const dynamic = 'force-dynamic';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
