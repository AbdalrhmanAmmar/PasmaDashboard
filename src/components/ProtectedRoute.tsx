import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "@/api/auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      setAuthed(true);
      return;
    }
    getCurrentUser()
      .then((res) => {
        if (res?.user) localStorage.setItem("user", JSON.stringify(res.user));
        setAuthed(true);
      })
      .catch(() => setAuthed(false));
  }, [location.pathname]);

  if (authed === null) return null;
  if (!authed) return <Navigate to="/login" replace />;
  return <>{children}</>;
}