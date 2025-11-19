import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

const Cars = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">قائمة السيارات</h2>
          <Button onClick={() => navigate("/cars/new")}>إضافة سيارة جديدة</Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              السيارات المسجلة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">لا توجد سيارات بعد.</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Cars;