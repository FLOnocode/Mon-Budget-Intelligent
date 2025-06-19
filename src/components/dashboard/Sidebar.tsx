import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  PieChart,
  Wallet,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || "dashboard";
  const [activeItem, setActiveItem] = useState(currentPath);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    { id: "budget", label: "Budget", icon: PieChart, path: "/budget" },
    {
      id: "transactions",
      label: "Transactions",
      icon: CreditCard,
      path: "/transactions",
    },
    { id: "accounts", label: "Accounts", icon: Wallet, path: "/accounts" },
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
    { id: "logout", label: "Logout", icon: LogOut, path: "/" },
  ];

  const handleNavigation = (path: string, id: string) => {
    setActiveItem(id);
    navigate(path);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header with logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">FB</span>
            </div>
            <span className="font-semibold text-lg">FinBoard</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold">FB</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={collapsed ? "mx-auto mt-2" : ""}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* User profile section */}
      <div
        className={cn(
          "flex items-center p-4 border-b",
          collapsed ? "flex-col" : "gap-3",
        )}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bastien"
            alt="Bastien Eraux"
          />
          <AvatarFallback>BE</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-medium text-sm">Bastien Eraux</span>
            <span className="text-xs text-muted-foreground">Chirurgien</span>
          </div>
        )}
      </div>

      {/* Main navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return collapsed ? (
              <TooltipProvider key={item.id}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeItem === item.id ? "secondary" : "ghost"}
                      size="icon"
                      className="w-full h-10 mb-1"
                      onClick={() => handleNavigation(item.path, item.id)}
                    >
                      <Icon size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                key={item.id}
                variant={activeItem === item.id ? "secondary" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => handleNavigation(item.path, item.id)}
              >
                <Icon size={18} className="mr-2" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="px-4 py-2">
            <Separator />
            <h3 className="text-xs font-medium text-muted-foreground py-2">
              NOTIFICATIONS
            </h3>
            <div className="bg-muted/50 rounded-lg p-3 mb-2">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-amber-500" />
                <span className="text-xs font-medium">Budget Alert</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your food budget is 85% spent
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-emerald-500" />
                <span className="text-xs font-medium">Savings Goal</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                You're 70% to your savings goal
              </p>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Bottom navigation */}
      <div className="mt-auto border-t py-2 px-2">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            return collapsed ? (
              <TooltipProvider key={item.id}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-full h-10 mb-1"
                      onClick={() => handleNavigation(item.path, item.id)}
                    >
                      <Icon size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start mb-1"
                onClick={() => handleNavigation(item.path, item.id)}
              >
                <Icon size={18} className="mr-2" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
