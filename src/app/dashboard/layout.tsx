import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { PageTransition } from "@/components/dashboard/PageTransition";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <PageTransition>{children}</PageTransition>
        </div>
      </div>
    </div>
  );
}
