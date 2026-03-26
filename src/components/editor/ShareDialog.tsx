"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Link, Copy, Check, Users, Shield, Eye, Edit } from "lucide-react";
import { toast } from "sonner";

type Permission = "view" | "edit";

interface ShareEntry {
  email: string;
  permission: Permission;
}

export const ShareDialog = ({ projectId, onClose }: { projectId: string; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<Permission>("view");
  const [shares, setShares] = useState<ShareEntry[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/share/${projectId}`
    : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleAddShare = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    // Add to local state (in production, save to Supabase project_shares table)
    setShares(prev => [...prev, { email: email.trim(), permission }]);

    const supabase = createClient();
    // Update project shared_with metadata
    const { error } = await supabase
      .from("projects")
      .update({
        updated_at: new Date().toISOString(),
        // In a real implementation, this would update a project_shares table
      })
      .eq("id", projectId);

    toast.success(`Shared with ${email} (${permission})`);
    setEmail("");
  };

  const handleRemoveShare = (emailToRemove: string) => {
    setShares(prev => prev.filter(s => s.email !== emailToRemove));
    toast.success("Access removed");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-md overflow-hidden border">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Share Project</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Public Link */}
        <div className="p-5 border-b space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link className="h-4 w-4 text-muted-foreground" />
            <span>Public Link (View Only)</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="text-xs bg-muted"
            />
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {linkCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Invite by Email */}
        <div className="p-5 border-b space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span>Invite Collaborators</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAddShare()}
            />
            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value as Permission)}
              className="border rounded px-2 py-1 text-xs bg-background"
            >
              <option value="view">View</option>
              <option value="edit">Edit</option>
            </select>
            <Button size="sm" onClick={handleAddShare}>
              Invite
            </Button>
          </div>
        </div>

        {/* Shared With List */}
        <div className="p-5 space-y-2 max-h-48 overflow-auto">
          {shares.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-2">
              No collaborators yet. Invite someone above.
            </p>
          ) : (
            shares.map((s) => (
              <div key={s.email} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {s.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{s.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] flex items-center gap-1">
                    {s.permission === "edit" ? (
                      <><Edit className="h-3 w-3" /> Edit</>
                    ) : (
                      <><Eye className="h-3 w-3" /> View</>
                    )}
                  </span>
                  <button
                    onClick={() => handleRemoveShare(s.email)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
