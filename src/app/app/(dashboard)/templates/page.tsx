import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TemplatesPage() {
  const templates = [
    { id: '1', name: "Blank Project", desc: "Start from scratch with a blank canvas", isPremium: false },
    { id: '2', name: "Single Motor Circuit", desc: "Basic DOL starter single line configuration", isPremium: false },
    { id: '3', name: "Substation Layout", desc: "Typical 132/33kV substation layout", isPremium: true },
    { id: '4', name: "Solar PV Plant", desc: "Utility-scale solar power plant unifilar", isPremium: true }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-2">Start your schematic with a pre-configured template.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(tpl => (
          <Card key={tpl.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{tpl.name}</CardTitle>
                {tpl.isPremium && <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-1 rounded-full">PRO</span>}
              </div>
              <CardDescription>{tpl.desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted w-full h-32 rounded flex items-center justify-center text-sm text-muted-foreground">
                [Preview]
              </div>
            </CardContent>
            <div className="p-4 pt-0 mt-auto">
              <Button className="w-full" variant={tpl.isPremium ? "secondary" : "default"}>
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
