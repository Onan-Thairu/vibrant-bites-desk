import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Plus, Mail, RefreshCw, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockTrainees = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    avatar: "",
    mealPlans: ["High-Protein Diet", "Muscle Gain Plan"],
    inviteAccepted: true,
    inviteSentDate: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    avatar: "",
    mealPlans: ["Vegan Meal Plan"],
    inviteAccepted: true,
    inviteSentDate: new Date("2025-01-20"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@company.com",
    avatar: "",
    mealPlans: ["Low-Carb Diet", "Keto Plan"],
    inviteAccepted: false,
    inviteSentDate: new Date("2025-10-30"),
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@company.com",
    avatar: "",
    mealPlans: [],
    inviteAccepted: false,
    inviteSentDate: new Date("2025-10-28"),
  },
];

export default function TraineesManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const isInviteExpired = (inviteSentDate: Date) => {
    const daysSinceInvite = Math.floor((new Date().getTime() - inviteSentDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceInvite > 7;
  };

  const handleResendInvite = (trainee: typeof mockTrainees[0]) => {
    // Here you would call your API to resend the invite
    console.log("Resending invite to:", { email: trainee.email, name: trainee.name });
    toast({
      title: "Invite Resent",
      description: `Invitation email sent to ${trainee.name}`,
    });
  };

  const sortedTrainees = [...mockTrainees].sort((a, b) => {
    if (a.inviteAccepted === b.inviteAccepted) return 0;
    return a.inviteAccepted ? -1 : 1;
  });

  const filteredTrainees = sortedTrainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "active") return matchesSearch && trainee.inviteAccepted;
    if (activeTab === "inactive") return matchesSearch && !trainee.inviteAccepted;
    return matchesSearch;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Trainees</h1>
            </div>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90"
              onClick={() => navigate("/trainer/trainees/invite")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Invite
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trainees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredTrainees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No trainees found</h3>
                <p className="text-sm text-muted-foreground">
                  No trainees found matching your search
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTrainees.map((trainee) => (
                  <div
                    key={trainee.id}
                    className="bg-card border border-border rounded-lg p-4"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar 
                        className="h-12 w-12 cursor-pointer" 
                        onClick={() => navigate(`/trainer/trainees/${trainee.id}/progress`)}
                      >
                        <AvatarImage src={trainee.avatar} alt={trainee.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(trainee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 
                            className="font-semibold cursor-pointer hover:text-primary"
                            onClick={() => navigate(`/trainer/trainees/${trainee.id}/progress`)}
                          >
                            {trainee.name}
                          </h3>
                          <Badge variant={trainee.inviteAccepted ? "default" : "secondary"} className="text-xs">
                            {trainee.inviteAccepted ? "Active" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <Mail className="h-3 w-3" />
                          {trainee.email}
                        </p>
                        
                        {!trainee.inviteAccepted && (
                          <div className="mb-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResendInvite(trainee);
                              }}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Resend Invite
                            </Button>
                            {isInviteExpired(trainee.inviteSentDate) && (
                              <span className="text-xs text-destructive ml-2">Expired</span>
                            )}
                          </div>
                        )}

                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Assigned Meal Plans:</p>
                          <div className="flex flex-wrap gap-1">
                            {trainee.mealPlans.length > 0 ? (
                              trainee.mealPlans.map((plan, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs bg-accent/20 text-accent-foreground"
                                >
                                  {plan}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground italic">
                                No meal plans assigned
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}
