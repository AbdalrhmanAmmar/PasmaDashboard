import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Maintenance = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">الصيانة</h2>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              خطط الصيانة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground mb-4">لا توجد سجلات صيانة حالياً.</div>
            <Button variant="default" className="gap-2" onClick={() => navigate("/maintenance/new")}> 
              <PlusCircle className="w-4 h-4" />
              إضافة عطل جديد
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;