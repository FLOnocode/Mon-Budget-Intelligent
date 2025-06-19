import React, { useState } from "react";
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import BudgetOverview from "./BudgetOverview";
import DataTable from "./DataTable";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps = {}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would update the document class or a theme context
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={{ width: 280 }}
          animate={{ width: isSidebarCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3 }}
          className="relative border-r border-border bg-card"
        >
          <Sidebar collapsed={isSidebarCollapsed} />
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border border-border bg-background shadow-md"
            onClick={toggleSidebar}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
            <h1 className="text-xl font-semibold">Dashboard Financier</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="User avatar"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <span className="font-medium">Bastien Eraux</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6">
            {children || (
              <>
                <BudgetOverview />
                <div className="mt-6">
                  <DataTable />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
