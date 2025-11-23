import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCar, type CarDoc } from "@/api/cars";
import { toast } from "@/components/ui/sonner";
import { Car, Image as ImageIcon, Pencil } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCar(id)
      .then((doc) => setCar(doc))
      .catch(() => toast.error("تعذر تحميل بيانات السيارة"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            تفاصيل السيارة
          </h2>
          {car && (
            <Button onClick={() => navigate(`/cars/${car._id}/edit`)} className="gap-2">
              <Pencil className="w-4 h-4" /> تعديل
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-muted-foreground">جاري التحميل...</div>
        ) : !car ? (
          <div className="text-muted-foreground">لا توجد بيانات</div>
        ) : (
          <>
            <Card className="overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{car.brand} {car.model}</span>
                  <Badge variant="secondary">{car.year}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-xl border bg-card p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">صورة المحرك</span>
                    </div>
                    {car.engineImage ? (
                      <img src={car.engineImage} alt="Engine" className="w-full h-64 object-cover rounded-lg" />
                    ) : (
                      <div className="h-64 rounded-lg bg-muted grid place-items-center text-muted-foreground">لا توجد صورة</div>
                    )}
                  </div>

                  <div className="rounded-xl border bg-card p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">صورة الشاسيه</span>
                    </div>
                    {car.chassisImage ? (
                      <img src={car.chassisImage} alt="Chassis" className="w-full h-64 object-cover rounded-lg" />
                    ) : (
                      <div className="h-64 rounded-lg bg-muted grid place-items-center text-muted-foreground">لا توجد صورة</div>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border bg-background">
                    <CardHeader>
                      <CardTitle className="text-lg">الوصف</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{car.description || "لا يوجد"}</p>
                    </CardContent>
                  </Card>

                  <Card className="border bg-background">
                    <CardHeader>
                      <CardTitle className="text-lg">الملاحظات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{car.note || "لا يوجد"}</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CarDetails;