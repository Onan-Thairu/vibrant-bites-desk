import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const mockDays = [
  {
    day: 1,
    date: "Mon, Jan 15",
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
    date: "Tue, Jan 16",
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
    date: "Wed, Jan 17",
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

export default function MealPlanDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userRole = window.location.pathname.includes("trainer") ? "trainer" : "employee";
  const [selectedDay, setSelectedDay] = useState(1);

  const currentDayData = mockDays.find((d) => d.day === selectedDay) || mockDays[0];

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
                <div className="text-xs opacity-80">{day.date}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Daily Summary */}
        <div className="bg-card border border-border rounded-lg p-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Daily Calories</span>
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
              {currentDayData.totalCalories} kcal
            </Badge>
          </div>
        </div>

        {/* Meals for Selected Day */}
        <section className="space-y-3">
          <h3 className="font-semibold">Day {currentDayData.day} Meals</h3>
          {currentDayData.meals.map((meal, index) => (
            <button
              key={index}
              className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
              onClick={() => navigate(`/${userRole}/plans/${id}/meal/${selectedDay}-${index}`)}
            >
              <div className="text-left flex-1">
                <h4 className="font-semibold">{meal.name}</h4>
                <p className="text-sm text-muted-foreground">{meal.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-accent">{meal.calories} cal</span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </section>
      </main>

      <BottomNav userRole={userRole} />
    </div>
  );
}
