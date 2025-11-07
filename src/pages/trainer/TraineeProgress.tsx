import { useState } from "react";
import { ArrowLeft, AlertCircle, Calendar, Mail } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const mockMealPlans = [
  { id: "1", name: "7-Day Weight Loss Plan" },
  { id: "2", name: "30-Day Fitness Challenge" },
  { id: "3", name: "Quick Start Diet" },
];

const mockProgress = {
  currentStreak: 5,
  totalMealsCompleted: 42,
  completionPercentage: 85,
  completedMeals: 12,
  totalMeals: 90,
};

export default function TraineeProgress() {
  const navigate = useNavigate();
  const { traineeId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState(mockMealPlans[0].id);

  // Find the trainee based on the traineeId from URL
  const trainee = mockTrainees.find((t) => t.id === traineeId) || mockTrainees[0];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getExpirationDate = (inviteSentDate: Date) => {
    const expirationDate = new Date(inviteSentDate);
    expirationDate.setDate(expirationDate.getDate() + 7);
    return expirationDate;
  };

  const isInviteExpired = (inviteSentDate: Date) => {
    const expirationDate = getExpirationDate(inviteSentDate);
    return new Date() > expirationDate;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/trainer/trainees")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Trainee Progress</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Trainee Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={trainee.avatar} alt={trainee.name} />
                <AvatarFallback>{getInitials(trainee.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{trainee.name}</h2>
                <p className="text-sm text-muted-foreground">{trainee.email}</p>
              </div>
              <Badge variant={trainee.inviteAccepted ? "default" : "secondary"}>
                {trainee.inviteAccepted ? "Active" : "Pending"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {!trainee.inviteAccepted ? (
          <>
            {/* Pending Invitation Alert */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>This trainee has not completed registration yet</AlertTitle>
              <AlertDescription>
                They need to accept the invitation before you can track their progress.
              </AlertDescription>
            </Alert>

            {/* Invitation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invitation Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Invitation Sent</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(trainee.inviteSentDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Expires On</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(getExpirationDate(trainee.inviteSentDate))}
                      {isInviteExpired(trainee.inviteSentDate) && (
                        <Badge variant="destructive" className="ml-2">Expired</Badge>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Meal Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Meal Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMealPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{mockProgress.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Meals Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{mockProgress.totalMealsCompleted}</p>
                  <p className="text-xs text-muted-foreground">total</p>
                </CardContent>
              </Card>
            </div>

            {/* Completion Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Completion Percentage
                  <Badge variant="secondary">{mockProgress.completionPercentage}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={mockProgress.completionPercentage} className="h-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Meal Plan Progress
                  <Badge variant="secondary">{mockProgress.completedMeals}/{mockProgress.totalMeals} meals</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={(mockProgress.completedMeals / mockProgress.totalMeals) * 100} className="h-3" />
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
