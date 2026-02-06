import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Users, 
  PlusCircle, 
  ArrowUpRight,
  CalendarDays,
  CheckCircle,
  RefreshCw,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Sample data for charts
  const chartData = [
    { month: 'Jan', Approved: 45000, Pending: 12000, Rejected: 3000 },
    { month: 'Feb', Approved: 52000, Pending: 15000, Rejected: 2500 },
    { month: 'Mar', Approved: 48000, Pending: 18000, Rejected: 4000 },
    { month: 'Apr', Approved: 61000, Pending: 22000, Rejected: 3500 },
    { month: 'May', Approved: 55000, Pending: 16000, Rejected: 2800 },
    { month: 'Jun', Approved: 67000, Pending: 14000, Rejected: 3200 },
    { month: 'Jul', Approved: 67000, Pending: 14000, Rejected: 4500 },
    { month: 'Aug', Approved: 67000, Pending: 14000, Rejected: 3200 },
    { month: 'Sep', Approved: 67000, Pending: 14000, Rejected: 5000 }
  ];

  // Sample requests data
  const recentRequests = [
    {
      id: 1,
      title: "Equipment Purchase",
      department: "Operations",
      amount: "$25,000",
      status: "approved",
      date: "2026-02-01",
      priority: "high"
    },
    {
      id: 2,
      title: "Marketing Campaign",
      department: "Marketing",
      amount: "$15,000",
      status: "pending",
      date: "2026-01-28",
      priority: "medium"
    },
    {
      id: 3,
      title: "Lab Equipment",
      department: "R&D",
      amount: "$35,000",
      status: "reviewing",
      date: "2026-01-25",
      priority: "high"
    },
    {
      id: 4,
      title: "Office Supplies",
      department: "Admin",
      amount: "$2,500",
      status: "approved",
      date: "2026-01-22",
      priority: "low"
    },
    {
      id: 5,
      title: "Software Licenses",
      department: "IT",
      amount: "$12,000",
      status: "rejected",
      date: "2026-01-20",
      priority: "medium"
    }
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "approved",
      fundNumber: "ABCD1200",
      message: "has been Approved by John Doe",
      time: "2 min ago",
      icon: CheckCircle,
      iconColor: "text-green-500"
    },
    {
      id: 2,
      type: "rejected",
      fundNumber: "ABCD123",
      message: "has been Rejected",
      time: "5 min ago",
      icon: FileText,
      iconColor: "text-red-500"
    },
    {
      id: 3,
      type: "submitted",
      fundNumber: "ABCD1205",
      message: "submitted for review by Sarah Smith",
      time: "15 min ago",
      icon: Bell,
      iconColor: "text-blue-500"
    },
    {
      id: 4,
      type: "approved",
      fundNumber: "ABCD1198",
      message: "has been Approved by Mike Johnson",
      time: "1 hour ago",
      icon: CheckCircle,
      iconColor: "text-green-500"
    },
    {
      id: 5,
      type: "pending",
      fundNumber: "ABCD1203",
      message: "is under review",
      time: "2 hours ago",
      icon: TrendingUp,
      iconColor: "text-yellow-500"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'reviewing': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' }}>
      {/* Header */}
      <motion.div 
        className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome back! 👋
              </motion.h1>
              <motion.p 
                className="text-lg text-slate-600 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Manage your fund requests, track approvals, and maintain comprehensive oversight of your organization's budget allocations.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="mt-6 lg:mt-0 bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={() => navigate('/create-fund')}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Request
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1440px] mx-auto p-6 space-y-8">
        {/* Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              title: "Total Budget",
              value: "$180,000",
              icon: DollarSign,
              change: "+12%",
              bgColor: "#ECFCF9",
              textColor: "text-emerald-700",
              iconBg: "bg-emerald-100"
            },
            {
              title: "Pending Requests",
              value: "8",
              icon: FileText,
              change: "-3%",
              bgColor: "#FEECEB",
              textColor: "text-red-700",
              iconBg: "bg-red-100"
            },
            {
              title: "Approved This Month",
              value: "24",
              icon: CheckCircle,
              change: "+8%",
              bgColor: "#EDEDFD",
              textColor: "text-purple-700",
              iconBg: "bg-purple-100"
            },
            {
              title: "Active Users",
              value: "156",
              icon: Users,
              change: "+5%",
              bgColor: "#FCFAEB",
              textColor: "text-amber-700",
              iconBg: "bg-amber-100"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <p className={`text-sm font-medium ${stat.textColor} opacity-80`}>
                          {stat.title}
                        </p>
                        <div className="flex items-baseline space-x-3">
                          <p className={`text-3xl font-bold ${stat.textColor}`}>
                            {stat.value}
                          </p>
                          <div className="flex items-center space-x-1">
                            <ArrowUpRight className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-medium text-green-600">
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full ${stat.iconBg}`}>
                        <Icon className={`w-6 h-6 ${stat.textColor}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chart and Activity Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Chart Section - 75% */}
          <motion.div
            className="xl:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Fund Request Analytics
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Monthly overview of fund request approvals, pending, and rejections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          color: '#333', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                        }} 
                      />
                      <Bar dataKey="Approved" fill="#BC9CD9" radius={4} />
                      <Bar dataKey="Pending" fill="#B598D7" radius={4} />
                      <Bar dataKey="Rejected" fill="#BD9DD9" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity Section - 25% */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-slate-100"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="w-4 h-4 text-slate-600" />
                  </Button>
                </div>
                <CardDescription className="text-slate-600 text-sm">
                  Latest fund request updates
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <motion.div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.3 }}
                      >
                        <div className={`p-1.5 rounded-full bg-slate-100`}>
                          <Icon className={`w-3 h-3 ${activity.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900">
                            <span className="font-semibold">{activity.fundNumber}</span>{" "}
                            <span className="text-slate-600">{activity.message}</span>
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Requests Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-primary" />
                    Recent Fund Requests
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Latest submissions and their current status
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="hover:bg-slate-50"
                  onClick={() => navigate('/create-fund')}
                >
                  View All Requests
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-4 bg-primary rounded"></div>
                          Priority
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">Request Title</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((request, index) => (
                      <motion.tr
                        key={request.id}
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.8, duration: 0.3 }}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(request.priority)}`}></div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {request.title}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {request.department}
                        </TableCell>
                        <TableCell className="font-mono font-medium">
                          {request.amount}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)} variant="secondary">
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {new Date(request.date).toLocaleDateString()}
                        </TableCell>
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

export default Dashboard;