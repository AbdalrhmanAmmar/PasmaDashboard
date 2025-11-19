import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const schema = z.object({
  title: z.string().min(3, "العنوان مطلوب"),
  content: z.string().min(10, "المحتوى مطلوب"),
});

type FormValues = z.infer<typeof schema>;

const AddActivity = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { title: "", content: "" } });

  const onSubmit = (values: FormValues) => {
    toast.success("تم إضافة النشاط/التقرير بنجاح");
    navigate("/reports");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">إضافة نشاط</h2>
        <Card>
          <CardHeader>
            <CardTitle>بيانات التقرير/النشاط</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان التقرير</FormLabel>
                      <FormControl>
                        <Input placeholder="اكتب عنوانًا واضحًا" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>محتوى التقرير أو الفورم</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="اكتب التفاصيل كاملة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/reports")}>رجوع</Button>
                  <Button type="submit">حفظ</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddActivity;