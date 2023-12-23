import { Toaster } from "@/components/ui/sonner";
import { useStore } from "@/lib/store";
import { ThemeProvider } from "@/providers/theme-provider";
import { listen } from "@tauri-apps/api/event";
import { Suspense, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../molecules/footer";
import Header from "../molecules/header";
import LoadingIndicator from "../molecules/loading-indicator";
import { Button } from "../ui/button";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser } = useStore();

  useEffect(() => {
    const unlisten = listen("scheme-request-received", (e) => {
      const url = new URL(e.payload as string);

      switch (url.pathname) {
        case "//login/": {
          const token = url.searchParams.get("token");
          if (token) {
            localStorage.setItem("token", token);
            fetchUser();
          }
          break;
        }
        default: {
          const path = url.pathname.replace(/\/$/, "");
          navigate(path);
          break;
        }
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, [navigate, fetchUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Header />
        <main className="flex-grow bg-background font-sans antialiased flex items-center flex-col relative overflow-hidden  h-full">
          <Suspense fallback={<LoadingIndicator variant="logo" className="my-auto" />}>
            {location?.pathname !== "/" && (
              <div className="flex justify-start w-full container mt-4 -ml-4">
                <Button variant={"link"} onClick={() => navigate(-1)} className="capitalize">
                  <FiChevronLeft className="mr-2" />
                  Go back
                </Button>
              </div>
            )}
            <Outlet />
          </Suspense>
          <Toaster />
        </main>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Layout;
