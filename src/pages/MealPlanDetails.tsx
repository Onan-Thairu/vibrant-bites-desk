import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const mealSchedule = [
  { name: "Breakfast", time: "7:00 AM" },
  { name: "Snack", time: "10:00 AM" },
  { name: "Lunch", time: "1:00 PM" },
  { name: "Snack", time: "4:00 PM" },
  { name: "Dinner", time: "7:00 PM" },
];

export default function MealPlanDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userRole = window.location.pathname.includes("trainer") ? "trainer" : "employee";

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
        <div>
          <h2 className="text-2xl font-bold mb-2">Week 1: Balanced Diet</h2>
        </div>

        <section className="space-y-2">
          {mealSchedule.map((meal, index) => (
            <button
              key={index}
              className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
              onClick={() => navigate(`/${userRole}/plans/${id}/meal/${index}`)}
            >
              <div className="text-left">
                <h3 className="font-semibold">{meal.name}</h3>
                <p className="text-sm text-muted-foreground">{meal.time}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </section>
      </main>

      <BottomNav userRole={userRole} />
    </div>
  );
}
