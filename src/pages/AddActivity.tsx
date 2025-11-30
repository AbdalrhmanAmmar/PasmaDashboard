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
import { createReportMultipart } from "@/api/reports";
import { useState } from "react";

const schema = z
  .object({
    title: z.string().min(3, "العنوان مطلوب"),
    content: z.string().min(10, "المحتوى مطلوب"),
    image: z.any().optional(),
    video: z.any().optional(),
  })
  .refine((data) => (data.image?.length || 0) > 0 || (data.video?.length || 0) > 0, {
    message: "يجب إدخال صورة أو فيديو",
    path: ["image"],
  });

type FormValues = z.infer<typeof schema>;

const AddActivity = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { title: "", content: "", image: undefined, video: undefined } });
  const [fileKey, setFileKey] = useState(0);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    try {
      const fd = new FormData();
      fd.append("title", values.title);
      fd.append("description", values.content);
      if (values.image?.[0]) fd.append("image", values.image[0]);
      if (values.video?.[0]) fd.append("video", values.video[0]);
      await createReportMultipart(fd);
      toast.success("تم إضافة النشاط/التقرير بنجاح");
      form.reset({ title: "", content: "", image: undefined, video: undefined });
      setImageURL(null);
      setVideoURL(null);
      setFileKey((k) => k + 1);
      navigate("/reports");
    } catch {
      toast.error("تعذر إضافة التقرير");
    }
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
                        <Input placeholder="اكتب عنوانًا واضحًا" disabled={form.formState.isSubmitting} {...field} />
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
                        <Textarea rows={6} placeholder="اكتب التفاصيل كاملة" disabled={form.formState.isSubmitting} {...field} />
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
                      <FormItem>
                        <FormLabel>صورة النشاط</FormLabel>
                        <FormControl>
                          <Input
                            key={`img-${fileKey}`}
                            type="file"
                            accept="image/*"
                            disabled={form.formState.isSubmitting}
                            onChange={(e) => {
                              const files = e.target.files;
                              field.onChange(files);
                              if (files && files[0]) setImageURL(URL.createObjectURL(files[0]));
                              else setImageURL(null);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {imageURL && (
                          <img src={imageURL} alt="preview" className="mt-2 w-full h-48 object-cover rounded-lg border" />
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="video"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>فيديو النشاط</FormLabel>
                        <FormControl>
                          <Input
                            key={`vid-${fileKey}`}
                            type="file"
                            accept="video/*"
                            disabled={form.formState.isSubmitting}
                            onChange={(e) => {
                              const files = e.target.files;
                              field.onChange(files);
                              if (files && files[0]) setVideoURL(URL.createObjectURL(files[0]));
                              else setVideoURL(null);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {videoURL && (
                          <video src={videoURL} controls className="mt-2 w-full h-48 object-cover rounded-lg border" />
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/reports")}>رجوع</Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "جاري الحفظ" : "حفظ"}</Button>
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
