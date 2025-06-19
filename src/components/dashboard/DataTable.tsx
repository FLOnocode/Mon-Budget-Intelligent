import React, { useState } from "react";
import { Search, Download, ArrowUpDown, Filter, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableProps {
  title?: string;
  description?: string;
  data?: any[];
  columns?: { key: string; header: string }[];
  onExport?: () => void;
  onRefresh?: () => void;
}

const DataTable = ({
  title = "Transactions",
  description = "Gérez et analysez vos transactions financières.",
  data = [
    {
      id: 1,
      date: "2023-06-01",
      category: "Loyer",
      amount: 914.99,
      type: "Charges fixes",
    },
    {
      id: 2,
      date: "2023-06-02",
      category: "Courses alimentaires",
      amount: 150.0,
      type: "Besoins",
    },
    {
      id: 3,
      date: "2023-06-05",
      category: "Internet",
      amount: 37.99,
      type: "Charges fixes",
    },
    {
      id: 4,
      date: "2023-06-10",
      category: "Formations",
      amount: 116.1,
      type: "Besoins",
    },
    {
      id: 5,
      date: "2023-06-15",
      category: "Frais de garde",
      amount: 400.0,
      type: "Charges fixes",
    },
    {
      id: 6,
      date: "2023-06-20",
      category: "Courses alimentaires",
      amount: 180.0,
      type: "Besoins",
    },
    {
      id: 7,
      date: "2023-06-25",
      category: "Courses alimentaires",
      amount: 120.0,
      type: "Besoins",
    },
    {
      id: 8,
      date: "2023-06-28",
      category: "Aide familiale",
      amount: 100.0,
      type: "Urgences",
    },
    {
      id: 9,
      date: "2023-06-30",
      category: "Épargne",
      amount: 120.0,
      type: "Épargne",
    },
  ],
  columns = [
    { key: "date", header: "Date" },
    { key: "category", header: "Catégorie" },
    { key: "amount", header: "Montant" },
    { key: "type", header: "Type" },
  ],
  onExport = () => console.log("Exporting data..."),
  onRefresh = () => console.log("Refreshing data..."),
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Apply search filter
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
  }, [sortedData, searchTerm]);

  // Get unique values for filters
  const getUniqueValues = (key: string) => {
    const values = data.map((item) => item[key]);
    return [...new Set(values)];
  };

  // Apply category filters
  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => {
      const currentFilters = prev[key] || [];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [key]: currentFilters.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [key]: [...currentFilters, value],
        };
      }
    });
  };

  return (
    <Card className="bg-white shadow-md border-0">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className="font-medium">
                    <div className="flex items-center justify-between">
                      <span>{column.header}</span>
                      <div className="flex gap-1">
                        {column.key === "type" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {getUniqueValues("type").map((value) => (
                                <DropdownMenuItem
                                  key={String(value)}
                                  onClick={() =>
                                    handleFilterChange("type", String(value))
                                  }
                                >
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={
                                        activeFilters["type"]?.includes(
                                          String(value),
                                        ) || false
                                      }
                                      onChange={() => {}}
                                      className="mr-2"
                                    />
                                    {String(value)}
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleSort(column.key)}
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={`${row.id}-${column.key}`}>
                        {column.key === "amount" ? (
                          formatCurrency(row[column.key])
                        ) : column.key === "date" ? (
                          formatDate(row[column.key])
                        ) : column.key === "type" ? (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              row[column.key] === "Charges fixes"
                                ? "bg-orange-100 text-orange-800"
                                : row[column.key] === "Besoins"
                                  ? "bg-blue-100 text-blue-800"
                                  : row[column.key] === "Urgences"
                                    ? "bg-red-100 text-red-800"
                                    : row[column.key] === "Épargne"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {row[column.key]}
                          </span>
                        ) : (
                          row[column.key]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Éditer</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <span className="sr-only">Supprimer</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    Aucun résultat trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Affichage de {filteredData.length} sur {data.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={filteredData.length === data.length}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredData.length === data.length}
            >
              Suivant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
