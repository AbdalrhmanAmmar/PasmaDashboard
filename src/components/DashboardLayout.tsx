import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { logout } from "@/api/auth";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      toast.success("تم تسجيل الخروج", { description: "نراك لاحقاً" });
      navigate("/login");
    } catch {
      toast.error("تعذر تسجيل الخروج");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-foreground" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">مرحباً بك</h1>
                  <p className="text-sm text-muted-foreground">إليك نظرة عامة على نشاطك اليوم</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full w-10 h-10"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <Button variant="default" size="icon" className="rounded-full w-10 h-10" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
