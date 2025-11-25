import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Car, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { listCarsAdvanced, deleteCar, type CarDoc } from "@/api/cars";
import { toast } from "@/components/ui/sonner";

const Cars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<CarDoc | null>(null);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<string>("");
  const [yearMin, setYearMin] = useState<string>("");
  const [yearMax, setYearMax] = useState<string>("");
  const [sort, setSort] = useState<string>("-createdAt");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [meta, setMeta] = useState<{ page: number; limit: number; total: number; pages: number } | undefined>();

  const fetchCars = () => {
    setLoading(true);
    const params: any = {
      q: query || undefined,
      brand: brand || undefined,
      model: model || undefined,
      year: year ? Number(year) : undefined,
      yearMin: yearMin ? Number(yearMin) : undefined,
      yearMax: yearMax ? Number(yearMax) : undefined,
      sort,
      page,
      limit,
    };
    listCarsAdvanced(params)
      .then((res) => {
        setCars(res.data);
        setMeta(res.meta);
      })
      .catch(() => toast.error("حدث خطأ أثناء تحميل السيارات"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(() => {
      fetchCars();
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, brand, model, year, yearMin, yearMax, sort, page, limit]);

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
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">قائمة السيارات</h2>
            <Button onClick={() => navigate("/cars/new")}>إضافة سيارة جديدة</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
            <Input placeholder="بحث نصي" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Input placeholder="الماركة" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input placeholder="الموديل" value={model} onChange={(e) => setModel(e.target.value)} />
            <Input type="number" placeholder="السنة" value={year} onChange={(e) => setYear(e.target.value)} />
            <Input type="number" placeholder="من سنة" value={yearMin} onChange={(e) => setYearMin(e.target.value)} />
            <Input type="number" placeholder="إلى سنة" value={yearMax} onChange={(e) => setYearMax(e.target.value)} />
            <div className="lg:col-span-2 flex items-center gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="الترتيب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-createdAt">الأحدث</SelectItem>
                  <SelectItem value="createdAt">الأقدم</SelectItem>
                  <SelectItem value="brand">الماركة (أ-ي)</SelectItem>
                  <SelectItem value="-brand">الماركة (ي-أ)</SelectItem>
                  <SelectItem value="year">السنة تصاعدي</SelectItem>
                  <SelectItem value="-year">السنة تنازلي</SelectItem>
                </SelectContent>
              </Select>
              <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="عدد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { setPage(1); fetchCars(); }}>تصفية</Button>
              <Button variant="outline" onClick={() => { setQuery(""); setBrand(""); setModel(""); setYear(""); setYearMin(""); setYearMax(""); setSort("-createdAt"); setPage(1); }}>إعادة تعيين</Button>
            </div>
          </div>
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
              <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> جاري التحميل...</div>
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
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">صفحة {meta?.page || page} من {meta?.pages || 1} — إجمالي {meta?.total || cars.length}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled={(meta?.page || page) <= 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))}>السابق</Button>
                <Button variant="outline" disabled={(meta?.page || page) >= (meta?.pages || 1) || loading} onClick={() => setPage((p) => p + 1)}>التالي</Button>
              </div>
            </div>
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
