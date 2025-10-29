import { useState } from "react";
import { ArrowLeft, Search, ChevronRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const mockTrainees = [
  { id: "1", name: "John Doe", email: "john@company.com" },
  { id: "2", name: "Jane Smith", email: "jane@company.com" },
  { id: "3", name: "Bob Johnson", email: "bob@company.com" },
];

export default function CreateMealPlan() {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [planImage, setPlanImage] = useState<File | null>(null);
  const [planImagePreview, setPlanImagePreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState<string>("1");
  const [selectedTrainees, setSelectedTrainees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPlanImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlanImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (!planName.trim()) {
      toast.error("Please enter a plan name");
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
            <Label htmlFor="planImage">Meal Plan Image</Label>
            <Input
              id="planImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {planImagePreview && (
              <div className="mt-2">
                <img
                  src={planImagePreview}
                  alt="Meal plan preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Number of Weeks</Label>
            <Select value={numberOfWeeks} onValueChange={setNumberOfWeeks}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of weeks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Week</SelectItem>
                <SelectItem value="2">2 Weeks</SelectItem>
                <SelectItem value="3">3 Weeks</SelectItem>
                <SelectItem value="4">4 Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {parseInt(numberOfWeeks) > 1 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Week 1 meals will be duplicated to weeks {Array.from({length: parseInt(numberOfWeeks) - 1}, (_, i) => i + 2).join(", ")}
              </AlertDescription>
            </Alert>
          )}

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

        {/* Meal Plan Days */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Configure Week 1 Meals</h2>
          <div className="space-y-3">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
              <Card
                key={day}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/trainer/plans/create/day/${day}`)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Day {day}</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure meals for this day
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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

          {searchQuery && (
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
          )}

          {selectedTrainees.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selected Trainees:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedTrainees.map((id) => {
                  const trainee = mockTrainees.find((t) => t.id === id);
                  return trainee ? (
                    <div key={id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {trainee.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
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
