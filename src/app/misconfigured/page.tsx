import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function MisconfiguredPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">System Misconfigured</h1>
          <p className="text-muted-foreground">
            The application cannot connect to the authentication provider. This is usually because the required environment variables are missing on the server.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4 text-left text-sm text-card-foreground shadow-sm w-full">
          <p className="font-semibold mb-2">Required Configuration:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><code className="bg-muted px-1 py-0.5 rounded text-xs">NEXT_PUBLIC_SUPABASE_URL</code></li>
            <li><code className="bg-muted px-1 py-0.5 rounded text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
