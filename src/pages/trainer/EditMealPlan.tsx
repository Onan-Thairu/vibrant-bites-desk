import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditMealPlan() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data - in real app, fetch from backend based on id
  const [planName, setPlanName] = useState("Weight Loss Plan");
  const [planImage, setPlanImage] = useState<File | null>(null);
  const [planImagePreview, setPlanImagePreview] = useState<string>("");
  const [description, setDescription] = useState("A comprehensive plan for weight loss");
  const [numberOfWeeks, setNumberOfWeeks] = useState<string>("1");

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

  const handleSave = () => {
    if (!planName.trim()) {
      toast.error("Please enter a plan name");
      return;
    }
    toast.success("Meal plan updated successfully!");
    navigate("/trainer/plans");
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Edit Meal Plan</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
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

        <Button className="w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </main>

      <BottomNav userRole="trainer" />
    </div>
  );
}
