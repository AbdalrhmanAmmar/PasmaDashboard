import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";

const stats = [
  {
    title: "إجمالي المستخدمين",
    value: "2,543",
    change: "+12.5%",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "المبيعات",
    value: "45,231 ر.س",
    change: "+8.2%",
    icon: DollarSign,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "الطلبات",
    value: "1,234",
    change: "+23.1%",
    icon: ShoppingCart,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "معدل النمو",
    value: "28.5%",
    change: "+4.3%",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-primary via-secondary to-accent p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
          <p className="text-white/90 text-lg">إليك ملخص سريع لأداء نشاطك اليوم</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
                <p className="text-sm text-primary mt-1 font-medium">
                  {stat.change} من الشهر الماضي
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "مستخدم جديد انضم", time: "منذ 5 دقائق", color: "bg-primary" },
                  { title: "طلب جديد تم إنشاؤه", time: "منذ 12 دقيقة", color: "bg-secondary" },
                  { title: "تم تحديث البيانات", time: "منذ 30 دقيقة", color: "bg-accent" },
                  { title: "تقرير شهري جاهز", time: "منذ ساعة", color: "bg-primary" },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">الإحصائيات السريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "معدل التحويل", value: "3.2%", progress: 75 },
                  { label: "متوسط قيمة الطلب", value: "450 ر.س", progress: 60 },
                  { label: "رضا العملاء", value: "94%", progress: 94 },
                  { label: "سرعة الخدمة", value: "4.8/5", progress: 96 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
