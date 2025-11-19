import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">التقارير والانشطة</h2>
          <Button className="gap-2" onClick={() => navigate("/reports/new")}>
            <PlusCircle className="w-4 h-4" />
            إضافة نشاط
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              إدارة التقارير والانشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">لا توجد تقارير/أنشطة حالياً.</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;