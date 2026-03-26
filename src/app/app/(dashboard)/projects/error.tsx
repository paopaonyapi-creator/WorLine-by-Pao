"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10">
          <AlertTriangle className="h-8 w-8 text-orange-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Editor Error</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {error.message || "The diagram editor encountered an error."}
        </p>
        <p className="text-xs text-muted-foreground/60 mb-6">
          Your work was auto-saved. Click below to reload.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Reload Editor</Button>
          <Button variant="outline" onClick={() => window.location.href = "/app/projects"}>
            Back to Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
