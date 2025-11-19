import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";

const faultSchema = z.object({
  type: z.string().min(1, "النوع مطلوب"),
  cause: z.string().min(3, "السبب مطلوب"),
  location: z.string().min(2, "المكان مطلوب"),
  media: z.any().optional(),
  fix: z.string().min(5, "طريقة الإصلاح مطلوبة"),
  notes: z.string().optional(),
});

type FaultFormValues = z.infer<typeof faultSchema>;

const AddFault = () => {
  const form = useForm<FaultFormValues>({
    resolver: zodResolver(faultSchema),
    defaultValues: { type: "", cause: "", location: "", fix: "", notes: "", media: undefined },
  });

  const onSubmit = (values: FaultFormValues) => {
    toast.success("تم إنشاء العطل بنجاح");
    window.location.href = "/maintenance";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">إضافة عطل جديد</h2>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>بيانات العطل</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>نوع/تصنيف العطل</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر التصنيف" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ميكانيكا">ميكانيكا</SelectItem>
                              <SelectItem value="كهرباء">كهرباء</SelectItem>
                              <SelectItem value="هيكل">هيكل</SelectItem>
                              <SelectItem value="إطارات">إطارات</SelectItem>
                              <SelectItem value="أخرى">أخرى</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cause"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سبب العطل</FormLabel>
                        <FormControl>
                          <Input placeholder="وصف مختصر للسبب" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مكان العطل</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: المحرك، الباب، نظام الكهرباء" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>صورة/فيديو (اختياري)</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*,video/*" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="fix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كيفية الإصلاح</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="خطوات الإصلاح المقترحة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ملاحظات إضافية</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="أي تفاصيل إضافية" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => (window.location.href = "/maintenance")}>إلغاء</Button>
                  <Button type="submit">حفظ العطل</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddFault;