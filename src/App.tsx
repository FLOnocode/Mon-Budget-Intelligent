import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import BudgetOverview from "./components/dashboard/BudgetOverview";
import DataTable from "./components/dashboard/DataTable";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route
            path="/analytics"
            element={
              <DashboardLayout>
                <BudgetOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/budget"
            element={
              <DashboardLayout>
                <BudgetOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <DashboardLayout>
                <DataTable />
              </DashboardLayout>
            }
          />
          <Route
            path="/accounts"
            element={
              <DashboardLayout>
                <div className="p-6 bg-white rounded-lg">
                  <h1 className="text-2xl font-bold">Comptes Bancaires</h1>
                  <p className="text-muted-foreground mt-2">
                    Gérez vos comptes bancaires et suivez vos soldes.
                  </p>
                </div>
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <div className="p-6 bg-white rounded-lg">
                  <h1 className="text-2xl font-bold">Paramètres</h1>
                  <p className="text-muted-foreground mt-2">
                    Configurez vos préférences et paramètres du compte.
                  </p>
                </div>
              </DashboardLayout>
            }
          />
          <Route
            path="/help"
            element={
              <DashboardLayout>
                <div className="p-6 bg-white rounded-lg">
                  <h1 className="text-2xl font-bold">Aide</h1>
                  <p className="text-muted-foreground mt-2">
                    Consultez notre documentation et obtenez de l'aide.
                  </p>
                </div>
              </DashboardLayout>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
