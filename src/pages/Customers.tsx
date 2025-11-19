import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useMemo, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  car: string;
  lastService: string;
  status: "نشط" | "معلق" | "VIP";
};

const data: Customer[] = [
  { id: 1, name: "محمد العتيبي", phone: "0501234567", email: "m.a@example.com", car: "Toyota Camry 2021", lastService: "2025-10-01", status: "نشط" },
  { id: 2, name: "سارة العمري", phone: "0539876543", email: "s.am@example.com", car: "Honda Civic 2020", lastService: "2025-09-18", status: "VIP" },
  { id: 3, name: "أحمد الغامدي", phone: "0552223344", email: "ah.g@example.com", car: "Nissan Altima 2019", lastService: "2025-08-30", status: "معلق" },
  { id: 4, name: "نورة القحطاني", phone: "0516667788", email: "n.qa@example.com", car: "Hyundai Sonata 2022", lastService: "2025-10-10", status: "نشط" },
  { id: 5, name: "عبدالله الشهري", phone: "0575556667", email: "ab.sh@example.com", car: "Kia Sportage 2018", lastService: "2025-07-25", status: "معلق" },
  { id: 6, name: "ريم الدوسري", phone: "0591122334", email: "r.do@example.com", car: "BMW 320i 2023", lastService: "2025-10-12", status: "VIP" },
  { id: 7, name: "تركي العبدالله", phone: "0587788996", email: "t.ab@example.com", car: "Mercedes C200 2021", lastService: "2025-09-02", status: "نشط" },
  { id: 8, name: "ليلى المطيري", phone: "0544433221", email: "l.mt@example.com", car: "Audi A4 2017", lastService: "2025-06-19", status: "معلق" },
];

const Customers = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return data;
    return data.filter((c) => [c.name, c.phone, c.email, c.car].some((v) => v.includes(q)));
  }, [query]);

  const statusBadge = (s: Customer["status"]) => {
    if (s === "VIP") return <Badge variant="secondary">VIP</Badge>;
    if (s === "معلق") return <Badge variant="outline">معلق</Badge>;
    return <Badge>نشط</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            العملاء
          </h2>
          <div className="w-full max-w-xs">
            <Input placeholder="بحث بالاسم/الهاتف/البريد/السيارة" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">قائمة العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>العميل</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>السيارة</TableHead>
                  <TableHead>آخر صيانة</TableHead>
                  <TableHead className="text-center">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.car}</TableCell>
                    <TableCell>{c.lastService}</TableCell>
                    <TableCell className="text-center">{statusBadge(c.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
