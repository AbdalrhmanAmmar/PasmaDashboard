import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/api/auth";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
    <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.3-1.5 3.7-5.1 3.7-3.1 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.7 14.6 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-8.8 0-.6-.1-1.1-.2-1.6H12z"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();

  // 1️⃣ when user clicks login
  const handleGoogleLogin = () => {
    toast.info("Redirecting to Google...");
    const serverURL = window.location.hostname === "localhost"
      ? "http://localhost:9000"
      : "https://pasmaserver.onrender.com";
    window.location.href = `${serverURL}/auth/google`;
  };

  // 2️⃣ when redirected back from Google and session cookie exists
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res?.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          toast.success(`Welcome ${res.user.name}!`);
          navigate("/");
        }
      })
      .catch(() => {});
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="min-h-[60vh] grid place-items-center">
        <div className="w-full max-w-md">
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Sign In
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Button className="w-full flex gap-2" onClick={handleGoogleLogin}>
                <GoogleIcon />
                Continue with Google
              </Button>

              <div className="text-center text-sm mt-4 text-muted-foreground">
                Fast and secure login
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Login;