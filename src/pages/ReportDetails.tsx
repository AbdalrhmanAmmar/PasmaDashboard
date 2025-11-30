import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReport, type ReportDoc } from "@/api/reports";
import { toast } from "@/components/ui/sonner";
import { FileText, Image as ImageIcon, Video as VideoIcon, Pencil } from "lucide-react";

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<ReportDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getReport(id)
      .then((d) => setDoc(d))
      .catch(() => toast.error("تعذر تحميل التقرير"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> تفاصيل التقرير
          </h2>
          {doc && (
            <Button className="gap-2" onClick={() => navigate(`/reports/${doc._id}/edit`)}>
              <Pencil className="w-4 h-4" /> تعديل
            </Button>
          )}
        </div>
        {loading ? (
          <div className="text-muted-foreground">جاري التحميل...</div>
        ) : !doc ? (
          <div className="text-muted-foreground">لا توجد بيانات</div>
        ) : (
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl font-bold">{doc.title}</span>
                {doc.createdAt && <Badge variant="secondary">{new Date(doc.createdAt).toLocaleString()}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border bg-card p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">الصورة</span>
                  </div>
                  {doc.imageUrl ? (
                    <img src={doc.imageUrl} alt="Report" className="w-full h-64 object-cover rounded-lg" />
                  ) : (
                    <div className="h-64 rounded-lg bg-muted grid place-items-center text-muted-foreground">لا توجد صورة</div>
                  )}
                </div>
                <div className="rounded-xl border bg-card p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <VideoIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">الفيديو</span>
                  </div>
                  {doc.videoUrl ? (
                    <video src={doc.videoUrl} controls className="w-full h-64 object-cover rounded-lg" />
                  ) : (
                    <div className="h-64 rounded-lg bg-muted grid place-items-center text-muted-foreground">لا يوجد فيديو</div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <Card className="border bg-background">
                  <CardHeader>
                    <CardTitle className="text-lg">الوصف</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{doc.description || ""}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ReportDetails;
