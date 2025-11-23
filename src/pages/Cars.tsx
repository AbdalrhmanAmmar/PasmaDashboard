import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Car, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { listCars, deleteCar, type CarDoc } from "@/api/cars";
import { toast } from "@/components/ui/sonner";

const Cars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<CarDoc | null>(null);

  useEffect(() => {
    listCars()
      .then((d) => setCars(d))
      .catch(() => toast.error("حدث خطأ أثناء تحميل السيارات"))
      .finally(() => setLoading(false));
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteCar(toDelete._id);
      toast.success("تم حذف السيارة", { description: `${toDelete.brand} ${toDelete.model}` });
      setCars((prev) => prev.filter((c) => c._id !== toDelete._id));
    } catch {
      toast.error("تعذر حذف السيارة");
    } finally {
      setToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">قائمة السيارات</h2>
          <Button onClick={() => navigate("/cars/new")}>إضافة سيارة جديدة</Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              السيارات المسجلة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-muted-foreground">جاري التحميل...</div>
            ) : cars.length === 0 ? (
              <div className="text-muted-foreground">لا توجد سيارات بعد.</div>
            ) : (
              <Table className="rounded-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-start">الماركة</TableHead>
                    <TableHead  className="text-start">الموديل</TableHead>
                    <TableHead  className="text-start">السنة</TableHead>
                    <TableHead  className="text-start">الوصف</TableHead>
                    <TableHead className="text-center">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.map((c) => (
                    <TableRow key={c._id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="font-medium">
                        <button className="hover:text-primary" onClick={() => navigate(`/cars/${c._id}`)}>
                          {c.brand}
                        </button>
                      </TableCell>
                      <TableCell>{c.model}</TableCell>
                      <TableCell>{c.year}</TableCell>
                      <TableCell className="truncate max-w-[240px]">{c.description}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/cars/${c._id}/edit`)}>
                            <Pencil className="w-4 h-4" /> تعديل
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => setToDelete(c)}>
                            <Trash2 className="w-4 h-4" /> حذف
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد حذف السيارة</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="text-muted-foreground">
              سيتم حذف السيارة {toDelete?.brand} {toDelete?.model} ولا يمكن التراجع.
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <Button variant="destructive" onClick={confirmDelete}>حذف</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Cars;