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
import { getReport, updateReport } from "@/api/reports";
import { useEffect, useState } from "react";

const schema = z.object({
  title: z.string().min(3, "العنوان مطلوب"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { title: "", description: "" } });

  useEffect(() => {
    if (!id) return;
    getReport(id)
      .then((doc) => form.reset({ title: doc.title || "", description: doc.description || "" }))
      .catch(() => toast.error("تعذر تحميل التقرير"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    if (!id) return;
    try {
      await updateReport(id, values);
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
