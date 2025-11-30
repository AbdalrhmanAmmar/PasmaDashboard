import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { getReport, updateReportMultipart } from "@/api/reports";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";

const schema = z.object({
  title: z.string().min(3, "العنوان مطلوب"),
  description: z.string().optional(),
  image: z.any().optional(),
  video: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { title: "", description: "", image: undefined, video: undefined } });
  const [fileKey, setFileKey] = useState(0);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewVid, setPreviewVid] = useState<string | null>(null);
  const [doc, setDoc] = useState<{ imageUrl?: string; videoUrl?: string } | null>(null);
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const vidInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!id) return;
    getReport(id)
      .then((d) => {
        setDoc(d);
        form.reset({ title: d.title || "", description: d.description || "" });
        setPreviewImg(d.imageUrl || null);
        setPreviewVid(d.videoUrl || null);
      })
      .catch(() => toast.error("تعذر تحميل التقرير"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    if (!id) return;
    try {
      const fd = new FormData();
      fd.append("title", values.title);
      if (values.description !== undefined) fd.append("description", String(values.description || ""));
      if (values.image?.[0]) fd.append("image", values.image[0]);
      if (values.video?.[0]) fd.append("video", values.video[0]);
      await updateReportMultipart(id, fd);
      toast.success("تم تحديث التقرير");
      navigate("/reports");
    } catch {
      toast.error("تعذر تحديث التقرير");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">تعديل تقرير</h2>
        <Card>
          <CardHeader>
            <CardTitle>بيانات التقرير</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-muted-foreground">جاري تحميل البيانات...</div>
            ) : (
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative rounded-xl border bg-card p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">الصورة</span>
                      </div>
                      {previewImg ? (
                        <img src={previewImg} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                      ) : (
                        <div className="h-40 rounded-lg bg-muted grid place-items-center text-muted-foreground">لا توجد صورة</div>
                      )}
                      <Button type="button" size="icon" variant="outline" className="absolute top-3 right-3 rounded-full" onClick={() => imgInputRef.current?.click()}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="relative rounded-xl border bg-card p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">الفيديو</span>
                      </div>
                      {previewVid ? (
                        <video src={previewVid} controls className="w-full h-40 object-cover rounded-lg" />
                      ) : (
                        <div className="h-40 rounded-lg bg-muted grid place-items-center text-muted-foreground">لا يوجد فيديو</div>
                      )}
                      <Button type="button" size="icon" variant="outline" className="absolute top-3 right-3 rounded-full" onClick={() => vidInputRef.current?.click()}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>العنوان</FormLabel>
                        <FormControl>
                          <Input placeholder="عنوان التقرير" disabled={form.formState.isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الوصف</FormLabel>
                        <FormControl>
                          <Textarea rows={6} placeholder="تفاصيل التقرير" disabled={form.formState.isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="sr-only">
                          <FormLabel>تحديث صورة التقرير</FormLabel>
                          <FormControl>
                            <Input
                              key={`img-${fileKey}`}
                              type="file"
                              accept="image/*"
                              disabled={form.formState.isSubmitting}
                              ref={imgInputRef}
                              onChange={(e) => {
                                const files = e.target.files;
                                field.onChange(files);
                                if (files && files[0]) setPreviewImg(URL.createObjectURL(files[0]));
                                else setPreviewImg(null);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="video"
                      render={({ field }) => (
                        <FormItem className="sr-only">
                          <FormLabel>تحديث فيديو التقرير</FormLabel>
                          <FormControl>
                            <Input
                              key={`vid-${fileKey}`}
                              type="file"
                              accept="video/*"
                              disabled={form.formState.isSubmitting}
                              ref={vidInputRef}
                              onChange={(e) => {
                                const files = e.target.files;
                                field.onChange(files);
                                if (files && files[0]) setPreviewVid(URL.createObjectURL(files[0]));
                                else setPreviewVid(null);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>إلغاء</Button>
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "جاري الحفظ" : "حفظ"}</Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditReport;
