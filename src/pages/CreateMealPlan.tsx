import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { X, Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const mealTypes = [
  { type: "Breakfast", placeholder: "Add breakfast items" },
  { type: "Lunch", placeholder: "Add lunch items" },
  { type: "Dinner", placeholder: "Add dinner items" },
  { type: "Snacks", placeholder: "Add snack items" },
];

export default function CreateMealPlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!planName.trim()) {
      toast.error("Please enter a meal plan name");
      return;
    }
    toast.success("Meal plan created successfully!");
    navigate("/trainer");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Create Meal Plan</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Plan Name */}
        <div className="space-y-2">
          <Label htmlFor="planName">Meal Plan Name</Label>
          <Input
            id="planName"
            placeholder="e.g., 7-Day Weight Loss Plan"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add a brief description of this meal plan..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        {/* Meal Items Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Meal Items</h2>
          <div className="space-y-3">
            {mealTypes.map((meal) => (
              <button
                key={meal.type}
                className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="text-left">
                  <h3 className="font-semibold">Add Meal Item</h3>
                  <p className="text-sm text-muted-foreground">{meal.type}</p>
                </div>
                <Plus className="h-5 w-5 text-primary" />
              </button>
            ))}
          </div>
        </section>

        {/* Nutritional Information */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Nutritional Information</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input id="calories" placeholder="(g)" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protein</Label>
              <Input id="protein" placeholder="(g)" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs</Label>
              <Input id="carbs" placeholder="(g)" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat</Label>
              <Input id="fat" placeholder="(g)" type="number" />
            </div>
          </div>
        </section>

        {/* Assign to Employees */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Assign to Employees</h2>
          <button
            className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <span className="font-medium">Select Employees</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </section>

        {/* Create Button */}
        <Button
          className="w-full bg-accent hover:bg-accent/90 h-12 text-base font-semibold"
          onClick={handleCreate}
        >
          Create Meal Plan
        </Button>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}
