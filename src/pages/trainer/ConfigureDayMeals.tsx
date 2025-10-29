import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const mealTypes = [
  { id: "breakfast", name: "Breakfast", time: "7:00 AM" },
  { id: "snack1", name: "Snack 1", time: "10:00 AM" },
  { id: "lunch", name: "Lunch", time: "1:00 PM" },
  { id: "snack2", name: "Snack 2", time: "4:00 PM" },
  { id: "dinner", name: "Dinner", time: "7:00 PM" },
];

interface MealData {
  image: File | null;
  imagePreview: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string;
}

export default function ConfigureDayMeals() {
  const navigate = useNavigate();
  const { dayNumber } = useParams();
  const [meals, setMeals] = useState<Record<string, MealData>>({
    breakfast: { image: null, imagePreview: "", description: "", calories: 0, protein: 0, carbs: 0, fats: 0, ingredients: "" },
    snack1: { image: null, imagePreview: "", description: "", calories: 0, protein: 0, carbs: 0, fats: 0, ingredients: "" },
    lunch: { image: null, imagePreview: "", description: "", calories: 0, protein: 0, carbs: 0, fats: 0, ingredients: "" },
    snack2: { image: null, imagePreview: "", description: "", calories: 0, protein: 0, carbs: 0, fats: 0, ingredients: "" },
    dinner: { image: null, imagePreview: "", description: "", calories: 0, protein: 0, carbs: 0, fats: 0, ingredients: "" },
  });

  const updateMeal = (mealId: string, field: keyof MealData, value: any) => {
    setMeals(prev => ({
      ...prev,
      [mealId]: {
        ...prev[mealId],
        [field]: value
      }
    }));
  };

  const handleImageChange = (mealId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateMeal(mealId, "image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateMeal(mealId, "imagePreview", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast.success(`Day ${dayNumber} meals configured successfully`);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Configure Day {dayNumber}</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {mealTypes.map((mealType) => (
          <Card key={mealType.id}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{mealType.name}</span>
                <span className="text-sm font-normal text-muted-foreground">{mealType.time}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Upload Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(mealType.id, e)}
                />
                {meals[mealType.id].imagePreview && (
                  <div className="mt-2">
                    <img
                      src={meals[mealType.id].imagePreview}
                      alt={`${mealType.name} preview`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Description</Label>
                <Textarea
                  placeholder={`Describe the ${mealType.name.toLowerCase()}...`}
                  value={meals[mealType.id].description}
                  onChange={(e) => updateMeal(mealType.id, "description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Calories</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={meals[mealType.id].calories || ""}
                    onChange={(e) => updateMeal(mealType.id, "calories", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Protein (g)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={meals[mealType.id].protein || ""}
                    onChange={(e) => updateMeal(mealType.id, "protein", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Carbs (g)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={meals[mealType.id].carbs || ""}
                    onChange={(e) => updateMeal(mealType.id, "carbs", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Fats (g)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={meals[mealType.id].fats || ""}
                    onChange={(e) => updateMeal(mealType.id, "fats", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Ingredients</Label>
                <Textarea
                  placeholder="List the ingredients..."
                  value={meals[mealType.id].ingredients}
                  onChange={(e) => updateMeal(mealType.id, "ingredients", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button className="w-full" onClick={handleSave}>
          Save Day {dayNumber} Configuration
        </Button>
      </main>
    </div>
  );
}
