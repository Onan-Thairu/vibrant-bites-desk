import { Home, Utensils, TrendingUp, Settings, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AppSidebarProps {
  userRole: "trainer" | "trainee";
}

const trainerNavItems = [
  { icon: Home, label: "Home", path: "/trainer" },
  { icon: Utensils, label: "Meal Plans", path: "/trainer/plans" },
  { icon: TrendingUp, label: "Trainees", path: "/trainer/trainees" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const traineeNavItems = [
  { icon: Home, label: "Home", path: "/trainee" },
  { icon: Utensils, label: "Meal Plans", path: "/trainee/plans" },
  { icon: TrendingUp, label: "Progress", path: "/trainee/progress" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = userRole === "trainer" ? trainerNavItems : traineeNavItems;

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path}>
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-white hover:bg-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
