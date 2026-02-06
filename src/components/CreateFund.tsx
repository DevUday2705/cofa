// @ts-nocheck
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CreateFund = () => {
  const [formData, setFormData] = useState({
    transferType: "",
    description: "",
    fundCenter: "",
    fundType: "",
    requestedBy: "",
    currency: "",
    explanation: "",
  });

  // Budget data state - starts empty
  const [budgetData, setBudgetData] = useState<Array<{
    year: string;
    availableBudget: string;
    isEditing: boolean;
    tempBudget?: string;
  }>>([]);

  // Sample data for the lower node table
  const [lowerNodeData, setLowerNodeData] = useState([
    {
      id: 1,
      fundCenter: "Operations Center",
      commitmentItem: "Equipment Purchase",
      years: {
        "2024": "$15,000.00",
        "2025": "$25,000.00",
        "2026": "$20,000.00",
      },
    },
    {
      id: 2,
      fundCenter: "Marketing Department",
      commitmentItem: "Campaign Budget",
      years: {
        "2024": "$10,000.00",
        "2025": "$15,000.00",
        "2026": "$12,000.00",
      },
    },
    {
      id: 3,
      fundCenter: "Research & Development",
      commitmentItem: "Lab Equipment",
      years: {
        "2024": "$20,000.00",
        "2025": "$35,000.00",
        "2026": "$28,000.00",
      },
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAllItems = () => {
    setSelectedItems((prev) =>
      prev.length === lowerNodeData.length
        ? []
        : lowerNodeData.map((item) => item.id),
    );
  };

  // Budget table functions
  const addYear = () => {
    let nextYear: string;
    if (budgetData.length === 0) {
      // If no entries, start with current year
      nextYear = new Date().getFullYear().toString();
    } else {
      // Get last year and add 1
      const lastYear = parseInt(budgetData[budgetData.length - 1].year);
      nextYear = (lastYear + 1).toString();
    }
    
    const newRow = {
      year: nextYear,
      availableBudget: "",
      isEditing: true,
      tempBudget: ""
    };
    setBudgetData((prev) => [...prev, newRow]);
  };

  const handleBudgetChange = (index: number, value: string) => {
    setBudgetData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, tempBudget: value } : item
      )
    );
  };

  const handleBudgetSubmit = (index: number) => {
    setBudgetData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              availableBudget: item.tempBudget || "$0.00",
              isEditing: false,
              tempBudget: undefined
            }
          : item
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleBudgetSubmit(index);
    }
  };

  const deleteLatestYear = () => {
    if (budgetData.length > 0) {
      const yearToRemove = budgetData[budgetData.length - 1].year;
      
      // Remove from budget data
      setBudgetData((prev) => prev.slice(0, -1));
      
      // Remove the year column from lower node data
      setLowerNodeData((prev) => 
        prev.map((item) => {
          const newYears = { ...item.years };
          delete newYears[yearToRemove];
          return { ...item, years: newYears };
        })
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' }}>
      {/* Header */}
      <motion.div 
        className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Create New Fund Request
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Create and manage funding requests with comprehensive budget oversight
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Section - Form */}
          <motion.div className="lg:col-span-3" variants={cardVariants}>
            <Card className="shadow-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                  Fund Request Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Transfer Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Transfer Type
                    </label>
                    <Select
                      value={formData.transferType}
                      onValueChange={(value) =>
                        updateFormField("transferType", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Choose transfer type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">
                          Internal Transfer
                        </SelectItem>
                        <SelectItem value="external">
                          External Transfer
                        </SelectItem>
                        <SelectItem value="interdepartmental">
                          Interdepartmental
                        </SelectItem>
                        <SelectItem value="emergency">
                          Emergency Transfer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Description
                    </label>
                    <Input
                      placeholder="Enter request description..."
                      value={formData.description}
                      onChange={(e) =>
                        updateFormField("description", e.target.value)
                      }
                      className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    />
                  </div>

                  {/* Fund Center */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Fund Center
                    </label>
                    <Select
                      value={formData.fundCenter}
                      onValueChange={(value) =>
                        updateFormField("fundCenter", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select fund center..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operations">
                          Operations Center
                        </SelectItem>
                        <SelectItem value="marketing">
                          Marketing Department
                        </SelectItem>
                        <SelectItem value="research">
                          Research & Development
                        </SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">
                          Finance Department
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fund Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Fund Type
                    </label>
                    <Select
                      value={formData.fundType}
                      onValueChange={(value) =>
                        updateFormField("fundType", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Choose fund type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">
                          Operational Funds
                        </SelectItem>
                        <SelectItem value="capital">
                          Capital Expenditure
                        </SelectItem>
                        <SelectItem value="project">Project Funds</SelectItem>
                        <SelectItem value="contingency">
                          Contingency Fund
                        </SelectItem>
                        <SelectItem value="maintenance">
                          Maintenance Budget
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Requested By */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Requested By
                    </label>
                    <Select
                      value={formData.requestedBy}
                      onValueChange={(value) =>
                        updateFormField("requestedBy", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select requesting user..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john.doe">
                          John Doe - Finance Manager
                        </SelectItem>
                        <SelectItem value="sarah.smith">
                          Sarah Smith - Operations Director
                        </SelectItem>
                        <SelectItem value="mike.johnson">
                          Mike Johnson - Project Lead
                        </SelectItem>
                        <SelectItem value="lisa.brown">
                          Lisa Brown - Department Head
                        </SelectItem>
                        <SelectItem value="david.wilson">
                          David Wilson - Budget Analyst
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Currency
                    </label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) =>
                        updateFormField("currency", value)
                      }
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select currency..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="cad">
                          CAD - Canadian Dollar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Explanation */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Explanation
                  </label>
                  <Textarea
                    placeholder="Provide additional explanation or justification for this budget request..."
                    value={formData.explanation}
                    onChange={(e) =>
                      updateFormField("explanation", e.target.value)
                    }
                    className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 min-h-[100px] resize-none"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Section - Budget Table */}
          <motion.div className="lg:col-span-2" variants={cardVariants}>
            <Card className="shadow-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <div className="w-2 h-6 bg-emerald-600 rounded-full"></div>
                    Budget Overview
                  </CardTitle>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addYear}
                      className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Year
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={deleteLatestYear}
                      disabled={budgetData.length === 0}
                      className="bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 border-slate-300 dark:border-slate-600 text-red-600 dark:text-red-400 hover:border-red-300 dark:hover:border-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Latest
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-[500px] overflow-y-auto budget-scroll">
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <Table>
                      <TableHeader className="sticky top-0 z-10">
                        <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                            Budget Year
                          </TableHead>
                          <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                            Amount
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence initial={false}>
                          {budgetData.length === 0 ? (
                            <TableRow key="empty-state">
                              <TableCell
                                colSpan={2}
                                className="text-center text-slate-500 dark:text-slate-400 py-8"
                              >
                                No budget years added yet.<br />
                                Click "Add Year" to start creating your budget.
                              </TableCell>
                            </TableRow>
                          ) : (
                            budgetData.map((row, index) => (
                              <motion.tr
                                key={row.year}
                                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ 
                                  duration: 0.2, 
                                  ease: "easeOut"
                                }}
                              >
                                <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                                  {row.year}
                                </TableCell>
                                <TableCell>
                                  {row.isEditing ? (
                                    <motion.div
                                      initial={{ scale: 0.95, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ duration: 0.15 }}
                                    >
                                      <Input
                                        placeholder="Enter budget amount..."
                                        value={row.tempBudget || ""}
                                        onChange={(e) => handleBudgetChange(index, e.target.value)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 font-mono"
                                        autoFocus
                                      />
                                    </motion.div>
                                  ) : (
                                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                                      {row.availableBudget}
                                    </span>
                                  )}
                                </TableCell>
                              </motion.tr>
                            ))
                          )}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Fund Allocation Section */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="shadow-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-2 h-6 bg-purple-600 rounded-full"></div>
                  Fund Allocation
                </CardTitle>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-900/20 border-slate-300 dark:border-slate-600 text-green-600 dark:text-green-400 hover:border-green-300 dark:hover:border-green-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 border-slate-300 dark:border-slate-600 text-red-600 dark:text-red-400 hover:border-red-300 dark:hover:border-red-600"
                    disabled={selectedItems.length === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete ({selectedItems.length})
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={
                            selectedItems.length === lowerNodeData.length &&
                            lowerNodeData.length > 0
                          }
                          onCheckedChange={toggleAllItems}
                          className="border-slate-400 dark:border-slate-500"
                        />
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Fund Center
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Commitment Item
                      </TableHead>
                      {budgetData.map((budget) => (
                        <TableHead
                          key={budget.year}
                          className="font-semibold text-slate-700 dark:text-slate-300 text-center"
                        >
                          {budget.year}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowerNodeData.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          selectedItems.includes(row.id)
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(row.id)}
                            onCheckedChange={() => toggleItemSelection(row.id)}
                            className="border-slate-400 dark:border-slate-500"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          {row.fundCenter}
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300">
                          {row.commitmentItem}
                        </TableCell>
                        {budgetData.map((budget) => (
                          <TableCell
                            key={budget.year}
                            className="text-slate-700 dark:text-slate-300 font-mono text-center"
                          >
                            {row.years[budget.year] || "-"}
                          </TableCell>
                        ))}
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateFund;