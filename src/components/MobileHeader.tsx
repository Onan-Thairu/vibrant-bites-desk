import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MobileHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export function MobileHeader({ title, actions }: MobileHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40 lg:hidden">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="text-xl font-bold">{title}</h1>
        
        <div className="w-10">
          {actions}
        </div>
      </div>
    </header>
  );
}
