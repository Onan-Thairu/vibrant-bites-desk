import { Home, Utensils, TrendingUp, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const trainerNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/trainer" },
  { icon: Utensils, label: "Meal Plans", path: "/trainer/plans" },
  { icon: TrendingUp, label: "Trainees", path: "/trainer/trainees" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const traineeNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/trainee" },
  { icon: Utensils, label: "Meal Plans", path: "/trainee/plans" },
  { icon: TrendingUp, label: "Progress", path: "/trainee/progress" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface BottomNavProps {
  userRole: "trainer" | "trainee";
}

export function BottomNav({ userRole }: BottomNavProps) {
  const location = useLocation();
  const navItems = userRole === "trainer" ? trainerNavItems : traineeNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 lg:hidden">
      <div className="max-w-lg mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[64px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "fill-primary")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
