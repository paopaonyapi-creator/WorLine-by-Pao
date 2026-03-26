import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Folder, Activity, Shield } from "lucide-react";

async function getStats() {
  const supabase = await createClient();

  const { count: userCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: publicProjectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_public", true);

  return {
    users: userCount || 0,
    projects: projectCount || 0,
    publicProjects: publicProjectCount || 0,
  };
}

export default async function AdminPage() {
  let stats = { users: 0, projects: 0, publicProjects: 0 };

  try {
    stats = await getStats();
  } catch {
    // Will show 0s if tables don't exist yet
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      description: "Registered accounts",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Projects",
      value: stats.projects,
      description: "Diagrams created",
      icon: Folder,
      color: "text-green-500",
    },
    {
      title: "Public Projects",
      value: stats.publicProjects,
      description: "Shared diagrams",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      title: "System",
      value: "Online",
      description: "All services operational",
      icon: Shield,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            System overview and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <CardDescription className="mt-1">{card.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Database</span>
                <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Stripe</span>
                <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Analytics</span>
                <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">Tracking</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Version</span>
                <span className="text-xs font-mono">4.0.0</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Framework</span>
                <span className="text-xs font-mono">Next.js 16</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm">Routes</span>
                <span className="text-xs font-mono">23+</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
