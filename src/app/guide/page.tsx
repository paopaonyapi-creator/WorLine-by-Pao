import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard, Mouse, Zap, Download, Share2, Pencil } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">User Guide</h1>
          <p className="text-muted-foreground mt-2">
            Learn how to use WorLine by Pao to create professional single-line diagrams.
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>1. <strong>Create a Project</strong> — Go to Projects → New Project (or use a template)</p>
              <p>2. <strong>Add Symbols</strong> — Drag symbols from the left palette onto the canvas</p>
              <p>3. <strong>Connect Wires</strong> — Use the Wire tool to connect symbol terminals</p>
              <p>4. <strong>Save & Export</strong> — Your work auto-saves every 30 seconds. Export as PNG/SVG/PDF</p>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-primary" />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { key: "Ctrl + S", action: "Save project" },
                  { key: "Ctrl + Z", action: "Undo" },
                  { key: "Ctrl + Shift + Z", action: "Redo" },
                  { key: "Ctrl + Y", action: "Redo (alternative)" },
                  { key: "Ctrl + D", action: "Duplicate selected" },
                  { key: "Delete / Backspace", action: "Delete selected" },
                  { key: "Escape", action: "Deselect all" },
                ].map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <span className="text-muted-foreground">{shortcut.action}</span>
                    <kbd className="text-xs bg-background border px-2 py-1 rounded font-mono">{shortcut.key}</kbd>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mouse Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mouse className="h-5 w-5 text-primary" />
                Mouse Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• <strong>Click</strong> — Select an object</p>
              <p>• <strong>Drag</strong> — Move selected objects</p>
              <p>• <strong>Scroll wheel</strong> — Zoom in/out</p>
              <p>• <strong>Middle mouse drag</strong> — Pan the canvas</p>
              <p>• <strong>Double-click text</strong> — Edit label</p>
            </CardContent>
          </Card>

          {/* Symbols */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Available Symbols (18)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Power Sources:</strong> Generator, Motor, Battery, Solar Panel</p>
              <p><strong>Switchgear:</strong> Circuit Breaker, Disconnect Switch, Fuse, Contactor</p>
              <p><strong>Transformers:</strong> Transformer, Current Transformer</p>
              <p><strong>Loads:</strong> Resistor, Capacitor, Inductor, Lamp</p>
              <p><strong>Protection:</strong> Relay, Surge Arrester</p>
              <p><strong>Connections:</strong> Busbar, Ground, Junction</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• <strong>Auto-save</strong> — Projects save automatically every 30 seconds</p>
              <p>• <strong>Share</strong> — Make projects public and share via link</p>
              <p>• <strong>Export</strong> — Download diagrams as PNG, SVG, or PDF</p>
              <p>• <strong>Templates</strong> — Start with pre-configured circuit templates</p>
              <p>• <strong>Dark Mode</strong> — Toggle between light and dark themes</p>
              <p>• <strong>PWA</strong> — Install as a desktop app from your browser</p>
              <p>• <strong>Backup</strong> — Export all projects as JSON from Settings → Profile</p>
            </CardContent>
          </Card>

          {/* Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pencil className="h-5 w-5 text-primary" />
                Project Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• <strong>Rename</strong> — Double-click the project title to rename</p>
              <p>• <strong>Delete</strong> — Hover over a project card and click the trash icon</p>
              <p>• <strong>Share/Unshare</strong> — Hover and click the share icon to toggle</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
