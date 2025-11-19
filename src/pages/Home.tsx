import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Wrench, FileText, PlusCircle } from "lucide-react";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="p-8 rounded-2xl shadow-lg text-foreground bg-gradient-to-br from-primary via-secondary to-accent">
          <h2 className="text-3xl font-bold mb-2">منصة إدارة السيارات</h2>
          <p className="text-popover-foreground/90 text-lg">إدارة السيارات، الصيانة، والحجوزات بسهولة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">السيارات</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Car className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-card-foreground mb-3">إدارة قائمة السيارات</div>
              <Button variant="default" className="w-full" onClick={() => (window.location.href = "/cars")}>فتح القائمة</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">إضافة سيارة</CardTitle>
              <div className="p-2 rounded-lg bg-secondary/10">
                <PlusCircle className="w-5 h-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-card-foreground mb-3">إنشاء سجل سيارة جديد</div>
              <Button variant="secondary" className="w-full" onClick={() => (window.location.href = "/cars/new")}>بدء الإضافة</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">الصيانة</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-card-foreground mb-3">سجلات وخطط الصيانة</div>
              <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/maintenance")}>فتح الصيانة</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">التقارير والانشطة</CardTitle>
              <div className="p-2 rounded-lg bg-accent/10">
                <FileText className="w-5 h-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-card-foreground mb-3">إدارة التقارير والانشطة</div>
              <Button variant="ghost" className="w-full" onClick={() => (window.location.href = "/reports")}>فتح التقارير</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;