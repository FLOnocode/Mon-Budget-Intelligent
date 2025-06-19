import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoonIcon,
  SunIcon,
  LayoutDashboardIcon,
  BarChart3Icon,
  PieChartIcon,
  TrendingUpIcon,
  FileSpreadsheetIcon,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is CSV
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast({
        title: "Format de fichier invalide",
        description: "Veuillez importer un fichier CSV.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvData = e.target?.result as string;
        // Process CSV data
        processCSVData(csvData);

        toast({
          title: "Importation réussie",
          description: "Les données ont été mises à jour avec succès.",
        });

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        toast({
          title: "Erreur d'importation",
          description:
            "Une erreur s'est produite lors de l'importation du fichier.",
          variant: "destructive",
        });
      }
    };

    reader.onerror = () => {
      toast({
        title: "Erreur de lecture",
        description: "Impossible de lire le fichier.",
        variant: "destructive",
      });
    };

    reader.readAsText(file);
  };

  const processCSVData = (csvData: string) => {
    // Parse CSV data
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      const values = lines[i].split(",");
      const entry: Record<string, string> = {};

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j].trim()] = values[j]?.trim() || "";
      }

      data.push(entry);
    }

    // Store the data in localStorage for use in dashboard components
    localStorage.setItem("dashboardData", JSON.stringify(data));

    // You could also use a more sophisticated state management solution
    // like Context API or Redux to share this data across components
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <header
        className={`${theme === "dark" ? "bg-gray-800" : "bg-indigo-600"} text-white shadow-lg`}
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Finance Dashboard</h1>
            <p className="text-sm opacity-80 mt-1">
              Modern financial insights at a glance
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={`rounded-full ${theme === "dark" ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-indigo-500 text-white hover:bg-indigo-400"}`}
          >
            {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-indigo-300" : "text-indigo-700"}`}
          >
            Welcome to Your Financial Dashboard
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            Gain insights into your financial health with our sophisticated
            analytics and visualization tools.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card
              className={`h-full ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"} hover:shadow-lg transition-shadow duration-300`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === "dark" ? "bg-indigo-900" : "bg-indigo-100"}`}
                >
                  <LayoutDashboardIcon
                    size={32}
                    className={
                      theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                    }
                  />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                  Budget Overview
                </h3>
                <p
                  className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  Get a comprehensive view of your income, expenses, and savings
                  at a glance.
                </p>
                <Button
                  className={`mt-auto ${theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600"}`}
                  onClick={() => navigate("/dashboard")}
                >
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              className={`h-full ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"} hover:shadow-lg transition-shadow duration-300`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === "dark" ? "bg-emerald-900" : "bg-emerald-100"}`}
                >
                  <BarChart3Icon
                    size={32}
                    className={
                      theme === "dark" ? "text-emerald-300" : "text-emerald-600"
                    }
                  />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                  Expense Analysis
                </h3>
                <p
                  className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  Analyze your spending patterns and identify areas for
                  potential savings.
                </p>
                <Button
                  className={`mt-auto ${theme === "dark" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-600"}`}
                  onClick={() => navigate("/analytics")}
                >
                  Analyze Expenses
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              className={`h-full ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"} hover:shadow-lg transition-shadow duration-300`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === "dark" ? "bg-purple-900" : "bg-purple-100"}`}
                >
                  <TrendingUpIcon
                    size={32}
                    className={
                      theme === "dark" ? "text-purple-300" : "text-purple-600"
                    }
                  />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                  Financial Goals
                </h3>
                <p
                  className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                >
                  Set and track your financial goals with personalized
                  recommendations.
                </p>
                <Button
                  className={`mt-auto ${theme === "dark" ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600"}`}
                  onClick={() => navigate("/budget")}
                >
                  Set Goals
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 text-center flex flex-col md:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            size="lg"
            className={`${theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600"} px-8`}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboardIcon className="mr-2" size={20} />
            Go to Dashboard
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={`${theme === "dark" ? "border-indigo-600 text-indigo-300 hover:bg-indigo-900" : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"} px-8`}
            onClick={handleImportClick}
          >
            <FileSpreadsheetIcon className="mr-2" size={20} />
            Importer CSV
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div
            className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-indigo-50"}`}
          >
            <h3
              className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-indigo-700"}`}
            >
              <PieChartIcon className="inline-block mr-2" size={20} />
              Intuitive Visualizations
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              Interactive charts and graphs that make understanding your
              finances simple and intuitive.
            </p>
          </div>

          <div
            className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-emerald-50"}`}
          >
            <h3
              className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-emerald-700"}`}
            >
              <BarChart3Icon className="inline-block mr-2" size={20} />
              Smart Insights
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              AI-powered recommendations to help you make better financial
              decisions.
            </p>
          </div>

          <div
            className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-purple-50"}`}
          >
            <h3
              className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-purple-700"}`}
            >
              <TrendingUpIcon className="inline-block mr-2" size={20} />
              Goal Tracking
            </h3>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              Set financial goals and track your progress with customizable
              milestones.
            </p>
          </div>
        </motion.div>
      </main>

      <footer
        className={`mt-16 py-8 ${theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
      >
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Financial Dashboard. All rights
            reserved.
          </p>
          <p className="mt-2 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
