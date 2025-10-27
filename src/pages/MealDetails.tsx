import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import mealPlan1 from "@/assets/meal-plan-1.jpg";

const mockMealData = {
  name: "Mediterranean Bowl",
  description: "A nutritious bowl packed with fresh vegetables, grilled chicken, quinoa, and tahini dressing",
  calories: 520,
  protein: 35,
  carbs: 48,
  fat: 18,
  ingredients: [
    "200g Grilled Chicken Breast",
    "1 cup Quinoa (cooked)",
    "1 cup Mixed Greens",
    "1/2 cup Cherry Tomatoes",
    "1/4 cup Cucumber",
    "2 tbsp Tahini Dressing",
    "Fresh Herbs (parsley, mint)",
  ],
  instructions: [
    "Cook quinoa according to package directions",
    "Grill chicken breast until fully cooked",
    "Prepare vegetables by washing and chopping",
    "Assemble bowl with quinoa as base",
    "Add chicken and vegetables",
    "Drizzle with tahini dressing",
    "Garnish with fresh herbs",
  ],
};

export default function MealDetails() {
  const navigate = useNavigate();
  const { mealId } = useParams();
  const userRole = window.location.pathname.includes("trainer") ? "trainer" : "trainee";

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Meal Details</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto pb-6">
        {/* Hero Image */}
        <div className="h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
          <img
            src={mealPlan1}
            alt={mockMealData.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Meal Name and Description */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{mockMealData.name}</h2>
            <p className="text-muted-foreground">{mockMealData.description}</p>
          </div>

          {/* Nutrition Info */}
          <Card className="p-4 border-none" style={{ boxShadow: "var(--shadow-card)" }}>
            <h3 className="font-semibold mb-3">Nutritional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="text-xl font-bold">{mockMealData.calories}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-xl font-bold">{mockMealData.protein}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-xl font-bold">{mockMealData.carbs}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="text-xl font-bold">{mockMealData.fat}g</p>
              </div>
            </div>
          </Card>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {mockMealData.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold mb-3">Instructions</h3>
            <ol className="space-y-3">
              {mockMealData.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex-shrink-0">
                    {index + 1}
                  </Badge>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <BottomNav userRole={userRole} />
    </div>
  );
}
