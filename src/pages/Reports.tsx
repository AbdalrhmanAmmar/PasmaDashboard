import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FileText, PlusCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listReports, deleteReport, type ReportDoc } from "@/api/reports";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<{ page: number; limit: number; total: number; pages: number } | undefined>();
  const [toDelete, setToDelete] = useState<ReportDoc | null>(null);

  const fetchReports = () => {
    setLoading(true);
    listReports({ q: q || undefined, sort, page, limit })
      .then((res) => { setReports(res.data); setMeta(res.meta); })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(fetchReports, 300);
    return () => clearTimeout(t);
  }, [q, sort, page, limit]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteReport(toDelete._id);
      setToDelete(null);
      fetchReports();
    } catch {}
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">التقارير والانشطة</h2>
            <Button className="gap-2" onClick={() => navigate("/reports/new")}>
            <PlusCircle className="w-4 h-4" />
            إضافة نشاط
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <Input placeholder="بحث في العنوان/الوصف" value={q} onChange={(e) => setQ(e.target.value)} />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="الترتيب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-createdAt">الأحدث</SelectItem>
                <SelectItem value="createdAt">الأقدم</SelectItem>
                <SelectItem value="title">العنوان (أ-ي)</SelectItem>
                <SelectItem value="-title">العنوان (ي-أ)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={String(limit)} onValueChange={(v) => setLimit(Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder="عدد" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setQ(""); setSort("-createdAt"); setPage(1); }}>إعادة تعيين</Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              إدارة التقارير والانشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> جاري التحميل...</div>
            ) : reports.length === 0 ? (
              <div className="text-muted-foreground">لا توجد تقارير/أنشطة حالياً.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {reports.map((r) => (
                  <Card key={r._id} className="border">
                    <CardHeader>
                      <CardTitle className="text-lg truncate">{r.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{r.description || ""}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/reports/${r._id}/edit`)}>
                          <Pencil className="w-4 h-4" /> تعديل
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => setToDelete(r)}>
                          <Trash2 className="w-4 h-4" /> حذف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">صفحة {meta?.page || page} من {meta?.pages || 1} — إجمالي {meta?.total || reports.length}</div>
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
              <AlertDialogTitle>تأكيد حذف التقرير</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="text-muted-foreground">سيتم حذف تقرير "{toDelete?.title}" ولا يمكن التراجع.</div>
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

export default Reports;
