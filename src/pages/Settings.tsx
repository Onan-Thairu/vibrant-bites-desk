import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Mail, Bell, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const userRole = window.location.pathname.includes("trainer") ? "trainer" : "trainee";

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <Card className="p-4 border-none space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Profile Information</h2>
              <p className="text-sm text-muted-foreground">Update your personal details</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@company.com" />
          </div>

          {userRole === "trainer" && (
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" defaultValue="Nutrition & Wellness" />
            </div>
          )}
        </Card>

        {/* Notifications */}
        <Card className="p-4 border-none space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive meal plan updates</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Get weekly summaries</p>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Security */}
        <Card className="p-4 border-none space-y-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Security</h2>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </Button>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={handleSave} className="w-full bg-accent hover:bg-accent/90">
            Save Changes
          </Button>
        </div>
      </main>

      <BottomNav userRole={userRole} />
    </div>
  );
}
