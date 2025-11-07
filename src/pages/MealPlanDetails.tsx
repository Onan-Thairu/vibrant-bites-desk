import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight, Calendar, UserMinus, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockDays = [
  {
    day: 1,
    meals: [
      { name: "Breakfast", time: "7:00 AM", calories: 350 },
      { name: "Snack", time: "10:00 AM", calories: 150 },
      { name: "Lunch", time: "1:00 PM", calories: 500 },
      { name: "Snack", time: "4:00 PM", calories: 150 },
      { name: "Dinner", time: "7:00 PM", calories: 600 },
    ],
    totalCalories: 1750,
  },
  {
    day: 2,
    meals: [
      { name: "Breakfast", time: "7:00 AM", calories: 400 },
      { name: "Snack", time: "10:00 AM", calories: 120 },
      { name: "Lunch", time: "1:00 PM", calories: 550 },
      { name: "Snack", time: "4:00 PM", calories: 180 },
      { name: "Dinner", time: "7:00 PM", calories: 650 },
    ],
    totalCalories: 1900,
  },
  {
    day: 3,
    meals: [
      { name: "Breakfast", time: "7:00 AM", calories: 380 },
      { name: "Snack", time: "10:00 AM", calories: 140 },
      { name: "Lunch", time: "1:00 PM", calories: 520 },
      { name: "Snack", time: "4:00 PM", calories: 160 },
      { name: "Dinner", time: "7:00 PM", calories: 580 },
    ],
    totalCalories: 1780,
  },
];

const mockAssignedTrainees = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "",
    progress: 75,
    completedDays: 5,
    totalDays: 7,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "",
    progress: 45,
    completedDays: 3,
    totalDays: 7,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    avatar: "",
    progress: 90,
    completedDays: 6,
    totalDays: 7,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "",
    progress: 30,
    completedDays: 2,
    totalDays: 7,
  },
];

export default function MealPlanDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const userRole = window.location.pathname.includes("trainer") ? "trainer" : "trainee";
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({});
  const [assignedTrainees, setAssignedTrainees] = useState(mockAssignedTrainees);

  const currentDayData = mockDays.find((d) => d.day === selectedDay) || mockDays[0];

  const toggleMealCompletion = (dayMealKey: string) => {
    setCompletedMeals((prev) => ({
      ...prev,
      [dayMealKey]: !prev[dayMealKey],
    }));
  };

  const completedCalories = currentDayData.meals.reduce((sum, meal, index) => {
    const mealKey = `${selectedDay}-${index}`;
    return sum + (completedMeals[mealKey] ? meal.calories : 0);
  }, 0);

  const calorieProgress = (completedCalories / currentDayData.totalCalories) * 100;

  const handleUnassign = (traineeId: string, traineeName: string) => {
    setAssignedTrainees((prev) => prev.filter((t) => t.id !== traineeId));
    toast({
      title: "Trainee unassigned",
      description: `${traineeName} has been unassigned from this meal plan.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Meal Plan Details</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Plan Header */}
        <div>
          <h2 className="text-2xl font-bold mb-2">7-Day Balanced Diet</h2>
          <p className="text-muted-foreground">Complete nutrition plan</p>
        </div>

        {/* Day Selector */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Select Day</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {mockDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-colors ${
                  selectedDay === day.day
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:bg-muted/50"
                }`}
              >
                <div className="text-sm font-medium">Day {day.day}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Daily Summary */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Daily Calorie Target</span>
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
              {currentDayData.totalCalories} kcal
            </Badge>
          </div>
          
          {userRole === "trainee" && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-primary">
                    {completedCalories} / {currentDayData.totalCalories} kcal
                  </span>
                </div>
                <Progress value={calorieProgress} className="h-2" />
              </div>
            </>
          )}
        </div>

        {/* Meals for Selected Day */}
        <section className="space-y-3">
          <h3 className="font-semibold">Day {currentDayData.day} Meals</h3>
          {currentDayData.meals.map((meal, index) => {
            const mealKey = `${selectedDay}-${index}`;
            const isCompleted = completedMeals[mealKey];

            return (
              <div
                key={index}
                className="w-full bg-card border border-border rounded-lg p-4 flex items-center gap-3"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {userRole === "trainee" && (
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => toggleMealCompletion(mealKey)}
                    className="h-5 w-5"
                  />
                )}
                
                <button
                  className="flex-1 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-lg -m-4 p-4"
                  onClick={() => navigate(`/${userRole}/plans/${id}/meal/${selectedDay}-${index}`)}
                >
                  <div className="text-left flex-1">
                    <h4 className={`font-semibold ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                      {meal.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${isCompleted ? "text-muted-foreground" : "text-accent"}`}>
                      {meal.calories} cal
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              </div>
            );
          })}
        </section>

        {/* Assigned Trainees Section - Only for Trainers */}
        {userRole === "trainer" && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Assigned Trainees</h3>
              <Badge variant="secondary" className="ml-auto">
                {assignedTrainees.length}
              </Badge>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <ScrollArea className="h-[300px]">
                <div className="flex flex-col">
                  {assignedTrainees.length > 0 ? (
                    assignedTrainees.map((trainee) => (
                      <div
                        key={trainee.id}
                        className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={trainee.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {trainee.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{trainee.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{trainee.email}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium text-primary">
                                {trainee.completedDays}/{trainee.totalDays} days
                              </span>
                            </div>
                            <Progress value={trainee.progress} className="h-1.5" />
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleUnassign(trainee.id, trainee.name)}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Users className="h-12 w-12 text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">No trainees assigned yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </section>
        )}
      </main>

      <BottomNav userRole={userRole} />
    </div>
  );
}
