import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><div className="p-6"><h1 className="text-3xl font-bold">Projects</h1><p className="text-muted-foreground">Coming soon...</p></div></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><div className="p-6"><h1 className="text-3xl font-bold">Employees</h1><p className="text-muted-foreground">Coming soon...</p></div></ProtectedRoute>} />
            <Route path="/workgroups" element={<ProtectedRoute><div className="p-6"><h1 className="text-3xl font-bold">Workgroups</h1><p className="text-muted-foreground">Coming soon...</p></div></ProtectedRoute>} />
            <Route path="/workflows" element={<ProtectedRoute><div className="p-6"><h1 className="text-3xl font-bold">Workflows</h1><p className="text-muted-foreground">Coming soon...</p></div></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><div className="p-6"><h1 className="text-3xl font-bold">Administration</h1><p className="text-muted-foreground">Coming soon...</p></div></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
