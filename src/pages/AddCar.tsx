import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Car, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const schema = z.object({
  brand: z.string().min(2, "الماركة مطلوبة"),
  model: z.string().min(1, "الموديل مطلوب"),
  year: z.coerce.number().min(1950, "سنة الاصدار غير صحيحة").max(2100, "سنة الاصدار غير صحيحة"),
  enginePhoto: z
    .any()
    .refine((files) => files && files.length > 0, "صورة المحرك مطلوبة")
    .refine((files) => !files || (files[0] && files[0].type.startsWith("image/")), "يجب أن تكون الصورة من نوع Image"),
  chassisPhoto: z
    .any()
    .refine((files) => files && files.length > 0, "صورة الشاسيه مطلوبة")
    .refine((files) => !files || (files[0] && files[0].type.startsWith("image/")), "يجب أن تكون الصورة من نوع Image"),
  carImage: z
    .any()
    .optional()
    .refine((files) => !files || !files[0] || files[0].type.startsWith("image/"), "يجب أن تكون الصورة من نوع Image"),
  description: z.string().min(10, "الشرح النصي مطلوب على الأقل 10 حروف"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const AddCar = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { brand: "", model: "", year: 2020, enginePhoto: undefined, chassisPhoto: undefined, carImage: undefined, description: "", note: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const fd = new FormData();
      fd.append("brand", String(values.brand));
      fd.append("model", String(values.model));
      fd.append("year", String(values.year));
      fd.append("description", String(values.description));
      if (values.note) fd.append("note", String(values.note));
      if (values.enginePhoto?.[0]) fd.append("engineImage", values.enginePhoto[0]);
      if (values.chassisPhoto?.[0]) fd.append("chassisImage", values.chassisPhoto[0]);
      if (values.carImage?.[0]) fd.append("carImage", values.carImage[0]);
      const { createCarMultipart } = await import("@/api/cars");
      await createCarMultipart(fd);
      toast.success("تم إضافة السيارة بنجاح");
      form.reset({ brand: "", model: "", year: 2020, enginePhoto: undefined, chassisPhoto: undefined, carImage: undefined, description: "", note: "" });
    } catch {
      toast.error("فشل حفظ السيارة، حاول لاحقًا");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">إضافة سيارة</h2>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              بيانات السيارة
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                        <FormLabel>سنة الإصدار</FormLabel>
                        <FormControl>
                          <Input type="number" min={1950} max={2100} placeholder="مثال: 2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enginePhoto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>صورة المحرك</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <FormField
                  control={form.control}
                  name="chassisPhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>صورة الشاسيه</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carImage"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>صورة السيارة</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شرح نص توضيحي</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="اكتب وصفًا تفصيليًا" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ملاحظات</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="أي ملاحظات إضافية" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/cars")}>رجوع</Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {form.formState.isSubmitting ? "جاري الحفظ" : "حفظ"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddCar;