import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/BottomNav";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const mockTrainees = [
  { id: "1", name: "John Doe", email: "john@company.com" },
  { id: "2", name: "Jane Smith", email: "jane@company.com" },
  { id: "3", name: "Bob Johnson", email: "bob@company.com" },
];

export default function CreateMealPlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mealDays, setMealDays] = useState<Record<string, any>>({});

  const handleCreate = () => {
    if (!planName.trim()) {
      toast.error("Please enter a plan name");
      return;
    }
    if (selectedDates.length === 0) {
      toast.error("Please select at least one day");
      return;
    }
    if (selectedTrainees.length === 0) {
      toast.error("Please assign at least one trainee");
      return;
    }
    toast.success(`Meal plan created and assigned to ${selectedTrainees.length} trainee(s)!`);
    navigate("/trainer/plans");
  };

  const toggleTrainee = (traineeId: string) => {
    setSelectedTrainees((prev) =>
      prev.includes(traineeId)
        ? prev.filter((id) => id !== traineeId)
        : [...prev, traineeId]
    );
  };

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      setSelectedDates(dates);
      // Initialize meal days for new dates
      const newMealDays = { ...mealDays };
      dates.forEach(date => {
        const dateKey = format(date, "yyyy-MM-dd");
        if (!newMealDays[dateKey]) {
          newMealDays[dateKey] = {
            breakfast: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
            lunch: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
            dinner: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
          };
        }
      });
      setMealDays(newMealDays);
    }
  };

  const updateMeal = (dateKey: string, mealType: string, field: string, value: any) => {
    setMealDays(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: {
          ...prev[dateKey][mealType],
          [field]: value
        }
      }
    }));
  };

  const filteredTrainees = mockTrainees.filter(
    (trainee) =>
      trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Create Meal Plan</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Basic Information */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="planName">Plan Name</Label>
            <Input
              id="planName"
              placeholder="e.g., 7-Day Weight Loss Plan"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Days</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDates.length > 0 
                    ? `${selectedDates.length} day(s) selected`
                    : "Choose meal plan days"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the meal plan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </section>

        {/* Meal Plan Days Configuration */}
        {selectedDates.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Configure Meals</h2>
            <div className="space-y-6">
              {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => {
                const dateKey = format(date, "yyyy-MM-dd");
                const dayMeals = mealDays[dateKey] || {};
                
                return (
                  <Card key={dateKey}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Day {index + 1} - {format(date, "EEEE, MMM d")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {["breakfast", "lunch", "dinner"].map((mealType) => (
                        <div key={mealType} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                          <h4 className="font-medium capitalize">{mealType}</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                              <Label className="text-xs">Meal Name</Label>
                              <Input
                                placeholder={`${mealType} name`}
                                value={dayMeals[mealType]?.name || ""}
                                onChange={(e) => updateMeal(dateKey, mealType, "name", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Calories</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={dayMeals[mealType]?.calories || ""}
                                onChange={(e) => updateMeal(dateKey, mealType, "calories", parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Protein (g)</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={dayMeals[mealType]?.protein || ""}
                                onChange={(e) => updateMeal(dateKey, mealType, "protein", parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Carbs (g)</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={dayMeals[mealType]?.carbs || ""}
                                onChange={(e) => updateMeal(dateKey, mealType, "carbs", parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Fats (g)</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={dayMeals[mealType]?.fats || ""}
                                onChange={(e) => updateMeal(dateKey, mealType, "fats", parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Assign to Trainees */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Assign to Trainees</h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trainees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredTrainees.map((trainee) => (
              <div
                key={trainee.id}
                className="flex items-center gap-3 p-3 border border-border rounded-lg"
              >
                <Checkbox
                  id={`trainee-${trainee.id}`}
                  checked={selectedTrainees.includes(trainee.id)}
                  onCheckedChange={() => toggleTrainee(trainee.id)}
                />
                <Label
                  htmlFor={`trainee-${trainee.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="font-medium">{trainee.name}</div>
                  <div className="text-sm text-muted-foreground">{trainee.email}</div>
                </Label>
              </div>
            ))}
          </div>
        </section>

        {/* Create Button */}
        <Button className="w-full" onClick={handleCreate}>
          Create Meal Plan
        </Button>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}
