import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockTrainee = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
};

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
                <AvatarImage src={mockTrainee.avatar} alt={mockTrainee.name} />
                <AvatarFallback>{getInitials(mockTrainee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{mockTrainee.name}</h2>
                <p className="text-sm text-muted-foreground">{mockTrainee.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

      </main>
    </div>
  );
}
