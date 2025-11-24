import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "@/api/auth";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setAuthed(true);
      return;
    }
    getCurrentUser()
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false));
  }, [location.pathname]);

  if (authed === null)
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>جاري التحميل...</span>
        </div>
      </div>
    );
  if (!authed) return <Navigate to="/login" replace />;
  return <>{children}</>;
}