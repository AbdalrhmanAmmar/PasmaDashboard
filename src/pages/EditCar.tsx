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
import { getCar, updateCarMultipart } from "@/api/cars";
import { useEffect, useState } from "react";

const schema = z.object({
  brand: z.string().min(2, "الماركة مطلوبة"),
  model: z.string().min(1, "الموديل مطلوب"),
  year: z.coerce.number().min(1950, "سنة الاصدار غير صحيحة").max(2100, "سنة الاصدار غير صحيحة"),
  description: z.string().optional(),
  note: z.string().optional(),
  engineImage: z.any().optional(),
  chassisImage: z.any().optional(),
});

type FormValues = z.infer<typeof schema>;

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { brand: "", model: "", year: 2020, description: "", note: "", engineImage: undefined, chassisImage: undefined },
  });

  useEffect(() => {
    if (!id) return;
    getCar(id)
      .then((doc) => {
        form.reset({
          brand: doc.brand || "",
          model: doc.model || "",
          year: doc.year || 2020,
          description: doc.description || "",
          note: doc.note || "",
        });
      })
      .catch(() => toast.error("تعذر تحميل بيانات السيارة"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (values: FormValues) => {
    if (!id) return;
    try {
      const fd = new FormData();
      fd.append("brand", String(values.brand));
      fd.append("model", String(values.model));
      fd.append("year", String(values.year));
      if (values.description) fd.append("description", String(values.description));
      if (values.note) fd.append("note", String(values.note));
      if (values.engineImage?.[0]) fd.append("engineImage", values.engineImage[0]);
      if (values.chassisImage?.[0]) fd.append("chassisImage", values.chassisImage[0]);
      await updateCarMultipart(id, fd);
      toast.success("تم تحديث السيارة", { description: `${values.brand} ${values.model}` });
      navigate("/cars");
    } catch {
      toast.error("تعذر تحديث السيارة");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">تعديل السيارة</h2>
        <Card>
          <CardHeader>
            <CardTitle>بيانات السيارة</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-muted-foreground">جاري تحميل البيانات...</div>
            ) : (
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الماركة</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: Toyota" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الموديل</FormLabel>
                          <FormControl>
                            <Input placeholder="مثال: Camry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>السنة</FormLabel>
                          <FormControl>
                            <Input type="number" min={1950} max={2100} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>الوصف</FormLabel>
                          <FormControl>
                            <Textarea rows={4} placeholder="تفاصيل إضافية" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>ملاحظات</FormLabel>
                          <FormControl>
                            <Textarea rows={3} placeholder="أي ملاحظات" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="engineImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تحديث صورة المحرك</FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="chassisImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تحديث صورة الشاسيه</FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>إلغاء</Button>
                    <Button type="submit">حفظ التعديلات</Button>
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

export default EditCar;