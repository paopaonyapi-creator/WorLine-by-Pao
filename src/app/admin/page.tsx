import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderGit2, CreditCard } from "lucide-react";

export const revalidate = 0; // Disable caching

export default async function AdminDashboardPage() {
  const adminClient = createAdminClient();

  let totalUsers = 0;
  let totalProjects = 0;
  let activeSubscriptions = 0;
  let recentUsers: any[] = [];

  if (adminClient) {
    // Fetch users (Requires Service Role Key)
    const { data: userData } = await adminClient.auth.admin.listUsers();
    if (userData && userData.users) {
      totalUsers = userData.users.length;
      recentUsers = userData.users.slice(0, 5); // top 5
    }

    // Fetch projects
    const { count: projectsCount } = await adminClient.from('projects').select('*', { count: 'exact', head: true });
    totalProjects = projectsCount || 0;

    // Fetch subscriptions
    const { count: subsCount } = await adminClient.from('subscriptions').select('*', { count: 'exact', head: true }).not('stripe_price_id', 'is', null);
    activeSubscriptions = subsCount || 0;
  }

  if (!adminClient) {
    return (
      <div className="p-6 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg">
        <h3 className="font-bold flex items-center gap-2">
          Configuration Required
        </h3>
        <p className="mt-2 text-sm">
          Please set <code>SUPABASE_SERVICE_ROLE_KEY</code> in your environment variables to access Admin features.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Monitor platform health and active user base.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Pro plan members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderGit2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No users found.</p>
              ) : (
                recentUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{u.email}</p>
                      <p className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
