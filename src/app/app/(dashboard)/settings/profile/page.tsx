"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, User, Mail, Calendar } from "lucide-react";
import { useLocale } from "@/lib/i18n/useLocale";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const { t } = useLocale();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        setDisplayName(user.user_metadata?.display_name || user.user_metadata?.full_name || "");
        setCreatedAt(new Date(user.created_at).toLocaleDateString());
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });

    if (error) {
      toast.error(t("profile_update_fail"));
    } else {
      toast.success(t("profile_update_success"));
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("sidebar_profile")}</h1>
        <p className="text-muted-foreground mt-2">{t("manage_account")}</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("personal_info")}
            </CardTitle>
            <CardDescription>{t("update_display_name")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">{t("display_name")}</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("your_name")}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {t("email")}
              </Label>
              <Input value={email} disabled className="h-11 bg-muted" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {t("member_since")}
              </Label>
              <Input value={createdAt} disabled className="h-11 bg-muted" />
            </div>
            <Button onClick={handleSave} disabled={saving} className="glow-primary">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : (
                t("save_changes")
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("export_data")}</CardTitle>
            <CardDescription>{t("export_desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data: projects } = await supabase
                  .from("projects")
                  .select("*")
                  .eq("user_id", user.id);

                if (!projects || projects.length === 0) {
                  toast.error("No projects to export");
                  return;
                }

                const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `worline-backup-${new Date().toISOString().slice(0, 10)}.json`;
                link.click();
                URL.revokeObjectURL(url);
                toast.success(`Exported ${projects.length} projects`);
              }}
            >
              {t("download_backup")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
