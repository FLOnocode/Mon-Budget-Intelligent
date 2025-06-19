import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  Euro,
  LineChart,
  BarChart3,
  PieChart,
  DollarSign,
} from "lucide-react";
import {
  PieChart as RechartsePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// Fonction pour formater les montants en euros
const formatEuro = (value: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

// Données budgétaires
const budgetData = {
  infoPersonnelles: {
    nom: "Eraux",
    prenom: "Bastien",
    profession: "Chirurgien",
  },
  revenus: {
    salaire: 3221.0,
    supplementaires: 0.0,
    resteDebutMois: 0.0,
    autres: 0.0,
    total: 3221.0,
  },
  depenses: {
    chargesFixesTotal: 1851.4,
    besoinsTotal: 983.04,
    occasionnelsTotal: 0.0,
    urgencesTotal: 100.0,
    epargneTotal: 120.0,
    total: 3054.44,
  },
  soldeRestant: 166.56,
  chargesFixesDetails: [
    { name: "Loyer", value: 914.99 },
    { name: "Frais de garde", value: 400.0 },
    { name: "Frais de scolarité", value: 184.62 },
    { name: "Régularisation", value: 175.0 },
    { name: "Mutuelle", value: 70.95 },
    { name: "Assurance habitation", value: 38.18 },
    { name: "Internet", value: 37.99 },
    { name: "Téléphone", value: 21.98 },
    { name: "Assurance vie", value: 7.69 },
  ],
  besoinsDetails: [
    { name: "Courses alimentaires", value: 600.0 },
    { name: "Cotisation trimestrielle", value: 200.0 },
    { name: "Formations", value: 116.1 },
    { name: "Bolt.new", value: 21.01 },
    { name: "Loom", value: 16.05 },
    { name: "Canva", value: 11.99 },
    { name: "Obsidian", value: 9.9 },
    { name: "Crunchyroll", value: 7.99 },
  ],
  urgencesDetails: [{ name: "Aide familiale", value: 100.0 }],
  top5Depenses: [
    { name: "Loyer", value: 914.99, category: "Charges fixes" },
    { name: "Courses alimentaires", value: 600.0, category: "Besoins" },
    { name: "Frais de garde", value: 400.0, category: "Charges fixes" },
    { name: "Cotisation trimestrielle", value: 200.0, category: "Besoins" },
    { name: "Frais de scolarité", value: 184.62, category: "Charges fixes" },
  ],
};

// Pourcentage d'épargne par rapport aux revenus
const pourcentageEpargne =
  (budgetData.depenses.epargneTotal / budgetData.revenus.total) * 100;

interface BudgetOverviewProps {
  className?: string;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ className = "" }) => {
  return (
    <div className={`w-full bg-background ${className}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Aperçu Financier</h1>
        <p className="text-muted-foreground mt-1">
          Visualisez et analysez votre situation financière actuelle
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Revenus"
          value={budgetData.revenus.total}
          icon={<Wallet className="h-5 w-5" />}
          trend={0}
          trendLabel="vs mois précédent"
          color="blue"
        />
        <SummaryCard
          title="Dépenses"
          value={budgetData.depenses.total}
          icon={<ArrowDownRight className="h-5 w-5" />}
          trend={0}
          trendLabel="vs mois précédent"
          color="red"
        />
        <SummaryCard
          title="Solde"
          value={budgetData.soldeRestant}
          icon={<ArrowUpRight className="h-5 w-5" />}
          trend={0}
          trendLabel="vs mois précédent"
          color="green"
        />
        <SummaryCard
          title="Épargne"
          value={budgetData.depenses.epargneTotal}
          icon={<PiggyBank className="h-5 w-5" />}
          trend={0}
          trendLabel={`${pourcentageEpargne.toFixed(1)}% du revenu`}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-muted-foreground" />
              Répartition des Dépenses
            </CardTitle>
            <CardDescription>
              Analyse de la distribution de vos dépenses par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pie" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="pie" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" /> Camembert
                </TabsTrigger>
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> Barres
                </TabsTrigger>
                <TabsTrigger value="area" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" /> Aires
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pie" className="mt-0">
                <div className="h-[300px] rounded-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsePieChart>
                      <Pie
                        data={[
                          {
                            name: "Charges fixes",
                            value: budgetData.depenses.chargesFixesTotal,
                          },
                          {
                            name: "Besoins",
                            value: budgetData.depenses.besoinsTotal,
                          },
                          {
                            name: "Urgences",
                            value: budgetData.depenses.urgencesTotal,
                          },
                          {
                            name: "Épargne",
                            value: budgetData.depenses.epargneTotal,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(1)}%`
                        }
                      >
                        <Cell fill="#f97316" />
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ef4444" />
                        <Cell fill="#22c55e" />
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatEuro(Number(value))}
                      />
                    </RechartsePieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="bar" className="mt-0">
                <div className="h-[300px] rounded-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Charges fixes",
                          value: budgetData.depenses.chargesFixesTotal,
                          fill: "#f97316",
                        },
                        {
                          name: "Besoins",
                          value: budgetData.depenses.besoinsTotal,
                          fill: "#3b82f6",
                        },
                        {
                          name: "Urgences",
                          value: budgetData.depenses.urgencesTotal,
                          fill: "#ef4444",
                        },
                        {
                          name: "Épargne",
                          value: budgetData.depenses.epargneTotal,
                          fill: "#22c55e",
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}€`} />
                      <Tooltip
                        formatter={(value) => formatEuro(Number(value))}
                      />
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {[
                          { name: "Charges fixes", fill: "#f97316" },
                          { name: "Besoins", fill: "#3b82f6" },
                          { name: "Urgences", fill: "#ef4444" },
                          { name: "Épargne", fill: "#22c55e" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="area" className="mt-0">
                <div className="h-[300px] rounded-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        {
                          name: "Charges fixes",
                          value: budgetData.depenses.chargesFixesTotal,
                          fill: "#f97316",
                        },
                        {
                          name: "Besoins",
                          value: budgetData.depenses.besoinsTotal,
                          fill: "#3b82f6",
                        },
                        {
                          name: "Urgences",
                          value: budgetData.depenses.urgencesTotal,
                          fill: "#ef4444",
                        },
                        {
                          name: "Épargne",
                          value: budgetData.depenses.epargneTotal,
                          fill: "#22c55e",
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}€`} />
                      <Tooltip
                        formatter={(value) => formatEuro(Number(value))}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                      >
                        {[
                          { name: "Charges fixes", fill: "#f97316" },
                          { name: "Besoins", fill: "#3b82f6" },
                          { name: "Urgences", fill: "#ef4444" },
                          { name: "Épargne", fill: "#22c55e" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Area>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <CategoryItem
                name="Charges fixes"
                value={budgetData.depenses.chargesFixesTotal}
                percent={
                  (budgetData.depenses.chargesFixesTotal /
                    budgetData.depenses.total) *
                  100
                }
                color="orange"
              />
              <CategoryItem
                name="Besoins"
                value={budgetData.depenses.besoinsTotal}
                percent={
                  (budgetData.depenses.besoinsTotal /
                    budgetData.depenses.total) *
                  100
                }
                color="blue"
              />
              <CategoryItem
                name="Urgences"
                value={budgetData.depenses.urgencesTotal}
                percent={
                  (budgetData.depenses.urgencesTotal /
                    budgetData.depenses.total) *
                  100
                }
                color="red"
              />
              <CategoryItem
                name="Épargne"
                value={budgetData.depenses.epargneTotal}
                percent={
                  (budgetData.depenses.epargneTotal /
                    budgetData.depenses.total) *
                  100
                }
                color="green"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
              Revenus vs Dépenses
            </CardTitle>
            <CardDescription>
              Comparaison entre revenus et dépenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> Barres
                </TabsTrigger>
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" /> Lignes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bar" className="mt-0">
                <div className="h-[300px] rounded-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Total",
                          revenus: budgetData.revenus.total,
                          depenses: budgetData.depenses.total,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}€`} />
                      <Tooltip
                        formatter={(value) => formatEuro(Number(value))}
                      />
                      <Legend />
                      <Bar
                        dataKey="revenus"
                        name="Revenus"
                        fill="#22c55e"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="depenses"
                        name="Dépenses"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="line" className="mt-0">
                <div className="h-[300px] rounded-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={[
                        {
                          name: "Jan",
                          revenus: budgetData.revenus.total * 0.9,
                          depenses: budgetData.depenses.total * 0.85,
                        },
                        {
                          name: "Fév",
                          revenus: budgetData.revenus.total * 0.95,
                          depenses: budgetData.depenses.total * 0.9,
                        },
                        {
                          name: "Mar",
                          revenus: budgetData.revenus.total * 0.97,
                          depenses: budgetData.depenses.total * 0.95,
                        },
                        {
                          name: "Avr",
                          revenus: budgetData.revenus.total,
                          depenses: budgetData.depenses.total,
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}€`} />
                      <Tooltip
                        formatter={(value) => formatEuro(Number(value))}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenus"
                        name="Revenus"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="depenses"
                        name="Dépenses"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
              Indicateurs de Performance
            </CardTitle>
            <CardDescription>Analyse de votre santé financière</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PerformanceIndicator
                title="Taux d'utilisation du revenu"
                value={(
                  (budgetData.depenses.total / budgetData.revenus.total) *
                  100
                ).toFixed(1)}
                icon={<Euro />}
                color="blue"
                description="Pourcentage de vos revenus utilisés pour les dépenses"
              />
              <PerformanceIndicator
                title="Taux d'épargne"
                value={pourcentageEpargne.toFixed(1)}
                icon={<TrendingUp />}
                color="green"
                description="Pourcentage de vos revenus consacrés à l'épargne"
              />
              <PerformanceIndicator
                title="Statut d'épargne"
                value={pourcentageEpargne > 10 ? "Excellent" : "À améliorer"}
                icon={
                  pourcentageEpargne > 10 ? <CheckCircle /> : <AlertTriangle />
                }
                color={pourcentageEpargne > 10 ? "green" : "amber"}
                description="Évaluation de votre taux d'épargne actuel"
                isText
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Top 5 Dépenses
            </CardTitle>
            <CardDescription>
              Vos principales dépenses ce mois-ci
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.top5Depenses.map((expense, index) => (
                <TopExpenseItem
                  key={index}
                  rank={index + 1}
                  name={expense.name}
                  value={expense.value}
                  category={expense.category}
                  totalRevenue={budgetData.revenus.total}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: number;
  trendLabel: string;
  color: "blue" | "red" | "green" | "amber";
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  color,
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-700 border-red-200",
    green: "bg-green-50 text-green-700 border-green-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const iconColorClasses = {
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-xl border ${colorClasses[color]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{formatEuro(value)}</h3>
        </div>
        <div className={`p-2 rounded-full ${iconColorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 text-xs">
        <span className="opacity-70">{trendLabel}</span>
      </div>
    </motion.div>
  );
};

interface CategoryItemProps {
  name: string;
  value: number;
  percent: number;
  color: "blue" | "red" | "green" | "orange";
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  value,
  percent,
  color,
}) => {
  const colorClasses = {
    blue: "text-blue-600",
    red: "text-red-600",
    green: "text-green-600",
    orange: "text-orange-600",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className={`text-xs font-medium ${colorClasses[color]}`}>
          {percent.toFixed(1)}%
        </span>
      </div>
      <Progress value={percent} className="h-2" />
      <p className="text-sm mt-1 font-medium">{formatEuro(value)}</p>
    </div>
  );
};

interface PerformanceIndicatorProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "blue" | "red" | "green" | "amber";
  description: string;
  isText?: boolean;
}

const PerformanceIndicator: React.FC<PerformanceIndicatorProps> = ({
  title,
  value,
  icon,
  color,
  description,
  isText = false,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center">
        <div className={`p-2 rounded-full mr-3 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-lg font-semibold">
            {isText ? value : `${value}%`}
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </div>
  );
};

interface TopExpenseItemProps {
  rank: number;
  name: string;
  value: number;
  category: string;
  totalRevenue: number;
}

const TopExpenseItem: React.FC<TopExpenseItemProps> = ({
  rank,
  name,
  value,
  category,
  totalRevenue,
}) => {
  const percent = (value / totalRevenue) * 100;
  const badgeColor =
    category === "Charges fixes"
      ? "bg-orange-100 text-orange-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
        <span className="font-medium">{rank}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{name}</p>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className={badgeColor}>
                {category}
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">
                {percent.toFixed(1)}% du revenu
              </span>
            </div>
          </div>
          <span className="font-semibold">{formatEuro(value)}</span>
        </div>
        <Separator className="mt-3" />
      </div>
    </div>
  );
};

export default BudgetOverview;
