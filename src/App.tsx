import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import Maintenance from "./pages/Maintenance";
import AddFault from "./pages/AddFault";
import Reports from "./pages/Reports";
import AddActivity from "./pages/AddActivity";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import EditCar from "./pages/EditCar";
import CarDetails from "./pages/CarDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/cars" element={<ProtectedRoute><Cars /></ProtectedRoute>} />
          <Route path="/cars/new" element={<AddCar />} />
          <Route path="/cars/:id/edit" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
          <Route path="/cars/:id" element={<ProtectedRoute><CarDetails /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
          <Route path="/maintenance/new" element={<ProtectedRoute><AddFault /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/reports/new" element={<ProtectedRoute><AddActivity /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
