import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, ArrowLeft } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-muted/30 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold font-heading text-lg leading-none">U</span>
          </div>
          <span className="font-heading font-bold text-lg">Admin Panel</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/app" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground mt-8">
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-14 border-b flex items-center px-6">
          <h1 className="font-semibold">Unifilar Studio Administration</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
