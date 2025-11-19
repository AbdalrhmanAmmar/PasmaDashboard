import { Home, Car, Wrench, FileText, PlusCircle, Settings, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "الرئيسية", url: "/", icon: Home },
  { title: "العملاء", url: "/customers", icon: Users },
  { title: "السيارات", url: "/cars", icon: Car },
  { title: "إضافة سيارة", url: "/cars/new", icon: PlusCircle },
  { title: "الصيانة", url: "/maintenance", icon: Wrench },
  { title: "التقارير والانشطة", url: "/reports", icon: FileText },
  { title: "الإعدادات", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar side="right" className="border-l border-sidebar-border">
      <SidebarContent>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl  flex items-center justify-center shadow-lg">
             
                <img src="/Image/Pasma.png" alt="" />
             
            </div>
            {open && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground ">Pasma dashboard</h2>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs px-6 py-3">القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-3 rounded-lg">
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
                      activeClassName="bg-sidebar-accent text-primary font-semibold border-r-4 border-primary"
                    >
                      <item.icon className="w-5 h-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
